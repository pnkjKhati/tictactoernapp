/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

function App(): JSX.Element {
  const [isCross, setCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    if (
      gameState[0] != 'empty' &&
      gameState[0] == gameState[1] &&
      gameState[0] == gameState[2]
    ) {
      setGameWinner(gameState[0]);
    } else if (
      gameState[3] != 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[3] === gameState[5]
    ) {
      setGameWinner(gameState[3]);
    } else if (
      gameState[6] != 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[6] === gameState[8]
    ) {
      setGameWinner(gameState[6]);
    } else if (
      gameState[0] != 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[0] === gameState[6]
    ) {
      setGameWinner(gameState[0]);
    } else if (
      gameState[1] != 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[1] === gameState[7]
    ) {
      setGameWinner(gameState[1]);
    } else if (
      gameState[2] != 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[2] === gameState[8]
    ) {
      setGameWinner(gameState[2]);
    } else if (
      gameState[0] != 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[0] === gameState[8]
    ) {
      setGameWinner(gameState[0]);
    } else if (
      gameState[2] != 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[2] === gameState[6]
    ) {
      setGameWinner(gameState[2]);
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }
    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setCross(!isCross);
    } else {
      Snackbar.show({
        text: 'Position is already Filled!',
        backgroundColor: 'red',
        textColor: 'white',
      });
    }

    checkIsWinner();
  };

  return (
    <View style={styles.container}>
      {gameWinner ? (
        <View style={styles.turnIndicatorButton}>
          <Text>{gameWinner} is winner</Text>
        </View>
      ) : (
        <View style={styles.turnIndicatorButton}>
          <Text>Player {isCross ? 'X' : 'O'}'s turn</Text>
        </View>
      )}
      <View>
        <FlatList
          data={gameState}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.gameBoardElement}
                onPress={() => onChangeItem(index)}>
                <Icons name={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TouchableOpacity style={styles.reloadingbutton} onPress={reloadGame}>
        <Text>Reload Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  turnIndicatorButton: {
    backgroundColor: '#E8BD0D',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  gameBoard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: -100,
  },
  gameBoardElement: {
    padding: 45,
  },
  reloadingbutton: {
    backgroundColor: '#8D3DAF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 60,
    borderRadius: 10,
  },
});

export default App;
