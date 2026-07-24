export type LessonType = "REGULAR" | "EXTRA" | "MOCK_TEST" | "PRE_TEST";
export type Lesson = {
  id: string;
  type: LessonType;
  scheduledAt: string;
  meetingPoint: string;
};
