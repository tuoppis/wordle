import React from "react";
import WordleRow from "./WordleRow";
import "./css/WordleGrid.css"

function WordleGrid({activeRow, activeCol, guesses, coloringCall, visible}) 
{
    return (
        <div id="wordle-grid" style={{visible: visible}}>
            {guesses.map((guess, idx) => <WordleRow typedInput={guess} typePos={activeCol} coloringCall={() => coloringCall(idx)}
            isActiveRow={idx === activeRow}/>)}
        </div>
    )
}

export default WordleGrid;