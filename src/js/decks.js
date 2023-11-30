import { state } from "./model";
// import decksView from "./js/views/decksView";

// console.log(state.decks);

// export function renderColDecksss() {
//   console.log(state.playerDecks);
//   // console.log("hiiiiiii");
// }

// function renderAlldecks() {
//     console.log(key);
//   for (let key in state.playerDecks) {
//     let keyName = key;
//     console.log(state.playerDecks[key].crs);
//     decksView.renderPSdeckButtons(keyName);+
//     decksView.renderColDeckButtons(keyName);
export let selectedID;
//   }
export function CollectionDecks({
  state,
  regionImg,
  selected,
  setSelected,
  handleSetPSopen,
  setSelectedID,
}) {
  // const [selected, setSelected] = useState("deck_1");
  // console.log(selected);
  // let url = `./img/regionSymbols/Arderial.png`;
  // let deckimg = regionPng;
  function handleSelectDeck(id) {
    setSelected(state.playerDecks[id]);
    selectedID = id;
    console.log(setSelected);
    setSelectedID(selectedID);
  }
  // let deckRegion = addDeckRegionImg(deck);

  return (
    <div className="modal-collection-decks">
      <div className="decks-title">DECKS</div>

      <button className="console_button" id="newDeck-btn" type="button">
        New Deck
      </button>

      <button className="console_button" id="editDeck-btn" type="button">
        Delete Deck
      </button>

      {/* <!-- //////// DECKS CONTAINER ///////////// --> */}
      <div className="new-decks-container">
        {Object.values(state.playerDecks).map(
          (deck, i) =>
            deck.name && (
              <DeckBtn
                deck={deck}
                regionImg={regionImg}
                i={i + 1}
                selected={selected}
                onSelectDeck={handleSelectDeck}
              />
            )
        )}
      </div>

      <button
        className="console_button"
        type="button"
        id="btn-collection-back"
        onClick={() => handleSetPSopen()}
      >
        BACK
      </button>
    </div>
  );
}
//   let new_decks_container = document.querySelector(".new-decks-container");
//   deck_btn = new_decks_container.querySelectorAll(".deck-btn");
//   deck_btn[0].classList.add("selected");
// }

// function renderDeckButton() {
//   deck_btn.forEach((deck, i) => {
//     deck.setAttribute("id", `deck_${i + 1}`);
//     decksView.addDeckButtonEvents(deck, i);
//   });
// }

// function DeckCol({ key }) {
//   return (
//     <div className="deck-btn " role="button" id={key}>
//       <h1 className="deck-title">{deckName}</h1>
//       <div className="deck-btns-container">
//         <button className="deck-inner-btn save-btn hidden" role="button">
//           SAVE
//         </button>
//         <button className="deck-inner-btn edit-btn hidden">EDIT</button>
//       </div>
//     </div>

export function DeckBtn({ deck, i, selected, onSelectDeck, PSdeck }) {
  let deckName = deck.name;
  let deckRegion = addDeckRegionImg(deck);

  console.log(selected.id);

  let id = `deck_${i}`;
  // console.log(id);

  return (
    <div
      className={`deck-btn ${deckRegion}  ${
        id === selected.id ? "selected" : ""
      } ${PSdeck ? "PSdeckBtn" : ""}`}
      id={id}
      onClick={(e) => onSelectDeck(e.target.id)}
      // style={{ backgroundImage: 'url("/src/img/regionSymbols/Core.png")' }}
    >
      <h1 className="deck-title" style={{ pointerEvents: "none" }}>
        {deckName}
      </h1>
      <div className="deck-btns-container">
        {!PSdeck && (
          <>
            {id === selected.id && (
              <>
                <SaveBtn />
                <EditBtn />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
//   );
export function addDeckRegionImg(deck) {
  let curDeck = deck.magi;

  let magiTypes = curDeck.map((magi) => magi.Region);
  // console.log(magiTypes);

  let deckRegion = magiTypes[0] === magiTypes[1] ? magiTypes[0] : magiTypes[2];

  return magiTypes.length > 2 ? deckRegion : magiTypes[0];
}
// }

// export function CreateCard({
//   card,
//   builder,
//   selected,
//   setSelected,
//   updateCardsOnEditor,
//   setCardsOnEditor,
// }) {
//   function handleAddtoEditor(selected) {
//     // let deck = state.playerDecks[selected];
//     if (card.Type === "magi") selected.magi = [...selected.magi, card];
//     else selected.crs = [...selected.crs, card];
//     let selectedDeck = [...selected.magi, ...selected.crs];
//     console.log(selectedDeck);
//     // setSelected((selected) => selectedDeck);
//     // setCardsOnEditor(selectedDeck);
//     // handleUpdateCardsOnEditor();
//     // setSelected(selected);
//     // setState(selected);
//     // card.Type === 'magi' &&
//   }

//   return (
//     <div cardtype={card.Type} key={card.Name} className="cardtest">
//       <img
//         className={builder ? "builder-collection-cards " : "collection-cards"}
//         src={card.url}
//         id={card.id}
//         dataset={card.Name}
//         alt={card.Name}
//         value={card}
//         onClick={() => {
//           handleAddtoEditor(selected);
//           // setSelected((selected) => selected);
//           // setSelected;

//           // handleUpdateCardsOnEditor();
//         }}
//       />
//     </div>
//   );
// }

function SaveBtn() {
  console.log("SAVE btn clicked");
  return (
    <button className="deck-inner-btn save-btn " onClick={() => {}}>
      SAVE
    </button>
  );
}

function EditBtn() {
  return <button className="deck-inner-btn edit-btn ">EDIT</button>;
}

// function handleAddtoEditor(card, selected, setSelected) {
//   // let deck = state.playerDecks[selected];
//   if (card.Type === "magi") selected.magi = [...selected.magi, card];
//   else selected.crs = [...selected.crs, card];

//   setSelected((selected) => selected);
//   console.log(selected);
//   // card.Type === 'magi' &&
// }
