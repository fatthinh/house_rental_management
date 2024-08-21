import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightBase, TouchableWithoutFeedback, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon, { Icons } from "~/components/Icon";
import SearchBox from "~/components/SearchBox";
import Colors from "~/constants/Colors";
import { Link, router } from 'expo-router';

export default function UserList() {
    const [searchValue, setSearchValue] = useState('')

    return <View style={styles.container}>
        <View style={styles.header}>
            <SearchBox value={searchValue} onChangeValue={(value) => setSearchValue(value)} parentStyles={styles.searchBox} />
            <TouchableOpacity style={styles.exitBtn} onPress={() => {
                router.back()
            }}>
                <Text style={{ color: Colors.primary }}>Thoát</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.content}>
            <TouchableOpacity style={styles.resultItem}>
                <Image src="https://res.cloudinary.com/dzjhqjxqj/image/upload/v1704532184/default-avatar-icon-of-social-media-user-vector_yefjz5.jpg" style={styles.resultAvt} />
                <Text style={styles.resultName}>Phat Thinh</Text>
                <Icon name="message" type={Icons.MaterialIcons} color={Colors.primary} style={styles.resultAction} />
            </TouchableOpacity>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        marginTop: 42,
        marginHorizontal: 14,
        flexDirection: "row",
        paddingBottom: 8,

    },
    searchBox: {
        backgroundColor: Colors.blackAlpha,
        flex: 1,
        marginRight: 12
    },
    exitBtn: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: Colors.primary,
        borderWidth: 2,
        paddingHorizontal: 6
    },
    content: {
        borderTopWidth: 2,
        borderTopColor: Colors.primary,
        borderTopLeftRadius: 88,
        paddingTop: 6
    },
    resultItem: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.whiteAlpha,
        margin: 8,
        padding: 6,
        borderRadius: 8,
        justifyContent: 'center',
    },
    resultAvt: {
        width: 46,
        height: 46,
        borderRadius: 46,
    },
    resultName: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 22,
        marginRight: 'auto',
        lineHeight: 38
    },
    resultAction: {
        color: Colors.primary,
        borderRadius: 18,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: Colors.greenAlpha,
        lineHeight: 42
    },
})