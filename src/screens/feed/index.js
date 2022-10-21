import React, {useCallback, useEffect, useState} from "react";
import { Button, FlatList, Modal, Text, TextInput, useColorScheme, View } from "react-native";
import {MemoizedAnimeCard} from "../../components/AnimeCard";
import bancoEstatico from "../../assets/feeds.json"
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";

const CARDS_POR_PAGINA = 6;

export const FeedScreen = ({ navigation }) => {
    const [animeCards, setAnimeCards] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const [searchInput, setSearchInput] = useState();   

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
        // TO DO

        setOpenModalCreateAnime(false)
        alert("Obrigado! Analisaremos a sua sugestão.")
    }

    useEffect(() => {
        loadPage();
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
                            onPress={searchAnimes} />                        
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
    }, [searchInput])

    const loadPage = () => {

        if (searchInput) {
            return;
        }

        setAnimeCards(bancoEstatico.feeds.filter((card) => 
            card.id <= page * CARDS_POR_PAGINA
        ));     

        setPage(page + 1);   

        setRefreshing(false);
    }

    searchAnimes = () => {
        if (!searchInput) {
            return;
        }

        setAnimeCards(bancoEstatico.feeds.filter((feed) => 
            feed.canonicalTitle.toLowerCase().includes(
                searchInput.toLowerCase()
            )
        ))
    }

    const reset = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        loadPage();        
    }, []);

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
                onEndReached={loadPage}
                onEndReachedThreshold={0.2}
                onRefresh={reset}
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