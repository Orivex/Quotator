import { Colors } from "./Colors"

export const quoteBoxStyle = {
    quoteContainer: {
        width: '100%',
        minHeight: 100,
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    quoteText: {
        color: Colors.appBlue.text,
        fontSize: 25,
        fontFamily: 'quoteFont',
        textAlign: 'left',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    authorText: {
        color: Colors.appBlue.text,
        fontSize: 20,
        fontFamily: 'baseFont',
        textAlign: 'right',
        width: '85%',
        paddingRight: 20,
        paddingTop: 30,
        alignSelf: 'flex-end',
       // backgroundColor: 'white'
    }
}