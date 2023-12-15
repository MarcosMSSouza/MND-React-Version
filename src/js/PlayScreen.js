import { state } from "./model";
import { DeckBtn, addDeckRegionImg } from "./decks";
import useSound from "use-sound";
import switchingGameSections from "../sounds/switchingGameSections.mp3";
import hoveringSystemBtns from "../sounds/hoveringSystemBtns.mp3";

export function PlayScreen({
  selected,
  setSelected,
  handleSetPSopen,
  pSopen,
  handleFieldOpen,
}) {
  function handleSelectDeck(id) {
    setSelected(state.playerDecks[id]);
  }

  return (
    <div
      className={`modal modal-collection ${pSopen && "hidden"}`}
      id="modal-PlayScreen"
    >
      <div className="borderGlow">
        <div className="modal-PlayScreen-content">
          <LeftScreenSection
            selected={selected}
            setSelected={setSelected}
            handleSelectDeck={handleSelectDeck}
          />
          <RightScreenSection
            selected={selected}
            // setSelected={setSelected}
            handleSetPSopen={handleSetPSopen}
            handleFieldOpen={handleFieldOpen}
          />
        </div>
      </div>
    </div>
  );
}

function LeftScreenSection({ selected, handleSelectDeck }) {
  const PSdeck = true;
  // const numOfDecks = 9;
  return (
    <section className="modal-PlayScreen-LeftSection">
      <h1 className="PStextArea">. Select a deck .</h1>

      <div className="PlayScreen-DecksArea">
        {Object.values(state.playerDecks).map(
          (deck, i) =>
            deck.name && (
              <div className="PlayScreen-deckDock" key={i}>
                <DeckBtn
                  key={i}
                  deck={deck}
                  PSdeck={PSdeck}
                  i={i + 1}
                  selected={selected}
                  handleSelectDeck={handleSelectDeck}
                  class1={"PSdeckBtn"}
                />
              </div>
            )
        )}
        {Object.values(state.playerDecks).map(
          (deck, i) =>
            !deck.name && (
              <div className="PlayScreen-deckDock" key={`PSdock${i}`}></div>
            )
        )}
      </div>
    </section>
  );
}

function ShowMagiWhenSelectingDeck({ selected }) {
  let magis = selected.magi;
  // PSmagisArea.innerHTML = "";
  // console.log(magi.url);
  if (!magis) return;
  return magis.map((magi, i) => {
    return (
      <div className={` PSmagi-pile-${i} draggable=false `} key={`psmagi${i}`}>
        <img className={"PSmagi"} src={magi.url} alt={magi.Name} />
      </div>
    );
  });
}

function RightScreenSection({ selected, handleSetPSopen, handleFieldOpen }) {
  let deck = selected;
  let regionSelected = addDeckRegionImg(deck);
  const soundUrl = switchingGameSections;
  const [play] = useSound(soundUrl);

  const soundUrl2 = hoveringSystemBtns;
  const [play2] = useSound(soundUrl2);

  return (
    <section className="modal-PlayScreen-RightSection">
      <div className="PlayScreen-RightSection-deckInformation">
        <h1 className="PStextArea DeckRegion">{regionSelected} selected</h1>
        <div className="PSmagisArea">
          <ShowMagiWhenSelectingDeck selected={selected} />
        </div>
        <h1 className="PStextArea totalCards">{deck.crs.length} - Cards</h1>
      </div>
      <div className="PlayScreen-RightSection-buttonsArea">
        <button
          className="console_button "
          type="button"
          id="PlayScreen-btn-play"
          onMouseEnter={play2}
          onClick={() => {
            play();
            handleFieldOpen();
          }}
        >
          PLAY
        </button>
        <button
          className="console_button "
          type="button"
          id="PlayScreen-btn-collection"
          onClick={() => {
            play();
            handleSetPSopen();
          }}
          onMouseEnter={play2}
        >
          COLLECTION
        </button>
      </div>
    </section>
  );
}
