import "./css/Letters.css";

let qwerty = [[..."QWERTYUIOP"], [..."ASDFGHJKL"], [..."ZXCVBNM"]]

function Letters({callBack, visible, disabled})
{
    return (
        <div className="keyboard" style={{display: visible?"block":"none"}}>
            <div className="keyrow">
                {qwerty[0].map( (ch, idx) => 
                <button key={idx} className="letter" id={`key${ch}`} onClick={() => callBack(ch)} disabled={disabled}>{ch}</button>)}
            </div>
            <div className="keyrow">
                {qwerty[1].map( (ch, idx) => 
                    <button key={idx} className="letter" id={`key${ch}`} onClick={() => callBack(ch)} disabled={disabled}>{ch}</button>)}
            </div>
            <div className="keyrow">
                {qwerty[2].map( (ch, idx) => 
                    <button key={idx} className="letter" id={`key${ch}`} onClick={() => callBack(ch)} disabled={disabled}>{ch}</button>)}
            </div>
        </div>
    );
}

export default Letters;