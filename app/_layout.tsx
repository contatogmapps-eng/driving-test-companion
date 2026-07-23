import { AuthProvider } from "@/contexts/auth-context";
import { OnboardingProvider } from "@/contexts/onboarding-context";
import { useAuth } from "@/hooks/use-auth";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView className={"flex-1"}>
      <OnboardingProvider>
        <AuthProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <RootNavigator />
            <StatusBar style="auto" />
          </ThemeProvider>
        </AuthProvider>
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}
