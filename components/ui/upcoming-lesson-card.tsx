import { Text, View } from "react-native";

type UpcomingLessonCardProps = {
  typeLabel: string;
  schedule: string;
  meetingPoint: string;
};
export default function UpcomingLessonCard({
  typeLabel,
  schedule,
  meetingPoint,
}: UpcomingLessonCardProps) {
  return (
    <View className="mt-4 rounded-2xl bg-white p-5">
      <Text className="text-sm font-semibold text-brand-500">{typeLabel}</Text>
      <Text className="mt-2 text-xl font-bold text-slate-900">{schedule}</Text>

      <Text className="mt-2 text-sm text-slate-500">
        Meeting point: {meetingPoint}
      </Text>
    </View>
  );
}
