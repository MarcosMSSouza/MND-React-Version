import { state } from "./model";
import { DeckBtn } from "./decks";

export function PlayScreen({ selected, setSelected, handleSetPSopen, pSopen }) {
  function handleSelectDeck(id) {
    setSelected(id);
  }

  return (
    <div
      class={`modal modal-collection ${pSopen && "hidden"}`}
      id="modal-PlayScreen"
    >
      <div class="borderDummy">
        <div class="modal-PlayScreen-content">
          <LeftScreenSection
            selected={selected}
            handleSelectDeck={handleSelectDeck}
          />
          <section class="modal-PlayScreen-RightSection">
            <div class="PlayScreen-RightSection-deckInformation">
              <h1 class="PStextArea DeckRegion">no deck selected</h1>
              <div class="PSmagisArea"></div>
              <h1 class="PStextArea totalCards">- Cards</h1>
            </div>
            <div class="PlayScreen-RightSection-buttonsArea">
              <button
                class="console_button"
                type="button"
                id="PlayScreen-btn-play"
              >
                PLAY
              </button>
              <button
                class="console_button"
                type="button"
                id="PlayScreen-btn-collection"
                onClick={() => handleSetPSopen()}
              >
                COLLECTION
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function LeftScreenSection({ selected, handleSelectDeck }) {
  // const numOfDecks = 9;
  return (
    <section class="modal-PlayScreen-LeftSection">
      <h1 class="PStextArea">. Select a deck .</h1>

      <div class="PlayScreen-DecksArea">
        {Object.values(state.playerDecks).map((deck, i) => (
          <DeckBtn
            deck={deck}
            // regionImg={regionImg}
            i={i + 1}
            selected={selected}
            onSelectDeck={handleSelectDeck}
          />
        ))}
        <div class="PlayScreen-deckDock"></div>
        <div class="PlayScreen-deckDock"></div>
        <div class="PlayScreen-deckDock"></div>
        <div class="PlayScreen-deckDock"></div>
        <div class="PlayScreen-deckDock"></div>
      </div>
    </section>
  );
}
