import { View } from "@/components/layout/View";
import { fs } from "@/services/fs";
import { FlatList, Pressable } from "react-native";
import { Text } from "tamagui";

const data = [
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt beatae repellendus nostrum nesciunt asperiores odit omnis dolorum, quisquam itaque natus obcaecati quasi iste accusamus consequuntur, soluta reiciendis corrupti placeat adipisci?`,
];

export default function HomeScreen() {
  const COLUMNS_COUNT = 3;
  // fs();
  return (
    <View flex={1}>
      <FlatList
        key={COLUMNS_COUNT}
        data={[...data, ...data, ...data, ...data]}
        numColumns={COLUMNS_COUNT}
        // keyExtractor={(item, index) => `${index}`}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 4 }}
        columnWrapperStyle={{ gap: 4 }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={fs}
            style={{
              width: 100,
              aspectRatio: 1,
              backgroundColor: "#ffffff20",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
