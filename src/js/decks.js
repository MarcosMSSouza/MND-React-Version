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
  cardsOnEditor,
  setCardsOnEditor,
}) {
  // const [selected, setSelected] = useState("deck_1");
  // console.log(selected);
  // let url = `./img/regionSymbols/Arderial.png`;
  // let deckimg = regionPng;
  function handleSelectDeck(id) {
    setSelected(state.playerDecks[id]);
    selectedID = id;
    // console.log(setSelected);
    setSelectedID(selectedID);
    console.log("test", selectedID);
  }
  // let deckRegion = addDeckRegionImg(deck);

  return (
    <div className="modal-collection-decks">
      <div className="decks-title">DECKS</div>

      <NewDeck
        setSelectedID={setSelectedID}
        setSelected={setSelected}
        handleSelectDeck={handleSelectDeck}
        setCardsOnEditor={setCardsOnEditor}
      />
      <DeleteDeck />

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
                cardsOnEditor={cardsOnEditor}
                setCardsOnEditor={setCardsOnEditor}
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

function NewDeck({
  setSelected,
  setSelectedID,
  handleSelectDeck,
  setCardsOnEditor,
}) {
  function checkPrimeirodecksemnome() {
    let firstNamelessDeck = Object.values(state.playerDecks).find(
      (deck) => !deck.name
    );
    let id = firstNamelessDeck.id;
    firstNamelessDeck.name = id;
    console.log(id);
    // setSelectedID(primeirodecksemnome.id);
    // setSelected(primeirodecksemnome.id);

    handleSelectDeck(id);
    let onEditor = [state.playerDecks[id]];
    setCardsOnEditor(onEditor);
  }
  return (
    <button
      className="console_button"
      id="newDeck-btn"
      type="button"
      onClick={() => {
        checkPrimeirodecksemnome();
      }}
    >
      New Deck
    </button>
  );
}

function DeleteDeck() {
  return (
    <button className="console_button" id="editDeck-btn" type="button">
      Delete Deck
    </button>
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

export function DeckBtn({
  deck,
  i,
  selected,
  onSelectDeck,
  PSdeck,
  cardsOnEditor,
  setCardsOnEditor,
}) {
  let deckName = deck.name;
  let deckRegion = addDeckRegionImg(deck);

  // console.log(selected.id);

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
        {/* {!PSdeck && (
          <>
            {id === selected.id && (
              <>
                <SaveBtn
                  id={id}
                  cardsOnEditor={cardsOnEditor}
                  setCardsOnEditor={setCardsOnEditor}
                />
                <EditBtn />
              </>
            )}
          </>
        )} */}
      </div>
    </div>
  );
}
//   );
export function addDeckRegionImg(deck) {
  let curDeck = deck.magi;

  let magiTypes = curDeck.map((magi) => {
    return magi.Region === "Kybar's Teeth" ? "Kybar" : magi.Region;
  });
  // console.log(magiTypes);

  let deckRegion = magiTypes[0] === magiTypes[1] ? magiTypes[0] : magiTypes[2];
  // console.log(deckRegion);
  return magiTypes.length > 2 ? deckRegion : magiTypes[0];
}
// }

function SaveBtn({ id, selected, cardsOnEditor, setCardsOnEditor }) {
  // console.log("SAVE btn clicked");
  function handleSaveDeck() {
    selected.playerDecks[id] = state.playerDecks[id].magi;
  }
  return (
    <button
      className="deck-inner-btn save-btn "
      onClick={() => {
        handleSaveDeck();
      }}
    >
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
