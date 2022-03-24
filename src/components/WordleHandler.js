import React from "react";
import {useState, useEffect} from "react"
import WordleGrid from "./WordleGrid";
import Letters from "./Letters";
import "./css/WordleHandler.css";
import en_words_5_letters from "./data/en-5-letters.json"
import en_letter_primes from "./data/en-letter-primes.json"

let RowCount = 6
let ColCount = 5

const primeCodeFor = (charCode) => en_letter_primes[charCode - 0x41];
const numNames = ["nilth", "first", "second", "third", "fourth", "fifth", "sixth"];

function WordleHandler({})
{
    let [wordList, setWordList] = useState(en_words_5_letters.keys());
    let [word, setWord] = useState(null);
    let [primeScore, setPrimeScore] = useState(0);
    let [guesses, setGuesses] = useState(null);
    let [canGuess, setCanGuess] = useState(false);
    let [activeRow, setActiveRow] = useState(0);
    let [activeCol, setActiveCol] = useState(0);
    let [rowCount, setRowCount] = useState(RowCount);
    let [colCount, setColCount] = useState(ColCount);
    let [gameState, setGameState] = useState(0) // 0: game on, 1: game won, -1: game lost

    const selectWord = () => {
        let word = wordList[Math.floor(wordList.length * Math.random())];
        setWord(word.toUpperCase());
        setPrimeScore(en_words_5_letters[word]);
        setGuesses(Array(rowCount).fill(Array(colCount).fill("")));
        setCanGuess(false);
        setActiveRow(0);
        setActiveCol(0);
        setGameState(0);
    }

    const inputChar = (ch) => {
        currentGuess = guesses[activeRow];
        if (activeCol < colCount) {
            currentGuess[activeCol] = ch;
            setActiveCol(activeCol + 1);
            setGuesses([...guesses]);
            setCanGuess((activeRow < rowCount) && (activeCol >= colCount))
        }
    }

    const removeChar = () => {
        if (activeCol === 0) return;
        let col = activeCol - 1
        setActiveCol(col);
        guesses[activeRow][col] = "";
        setGuesses([...guesses]);
    }

    const gameOn = gameState === 0;

    const gameStr = () => {
        switch (gameState) {
            case -1: return `Defeated by '${word}'!`;
            case 0: return `You have ${rowCount-activeCol+1} ${activeRow<rowCount ? "tries":"try"} left!`
            case 1: return `Victory on your ${numNames[activeCol]} guess!`
        }
    }
    
    const nextGuess = () => {
        if (guesses[activeRow] === word) {
            setGameState(1)
            setCanGuess(false);
        } else if (activeRow === rowCount - 1) {
            setGameState(-1)
            setCanGuess(false);
        }
        setActiveRow(activeRow + 1);
    }

    const getColoring = (idx) => {
        let coloring = Array(colCount).fill(0);
        curScore = primeScore;
        curGuess = guesses[idx];
        if (idx < activeRow) {
            for (let i in word) {
                if (curGuess[i] === word[i]) {
                    coloring[i] = 1;
                    curScore /= primeCodeFor(word.charCodeAt(i));
                }
            }

            for (let i in word) {
                if (coloring[i]) continue;
                pc = primeCodeFor(word.charCodeAt(i));
                if (curScore % pc === 0) {
                    coloring[i] = -1
                    curScore /= pc
                }
            }
        }
        return coloring;
    }

    useEffect( () => {
        selectWord();
    }, [])

    return (
        <>
        <div id="game-header">
            <h1>Wordle</h1>
            <p>{gameStr()}</p>
        </div>
        <WordleGrid activeCol={activeCol} activeRow={activeRow} guesses={guesses} coloringCall={getColoring} visible={true} />
        <Letters callBack={inputChar} visible={true} enabled={gameOn}/>
        <div id="game-control">
            <button enabled={(activeCol > 0) && gameOn} onClick={removeChar}>Del</button>
            <button enabled={canGuess} onClick={nextGuess}>{canGuess ? `Guess '${guesses[activeRow].join()}'`: "Enter word"}</button>
            <button onClick={selectWord}>{gameOn ? "New word" : "Skip word"}</button>
        </div>
        </>
    );
}

export default WordleHandler;