import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function List() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        "https://dragonball-api.com/api/characters?page=" + page,
      );
      const data = await response.json();
      setPersonagens((velho) => [...velho, ...data.items]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 0 && page < 7) {
      fetchCharacters();
    }
  }, [page]);

  const loadMore = () => {
    setPage((velho) => velho + 1);
  };

  return (
    <>
      <View style={s.wrap}>
        <Text style={s.titulo}> Lista de Personagens</Text>
      </View>

      {loading ? (
        <View style={s.wrapImage}>
          <Image source={require("@/assets/loading.gif")} style={s.loading} />
        </View>
      ) : (
        <FlatList
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          data={personagens}
          renderItem={({ item }: any) => {
            return (
              <View style={s.personagem}>
                <Text style={s.titulo}>{item.name}</Text>
                <Image source={{ uri: item.image }}></Image>
                <Text>{item.ki}</Text>
                <View style={s.imageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={s.image}
                    contentFit="cover"
                  ></Image>
                </View>
              </View>
            );
          }}
        />
      )}
    </>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  wrap: {
    flex: 1,
  },
  titulo: {
    fontSize: 32,
    alignSelf: "center",
    textAlign: "center",
  },
  wrapImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    width: 70,
    height: 70,
  },
  imageContainer: {
    width: 300,
    height: 1000,
  },
  image: {
    flex: 1,
    width: "auto",
  },
  personagem: {
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
});
