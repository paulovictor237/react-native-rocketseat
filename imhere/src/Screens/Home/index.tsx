import React, { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Participante } from "../../components/Participante";
import { styles } from "./styles";

export const Home = () => {
  const [participantes, setParticipantes] = useState<string[]>([]);
  const [newName, setNewName] = useState<string>("");

  const handleParticipantAdd = () => {
    setParticipantes((p) => [...p, newName]);
    setNewName("");
  };

  const handleParticipantRemove = (name: string) => {
    Alert.alert(name, "deu ruim, sai dai", [
      {
        text: "Sim",
        onPress: () => setParticipantes((p) => p.filter((z) => z !== name)),
      },
      { text: "Não", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "#fff" }}>Nome do Evento</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor={"#6b6b6b"}
          keyboardType="numeric"
          onChangeText={setNewName}
          value={newName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participantes}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text>Empty</Text>}
        renderItem={({ item }) => (
          <Participante
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {participantes.map((participante) => (
          <Participante
            key={participante}
            name={participante}
            onRemove={() => handleParticipantRemove("asd")}
          />
        ))}
      </ScrollView> */}
    </View>
  );
};
