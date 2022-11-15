import React, {useCallback, useEffect, useState} from "react";
import { Button, FlatList, Modal, Text, TextInput, useColorScheme, View, ImageBackground } from "react-native";
import topicsBank from "../../assets/topics.json"
import {MemoizedTopicCard }  from "../../components/TopicCard"
import styles from "./styles";
import { getAnimeTopics, saveTopic } from "../../api";

const TOPICS_PER_PAGE = 4;

export const TopicsScreen = ({ navigation, route }) => {
    const [topics, setTopics] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [refreshFeeds, setRefreshFeeds] = useState(false)

    const [openCreateTopicScreen, setOpenCreateTopicScreen] = useState(false)
    const [titleNewTopic, setTitleNewTopic] = useState();
    const [descriptionNewTopic, setDescriptionNewTopic] = useState();
    const [authorNewTopic, setAuthorNewTopic] = useState();

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
                    <Text>Autor:</Text>
                    <TextInput
                        maxLength={50}
                        onChangeText={setAuthorNewTopic}
                        style={styles.modalDescription}
                        editable={true}

                        placeholder={"Caso queira se identificar, digite seu nome aqui..."}
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
        navigation.setOptions({
            headerRight: () => (
                <Button  color="#758880" title=" + " onPress={() => {setOpenCreateTopicScreen(true)}}/>
            ),
        })

        getAnimeTopics(route.params.animeId, page, TOPICS_PER_PAGE).then(
            (res) => setTopics([...topics, ...res.data]),
            (err) => console.log(err)
        )

        setRefreshing(false);

    }, [refreshFeeds, page])

    const newTopic = () => {
        if (!titleNewTopic) {
            return;
        }

        const author = authorNewTopic ? authorNewTopic : "Anônimo"
        
        saveTopic(route.params.animeId, titleNewTopic, descriptionNewTopic, author).then(
            (res) => {
                if (res.data.status == 'ok') {
                    flushFeed()
                    setAuthorNewTopic("")
                    setOpenCreateTopicScreen(false)
                } 
            },
            (err) => console.log(err)
        )
    }

    const flushFeed = () => {
        setRefreshing(true)
        setTopics([])
        setPage(1)        
        refreshFeeds ? setRefreshFeeds(false) : setRefreshFeeds(true)
    }

    const renderItem = ({ item }) => {
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
                onEndReached={() => setPage(page + 1)}
                onEndReachedThreshold={0.2}
                onRefresh={flushFeed}
                refreshing={refreshing}
                renderItem={renderItem}
                style={styles.list}
            />
            {openCreateTopicScreen && showCreateTopicScreen()}
        </View>
    )
}