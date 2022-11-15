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
        height: 250,
        width: '50%',
        marginBottom: 4,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginHorizontal: 4,
        ...boxShadow,
    },
    imageContainer: {flex: 1},
    image: {
        flex: 1,
        borderRadius: 5,
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        height: 160,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        color: '#fff',
        paddingBottom: 24,
    },
});