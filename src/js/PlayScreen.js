import { state } from "./model";
import { DeckBtn, addDeckRegionImg } from "./decks";

export function PlayScreen({ selected, setSelected, handleSetPSopen, pSopen }) {
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
            handleSelectDeck={handleSelectDeck}
          />
          <RightScreenSection
            selected={selected}
            handleSetPSopen={handleSetPSopen}
          />
        </div>
      </div>
    </div>
  );
}

// function LeftScreenSection({ selected, handleSelectDeck }) {
//   // const numOfDecks = 9;
//   return (
//     <section class="modal-PlayScreen-LeftSection">
//       <h1 class="PStextArea">. Select a deck .</h1>

//       <div class="PlayScreen-DecksArea">
//         {Object.values(state.playerDecks).map(function (deck, i) {
//           console.log(deck);

//           return (
//             <DeckBtn
//               deck={deck}
//               // regionImg={regionImg}
//               i={i + 1}
//               selected={selected}
//               onSelectDeck={handleSelectDeck}
//             />
//           );
//         })}
//         <div class="PlayScreen-deckDock"></div>
//         <div class="PlayScreen-deckDock"></div>
//         <div class="PlayScreen-deckDock"></div>
//         <div class="PlayScreen-deckDock"></div>
//         <div class="PlayScreen-deckDock"></div>
//       </div>
//     </section>
//   );
// }

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
                  onSelectDeck={handleSelectDeck}
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
  // deck = deck.querySelector(".PSdeckBtn");

  // let deckId = deck.id.slice(7);
  // console.log(deckId);

  // const Region = this.addDeckRegionImg(deckId);

  // const PSmagisArea = document.querySelector(".PSmagisArea");

  // const DeckRegion = document.querySelector(".DeckRegion");

  // DeckRegion.innerHTML = Region + " selected";

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

function RightScreenSection({ selected, handleSetPSopen }) {
  let deck = selected;
  let regionSelected = addDeckRegionImg(deck);

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
        <button class="console_button" type="button" id="PlayScreen-btn-play">
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
  );
}
