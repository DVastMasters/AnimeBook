import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 2,
        flexGrow:2,
        paddingTop: 20,
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 12
        
    },
    titleContainer: {
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 0
    },
    discussionTopic: {        
        backgroundColor: '#c8dddd',
        marginBottom: 15,
        padding: 15,
    },
    topicText: {
        color: '#201818',
        fontSize: 14,
    },
    topicAuthor: {
        color: '#ca5151',
        float: 'left',
        fontSize: 12
    },
    modal: {        
        paddingHorizontal: 6,
        margin: 6,
        marginTop: 20
    },
    modalButtons: {        
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
    },
    modalDescription: {
        borderRadius: 2,
        borderColor: '#fcbd75',
        borderWidth: 2
    }

})