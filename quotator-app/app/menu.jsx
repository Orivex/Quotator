import { Colors } from "@/constants/Colors"
import { useNavigation } from "@react-navigation/native"
import { Pressable, StyleSheet } from "react-native"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Menu = () => {

    const navigation = useNavigation()

    const menu1 = [
        { label: 'All quotes', action: () => {navigation.navigate('quotesView', {criteria: 'byNothing'})}}, // TODO
        { label: 'Authors', action: () => {navigation.navigate('filterView', {filter: 'authors'})}},
        { label: 'Categories', action: () => {navigation.navigate('filterView', {filter: 'categories'})}}
    ]

    const menu2 = [
        { label: 'About', action: () => {navigation.navigate("about")}}
    ]

    const renderMenuItem = ({label, action}) => {
        return(
            <Pressable key={label} onPress={action} style={styles.itemContainer}>
                <Text style={styles.text}>{label}</Text>
            </Pressable>
        )

    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.menuContainer}>
                {menu1.map(renderMenuItem)}
            </View>

            <View style={styles.menuContainer}>
                {menu2.map(renderMenuItem)}
            </View>
        </SafeAreaView>
    )
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appBlue.background,
        alignItems: 'center'
    },
    menuContainer: {
        width: '80%',
        backgroundColor: Colors.appGray.base05,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 30
    },
    itemContainer: {
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
        height: 30
    },
    text: {
        color: Colors.appBlue.text,
        fontFamily: 'baseFont',
        fontSize: 20
    }
})