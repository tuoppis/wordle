import WordleRow from "./WordleRow";
import "./css/WordleGrid.css";

function WordleGrid({ activeRow, activeCol, guesses, coloringCall, visible }) {
  const GArray = () => guesses || Array(activeRow).fill(Array(activeCol).fill(""));
  return (
    <div id="wordle-grid" style={{ visible: visible }}>
      {GArray().map((guess, idx) => (
        <WordleRow
          key={idx}
          typedInput={guess}
          typePos={activeCol}
          coloringCall={() => coloringCall(idx)}
          isActiveRow={idx === activeRow}
        />
      ))}
    </div>
  );
}

export default WordleGrid;
