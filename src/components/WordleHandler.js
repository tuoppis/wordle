// import React from "react";
import {useState, useEffect} from "react"
import WordleGrid from "./WordleGrid";
import Keyboard from "./Keyboard";
import "./css/WordleHandler.css";
import en_letter_primes from "./data/en-letter-primes.json"
import en_words_5_letters from "./data/en-5-letters.json";

let RowCount = 6
let ColCount = 5

const primeCodeFor = (charCode) => en_letter_primes[charCode - 0x41];
const numNames = ["nilth", "first", "second", "third", "fourth", "fifth", "sixth"];

function ArrayOfArrays(rows, cols, val) {
    let arr = [];
    for (let i = 0; i < rows; i++) arr.push(Array(cols).fill(val));
    return arr;
}

function WordleHandler()
{
    let [wordList, setWordList] = useState(Object.keys(en_words_5_letters));
    let [word, setWord] = useState(null);
    let [primeScore, setPrimeScore] = useState(0);
    let [guesses, setGuesses] = useState(ArrayOfArrays(RowCount, ColCount, ""));
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
        setGuesses(ArrayOfArrays(rowCount, colCount, ""));
        setCanGuess(false);
        setActiveRow(0);
        setActiveCol(0);
        setGameState(0);
    }

    const clearArray = () => {
        for (let r of guesses) for (let i in r) r[i] = "";
        setGuesses(guesses);
    }

    const cloneArray = (cpy) => cpy.map( val => [...val]);

    const inputChar = (ch) => {
        if (ch.length > 1) {
            switch (ch) {
                case "NEXT": selectWord(); return;
                case "ENTER": nextGuess(); return;
                case "DEL": removeChar(); return;
                default: return;
            }
        }
        if (activeCol < colCount) {
            guesses[activeRow][activeCol] = ch;
            let col = activeCol + 1
            setActiveCol(col);
            setGuesses(guesses)//.map((val)=>[...val]));
            setCanGuess((activeRow < rowCount) && (col >= colCount))
        }
    }

    const removeChar = () => {
        if (activeCol === 0) return;
        let col = activeCol - 1
        setActiveCol(col);
        guesses[activeRow][col] = "";
        setGuesses(guesses)//.map((val)=>[...val]));
        // console.table(guesses);
    }

    const gameOn = () => gameState === 0;

    const gameStr = () => {
        switch (gameState) {
            case -1: return `Defeated by '${word}'!`;
            case 0: return `You have ${rowCount-activeRow} ${activeRow<rowCount ? "tries":"try"} left!`
            case 1: return `Victory on your ${numNames[activeRow]} guess!`
        }
    }
    
    const nextGuess = () => {
        console.log(word);
        if (guesses[activeRow].join("") === word) {
            setGameState(1);
        } else if (activeRow === rowCount - 1) {
            setGameState(-1);
        }
        setActiveRow(activeRow + 1);
        setCanGuess(false);
        setActiveCol(0);
    }

    const getColoring = (idx) => {
        let coloring = Array(colCount).fill(0);
        let curScore = primeScore;
        let curGuess = guesses[idx];
        if (idx < activeRow) {
            for (let i in word) {
                if (curGuess[i] === word[i]) {
                    coloring[i] = 1;
                    curScore /= primeCodeFor(word.charCodeAt(i));
                }
            }

            for (let i in word) {
                if (coloring[i] === 1) continue;
                let pc = primeCodeFor(curGuess[i].charCodeAt(0));
                if ((pc >=0) && ((curScore % pc) === 0)) {
                    coloring[i] = -1
                    curScore /= pc
                } else {
                    document.getElementById("key" + curGuess[i]).disabled  = true;
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
            <h3>Wordle</h3>
            <p>{gameStr()}</p>
        </div>
        <WordleGrid activeCol={activeCol} activeRow={activeRow} guesses={guesses} coloringCall={getColoring} visible={"true"} />
        <Keyboard callBack={inputChar} disabled={{letters: !gameOn(), delkey: (activeCol == 0) || !gameOn(), enter: !canGuess, next: !gameOn()}}/>
        </>
    );
}

export default WordleHandler;