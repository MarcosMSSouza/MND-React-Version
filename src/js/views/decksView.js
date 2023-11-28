import { state } from "../model.js";
import { builderArea } from "../controllers.js";
import mainView from "./mainView.js";
import collectionView from "./collectionView";
// import * as images from "../../src/img/cards/*.jpg";
import * as regionPng from "../../../src/img/regionSymbols/*.png";

class decksView {
  // New PlayScreen Deck btn
  renderPSdeckButtons(key) {
    let deckRegion = this.addDeckRegionImg(key);

    let deck_btn = document.querySelectorAll(".deck-btn");
    const PlayScreenDecksArea = document.querySelector(".PlayScreen-DecksArea");

    let deckName = state.playerDecks[key].name
      ? state.playerDecks[key].name
      : `DECK ${deck_btn.length}`;

    const newDeckDiv = document.createElement("div");
    newDeckDiv.classList.add("PSdeckParent");

    const newDeckMarkup = `    
    <div class="PSdeckBtn " contenteditabl="false" role="button" id=PSdeck-${key}> 
    <h1 class="PSdeck-title">${deckName}</h1>
    <div class="">
    
    </div>
    </div>
    
    `;

    newDeckDiv.innerHTML = newDeckMarkup;
    let firstEmptyDock = PlayScreenDecksArea.querySelector("div > :empty");

    this.addPSdecKBtnEvents(newDeckDiv);

    firstEmptyDock.prepend(newDeckDiv);

    let newPSdeckBtn = PlayScreenDecksArea.querySelector(`#PSdeck-${key}`);
    newPSdeckBtn.style.backgroundImage = `url('${regionPng[deckRegion]}')`;
    newPSdeckBtn.classList.add("PSDeckBtnImg");
    // console.log(newPSdeckBtn);
  }

  addPSdecKBtnEvents(deck) {
    deck.addEventListener("mouseover", () => {
      let audioUrl = require("url:../sounds/hoveringDeckBtns.mp3");
      let deckHover = new Audio(audioUrl);
      deckHover.play();
    });

    deck.addEventListener("click", (e) => {
      // Self select
      let PSdeckbtns = document.querySelectorAll(".PSdeckBtn");
      PSdeckbtns.forEach((btn) => btn.classList.remove("selected"));
      let parent = e.target.closest(".PSdeckBtn");
      parent.classList.add("selected");
      console.log(deck);

      this.updatePSdeckInfos(deck);
      this.showMagiWhenSelectingDeck(deck);

      let audioUrl = require("url:../sounds/deckSelected2.mp3");
      let deckSelected = new Audio(audioUrl);
      deckSelected.play();
    });
  }

  renderColDeckButtons(key) {
    let deckRegion = this.addDeckRegionImg(key);

    const new_decks_container = document.querySelector(".new-decks-container");
    let deckName = state.playerDecks[key].name;

    const newDeckMarkup = `    
      <div class="deck-btn " contenteditabl="false" role="button" id=${key}> 
        <h1 class="deck-title">${deckName}</h1>
        <div class="deck-btns-container">
          <button class="deck-inner-btn save-btn hidden" role="button">
            SAVE
          </button>
          <button class="deck-inner-btn edit-btn hidden">EDIT</button>
        </div>
      </div>
     
    `;

    new_decks_container.insertAdjacentHTML("beforeend", newDeckMarkup);

    let deck_btn = new_decks_container.querySelectorAll(".deck-btn");
    let newDeck = deck_btn[deck_btn.length - 1];

    this.addDeckButtonEvents(newDeck);

    let newSaveBtn = newDeck.querySelector(".save-btn");
    let newEditBtn = newDeck.querySelector(".edit-btn");

    this.addSaveBtnEvents(newSaveBtn);
    this.addEditBtnEvents(newEditBtn);

    // Set region background image
    let newColdeckBtn = new_decks_container.querySelector(`#${key}`);
    newColdeckBtn.style.backgroundImage = `url('${regionPng[deckRegion]}')`;
    newColdeckBtn.classList.add("PSDeckBtnImg");
  }

