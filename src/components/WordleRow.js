import { useEffect, useState } from "react"
import "./css/WordleRow.css";


function WordleRow({typedInput, typePos, coloringCall, isActiveRow})
{
    let [coloring, setColoring] = useState(coloringCall());

    const getClassName = (idx) => {
        let code = coloring[idx];
        let cName = (typePos === idx && isActiveRow) ? "wordle active" : "wordle";
        switch (code) {
            case -1: return cName + " wrong-pos";
            case  1: return cName + " right-pos";
        }
        return cName;
    }

    useEffect(() => setColoring(coloringCall()), [isActiveRow, coloringCall]);

    return <>{typedInput.map( (ch, idx) => <div key={idx} className={getClassName(idx)}><p>{ch}</p></div>)}</>
}

export default WordleRow