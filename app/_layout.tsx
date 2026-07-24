import { AuthProvider } from "@/contexts/auth-context";
import { LessonProvider } from "@/contexts/lesson-context";
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
        <Stack.Screen
          name="lesson-details"
          options={{
            headerShown: true,
            title: "Lesson details",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
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
          <LessonProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <RootNavigator />
              <StatusBar style="auto" />
            </ThemeProvider>
          </LessonProvider>
        </AuthProvider>
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}
