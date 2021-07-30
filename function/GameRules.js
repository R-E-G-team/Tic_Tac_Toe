import React, { useState } from "react";

const GameRules = () => {
    const [playGround, setPlayGround] = useState(
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


};

export default GameRules;