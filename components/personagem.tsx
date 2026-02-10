import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Personagem({ item }: any) {
  return (
    <Link href={`/modal/${item.id}`} asChild>
      <View style={s.personagem}>
        <Text>{item.name}</Text>
        <View style={s.imageContainer}>
          <TouchableOpacity></TouchableOpacity>
          <Image
            source={{ uri: item.image }}
            contentFit="cover"
            style={s.image}
          ></Image>
        </View>
      </View>
    </Link>
  );
}

const s = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
  personagem: {
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
    marginTop: 20,
  },
  imageContainer: {
    width: 350,
    height: 1000,
  },
});
