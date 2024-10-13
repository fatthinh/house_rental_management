import { useAppSelector } from "@/hooks/redux";
import { Redirect } from "expo-router";

const Page = () => {
    const user = useAppSelector((state) => state.auth.user)

    // if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;
    if (user) return <Redirect href="/(root)/(tabs)/" />

    return <Redirect href="/(auth)/welcome" />;
};

export default Page;
