import { OnboardingContext } from "@/contexts/onboarding-context";
import { useContext } from "react";

export default function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
