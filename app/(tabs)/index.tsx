import PrimaryButton from "@/components/ui/primary-button";
import { useAuth } from "@/hooks/use-auth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-1 justify-center">
        <Text className="text-center text-3xl font-bold text-slate-900">
          Welcome, {user?.name ?? "Driver"}
        </Text>
        {user ? (
          <>
            <Text className="mt-3 text-center text-slate-500">
              {user?.email}
            </Text>
            <Text className="mt-3 text-center text-slate-500">
              {user?.role}
            </Text>
          </>
        ) : null}
        <View className="mt-8">
          <PrimaryButton title="Sign out" onPress={handleSignOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}
