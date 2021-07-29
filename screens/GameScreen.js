import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GameScreen = (props) => {
  const [titleMessage, setTitleMessage] = useState("Start Game!");
  const [content, setContent] = useState("");
  const [playGround] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const checkFinish = (playerNum) => {
    //const [possible, setPossible] = useState(0);
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (playGround[i][i] === playerNum) {
        setPossible(possible + 1);
        break;
      }
    }
    if (count === 0) return 0;
    //(i,i)좌표에 자신의 땅이 하나라도 없으면 승리는 불가능
    else if (count === 3) return playerNum;

    for (let i = 0; i < 3; i++) {
      if (
        playGround[i][0] === playerNum &&
        playGround[i][1] === playerNum &&
        playGround[i][2] === playerNum
      ) {
        return playerNum;
      }
      if (
        playGround[0][i] === playerNum &&
        playGround[1][i] === playerNum &&
        playGround[2][i] === playerNum
      ) {
        return playerNum;
      }
    }

    if (
      playGound[2][0] === playerNum &&
      playGound[1][1] === playerNum &&
      playGound[0][2] === playerNum
    ) {
      return playerNum;
    }
  };

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

  const changeContent = (key) => {
    console.log(key);
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