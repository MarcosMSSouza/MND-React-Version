import { state } from "./model";
// import decksView from "./js/views/decksView";

// console.log(state.decks);

export function renderColDecksss() {
  console.log(state.playerDecks);
  // console.log("hiiiiiii");
}

// function renderAlldecks() {
//     console.log(key);
//   for (let key in state.playerDecks) {
//     let keyName = key;
//     console.log(state.playerDecks[key].crs);
//     decksView.renderPSdeckButtons(keyName);+
//     decksView.renderColDeckButtons(keyName);
//   }
export function CollectionDecks({
  state,
  regionImg,
  selected,
  setSelected,
  handleSetPSopen,
}) {
  // const [selected, setSelected] = useState("deck_1");
  // console.log(selected);
  // let url = `./img/regionSymbols/Arderial.png`;
  // let deckimg = regionPng;
  function handleSelectDeck(id) {
    setSelected(id);
    // console.log(selected);
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
        {Object.values(state.playerDecks).map((deck, i) => (
          <DeckBtn
            deck={deck}
            regionImg={regionImg}
            i={i + 1}
            selected={selected}
            onSelectDeck={handleSelectDeck}
          />
        ))}
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

export function DeckBtn({ deck, i, selected, onSelectDeck }) {
  let deckName = deck.name;
  let deckRegion = addDeckRegionImg(deck);

  // console.log(regionPng);

  let id = `deck_${i}`;
  // console.log(imageList[1]);

  return (
    <div
      className={`deck-btn ${deckRegion}  ${id === selected ? "selected" : ""}`}
      // id={deckRegion}
      // value={id}
      id={id}
      onClick={(e) => onSelectDeck(e.target.id)}
      // style={{ backgroundImage: 'url("/src/img/regionSymbols/Core.png")' }}
    >
      <h1 className="deck-title" style={{ pointerEvents: "none" }}>
        {deckName}
      </h1>
      <div className="deck-btns-container">
        <button className="deck-inner-btn save-btn ">SAVE</button>
        <button className="deck-inner-btn edit-btn ">EDIT</button>
      </div>
    </div>
  );
}
//   );
function addDeckRegionImg(deck) {
  let curDeck = deck.magi;

  let magiTypes = curDeck.map((magi) => magi.Region);
  // console.log(magiTypes);

  let deckRegion = magiTypes[0] === magiTypes[1] ? magiTypes[0] : magiTypes[2];

  return magiTypes.length > 2 ? deckRegion : magiTypes[0];
}
// }

export function CreateCard({ card, builder }) {
  return (
    <div cardtype={card.Type} key={card.Name} className="cardtest">
      <img
        className={builder ? "builder-collection-cards " : "collection-cards"}
        src={card.url}
        id={card.id}
        dataset={card.Name}
        alt={card.Name}
      />
    </div>
  );
}
