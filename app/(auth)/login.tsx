import FormInput from "@/components/ui/formInput";
import PrimaryButton from "@/components/ui/primary-button";
import { loginSchema } from "@/schemas/auth-schemas";
import { getYupErrors } from "@/utils/get-yup-errors";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  SlideInDown,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValidationError } from "yup";

type LoginErrors = {
  email?: string;
  password?: string;
};

const titleEntering = FadeInUp.delay(200).duration(500);
const subtitleEntering = FadeInUp.delay(350).duration(500);
const loginCardEntering = SlideInDown.delay(100).duration(600);
const backgroundEntering = FadeIn.duration(800);

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErrors] = useState<LoginErrors>({});

  async function handleLogin() {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      console.log("Valid login", { email });
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(getYupErrors<keyof LoginErrors>(error));
        return;
      }
      throw error;
    }
  }

  return (
    <View className="flex-1 bg-brand-900">
      <Animated.Image
        entering={backgroundEntering}
        source={require("../../assets/images/backgroudmain.png")}
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "95%",
        }}
        resizeMode="cover"
      />
      <StatusBar style="light" />

      <View className="flex-1 bg-black/50">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
              <View className="px-4 p-2 justify-center">
                {/* <Pressable
                  className="h-12 w-12 items-center justify-center"
                  onPress={() => router.navigate("/(auth)/Onboarding")}
                >
                  <AntDesign name="arrow-left" size={20} color="white" />
                </Pressable> */}

                <Animated.Text
                  entering={titleEntering}
                  className="mt-6 text-3xl font-bold text-white"
                >
                  Welcome back!
                </Animated.Text>

                <Animated.Text
                  entering={subtitleEntering}
                  className="mt-2 text-base text-slate-200"
                >
                  Sign in to continue your driving journey.
                </Animated.Text>
              </View>

              <Animated.View
                entering={loginCardEntering}
                className=" mt-auto w-full rounded-t-[32px] bg-white/90"
              >
                <SafeAreaView edges={["bottom"]} className="px-6 pt-8 pb-8 ">
                  <View className="gap-5">
                    <FormInput
                      label="Email"
                      placeholder="your@email.com"
                      value={email}
                      onChangeText={setEmail}
                      error={erros.email}
                    />

                    <FormInput
                      label="Password"
                      placeholder="Enter your password"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      error={erros.password}
                    />
                  </View>

                  <Pressable
                    className="mt-4 self-end"
                    onPress={() => router.push("/(auth)/forgot-password")}
                  >
                    <Text className="font-semibold text-brand-500">
                      Forgot your password?
                    </Text>
                  </Pressable>

                  <View className="mt-8">
                    <PrimaryButton title="Sign in" onPress={handleLogin} />
                  </View>
                  <View className="mt-6 flex-row justify-center gap-2">
                    <Text className="text-slate-500">
                      Don&apos;t have account?
                    </Text>
                    <Pressable
                      onPress={() => router.navigate("/(auth)/register")}
                    >
                      <Text className="font-semibold text-brand-500">
                        Sign up
                      </Text>
                    </Pressable>
                  </View>
                </SafeAreaView>
              </Animated.View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
