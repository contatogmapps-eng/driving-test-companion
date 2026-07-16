import FormInput from "@/components/ui/formInput";
import PrimaryButton from "@/components/ui/primary-button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErrors] = useState<LoginErrors>({});

  function handleLogin() {
    const nextErros: LoginErrors = {};

    if (!email.trim()) {
      nextErros.email = "Email is required";
    } else if (!email.includes("@")) {
      nextErros.email = "Enter a valid email address";
    }

    if (!password) {
      nextErros.password = "Password is required";
    } else if (password.length < 8) {
      nextErros.password = "Password must contain at least 8 characters";
    }

    setErrors(nextErros);

    if (Object.keys(nextErros).length > 0) {
      return;
    }

    router.replace("/(tabs)");
  }

  return (
    <ImageBackground
      source={require("../assets/images/backgroudmain.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar style="light" />

      <View className="flex-1 bg-black/20">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
            <View className="px-4 p-2 bg-black/70 justify-center">
              <Pressable
                className="h-12 w-12 items-center justify-center"
                onPress={() => router.back()}
              >
                <AntDesign name="arrow-left" size={20} color="white" />
              </Pressable>

              <Text className="mt-6 text-3xl font-bold text-white">
                Welcome back!
              </Text>

              <Text className="mt-2 text-base text-slate-200">
                Sign in to continue your driving journey.
              </Text>
            </View>

            <View className="mt-auto w-full rounded-t-[32px] bg-white/90">
              <SafeAreaView edges={["bottom"]} className="px-10  p-55 ">
                <View className="gap-5 mt-8">
                  <FormInput
                    label="Email"
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                  />

                  <FormInput
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <Pressable className="mt-4 self-end">
                  <Text className="font-semibold text-brand-500">
                    Forgot your password?
                  </Text>
                </Pressable>

                <View className="mb-40">
                  <PrimaryButton title="Sign in" onPress={handleLogin} />
                </View>
              </SafeAreaView>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}
