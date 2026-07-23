import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import type { LessonSummary } from "../types/lessonSummary";

export default function LessonDetailsScreen() {
  const { schedule, typeLabel, meetingPoint } =
    useLocalSearchParams<LessonSummary>();

  return (
    <View className="flex-1 bg-slate-50 p-6">
      <Text className="text-2xl font-bold text-slate-900">Lesson details</Text>
      <Text className="mt-6 text-sm font-semibold text-brand-500">
        {typeLabel}
      </Text>
      <Text className="mt-2 text-xl font-bold text-slate-900">{schedule}</Text>
      <Text>Meeting point: {meetingPoint}</Text>
    </View>
  );
}
