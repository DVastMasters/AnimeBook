import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from "./styles";

const TopicCard = ({topic, navigation}) => {
    const openDiscussion = () => {
        navigation.navigate('Discussion', {topicId: topic.id});
    }

    return (
        <TouchableOpacity
            activeOpacity={1} 
            style={styles.container}
            onPress={openDiscussion}
        >
            <Text style={styles.text}>{topic?.title}</Text>
        </TouchableOpacity>
    );
};

export const MemoizedTopicCard = React.memo(TopicCard);