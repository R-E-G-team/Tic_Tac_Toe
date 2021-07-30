import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import playerCode from "../constants/player-code";

const GameScreen = (props) => {
  const [titleMessage, setTitleMessage] = useState("Game Start!");
  const [content, setContent] = useState(["", "", "", "", "", "", "", "", ""]);
  const [playGround, setPlayGround] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const checkFinish = (playerNum) => {
    //const [possible, setPossible] = useState(0);
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (playGround[i][i] == playerNum) {
        count = count + 1;
        break;
      }
    }
    if (count == 0) return 0;
    //(i,i)좌표에 자신의 땅이 하나라도 없으면 승리는 불가능
    else if (count == 3) {
      setTitleMessage("Win!");
      return playerNum;
    }

    for (let i = 0; i < 3; i++) {
      if (
        playGround[i][0] == playerNum &&
        playGround[i][1] == playerNum &&
        playGround[i][2] == playerNum
      ) {
        setTitleMessage("Win!");
        return playerNum;
      }
      if (
        playGround[0][i] == playerNum &&
        playGround[1][i] == playerNum &&
        playGround[2][i] == playerNum
      ) {
        setTitleMessage("Win!");
        return playerNum;
      }
    }
    if (
      playGround[2][0] == playerNum &&
      playGround[1][1] == playerNum &&
      playGround[0][2] == playerNum
    ) {
      setTitleMessage("Win!");
      return playerNum;
    }
    return 0;
  };

  const getGroundData = (c, r) => {
    if (c < 0) c = 3 + c;
    if (r < 0) r = 3 + r;
    return playGround[c][r];
  };

  const computerPlay = () => {
    let count = 0;
    let j = 0;
    let check = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => false)
    );
    for (let i = 0; i < 3; i++) {
      j = i;
      // 연결되는 땅 count가 2인곳을 우선 찾음
      if (playGround[i][j] == computer && !check[i][j]) {
        count = getGroundData(i + 1, j) - getGroundData(i - 1, j);
        if (count == 2) {
          i = i - 1;
          return { i, j };
        } else if (count == -2) {
          i = i + 1;
          return { i, j };
        }

        count = getGroundData(i, j + 1) - getGroundData(i, j - 1);
        if (count == 2) {
          j = j - 1;
          return { i, j };
        } else if (count == -2) {
          j = j + 1;
          return { i, j };
        }

        count = getGroundData(i + 1, j + 1) - getGroundData(i - 1, j - 1);
        if (count == 2) {
          i = i - 1;
          j = j - 1;
          return { i, j };
        } else if (count == -2) {
          i = i + 1;
          j = j + 1;
          return { i, j };
        }

        count = getGroundData(i - 1, j + 1) - getGroundData(i + 1, j - 1);
        if (count == 2) {
          i = i + 1;
          j = j - 1;
          return { i, j };
        } else if (count == -2) {
          i = i - 1;
          j = j + 1;
          return { i, j };
        }
      }
    }

    // 상대의 연결되는 땅 count가 2인곳을 찾음
  };

  const changeContent = (key, props) => {
    const newList = [...content];
    content.map((value, index) => {
      if (index == key) {
        newList[index] = "X";
        setContent(newList);
      }
    });
    const newGround = [...playGround];
    newGround[parseInt(key / 3)][key % 3] = 1;
    setPlayGround(newGround);
    console.log(checkFinish(1));
  };

  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(
      <TouchableOpacity
        key={i}
        style={styles.buttonContainer}
        onPress={changeContent.bind(this, i)}
      >
        <Text style={styles.content}>{content[i]}</Text>
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
