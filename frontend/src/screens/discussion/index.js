import React, {useCallback, useEffect, useState} from "react";
import { Button, FlatList, ImageEditor, Modal, Text, TextInput, useColorScheme, View } from "react-native";
import styles from "./styles";
import { getDiscussionsTopic, saveDiscussion } from "../../api";


export const DiscussionScreen = ({ navigation, route }) => {
    const [discussion, setDiscussion] = useState([]);

    const [openCreateCommentScreen, setOpenCreateCommentScreen] = useState(false)

    const [refreshFeeds, setRefreshFeeds] = useState(false)

    const [commentText, setCommentText] = useState();
    const [commentAuthor, setCommentAuthor] = useState();

    const showCreateCommentScreen = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
            >
                <View 
                    style={styles.modal}>
                    <Text>Comentário:</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        maxLength={4000}
                        onChangeText={setCommentText}
                        style={styles.modalDescription}

                        editable={true}

                        placeholder={"Digite a sua contribuição..."}
                    />
                    <Text>Autor:</Text>
                    <TextInput
                        onChangeText={setCommentAuthor}
                        style={styles.modalDescription}

                        editable={true}

                        placeholder={"Caso queira se identificar, digite seu nome..."}
                    />
                    <View style={styles.modalButtons}>
                        <Button
                            title="Cancelar" 
                            onPress={() => {setOpenCreateCommentScreen(false)}}
                        />
                        <Button
                            title="Pronto"
                            onPress={newComment}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    useEffect(() => {  
        navigation.setOptions({
            headerRight: () => (
                <Button  color="#758880" title=" + " onPress={() => {setOpenCreateCommentScreen(true)}}/>
            ),
        })

        getDiscussionsTopic(route.params.topic.id).then(
            (res) => setDiscussion([...discussion, ...res.data]),
            (err) => console.log(err)
        )

    }, [refreshFeeds])

    const newComment = () => {
        if (!commentText) {
            return;
        }

        author = commentAuthor ? commentAuthor : "Anônimo"  

        saveDiscussion(route.params.topic.id, commentText, author)
            .then(
                (res) => {
                    if (res.data.status == 'ok') {
                        setDiscussion([])
                        refreshFeeds ? setRefreshFeeds(false) : setRefreshFeeds(true)
                        setOpenCreateCommentScreen(false)
                    } 
                },
                (err) => console.log(err)
            )
    }

    const renderItem = ({item}) => (
        <View style={styles.discussionTopic}>
            <Text style={styles.topicText}>{item.text}</Text>
            <Text style={styles.topicAuthor}>{item.author}</Text>
        </View>
    );      
    
    const renderListHeaderComponent = () => (
        <View style={styles.titleContainer}>
                <Text style={styles.title}>{route.params.topic.title} </Text>
                <Text>{route.params.topic.description}</Text>
                <Text style={styles.topicAuthor}>{route.params.topic.author}</Text>
        </View>
    )

    const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <FlatList
                ListHeaderComponent={renderListHeaderComponent}
                showsVerticalScrollIndicator={false}
                data={discussion}
                renderItem={renderItem}
                style={styles.list}
            >
            </FlatList>
            {openCreateCommentScreen && showCreateCommentScreen()}
        </View>
    )
}