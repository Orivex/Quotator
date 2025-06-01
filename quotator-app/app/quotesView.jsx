import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, Text, FlatList, View } from "react-native";
import * as SQLite from 'expo-sqlite'
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { quoteBoxStyle } from "@/constants/quoteBoxStyle";

const QuotesView = ({route}) => {
    const navigation = useNavigation();
    const {criteria, data} = useRoute().params;

    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const db = SQLite.useSQLiteContext();

    const loadQuotes = async () => {
        try {
            const results = criteria == 'byAuthor' ?
                         await db.getAllAsync(`SELECT quote FROM quotes WHERE author == '${data}'`):
                         await db.getAllAsync(`SELECT quote FROM quotes WHERE category == '${data}'`);
            setQuotes(results.map(row => row.quote));
        }
        catch (error){
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadQuotes();
    }, [])
        
    if(isLoading) {
        return ( <ActivityIndicator size='large' color='#0000f'/> ) ;
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={quotes}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.contentContainer}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>{item}</Text>
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
        paddingVertical: 60
    },
    itemContainer: {
        width: '100%',
        marginBottom: 30,
    },
    text: {
        ...quoteBoxStyle
    }

})