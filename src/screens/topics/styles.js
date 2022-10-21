import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 2,
        flexGrow:2,
        paddingTop: 20
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8
    },
    modal: {       
        paddingHorizontal: 6,
        margin: 6,
        marginTop: 20, 
    },
    modalButtons: {        
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
    },
    modalTitle: {     
        borderRadius: 2,
        borderColor: '#fcbd75',
        borderWidth: 2
    },
    modalDescription: {
        backgroundColor: '#ffff',  
        color: '#ffffff',
        borderRadius: 2,
        borderColor: '#fcbd75',
        borderWidth: 2
    }
})