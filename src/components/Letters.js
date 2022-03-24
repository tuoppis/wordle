import "./css/Letters.css";
let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let qwerty = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]

function Letters({callBack, visible, enabled})
{
    return (
        <div className="keyboard" style={{display: visible?"block":"none"}}>
            <div className="keyrow">
                {qwerty[0].map( (ch, idx) => 
                <button className="letter" id={`key${ch}`} onClick={() => callBack(ch)} enabled={enabled}>{ch}</button>)}
            </div>
            <div className="keyrow">
                {qwerty[1].map( (ch, idx) => 
                    <button className="letter" id={`key${ch}`} onClick={() => callBack(ch)} enabled={enabled}>{ch}</button>)}
            </div>
            <div className="keyrow">
                {qwerty[2].map( (ch, idx) => 
                    <button className="letter" id={`key${ch}`} onClick={() => callBack(ch)} enabled={enabled}>{ch}</button>)}
            </div>
        </div>
    );
}

export default Letters;