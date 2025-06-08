import { ActivityIndicator, Alert, StyleSheet, Modal} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from 'expo-sqlite'
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { quoteBoxStyle } from "@/constants/quoteBoxStyle";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AnimatedButton from "./helper/AnimatedButton";

const QuotesView = () => {
    const navigation = useNavigation();
    const {criteria, data} = useRoute().params;

    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [neverShowMap, setNeverShowMap] = useState({});

    const [messageVisible, setMessageVisible] = useState(false);

    const db = SQLite.useSQLiteContext();

    const loadQuotes = async () => {
        try {
            let results = [];

            switch(criteria) {
                case 'byNothing':
                    results = await db.getAllAsync(`SELECT * FROM quotes`);
                    break;
                case 'byAuthor':
                    results = await db.getAllAsync(`SELECT * FROM quotes WHERE author == '${data}'`);
                    break;
                case 'byCategory':
                    results = await db.getAllAsync(`SELECT * FROM quotes WHERE category == '${data}'`);
                    break;
            }      
                         
            setQuotes(results);

            const map = {};
            results.forEach(q => {
                map[q.id] = q.neverShow;
            });

            setNeverShowMap(map);
        }
        catch (error){
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
      React.useCallback(() => {
        loadQuotes();
      }, [])
    );
        
    if(isLoading) {
        return ( <ActivityIndicator size='large' color='#0000f'/> ) ;
    }

    const editQuote = (id) => {
        navigation.navigate('quoteForm', {id});
    }

    const deleteQuote = async (id) => {
        await db.runAsync(`DELETE FROM quotes WHERE id = '${id}'`);
        loadQuotes();
    }

    const deleteQuoteAsk = (id) => {
        Alert.alert('Quote deletion', 'Are you sure that you want to delete that quote?', [
            {
                text: 'No',
                style: 'cancel'
            },
            {
                text: 'Yes',
                onPress: () => {deleteQuote(id);}
            }
        ])
    }

    const toggleNeverShow = async (id, isNeverShown) => {
        const newIsNeverShown = isNeverShown == 1 ? 0: 1;

        await db.runAsync(`UPDATE quotes SET neverShow=${newIsNeverShown} WHERE id='${id}'`)

        setNeverShowMap(prevMap => ({
            ...prevMap,
            [id]: newIsNeverShown
        }))
    }

    const neverShowAsk = (id) => {
        
        const isNeverShown = neverShowMap[id];

        if(isNeverShown == false) {
            Alert.alert('Never show on home screen?', 'If you click Yes then this quote will never be shown on the home screen', [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {toggleNeverShow(id, isNeverShown)}
                }
            ])
        }
        else {
            toggleNeverShow(id, isNeverShown);
        }
    }

    return(
        <SafeAreaView style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={messageVisible}
                onRequestClose={setMessageVisible(!messageVisible)}
                >
                    <View style={styles.modal}>
                        <Text> Yo whats up! This will be a generalized component! </Text>
                            <AnimatedButton
                            label="Close"
                            labelFontSize={20}
                            onPress={()=>{setMessageVisible(!messageVisible)}}
                            />
                    </View>
            </Modal>

            <FlatList
                data={quotes}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.contentContainer}
                renderItem={({item}) => (
                    <View style={styles.quoteContainer}>
                        <View style={styles.changeContainer}>

                            <AnimatedButton
                                useIcon={true}
                                icon={<Entypo name="eye-with-line" size={35} color={neverShowMap[item.id] == 1? 'red': Colors.appGray.base}/>}
                                onPress={()=>{neverShowAsk(item.id)}}
                            />
                            
                            <AnimatedButton
                                useIcon={true}
                                icon={<MaterialIcons name="edit" size={35} color={Colors.appGray.base}/>}
                                onPress={()=>{editQuote(item.id)}}
                            />

                            <AnimatedButton
                                useIcon={true}
                                icon={<MaterialIcons name="delete" size={35} color={Colors.appGray.base} />}
                                onPress={()=>{deleteQuoteAsk(item.id)}}
                            />

                        </View>

                        <Text style={styles.quoteText}>{item.quote}</Text>
                        <Text style={styles.authorText}>- {item.author}</Text>
                    </View>
                )}
            >

            </FlatList>
        </SafeAreaView>
    )
}

export default QuotesView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appBlue.background
    },
    contentContainer: {
        paddingVertical: 60,
    },
    quoteContainer: {
      ...quoteBoxStyle.quoteContainer,
      marginVertical: 20,
    },
    quoteText: {
      ...quoteBoxStyle.quoteText
    },
    authorText: {
      ...quoteBoxStyle.authorText
    },
    changeContainer: {
        width: '100%',
        height: 35,
        backgroundColor: Colors.appGray.base025,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 10
    },
    modal: {
        backgroundColor: 'white'
    }

})