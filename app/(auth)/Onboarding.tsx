import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const slides = [
  {
    image: require("../../assets/images/car.png"),
    title: "Get ready for your driving test",
    description:
      "Track your lessons, receive feedback, and study helpful content so you feel confident on test day.",
  },
  {
    image: require("../../assets/images/instrutor.png"),
    title: "Detailed lessons and assessments",
    description:
      "Your instructor records your performance and follows the development of each driving skill.",
  },
  {
    title: "Progress that leads to pass",
    image: require("../../assets/images/chart.png"),
    description:
      "Set goals, practise, take mock tests, and monitor your progress.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  function handleNext() {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
      return;
    }

    router.replace("/login");
  }

  function handlePrevious() {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-20, 20])
    .runOnJS(true)
    .onEnd((event) => {
      const swipeDistance = 60;

      if (event.translationX < -swipeDistance) {
        handleNext();
      }
      if (event.translationX > swipeDistance) {
        handlePrevious();
      }
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-between px-6 pb-6">
          <View className="flex-1 items-center justify-center">
            <Image
              source={slide.image}
              className="h-80 w-100"
              resizeMode="contain"
            />

            <Text className="mt-8 text-center text-[26px] font-bold leading-9 text-slate-900">
              {slide.title}
            </Text>

            <Text className="mt-4 text-center text-base leading-6 text-slate-500">
              {slide.description}
            </Text>

            <View className="mt-8 flex-row gap-2">
              {slides.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 rounded-full ${
                    index === currentSlide
                      ? "w-6 bg-brand-500"
                      : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
}
