import { StyleSheet, FlatList, View, Text, Pressable, ActivityIndicator, Animated, useAnimatedValue } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedButton from './helper/AnimatedButton'

const FilterView = () => {

    const navigation = useNavigation();
    const {filter} = useRoute().params;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const db = SQLite.useSQLiteContext();

    const loadData = async () => {
        try {
            const results = filter == 'authors' ?
                                    await db.getAllAsync(`SELECT DISTINCT author FROM quotes`) :
                                    await db.getAllAsync(`SELECT DISTINCT category FROM quotes`)
            setData(results.map(row => filter == 'authors' ? row.author: row.category));
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    useFocusEffect(
        React.useCallback(()=> {
            loadData();
        }, [])
    );
    
    if(isLoading) {
        return ( <ActivityIndicator size='large' color='#0000f'/> ) ;
    }
    
    const seperatorComponent = () => <View style={styles.seperator} />
    
    return (
        
        <SafeAreaView style={styles.container}>
            <FlatList
            data={data} 
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperatorComponent}
            contentContainerStyle={styles.contentContainer}
            renderItem={({item}) => (
                
                <View style={styles.itemContainer}>
                    <AnimatedButton
                    label={item}
                    labelFontSize={25}
                    onPress={()=>{navigation.navigate('quotesView', {criteria: (filter == 'authors' ? 'byAuthor': 'byCategory'), data: item});}}
                    />
                </View>
            )}
            ListEmptyComponent={<Text style={{alignSelf: 'center'}}>No data found</Text>}
            />

        </SafeAreaView>
    )
}
export default FilterView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appBlue.background
    },
    contentContainer: {
        paddingTop: 15, 
        paddingBottom: 100,
    },
    itemContainer: {
        maxWidth: 300,
        marginHorizontal: 'auto',
        marginVertical: 30,
        alignItems: 'center'
    },
    seperator: {
        height: 1,
        backgroundColor: "rgba(0,0,0,0.1)",
        width: '50%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    button: {
        minHeight: 75,
        width: 250,
        borderRadius: 50,
        backgroundColor: Colors.appGray.base05,
        justifyContent: "center",
        alignItems: 'center',
        paddingVertical: 10,
    }
})