import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function List() {
  const [personagens, setPersonagens] = useState();

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://dragonball-api.com/api/characters");
      const data = await response.json();
      setPersonagens(data.items);
    } catch {}
  };

  useEffect(() => {
    fetchCharacters();
  }, []);
  return (
    <>
      <View style={s.wrap}>
        <Text style={s.titulo}>Lista de Personagens</Text>
      </View>

      <FlatList
        data={personagens}
        renderItem={({ item }: any) => {
          return (
            <View>
              <Text>{item.name}</Text>
              <Image source={{ uri: item.image }}></Image>
            </View>
          );
        }}
      />
    </>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  titulo: {
    fontSize: 32,
    alignSelf: "center",
    textAlign: "center",
  },
});
