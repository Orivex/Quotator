import { Colors } from "@/constants/Colors";
import { Alert, Pressable, StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite'
import { useNavigation, useRoute } from "@react-navigation/native";
import AnimatedButton from "./helper/AnimatedButton";
import { useSnackbar } from "./context/SnackbarContext";
import { useQuote } from "./context/QuoteContext";

const QuoteForm = () => {

    const { isHomeScreenQuote, reloadHomeScreenQuote, randomQuote, setRandomQuote } = useQuote();

    const navigation = useNavigation();
    const db = SQLite.useSQLiteContext();
    const {id} = useRoute().params;

    const { showMessage } = useSnackbar();
    
    const editMode = id != null;

    const [form, setForm] = useState({
        quote: '',
        author: '',
        category: ''
    });

    useEffect(() => {

        const loadFormContent = async () => {
            try {
                if(editMode) {
                    const results = await db.getAllAsync(`SELECT * FROM quotes WHERE id=${id}`);
                    setForm(results[0]);
                }
            }
            catch(error) {
                console.error('Failed loading form content:', error)
            }
        };

        loadFormContent();

    }, [editMode, id]);

    const handleSubmit = async () => {
        try {
            if(form.quote.length < 4 || !form.author) {
                throw new Error('A quote needs at least 4 characters! An author needs at least 1 character!');
            }

            const finalCategory = form.category.trim() || 'Uncategorized';

            if(editMode) {
                await db.runAsync(
                    `UPDATE quotes SET quote='${form.quote}', author='${form.author}', category='${form.category}'
                                WHERE id=${id}`
                );
                navigation.goBack();

                showMessage("Quote successfully changed!");

                if(isHomeScreenQuote(id)) {
                    const updatedResult = await db.getAllAsync(`SELECT id, quote, author FROM quotes WHERE id=${id}`);
                    setRandomQuote(updatedResult[0]);
                }
            }
            else {
                await db.runAsync(
                    'INSERT INTO quotes (quote, author, category, neverShow) VALUES (?, ?, ?, false)',
                    [form.quote, form.author, finalCategory]
                );

                showMessage("Quote successfully added!");
                setForm({
                   quote: '',
                   author: '',
                   category: ''
                })
            }
        
        }
        catch (error) {
            Alert.alert('Error', error.message || 'Unknown error when adding quote')
        }
    };

    return (

        <View style={styles.container}>
            <TextInput 
                multiline
                numberOfLines={10}
                maxLength={300}
                placeholder="Quote"
                placeholderTextColor={Colors.appBlue.text}
                value={form.quote}
                style={styles.textInput_quote}
                onChangeText={(text) => setForm({...form, quote: text})}
            />
            <TextInput 
                multiline
                numberOfLines={2}
                maxLength={70}
                placeholder="Author"
                placeholderTextColor={Colors.appBlue.text}
                value={form.author}
                style={styles.textInput_author}
                onChangeText={(text) => setForm({...form, author: text})}
            />
            <TextInput 
                multiline
                numberOfLines={10}
                maxLength={70}
                placeholder="Category (Optional)"
                placeholderTextColor={Colors.appBlue.text}
                value={form.category}
                style={styles.textInput_category}
                onChangeText={(text) => setForm({...form, category: text})}
            />

            <AnimatedButton
                useIcon={true}
                icon={<AntDesign name={editMode == true ? 'checkcircle': 'pluscircle'} size={50} color={Colors.appGray.base}/>}
                onPress={handleSubmit}
            />
        </View>

    );
}

export default QuoteForm;

const textInput_base = {
    width: '80%',
    minHeight: 100,
    borderWidth: 4,
    borderColor: Colors.appGray.base,
    color: Colors.appBlue.text,
    textAlignVertical: 'top',
    fontSize: 17,
    fontFamily: 'baseFont',
    borderRadius: 10,
    marginVertical: 12,
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.appBlue.background,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textInput_quote: {
        ...textInput_base
    },
    textInput_author: {
        ...textInput_base
    },
    textInput_category: {
        marginBottom: 20,
        ...textInput_base
    },
})