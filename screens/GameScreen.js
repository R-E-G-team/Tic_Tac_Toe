import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GameScreen = (props) => {
  const [titleMessage, setTitleMessage] = useState("Start Game!");
  const [content, setContent] = useState("");

  const changeContent = (key) => {
    setContent((currentContent) => {
      if (currentContent === "") setContent("X");
      else setContent("");
    });
  };

  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(
      <TouchableOpacity
        key={i}
        style={styles.buttonContainer}
        onPress={changeContent.bind(this, i)}
      >
        <Text style={styles.content}>{content}</Text>
      </TouchableOpacity>
    );
  }

  const [playGound] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const checkFinish = () => {};

  const computerPlay = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleMessage}</Text>
      <View style={styles.row}>
        {squares[0]}
        {squares[1]}
        {squares[2]}
      </View>
      <View style={styles.row}>
        {squares[3]}
        {squares[4]}
        {squares[5]}
      </View>
      <View style={styles.row}>
        {squares[6]}
        {squares[7]}
        {squares[8]}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 100,
    overflow: "hidden",
  },
  content: {
    fontSize: 80,
    paddingVertical: 0,
    textAlign: "center",
  },
  buttonContainer: {
    borderColor: "black",
    flex: 1,
    borderWidth: 5,
    width: 100,
    height: 100,
  },
});

export default GameScreen;
