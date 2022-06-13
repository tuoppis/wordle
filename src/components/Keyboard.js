import "./css/Keyboard.css";

let qwerty = [[..."QWERTYUIOP"], [..."ASDFGHJKL"], [..."ZXCVBNM"]];

function Letters({ callBack, disabled }) {
  return (
    <>
      <div id="keyrow1" className="keyrow">
        {qwerty[0].map((ch, idx) => (
          <button
            key={`row1${idx}`}
            className="letter"
            id={`key${ch}`}
            onClick={() => callBack(ch)}
            disabled={disabled}
          >
            {ch}
          </button>
        ))}
      </div>
      <div id="keyrow2" className="keyrow">
        {qwerty[1].map((ch, idx) => (
          <button
            key={`row2${idx}`}
            className="letter"
            id={`key${ch}`}
            onClick={() => callBack(ch)}
            disabled={disabled}
          >
            {ch}
          </button>
        ))}
      </div>
      <div id="keyrow3" className="keyrow">
        {qwerty[2].map((ch, idx) => (
          <button
            key={`row3${idx}`}
            className="letter"
            id={`key${ch}`}
            onClick={() => callBack(ch)}
            disabled={disabled}
          >
            {ch}
          </button>
        ))}
      </div>
    </>
  );
}

function ControlButton({ callBack, disabled, name, text }) {
  const upper = name.toUpperCase();
  return (
    <div id={`key${upper}`} className="key-control">
      <button disabled={disabled} onClick={() => callBack(upper)}>
        {text || name}
      </button>
    </div>
  );
}

function Keyboard({ message, callBack, disabled }) {
  return (
    <div id="keyboard">
      <p>{message}</p>
      <div id="control-key-row">
        <ControlButton callBack={callBack} disabled={disabled.delkey} name="Del" text="˂˂" />
        <ControlButton callBack={callBack} disabled={disabled.enter} name="Enter" text="Yes" />
        <ControlButton callBack={callBack} disabled={false} name="Next" text={disabled.next ? "New" : "Skip"} />
      </div>
      <Letters callBack={callBack} disabled={disabled.letters} />
    </div>
  );
}

export default Keyboard;
