import FormInput from "@/components/ui/formInput";
import Header from "@/components/ui/Header";
import PrimaryButton from "@/components/ui/primary-button";
import {
  type ForgotPasswordData,
  forgotPasswordSchema,
} from "@/schemas/auth-schemas";
import { getYupErrors } from "@/utils/get-yup-errors";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValidationError } from "yup";
type ForgotPasswordErrors = Partial<Record<keyof ForgotPasswordData, string>>;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [erros, setErros] = useState<ForgotPasswordErrors>({});
  const [isSent, setIsSent] = useState(false);

  async function handleResetLink() {
    try {
      await forgotPasswordSchema.validate({ email });
      setErros({});
      setIsSent(true);
    } catch (error) {
      if (error instanceof ValidationError) {
        setIsSent(false);

        setErros(getYupErrors<keyof ForgotPasswordData>(error));
        return;
      }
      throw error;
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView className="flex-1 px-6">
          <Header
            title="Reset your password"
            description="Enter your email address and we’ll send you instructions to reset your password."
          />
          <View className="mt-8 gap-8 ">
            <FormInput
              label="Email"
              placeholder="your@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              error={erros.email}
            />

            <PrimaryButton title="Send reset link" onPress={handleResetLink} />
            {isSent ? (
              <Text className="text-center text-sm leading-5 text-green-700">
                If an account exists for this email, we’ll send password reset
                instructions shortly.
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
