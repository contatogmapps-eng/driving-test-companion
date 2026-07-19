import FormInput from "@/components/ui/formInput";
import PrimaryButton from "@/components/ui/primary-button";
import AntDesign from "@expo/vector-icons/AntDesign";
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

type AccountRole = "STUDENT" | "INSTRUCTOR";
type RegisterErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  isConfirmed?: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<AccountRole>("STUDENT");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [erros, setErros] = useState<RegisterErrors>({});
  const [terms, setTerms] = useState<boolean>(false);

  function handleRegister() {
    const nextError: RegisterErrors = {};
    if (!fullName.trim()) {
      nextError.fullName = "Full name is required";
    }
    if (!email.trim()) {
      nextError.email = "Email is required";
    } else if (!email.includes("@")) {
      nextError.email = "Enter a valid email";
    }

    if (!password) {
      nextError.password = "Password is required";
    } else if (password.length < 8) {
      nextError.password = "Password must contain at least 8 characters";
    }

    if (!passwordConfirmation) {
      nextError.passwordConfirmation = "Please confirm your password";
    } else if (password !== passwordConfirmation) {
      nextError.passwordConfirmation = "Passwords do not match";
    }

    if (terms === false) {
      nextError.isConfirmed = "You must accept the terms";
    }

    setErros(nextError);

    if (Object.keys(nextError).length > 0) {
      return;
    }

    console.log("Sucesso", { role, fullName, email });
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
          <Pressable
            className="h-12 w-12 items-center justify-center"
            onPress={() => router.back()}
          >
            <AntDesign name="arrow-left" size={20} color="#000" />
          </Pressable>
          <Text className="mt-1 text-3xl font-bold text-slate-900">
            Create account
          </Text>
          <Text className="mt-2 text-base text-slate-500">
            Choose your account type to get started.
          </Text>
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
                    borderColor:
                      !terms && erros.isConfirmed ? "#EF4444" : "#657786",
                  }}
                />
                <Text className="text-sm text-slate-600">
                  I agree to the Terms of Use and Privacy Policy.
                </Text>
              </View>
              {!terms && erros.isConfirmed ? (
                <Text className="text-sm text-red-500">
                  {erros.isConfirmed}
                </Text>
              ) : null}
            </View>
            <PrimaryButton title="Create" onPress={handleRegister} />
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
