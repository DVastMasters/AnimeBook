import React, {useCallback, useEffect, useState} from "react";
import { Button, FlatList, Modal, Text, TextInput, useColorScheme, View, ImageBackground } from "react-native";
import topicsBank from "../../assets/topics.json"
import {MemoizedTopicCard }  from "../../components/TopicCard"
import styles from "./styles";

const TOPICS_PER_PAGE = 6;

export const TopicsScreen = ({ navigation, route }) => {
    const [topics, setTopics] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const [openCreateTopicScreen, setOpenCreateTopicScreen] = useState(false)
    const [titleNewTopic, setTitleNewTopic] = useState();
    const [descriptionNewTopic, setDescriptionNewTopic] = useState();

    const showCreateTopicScreen = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
            >
                <View 
                    style={styles.modal}>
                    <Text>Título:</Text>
                    <View style={styles.modalTitle}>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            maxLength={256}
                            
                            onChangeText={setTitleNewTopic}

                            placeholder={"Digite o título do tópico..."}
                        />
                    </View>
                    <Text>Descrição:</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        maxLength={4000}
                        style={styles.modalDescription}
                        onChangeText={setDescriptionNewTopic}

                        editable={true}

                        placeholder={"Digite a descrição do tópico..."}
                    />
                    <View style={styles.modalButtons}>
                        <Button
                            title="Cancelar" 
                            onPress={() => {setOpenCreateTopicScreen(false)}}
                        />
                        <Button
                            title="Pronto"
                            onPress={newTopic}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    useEffect(() => {
        loadPage();
        navigation.setOptions({
            headerRight: () => (
                <Button  color="#758880" title=" + " onPress={() => {setOpenCreateTopicScreen(true)}}/>
            ),
        })
    }, [])

    const newTopic = () => {
        console.log(titleNewTopic)
        if (!titleNewTopic) {
            return;
        }

        const newTopic = {
            "id": 0,
            "animeId": route.params.animeId,
            "title": titleNewTopic,
            "description": descriptionNewTopic,
            "author": 'fakeUser',
            "discussion": []
        }

        setTopics(topics.concat(newTopic));
        setOpenCreateTopicScreen(false)
    }

    const loadPage = () => {
        if (titleNewTopic) {
            return
        }
        
        setTopics((topicsBank.topics.filter((topic) => 
            (topic.id <= page * TOPICS_PER_PAGE) && topic.animeId == route.params.animeId
        )));     

        setPage(page + 1);   

        setRefreshing(false);
    }

    const reset = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        loadPage();        
    }, []);

    const renderItem = ({ item }) => {
        console.log("Rendering: " + item.id)
        return <MemoizedTopicCard topic={item} navigation={navigation}/>
    }

    const keyExtractor = (item) => (
        String(item.id)   
    )

    const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';

    return (
        <View style={[styles.container]}>
            <FlatList
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                data={topics}
                onEndReached={loadPage}
                onEndReachedThreshold={0.2}
                onRefresh={reset}
                refreshing={refreshing}
                renderItem={renderItem}
                style={styles.list}
            />
            {openCreateTopicScreen && showCreateTopicScreen()}
        </View>
    )
}