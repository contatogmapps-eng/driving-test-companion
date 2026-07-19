import { Pressable, PressableProps, Text } from "react-native";

type PrimaryPropos = Omit<PressableProps, "children"> & {
  title: string;
};
export default function PrimaryButton({
  title,
  disabled,
  ...pressableProps
}: PrimaryPropos) {
  return (
    <Pressable
      className={`w-full rounded-xl bg-brand-500 px-6 py-4  ${
        disabled ? "opacity-50" : "active:opacity-80"
      }`}
      disabled={disabled}
      {...pressableProps}
    >
      <Text className="text-center text-base font-semibold text-white">
        {title}
      </Text>
    </Pressable>
  );
}
