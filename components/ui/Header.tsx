import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

type IconProps = {
  iconName?: keyof typeof AntDesign.glyphMap;
  iconSize?: number;
  iconColor?: string;
  onIconPress?: () => void;
};

type HeaderProps = IconProps & {
  title: string;
  description?: string;
};

export default function Header({
  title,
  description,
  iconName = "arrow-left",
  iconColor = "#0F172A",
  iconSize = 18,
  onIconPress,
}: HeaderProps) {
  const router = useRouter();

  const handleIconPress = () => {
    if (onIconPress) {
      onIconPress();
      return;
    }
    router.back();
  };
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="h-12 w-12 items-center justify-center"
        hitSlop={8}
        onPress={handleIconPress}
      >
        <AntDesign name={iconName} size={iconSize} color={iconColor} />
      </Pressable>

      <Text className="mt-2 text-3xl font-bold text-slate-900">{title}</Text>

      {description ? (
        <Text className="mt-1 text-base leading-6 text-slate-500">
          {description}
        </Text>
      ) : null}
    </View>
  );
}
