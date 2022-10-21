import React, {useCallback, useEffect, useState} from "react";
import { Button, FlatList, ImageEditor, Modal, Text, TextInput, useColorScheme, View } from "react-native";
import styles from "./styles";

const TOPICS_PER_PAGE = 3;

export const DiscussionScreen = ({ navigation, route }) => {
    const [discussion, setDiscussion] = useState([]);

    const [openCreateCommentScreen, setOpenCreateCommentScreen] = useState(false)

    const [commentText, setCommentText] = useState();

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
        setDiscussion(route.params.topic.discussion);  
        navigation.setOptions({
            headerRight: () => (
                <Button  color="#758880" title=" + " onPress={() => {setOpenCreateCommentScreen(true)}}/>
            ),
        })
    }, [])

    const newComment = () => {
        if (!commentText) {
            return;
        }

        const newComment = {
            "text": commentText,
            "author": 'fakeUser',
        }

        setDiscussion(discussion.concat(newComment));
        setOpenCreateCommentScreen(false)
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