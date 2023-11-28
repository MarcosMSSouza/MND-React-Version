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
//   );
// }
