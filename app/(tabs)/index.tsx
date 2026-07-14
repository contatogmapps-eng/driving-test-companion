import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRoute();
  return (
    <View style={style.container}>
      <Text style={style.title}>Driving Test Companion</Text>
      <Text style={style.description}>Prepare for you Driving Testing</Text>
      <Pressable style={style.button} onPress={handleStart}>
        <Text style={style.buttonText}>Start</Text>
      </Pressable>
    </View>
  );
}

function handleStart() {
  router.push("/explore");
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#08275A",
  },

  title: {
    color: "#FFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  description: {
    marginTop: 12,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },

  button: {
    width: "100%",
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    backgroundColor: "#1677E8",
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
