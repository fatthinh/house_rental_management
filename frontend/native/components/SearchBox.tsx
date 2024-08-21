import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ViewProps } from "react-native";
import Colors from "~/constants/Colors";
import Icon, { Icons } from './Icon';

interface Props extends ViewProps {
    value: string;
    onChangeValue: (text: string) => void;
    parentStyles?: ViewProps["style"];
    onPress?: () => void
}

export default function SearchBox({ value, onChangeValue, parentStyles, onPress }: Props) {
    const [focused, setFocused] = useState(false)

    const Comp = (onPress ? TouchableOpacity : View) as React.ElementType;

    return <Comp style={[styles.container, focused && { borderColor: Colors.primary }, parentStyles]} onPress={onPress}>
        <Icon name='search-outline' type={Icons.Ionicons} color={Colors.white} style={styles.searchIcon} />

        <TextInput
            placeholder="Tìm kiếm..."
            value={value}
            onChangeText={(text) => onChangeValue(text)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={styles.input}
            placeholderTextColor={Colors.white}
            readOnly={onPress ? true : false}
        />
    </Comp>
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        borderWidth: 2,
        borderColor: Colors.gray,
        borderRadius: 8,
        flexDirection: 'row'
    },
    searchIcon: {
        padding: 2,
        marginRight: 4,

    },
    input: {
        flex: 1,
        color: Colors.white,
    }
})