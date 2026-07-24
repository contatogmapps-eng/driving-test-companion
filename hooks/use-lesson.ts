import { LessonContext } from "@/contexts/lesson-context";
import { useContext } from "react";

export function useLesson() {
  const context = useContext(LessonContext);

  if (!context)
    throw new Error("useLesson must be used within a LessonProvider");
  return context;
}
