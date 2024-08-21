import { useState } from "react";
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import SearchBox from "~/components/SearchBox";
import Colors from "~/constants/Colors";
import Icon, { Icons } from '~/components/Icon';
import { router } from "expo-router";
import { Link, useNavigation } from "@react-navigation/native";
import NewsFeed from './newsfeed';


export default function Home() {
    return <ScrollView style={styles.container}>
        <ImageBackground
            source={{ uri: 'https://res.cloudinary.com/dzjhqjxqj/image/upload/v1719213519/h3pgfbukdsa4amasqzdv.jpg' }}
            resizeMode="cover"
            style={styles.thumbnail}
            imageStyle={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
        >
            <View style={styles.thumbnailHeader}>
                <SearchBox value="" onChangeValue={() => { }} parentStyles={styles.searchBox} onPress={() => { router.push('/userList') }} />
                <TouchableOpacity style={styles.notificationBtn}>
                    <Text style={styles.notificationBadge}>2</Text>
                    <Icon type={Icons.Octicons} name="bell" size={18} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.greeting}>
                <Text style={styles.greetingText}>Chào Thịnh</Text>
                <TouchableOpacity style={styles.greetingMore}>
                    <Text style={styles.greetingMoreText}>
                        Xem thêm
                        <Icon type={Icons.Feather} name="chevron-down" size={14} />
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
        <View style={styles.actions}>
            <Link to={'/receiptList'} >
                <View style={[styles.actionsBtn, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <Text>Thanh toán hóa đơn</Text>
                    <Icon type={Icons.Feather} name="chevron-right" size={18} />
                </View>
            </Link>
            <Link to={"/settings"} >
                <View style={[styles.actionsBtn, { flex: 0.8 }]}>
                    <Text>
                        Cài đặt thanh toán
                    </Text>
                </View>
            </Link>
        </View>

        <View style={styles.services}>
            <Text style={styles.servicesTitle}>Dịch vụ:</Text>
            <View style={styles.serviceCard}>
                <Image src="https://rjkool.com/wp-content/uploads/2021/09/laundry-services.jpg" style={styles.cardImage} resizeMode="cover" borderRadius={12} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardName}>Giặt sấy</Text>
                    <View style={styles.cardBottom}>
                        <Text style={styles.cardPrice}>10.000VNĐ/Kg</Text>
                        <TouchableOpacity style={styles.cardBtn}>
                            <Text style={{ color: Colors.white }}>Chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cardShadow}></View>
            </View>
            <View style={styles.serviceCard}>
                <Image src="https://res.cloudinary.com/dzjhqjxqj/image/upload/v1721886048/undraw_Fingerprint_re_uf3f_ohiwn7.png" style={styles.cardImage} resizeMode="cover" borderRadius={12} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardName}>Gửi xe</Text>
                    <View style={styles.cardBottom}>
                        <Text style={styles.cardPrice}>Từ 5.000VNĐ</Text>
                        <TouchableOpacity style={styles.cardBtn}>
                            <Text style={{ color: Colors.white }}>Chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cardShadow}></View>
            </View>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
    },
    thumbnail: {
        height: 220,
        justifyContent: 'space-between'
    },
    thumbnailHeader: {
        marginTop: 40,
        marginHorizontal: 14,
        flexDirection: "row",
    },
    searchBox: {
        backgroundColor: Colors.blackAlpha,
        flex: 1,
        marginRight: 12
    },
    notificationBtn: {
        flex: 0.15,
        backgroundColor: Colors.blackAlpha,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        position: 'relative',
    },
    notificationBadge: {
        backgroundColor: Colors.red,
        paddingHorizontal: 6,
        borderRadius: 50,
        position: 'absolute',
        top: -6,
        right: -2,
        color: Colors.white,
        fontWeight: '800',
    },
    greeting: {
        flex: 0.6,
    },
    greetingText: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 18,
        marginLeft: 20,
        textShadowColor: Colors.white,
        textShadowOffset: {
            width: 2,
            height: 2,
        },
        textShadowRadius: 22,
    },
    greetingMore: {
        margin: 'auto'
    },
    greetingMoreText: {
        color: Colors.white
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginVertical: 8,
        gap: 12
    },
    actionsBtn: {
        backgroundColor: "#EEEEEE",
        opacity: 0.8,
        borderColor: '#C4C0C0',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        color: Colors.black,
        borderRadius: 6,
    },
    services: {
        borderTopColor: Colors.primary,
        borderTopWidth: 1,
        borderTopLeftRadius: 62,
    },

    servicesTitle: {
        marginLeft: 8,
        fontSize: 18,
        fontStyle: "italic"
    },
    serviceCard: {
        position: 'relative',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    cardImage: {
        height: 238,
    },
    cardShadow: {
        position: 'absolute',
        top: 8,
        left: 12,
        width: '100%',
        height: '100%',
        backgroundColor: Colors.greenAlpha,
        borderRadius: 12
    },
    cardContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
    },
    cardName: {
        color: Colors.white,
        fontWeight: "700",
        fontSize: 24,
        fontStyle: 'italic',
        paddingHorizontal: 24
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 14,
        marginBottom: 24,
    },
    cardPrice: {
        color: Colors.white,
        fontSize: 14,
    },
    cardBtn: {
        padding: 12,
        borderRadius: 8,
        borderColor: Colors.primary,
        borderWidth: 1,
    }
})