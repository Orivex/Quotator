import { StyleSheet, SafeAreaView, FlatList, View, Text, Pressable, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontFamilies } from "@/constants/FontFamilies";
import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from "@react-navigation/native";

const Authors = () => {

    const navigation = useNavigation();

    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const db = SQLite.useSQLiteContext()
    
    const loadAuthors = async () => {
        try {
            const results = await db.getAllAsync(`SELECT DISTINCT author FROM quotes`);
            setAuthors(results.map(row => row.author));
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => { // Runs only once at mount
        loadAuthors();
    }, [])
    
    
    if(isLoading) {
        return ( <ActivityIndicator size='large' color='#0000f'/> ) ;
    }
    
    const seperatorComponent = () => <View style={styles.seperator} />
    
    return (
        
        <SafeAreaView style={styles.container}>
            <FlatList
            data={authors} 
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperatorComponent}
            contentContainerStyle={styles.contentContainer}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => {navigation.navigate('quotesView', {criteria: 'byAuthor', data: item});
                    }}
                    >
                    <Text style={styles.buttonText}>{item}</Text>
                </Pressable>
                </View>
            )}
            ListEmptyComponent={<Text style={{alignSelf: 'center'}}>No authors found</Text>}
            />
        </SafeAreaView>
    )
}
export default Authors;

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
        height: 60,
        width: 200,
        borderRadius: 50,
        backgroundColor: Colors.appGray.buttonBackground,
        justifyContent: "center"
    },
    buttonText: {
        color: Colors.appBlue.text,
        fontFamily: FontFamilies.baseFont,
        paddingHorizontal: 20,
        textAlign: "center",
        fontSize: 15
    }
    
})