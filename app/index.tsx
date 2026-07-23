import { useAuth } from "@/hooks/use-auth";
import useOnboarding from "@/hooks/use-onboarding";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const { hasCompletedOnboarding, isOnboardingLoading } = useOnboarding();
  if (isOnboardingLoading || isAuthLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#1677e8" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Redirect
      href={hasCompletedOnboarding ? "/(auth)/login" : "/(auth)/onboarding"}
    />
  );
}