  renderNewDeckButton() {
    const new_decks_container = document.querySelector(".new-decks-container");
    let deck_btn = new_decks_container.querySelectorAll(".deck-btn");

    let deckName = deck_btn.length + 1;

    const newDeckMarkup = `    
      <div class="deck-btn " contenteditabl="false" role="button" id=deck_${
        deck_btn.length + 1
      }> 
        <h1 class="deck-title">DECK ${deckName}</h1>
        <div class="deck-btns-container">
          <button class="deck-inner-btn save-btn hidden" role="button">
            SAVE
          </button>
          <button class="deck-inner-btn edit-btn hidden">EDIT</button>
        </div>
      </div>
     
    `;

    new_decks_container.insertAdjacentHTML("beforeend", newDeckMarkup);

    deck_btn = new_decks_container.querySelectorAll(".deck-btn");
    let newDeck = deck_btn[deck_btn.length - 1];

    this.addDeckButtonEvents(newDeck);

    let newSaveBtn = newDeck.querySelector(".save-btn");
    let newEditBtn = newDeck.querySelector(".edit-btn");

    this.addSaveBtnEvents(newSaveBtn);
    this.addEditBtnEvents(newEditBtn);
  }

  // Deck Button
  addDeckButtonEvents(deck) {
    try {
      let deck_btn = document.querySelectorAll(".deck-btn");

      deck.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log(`${deck.id} clicked`);

        // Self btn
        deck_btn = document.querySelectorAll(".deck-btn");
        deck_btn.forEach((btn) => btn.classList.remove("selected"));
        deck.classList.add("selected");

        // Sound
        let audioUrl = require("url:../sounds/deckSelected2.mp3");
        let deckSelected2 = new Audio(audioUrl);
        deckSelected2.play();

        // Save btn
        let save_btn = document.querySelectorAll(".save-btn");
        save_btn.forEach((btn) => btn.classList.add("hidden"));
        deck.querySelector(".save-btn").classList.remove("hidden");

        // Edit btn
        let edit_btn = document.querySelectorAll(".edit-btn");
        edit_btn.forEach((btn) => btn.classList.add("hidden"));
        // e.target.querySelector('.edit-btn').classList.remove('hidden');
        deck.querySelector(".edit-btn").classList.remove("hidden");

        console.log(state.deckEditor.changedCard);
        console.log(state.playerDecks[deck.id]?.magi);

        builderArea.innerHTML = "";

        // Populate builder when selecting a Deck
        state.playerDecks[deck.id]?.magi.forEach((mag) =>
          collectionView.populateBuilder(mag)
        );
        state.playerDecks[deck.id]?.crs.forEach((card) =>
          collectionView.populateBuilder(card)
        );

        this.CardTypesCounter();
      });
    } catch (err) {
      console.error("Erro adicionando events com addDeckButtonEvents !");
    }
  }

  // Save btn
  addSaveBtnEvents(btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      console.log("SAVE btn clicked");

      console.log(state.deckEditor.changedCard);
      if (!state.deckEditor.changedCard) {
        console.log("nada mudou!");
        return;
      }

      collectionView.updateDecktoSave();

      console.log("save clicked", e.target.closest(".selected"));

      let parent = e.target.closest(".selected");

      state.playerDecks.teste = 2;

      if (!state.playerDecks[parent.id]) {
        state.playerDecks[parent.id] = [];
        state.playerDecks[parent.id].magi = [];
        state.playerDecks[parent.id].name = "";
        state.playerDecks[parent.id].crs = [];
      }

      state.playerDecks[parent.id].magi = [];
      state.playerDecks[parent.id].magi = state.deckEditor.curMagi;
      state.playerDecks[parent.id].crs = [];
      state.playerDecks[parent.id].crs = state.deckEditor.curCrs;
      state.playerDecks[parent.id].name = [];
      state.playerDecks[parent.id].name = btn.id;

      let deckRegion = this.addDeckRegionImg(parent.id);
      console.log(parent.id, deckRegion);
      parent.style.backgroundImage = `url('${regionPng[deckRegion]}')`;
      parent.classList.add("PSDeckBtnImg");

      console.log(
        `DECK ${parent.id} :`,
        state.playerDecks[parent.id].magi,
        state.playerDecks[parent.id].crs
      );
      let drawdeck = document.querySelector(".drawdeck");

      mainView.renderDrawDeck();
      mainView.renderMagiPile(parent.id);

      const PlayScreenDecks = document.querySelectorAll(".PSdeckBtn ");

      for (let deck of PlayScreenDecks) {
        let deckId = deck.id.slice(7);

        // console.log(deckId, 'e', parent.id);
        if (parent.id === deckId) {
          deck.closest(".PSdeckParent").remove();
          deck.remove();
        }
      }
      this.renderPSdeckButtons(parent.id);

      mainView.resetGameContainers();
      state.deckEditor.changedCard = false;
      drawdeck.innerHTML = `${state.selectedDeck.crs.length}`;
      console.log(state.deckEditor.changedCard);
    });
  }

  // Edit btn

  addEditBtnEvents(btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      console.log("EDIT btn clicked");
      let builder = document.querySelector(".modal-collection-builder");
      // let deck_btn = document.querySelectorAll('.deck-btn');

      state.deckEditor.editable = !state.deckEditor.editable;
      // builderArea.classList.toggle('selected');
      console.log(state.deckEditor.editable);
      builder.classList.toggle("selected");
    });
  }

  addDeckRegionImg(deckID) {
    let curDeck = state.playerDecks[deckID].magi;

    let magiTypes = [];
    curDeck.forEach((magi) => {
      magiTypes.push(magi.Region);
    });
    console.log(deckID, magiTypes);
    let deckRegion =
      magiTypes[0] === magiTypes[1] ? magiTypes[0] : magiTypes[2];

    return magiTypes.length > 2 ? deckRegion : magiTypes[0];
  }

  showMagiWhenSelectingDeck(deck) {
    deck = deck.querySelector(".PSdeckBtn");

    let deckId = deck.id.slice(7);
    console.log(deckId);

    const Region = this.addDeckRegionImg(deckId);

    const PSmagisArea = document.querySelector(".PSmagisArea");

    const DeckRegion = document.querySelector(".DeckRegion");

    DeckRegion.innerHTML = Region + " selected";

    let magis = state.playerDecks[deckId].magi;

    PSmagisArea.innerHTML = "";
    magis.forEach((magi, i) => {
      let insertMagi = document.createElement("div");

      insertMagi.innerHTML = ` <div class=" PSmagi PSmagi-pile-${i}" draggable="false"><img src="${magi.url}}" alt="" /></div>`;
      PSmagisArea.prepend(insertMagi);
    });
  }

  updatePSdeckInfos(deck) {
    const totalCardsEl = document.querySelector(".totalCards");

    deck = deck.querySelector(".PSdeckBtn");
    let deckId = deck.id.slice(7);
    console.log(deckId);

    let deckNumber = state.playerDecks[deckId].crs.length;

    totalCardsEl.innerHTML = deckNumber + " cards";
  }

  CardTypesCounter() {
    let builderCollectionCards = document.querySelectorAll(
      ".builder-collection-cards"
    );

    let magi = 0;
    let relics = 0;
    let creatures = 0;
    let spells = 0;

    builderCollectionCards.forEach((card) => {
      if (card.classList.contains("magi")) magi++;
      if (card.classList.contains("relic")) relics++;
      if (card.classList.contains("spell")) spells++;
      if (card.classList.contains("creature")) creatures++;
    });

    let TypeCounters = document.querySelector(".TypeCounters");

    TypeCounters.innerHTML = `M = ${magi} / C = ${creatures} /  R = ${relics} / S = ${spells} `;

    console.log("Type Counter: ", magi, relics, creatures, spells);
  }
}

export default new decksView();
