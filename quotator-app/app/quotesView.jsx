import React, { useEffect } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from 'expo-sqlite'
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { quoteBoxStyle } from "@/constants/quoteBoxStyle";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

const QuotesView = () => {
    const navigation = useNavigation();
    const {criteria, data} = useRoute().params;

    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        }
        catch (error){
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    loadQuotes();
        
    if(isLoading) {
        return ( <ActivityIndicator size='large' color='#0000f'/> ) ;
    }

    const editQuote = ({id}) => {
        navigation.navigate('quoteForm', {id});
    }

    const deleteQuote = async (id) => {
        await db.runAsync(`DELETE FROM quotes WHERE id = '${id}'`);
    }

    const deleteQuoteAsk = ({id}) => {
        Alert.alert('Quote deletion', 'Are you sure that you want to delete that quote?', [
            {
                text: 'No',
                style: 'cancel'
            },
            {
                text: 'Yes',
                onPress: () => {deleteQuote(id)}
            }
        ])
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={quotes}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.contentContainer}
                renderItem={({item}) => (
                    <View style={styles.quoteContainer}>
                        <View style={styles.changeContainer}>
                            <Pressable>
                                <Entypo name="eye-with-line" size={35} color="black"  style={styles.icon}/>
                            </Pressable>

                            <Pressable onPress={() => {editQuote({id: item.id})}}>
                                <MaterialIcons name="edit" size={35} color="black"  style={styles.icon}/>
                            </Pressable>

                            <Pressable onPress={() => {deleteQuoteAsk({id: item.id})}}>
                                <MaterialIcons name="delete" size={35} color="black" style={styles.icon} />
                            </Pressable>

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
    icon: {
        color: Colors.appGray.base
    }

})