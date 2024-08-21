import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, GestureResponderEvent } from 'react-native';
import { AccessibilityState } from 'react-native';
import Colors from '~/constants/Colors';
import Icon from '~/components/Icon';

interface TabButtonProps {
    item: {
        type: React.ElementType;
        icon: string;
        label: string;
    };
    onPress?: (event: GestureResponderEvent) => void;
    accessibilityState?: AccessibilityState;  // Make this optional
}

export default function TabButton({ item, onPress, accessibilityState }: TabButtonProps) {
    const focused = accessibilityState?.selected;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, focused && {
                borderTopColor: Colors.primary,
                borderTopWidth: 1,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
            }]}
        >
            <View style={[styles.btn]}>
                <Icon type={item.type} name={`${item.icon}`} color={focused ? Colors.primary : Colors.blackJet} size={28} />
                <Text style={[styles.label, { color: focused ? Colors.primary : Colors.blackJet }]}>
                    {item.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    btn: {
        alignItems: 'center',
    },
    icon: {
    },
    label: {
        fontSize: 12
    }
});
