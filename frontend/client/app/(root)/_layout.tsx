import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="payment-detail"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="chat-detail"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default Layout;
