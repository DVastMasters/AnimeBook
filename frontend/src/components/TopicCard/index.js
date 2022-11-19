import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from "./styles";

const TopicCard = ({topic, navigation}) => {
    const openDiscussion = () => {
        navigation.navigate('Discussion', {topic: topic});
    }

    return (
        <TouchableOpacity
            activeOpacity={1} 
            style={styles.container}
            onPress={openDiscussion}
        >
            <Text style={styles.text}>{topic?.title}</Text>
            <Text>{topic?.description?.substring(0, 150)}...</Text>
            <Text style={styles.author}>{topic?.author}</Text>
        </TouchableOpacity>
    );
};

export const MemoizedTopicCard = React.memo(TopicCard);