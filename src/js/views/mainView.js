import { deck } from "../controllerss.js";
import { state } from "../model.js";
// console.log(deck);
// deck = document.querySelector('.drawdeck');
// export const modal_content = document.querySelector(
//   '.modal-collection-content'
// );

class mainView {
  renderDrawDeck() {
    let newDecksContainer = document.querySelector(".new-decks-container");
    let selectedDeck = newDecksContainer.querySelector(".selected");
    console.log(selectedDeck.id);
    selectedDeck = state.playerDecks[selectedDeck.id]?.crs;

    console.log(state.selectedDeck.crs);

    let deck = document.querySelector(".drawdeck");
    deck.innerHTML =
      state.selectedDeck.crs?.length === undefined
        ? "No deck selected!"
        : state.selectedDeck.crs.length + "\ncards left";
  }

  drawfromDeck(number) {
    if (
      state.selectedDeck.crs?.length === 0 ||
      state.selectedDeck.crs?.length === undefined
    )
      return;

    let hand = document.querySelector(".player1-hand");
    let selectedDeck = state.selectedDeck.crs;
    let random = this.generateRandomNumbers(number);

    let enteringCard = ` <div class="cards field-cards" draggable="true"><img src="${state.selectedDeck.crs[random].url}" alt="" /></div>`;
    hand.insertAdjacentHTML("beforeend", enteringCard);

    console.log(state.selectedDeck.crs, state.selectedDeck.crs.length);

    state.selectedDeck.crs.splice(random, 1);
    console.log("new active deck: ", state.selectedDeck.crs);
    deck.innerHTML = `${state.selectedDeck.crs.length} \ncards left`;
  }

  renderMagiPile(id) {
    ///render magi pile///////
    let magiContainer = document.querySelector(".magi-container1");

    state.selectedDeck.magi = state.playerDecks[`${id}`].magi;
    magiContainer.innerHTML = "";

    // Insert only 1
    let testMagi = state.selectedDeck.magi[0];

    let insertMagi = document.createElement("div");
    insertMagi.innerHTML = ` <div class="magi-pile-${0}" draggable="false"><img src="${
      testMagi.url
    }}" alt="" /></div>`;
    magiContainer.prepend(insertMagi);

    /// Insert all 3
    // state.selectedDeck.magi.forEach((magi, i) => {
    //   let insertMagi = document.createElement('div');
    //   insertMagi.innerHTML = ` <div class="magi-pile-${i}" draggable="false"><img src="${magi.url}}" alt="" /></div>`;
    //   magiContainer.prepend(insertMagi);
    // });
  }
  // ${state.selectedDeck.magi[i]
  generateRandomNumbers() {
    if (
      state.selectedDeck.crs?.length == 0 ||
      state.selectedDeck.crs?.length === undefined
    )
      return;

    let randomNumber = Math.floor(
      Math.random() * state.selectedDeck.crs.length
    );
    console.log("length ", +state.selectedDeck.crs.length);

    return randomNumber;
  }

  resetGameContainers() {
    const gameArea = (document.querySelector(".gameArea1").innerHTML = "");
    const hand = (document.querySelector(".player1-hand").innerHTML = "");
    const relicAreaLeft = (document.querySelector(".relicsLeft1").innerHTML =
      "");
    const relicAreaRight = (document.querySelector(".relicsRight1").innerHTML =
      "");
  }
}

export default new mainView();
