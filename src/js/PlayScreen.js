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
      class={`modal modal-collection ${pSopen && "hidden"}`}
      id="modal-PlayScreen"
    >
      <div class="borderGlow">
        <div class="modal-PlayScreen-content">
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
    <section class="modal-PlayScreen-LeftSection">
      <h1 class="PStextArea">. Select a deck .</h1>

      <div class="PlayScreen-DecksArea">
        {Object.values(state.playerDecks).map(
          (deck, i) =>
            deck.name && (
              <div class="PlayScreen-deckDock">
                <DeckBtn
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
          (deck, i) => !deck.name && <div class="PlayScreen-deckDock"></div>
        )}

        {/* <div class="PlayScreen-deckDock"></div>
        <div class="PlayScreen-deckDock"></div>
        <div class="PlayScreen-deckDock"></div>
        <div class="PlayScreen-deckDock"></div> */}
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
      <div className={` PSmagi PSmagi-pile-${i} draggable=false`}>
        <img src={magi.url} alt={magi.Name} />
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
    <section class="modal-PlayScreen-RightSection">
      <div class="PlayScreen-RightSection-deckInformation">
        <h1 class="PStextArea DeckRegion">{regionSelected} selected</h1>
        <div class="PSmagisArea">
          <ShowMagiWhenSelectingDeck selected={selected} />
        </div>
        <h1 class="PStextArea totalCards">{deck.crs.length} - Cards</h1>
      </div>
      <div class="PlayScreen-RightSection-buttonsArea">
        <button
          class="console_button "
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
          class="console_button "
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
