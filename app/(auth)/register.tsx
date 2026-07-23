import FormInput from "@/components/ui/formInput";
import Header from "@/components/ui/Header";
import PrimaryButton from "@/components/ui/primary-button";
import { registerSchema, type RegisterData } from "@/schemas/auth-schemas";
import { getYupErrors } from "@/utils/get-yup-errors";

import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValidationError } from "yup";

type AccountRole = "STUDENT" | "INSTRUCTOR";
type RegisterErrors = Partial<Record<keyof RegisterData, string>>;

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<AccountRole>("STUDENT");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [erros, setErros] = useState<RegisterErrors>({});
  const [terms, setTerms] = useState<boolean>(false);

  async function handleRegister() {
    try {
      const data = await registerSchema.validate(
        {
          role,
          fullName,
          email,
          password,
          passwordConfirmation,
          terms,
        },
        { abortEarly: false },
      );
      setErros({});
      console.log("Valid registration", data);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErros(getYupErrors<keyof RegisterErrors>(error));
        return;
      }
      throw error;
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header
            title="Create account"
            description="Choose your account type to get started."
          />

          <Text className="mt-1 text-sm font-medium text-slate-700">
            Account type
          </Text>

          <View className="mt-1 flex-row rounded-xl bg-slate-100 p-1">
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: role === "STUDENT" }}
              className={`flex-1 rounded-lg py-3 ${
                role === "STUDENT" ? "bg-brand-500" : "bg-transparent"
              }`}
              onPress={() => setRole("STUDENT")}
            >
              <Text
                className={`text-center font-semibold ${
                  role === "STUDENT" ? "text-white" : "text-slate-600"
                }`}
              >
                Student
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: role === "INSTRUCTOR" }}
              className={`flex-1 rounded-lg py-3 ${
                role === "INSTRUCTOR" ? "bg-brand-500" : "bg-transparent"
              }`}
              onPress={() => setRole("INSTRUCTOR")}
            >
              <Text
                className={`text-center font-semibold ${
                  role === "INSTRUCTOR" ? "text-white" : "text-slate-600"
                }`}
              >
                Instructor
              </Text>
            </Pressable>
          </View>

          <View className="mt-6 gap-4">
            <FormInput
              label="Full name"
              placeholder="Enter your full name"
              autoCapitalize="words"
              autoComplete="name"
              value={fullName}
              onChangeText={setFullName}
              error={erros.fullName}
            />

            <FormInput
              label="Email"
              placeholder="your@email.com"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              error={erros.email}
            />

            <FormInput
              label="Password"
              placeholder="Create a password"
              autoCapitalize="none"
              autoComplete="new-password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={erros.password}
            />

            <FormInput
              label="Confirm password"
              placeholder="Enter your password again"
              autoCapitalize="none"
              autoComplete="new-password"
              secureTextEntry
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              error={erros.passwordConfirmation}
            />
            <View className="ml-1 ">
              <View className="flex-row gap-2">
                <Checkbox
                  value={terms}
                  onValueChange={setTerms}
                  style={{
                    borderColor: !terms && erros.terms ? "#EF4444" : "#657786",
                  }}
                />
                <Text className="text-sm text-slate-600">
                  I agree to the Terms of Use and Privacy Policy.
                </Text>
              </View>
              {!terms && erros.terms ? (
                <Text className="text-sm text-red-500">{erros.terms}</Text>
              ) : null}
            </View>
            <PrimaryButton title="Create account" onPress={handleRegister} />
            <View className="flex-row justify-center gap-2">
              <Text className="text-slate-500">Already have an account?</Text>
              <Pressable onPress={() => router.replace("/(auth)/login")}>
                <Text className="font-semibold text-brand-500">Sign in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
