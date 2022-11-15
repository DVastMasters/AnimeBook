import { Platform, StyleSheet } from "react-native";

const boxShadow = Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },                
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    android: {elevation: 6},
});

export default StyleSheet.create({
    container: {
        height: 175,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderColor: '#000',
        marginHorizontal: 10,
        padding: 4,
        marginVertical: 10,
        ...boxShadow,
    },
    text: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 24,
        color: '#000000',
        paddingBottom: 24,
    },
    author: {
        marginTop: 2,
        color: "red"
    }
});