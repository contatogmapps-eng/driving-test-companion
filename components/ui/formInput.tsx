import { Text, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type FormInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function FormInput({
  label,
  error,
  ...textInputProps
}: FormInputProps) {
  return (
    <View className="w-full">
      <Text className="mb-2 text-sm font-medium text-slate-700">{label}</Text>

      <TextInput
        className={`h-14 rounded-xl border bg-white px-4 text-base text-slate-900 
            ${error ? "border-red-500" : "border-slate-300"}`}
        placeholderTextColor="#94A3B8"
        {...textInputProps}
      />
      {error ? (
        <Text className="mt-1 text-sm text-red-500">{error}</Text>
      ) : null}
    </View>
  );
}
