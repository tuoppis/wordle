import "./css/Keyboard.css";

let qwerty = [[..."QWERTYUIOP"], [..."ASDFGHJKL"], [..."ZXCVBNM"]]

function Letters({callBack, disabled})
{
    return (
        <>
            <div id="keyrow1" className="keyrow">
                {qwerty[0].map( (ch, idx) => 
                <button key={idx} className="letter" id={`key${ch}`} onClick={() => callBack(ch)} disabled={disabled}>{ch}</button>)}
            </div>
            <div id="keyrow2" className="keyrow">
                {qwerty[1].map( (ch, idx) => 
                    <button key={idx} className="letter" id={`key${ch}`} onClick={() => callBack(ch)} disabled={disabled}>{ch}</button>)}
            </div>
            <div id="keyrow3" className="keyrow">
                {qwerty[2].map( (ch, idx) => 
                    <button key={idx} className="letter" id={`key${ch}`} onClick={() => callBack(ch)} disabled={disabled}>{ch}</button>)}
            </div>
        </>
    );
}

function ControlButton({callBack, disabled, name, text})
{
    const upper = name.toUpperCase();
    return <button id={`key${upper}`} disabled={disabled} onClick={() => callBack(upper)}>{text || name}</button>
}

function Keyboard({callBack, disabled})
{

    return (
        <div id="keyboard">
            <Letters callBack={callBack} disabled={disabled.letters} />
            {/* <div id="controlkeys"> */}
                <ControlButton callBack={callBack} disabled={disabled.delkey} name="Del" />
                <ControlButton callBack={callBack} disabled={disabled.enter} name="Enter" />
                <ControlButton callBack={callBack} disabled={false} name="Next" text={disabled.next ? "New word": "Skip word"}/>
            {/* </div> */}
        </div>
    );
}

export default Keyboard;