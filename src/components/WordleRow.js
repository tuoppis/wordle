import { useEffect, useState } from "react"
import "./css/WordleRow.css";


function WordleRow({typedInput, typePos, coloringCall, isActiveRow})
{
    let [coloring, setColoring] = useState(coloringCall());

    const getClassName = (idx) => {
        code = coloring[idx];
        cName = (typePos === idx && isActiveRow) ? "wordle active" : "wordle";
        switch (code) {
            case -1: return cName + " wrong-pos";
            case  1: return cName + " right-pos";
        }
        return cName;
    }

    useEffect(() => setColoring(coloringCall()), [isActiveRow]);

    return <>{typedInput.map( (ch, idx) => <button className={getClassName(idx)}>ch</button>)}</>
}

export default WordleRow