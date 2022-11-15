import React, {useCallback, useEffect, useState} from "react";
import { Button, FlatList, Modal, Text, TextInput, useColorScheme, View } from "react-native";
import {MemoizedAnimeCard} from "../../components/AnimeCard";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import { getAnimes, saveSuggestion, searchAnimesByName } from "../../api";

const CARDS_PER_PAGE = 6;

export const FeedScreen = ({ navigation }) => {
    const [animeCards, setAnimeCards] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const [searchInput, setSearchInput] = useState();   
    const [refreshFeeds, setRefreshFeeds] = useState(false)    

    const [animeName, setAnimeName] = useState();
    const [animeInfo, setAnimeInfo] = useState();

    const [openModalCreateAnime, setOpenModalCreateAnime] = useState();

    const showModalCreateAnime = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
            >
                <View 
                    style={styles.modal}>
                    <Text>Título do anime:</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={2}
                        maxLength={256}
                        style={styles.modalTitle}
                        onChangeText={setAnimeName}

                        editable={true}

                        placeholder={"Digite o título do anime..."}
                    />
                    <Text>Indique como achar mais informações sobre esse anime:</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        maxLength={256}
                        style={styles.modalDescription}
                        onChangeText={setAnimeInfo}

                        placeholder={"Escreva sobre o anime..."}

                        editable={true}

                    />
                    <View style={styles.modalButtons}>
                        <Button
                            title="Cancelar" 
                            onPress={() => {setOpenModalCreateAnime(false)}}
                            style={styles.buttonStyle}
                        />
                        <Button
                            title="Pronto"
                            onPress={newAnime}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    const newAnime = () => {
        if (!animeName) return;
        
        const alertSuccess = () => {
            setOpenModalCreateAnime(false)
            alert("Obrigado! Analisaremos a sua sugestão.")
        }
        
        const alertError = () => {
            alert("Ops! Não foi possível registrar a sua sugestão.")
        }

        saveSuggestion(animeName, animeInfo)
            .then(
                (res) => res.data.status == "ok" ? alertSuccess() : alertError(),
                (err) => console.log(err)
            );        
    }

    useEffect(() => {
        navigation.setOptions({
            title: "Animes",
            headerStyle: styles.header,
            headerRight: () => (
                <View style={styles.containerCenter}>
                    <View style={styles.containerCenter}>
                        <TextInput 
                            placeholder="Procure um anime..."
                            onChangeText={setSearchInput}
                        />
                        <Icon 
                            size={20} 
                            name="search1"
                            onPress={flushFeed}/>                        
                    </View>
                    <View style={styles.addNewAnime}>
                        <Icon 
                            size={20} 
                            name="pluscircle"
                            onPress={() => {setOpenModalCreateAnime(true)}} 
                            style={styles.addNewAnime}
                        />
                    </View>
                </View>
            )
        })

        if(!searchInput){
            getAnimes(page, CARDS_PER_PAGE)
                .then(
                    (res) => setAnimeCards([...animeCards, ...res.data]),
                    (err) => console.log(err)
                );        
            
        } else {
            searchAnimesByName(searchInput.toLowerCase(), page, CARDS_PER_PAGE)
                .then(                   
                    (res) => setAnimeCards([...animeCards, ...res.data]),
                    (err) => console.log(err)
                );
        }
        
        setRefreshing(false);

    }, [refreshFeeds, page])

    const flushFeed = () => {
        setRefreshing(true)
        setAnimeCards([])
        setPage(1)        
        refreshFeeds ? setRefreshFeeds(false) : setRefreshFeeds(true)
    }

    const renderItem = ({ item }) => {
        return <MemoizedAnimeCard anime={item} navigation={navigation}/>
    }

    const keyExtractor = (item) => (
        String(item.id)   
    )

    const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <FlatList
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                data={animeCards}
                numColumns={2}
                onEndReached={() => setPage(page + 1)}
                onEndReachedThreshold={0.2}
                onRefresh={flushFeed}
                refreshing={refreshing}
                renderItem={renderItem}
                style={styles.list}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={30}
                removeClippedSubviews={false}
            />
            {openModalCreateAnime && showModalCreateAnime()}
        </View>
    )
}