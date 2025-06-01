import { Colors } from "@/constants/Colors";
import { Alert, Pressable, StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import * as SQLite from 'expo-sqlite'
import { FontFamilies } from "@/constants/FontFamilies";

const Add = () => {

    // const [quote, setQuote] = useState('')
    // const [author, setAuthor] = useState('')
    // const [category, setCategory] = useState('')

    const [form, setForm] = useState({
        quote: '',
        author: '',
        category: ''
    });

    const db = SQLite.useSQLiteContext();

    const handleSubmit = async () => {
        try {
            if(!form.quote || !form.author) {
                throw new Error('Quote and author are required fields!')
            }
            else if(!form.category) {
                setForm({...form, category: 'Uncategorized'})
            }

            await db.runAsync(
                'INSERT INTO quotes (quote, author, category) VALUES (?, ?, ?)',
                [form.quote, form.author, form.category]
            );

            Alert.alert("Quote successfully added!");
            setForm({
               quote: '',
               author: '',
               category: ''
            })
        }
        catch (error) {
            console.error(error);
            Alert.alert('Error', error.message || 'Unknown error when adding quote')
        }
    };

    return (

        <View style={styles.container}>
            <TextInput 
                multiline
                numberOfLines={10}
                maxLength={520}
                placeholder="Quote"
                value={form.quote}
                style={styles.textInput_quote}
                onChangeText={(text) => setForm({...form, quote: text})}
            />
            <TextInput 
                multiline
                numberOfLines={2}
                maxLength={70}
                placeholder="Author"
                value={form.author}
                style={styles.textInput_author}
                onChangeText={(text) => setForm({...form, author: text})}
            />
            <TextInput 
                multiline
                numberOfLines={10}
                maxLength={30}
                placeholder="Category (Optional)"
                value={form.category}
                style={styles.textInput_category}
                onChangeText={(text) => setForm({...form, category: text})}
            />

            <Pressable

                onPressOut={ () =>
                    handleSubmit()
                }
            >
                <AntDesign name="pluscircle" size={50} color={Colors.appGray.background}/>
            </Pressable>
        </View>

    );
}

export default Add;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.appBlue.background,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textInput_quote: {
        height: 150,
        width: '75%',
        borderWidth: 4,
        borderColor: Colors.appGray.background,
        color: Colors.appBlue.text,
        textAlignVertical: 'top',
        marginTop: 50,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: FontFamilies.baseFont,
        borderRadius: 10
    },
    textInput_author: {
        height: 75,
        width: '75%',
        borderWidth: 4,
        borderColor: Colors.appGray.background,
        color: Colors.appBlue.text,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: FontFamilies.baseFont,
        borderRadius: 10
    },
    textInput_category: {
        height: 50,
        width: '75%',
        borderWidth: 4,
        borderColor: Colors.appGray.background,
        color: Colors.appBlue.text,
        marginBottom: 30,
        fontSize: 16,
        fontFamily: FontFamilies.baseFont,
        borderRadius: 10
    },
})