import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  Text,
} from "react-native";

type PrimaryButtonProps = Omit<PressableProps, "children"> & {
  title: string;
  isLoading?: boolean;
};
export default function PrimaryButton({
  title,
  disabled,
  isLoading = false,
  ...pressableProps
}: PrimaryButtonProps) {
  const isDisabled = disabled || isLoading;
  return (
    <Pressable
      className={`w-full rounded-xl bg-brand-500 px-6 py-4  ${
        isDisabled ? "opacity-50" : "active:opacity-80"
      }`}
      disabled={isDisabled}
      {...pressableProps}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-center text-base font-semibold text-white">
          {title}
        </Text>
      )}
    </Pressable>
  );
}
