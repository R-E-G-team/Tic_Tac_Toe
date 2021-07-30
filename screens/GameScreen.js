import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SliderComponent,
} from "react-native";

import playerCode from "../constants/player-code";

const GameScreen = (props) => {
  const [titleMessage, setTitleMessage] = useState("Game Start!");
  const [content, setContent] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isRestart, setIsRestart] = useState(false);
  const [playGround, setPlayGround] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const checkFinish = (playerNum) => {
    //const [possible, setPossible] = useState(0);
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (playGround[i][i] == playerNum) {
        count = count + 1;
      }
    }
    if (count == 0) return 0;
    //(i,i)좌표에 자신의 땅이 하나라도 없으면 승리는 불가능
    else if (count == 3) {
      return playerNum;
    }

    for (let i = 0; i < 3; i++) {
      if (
        playGround[i][0] == playerNum &&
        playGround[i][1] == playerNum &&
        playGround[i][2] == playerNum
      ) {
        return playerNum;
      }
      if (
        playGround[0][i] == playerNum &&
        playGround[1][i] == playerNum &&
        playGround[2][i] == playerNum
      ) {
        return playerNum;
      }
    }
    if (
      playGround[2][0] == playerNum &&
      playGround[1][1] == playerNum &&
      playGround[0][2] == playerNum
    ) {
      return playerNum;
    }
    return 0;
  };

  // const bound = num => { // 이게 안되는데 말이 되나..?
  //   console.log(num);
  //   num = num % 3;
  //   console.log(" to " + num);
  //   return num;
  // };

  const bound = (num) => {
    num = (num+3) % 3;
    return num;
  };

  const getGroundData = (c, r) => {
    c = (3 + c) % 3;
    r = (3 + r) % 3;
    return playGround[c][r];
  };

  const checkNextCanWin = (playerNum) => {
    let count = 0;
    let j = 0;
    let check = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => false)
    );
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // 연결되는 땅 count가 2인곳을 우선 찾음
        if (playGround[i][j] == playerNum) {
          count = getGroundData(i + 1, j) - getGroundData(i - 1, j);
          if (count == playerNum) {
            i = bound(i - 1);
            return [i, j];
          } else if (count == -playerNum) {
            i = bound(i + 1);
            return [i, j];
          }

          count = getGroundData(i, j + 1) - getGroundData(i, j - 1);
          if (count == playerNum) {
            j = bound(j - 1);
            return [i, j];
          } else if (count == -playerNum) {
            j = bound(j + 1);
            return [i, j];
          }
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      j = i;
      if (playGround[i][j] == playerNum) {
        count = getGroundData(i + 1, j + 1) - getGroundData(i - 1, j - 1);
        if (count == playerNum) {
          i = bound(i - 1);
          j = bound(j - 1);
          return [i, j];
        } else if (count == -playerNum) {
          i = bound(i + 1);
          j = bound(j + 1);
          return [i, j];
        }
      }
      j = 2 - i;
      if (playGround[i][j] == playerNum) {
        count = getGroundData(i - 1, j + 1) - getGroundData(i + 1, j - 1);
        if (count == playerNum) {
          i = bound(i + 1);
          j = bound(j - 1);
          return [i, j];
        } else if (count == -playerNum) {
          i = bound(i - 1);
          j = bound(j + 1);
          return [i, j];
        }
      }
    }
    return null;
  };

  const computerPlay = () => {
    let list = [];
    let c = 0;
    let r = 0;
    //자신의 승리공식을 찾음
    list = checkNextCanWin(playerCode.computer);
    if (list != null) {
      return list;
    }

    //사용자의 승리공식을 찾음
    list = checkNextCanWin(playerCode.player);
    if (list != null) {
      return list;
    }

    //빈공간중 랜덤으로 채워넣음
    while (!isRestart) {
      c = Math.floor(Math.random() * 3);
      r = Math.floor(Math.random() * 3);
      if (playGround[c][r] == 0) {
        break;
      }
    }
    return [c, r];
  };

  const changeContent = (key, props) => {
    const newList = [...content];
    if (newList[key] == "X" || newList[key] == "O") {
      return;
    } else {
      newList[key] = "X";
      setContent(newList);
    }

    const newGround = [...playGround];
    newGround[parseInt(key / 3)][key % 3] = playerCode.player;

    if (checkFinish(playerCode.player) == 1) {
      setTitleMessage("You win!");
      setIsRestart(true);
      return;
    }

    for (let i = 0; i < 9; i++) {
      if (newList[i] == "") {
        break;
      }
      if (i == 8) {
        setTitleMessage("Draw!");
        setIsRestart(true);
        return;
      }
    }

    setTitleMessage("Computer turn!");
    setTitleMessage("Your turn!");

    const list = computerPlay();
    newGround[list[0]][list[1]] = playerCode.computer;
    const checkNum = parseInt(list[0] * 3) + list[1];
    content.map((value, index) => {
      if (index == checkNum) {
        newList[index] = "O";
        setContent(newList);
      }
    });

    if (checkFinish(playerCode.computer) == 3) {
      setTitleMessage("Conputer win!");
      setIsRestart(true);
      return;
    }

    setPlayGround(newGround);
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
      {isRestart && (
        <TouchableOpacity
          style={styles.restart}
          onPress={() => {
            setPlayGround(
              Array.from({ length: 3 }, () =>
                Array.from({ length: 3 }, () => 0)
              )
            );
            setContent(["", "", "", "", "", "", "", "", ""]);
            setIsRestart(false);
            setTitleMessage("Game Start!");
          }}
        >
          <Text style={styles.restartText}>재 시작!</Text>
        </TouchableOpacity>
      )}
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
  restart: {
    alignItems: "center",
    marginTop: 20,
    padding: 8,
    backgroundColor: "#ffaaaa",
  },
  restartText: {
    fontSize: 20,
  },
});

export default GameScreen;
