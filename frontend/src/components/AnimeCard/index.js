import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import { getAnimePosterURL } from "../../api";

const AnimeCard = ({anime, navigation}) => {
    const openTopics = () => {
        navigation.navigate('Topics', {animeId: anime.id});
    }
    
    return (
        <TouchableOpacity 
            activeOpacity={1} 
            style={styles.container}
            onPress={openTopics}
        >
            <Image
                source={getAnimePosterURL(anime?.image_path)}
                resizeMode={'cover'}
                style={styles.image}
            />
            <LinearGradient
                colors={['#0000', '#000A', '#000']}
                style={styles.titleContainer}>
                <Text style={styles.text}>{anime?.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export const MemoizedAnimeCard = React.memo(AnimeCard);