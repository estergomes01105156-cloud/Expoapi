import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
  const local = useLocalSearchParams();
  const id = local.id;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `https://dragonball-api.com/api/characters/${id}`,
      );
      const responseData = await response.json();

      setData(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.wrapImage}>
        <Image
          source={require("@/assets/loading.gif")}
          style={styles.loading}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {data && (
        <>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.race}>🧬 Raça:{data.race}</Text>
          <Text style={styles.ki}>⚡KI: {data.ki}</Text>
          <Text style={styles.gender}> 👤 Genêro: {data.gender}</Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 25,
    backgroundColor: "#ffb641e3",
  },
  race: {},
  gender: {},
  name: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ff9500",
    textAlign: "center",
    marginBottom: 25,

    textShadowColor: "#001f3f",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  ki: {},
  wrapImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    width: 130,
    height: 130,
  },
});
