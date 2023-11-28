import decksView from "./views/decksView.js";
// const glob = require('glob');
import mainView from "./views/mainView.js";
import collectionView from "./views/collectionView.js";
import { convertedMNDcards } from "./cards.js";
import { state } from "../model.js";
import * as buttons from "./buttons.js";
import { regionsViewObj } from "./views/collectionView.js";
// import * as images from '../../src/img/cards/*.jpg';
import Sortable from "sortablejs";

const gameArea = document.querySelector(".gameArea1");
const hand = document.querySelector(".player1-hand");
const hand2 = document.querySelector(".player2-hand");
const relicAreaLeft = document.querySelector(".relicsLeft1");
const relicAreaRight = document.querySelector(".relicsRight1");
console.log(relicAreaRight);
export const deck = document.querySelector(".drawdeck");
const allregionbtn = document.querySelectorAll(".region-btn");
let builderCollectionCards = document.querySelectorAll(
  ".builder-collection-cards"
);
let deck_btn = document.querySelectorAll(".deck-btn");

export const builderArea = document.querySelector(".builder-area");
const modal_content = document.querySelector(".modal-collection-content");

//////

// import fs from 'fs';
// import fetch from 'node-fetch';
// console.log('aaa');
// let url = 'https://lackeyccg.com/magination/medium/Furok.jpg';

// let testttt = fetch(url);
// testttt.then(response => {
//   console.log(response);
// });

// function filenameToUrl(filename) {
//   return `https://lackeyccg.com/magination/medium/${filename}.jpg`;
// }

// const request = fetch(filenameToUrl('Furok'));
// request.then(function (response) {
//   console.log(request);
// });

// async function fectTeste() {
//   const request = await fetch(filenameToUrl('Furok'));
//   console.log(request);
// const data = await request.buffer();
// fs.writeFileSync(
//   './public/images/cards/' + camelCase(rawName) + '.jpg',
//   data,
//   {
//     flag: 'w',
//   }
// );
// }

// fectTeste();

console.log("heloooooooooooooooooo");
/////////////////
new Sortable(hand, {
  group: "shared",
  animation: 260,
  chosenclass: "boxShadow",
  dragClass: "drag",
});

new Sortable(hand2, {
  group: "shared",
  animation: 260,
  chosenclass: "boxShadow",
  dragClass: "drag",
});

new Sortable(gameArea, {
  group: "shared",
  animation: 260,
  chosenclass: "boxShadow",
  dragClass: "drag",
  // ghostClass: false,
});

new Sortable(relicAreaLeft, {
  group: "shared",
  animation: 260,
  chosenclass: "boxShadow",
  dragClass: "drag",
});

new Sortable(relicAreaRight, {
  group: "shared",
  animation: 260,
  chosenclass: "boxShadow",
  dragClass: "drag",
});

/////////// INIT //////////////////
init();

function init() {
  modal_content.innerHTML = "";
  builderArea.innerHTML = "";

  state.selectedDeck.magi = state.playerDecks.deck_1.magi;
  state.selectedDeck.crs = state.playerDecks.deck_1.crs;

  renderCollectionREGIONS();

  renderBuilder();

  renderAlldecks();

  decksView.CardTypesCounter();
  renderDeckButton();

  mainView.renderDrawDeck();
  mainView.renderMagiPile("deck_1");

  zoomOnHover();

  //
}

const allCollectionCards = document.querySelectorAll(".collection-cards");
allCollectionCards.forEach((card) => {
  collectionView.addCollectionCardsEvents(card);
});

// console.log('hi');
deck.addEventListener("click", () => mainView.drawfromDeck());

///////////////////////////////////////////

function renderAlldecks() {
  for (let key in state.playerDecks) {
    console.log(key);
    let keyName = key;
    console.log(state.playerDecks[key].crs);
    decksView.renderPSdeckButtons(keyName);
    decksView.renderColDeckButtons(keyName);
  }

  let new_decks_container = document.querySelector(".new-decks-container");
  deck_btn = new_decks_container.querySelectorAll(".deck-btn");
  deck_btn[0].classList.add("selected");
}

function renderCollectionREGIONS() {
  Object.values(convertedMNDcards).forEach((card) => {
    let regexPatern = /[^A-Za-z0-9_]/g;

    if (card.Name.includes("spirit_of")) {
      console.log(card.Name);
      card.Name = card.Name.toLowerCase().replaceAll("_", "");
      console.log(card.Name);
    }

    if (card.Set !== "Unlimited") {
      card.Name = card.Name.toLowerCase().replaceAll(" ", "_");
    }
    card.Name = card.Name.replaceAll(" ", "_").replace(regexPatern, "");
    // console.log(card.Name);

    if (
      card.Set === "UnreleasedPromos" ||
      card.Set === "Daybreak" ||
      card.Set === "Traitor's Reach"
    )
      return;
    // if (card.Set === 'Voice of the Storms') console.log(card.Name);
    ////// teste
    // let testeURL = images[card.Name];
    // if (testeURL === undefined) {
    //   let regexPatern = /[^A-Za-z0-9]/g;
    //   card.Name = card.Name.toLowerCase();

    //   // card.url = images[card.Name];
    //   card.url = `https://lackeyccg.com/magination/medium/${card.Name}.jpg`;
    //   return;
    // }
    ////////////

    card.url = `https://lackeyccg.com/magination/medium/${card.Name}.jpg`;
    ////////cl

    // card.Name = card.Name.toLowerCase();

    // let secondSlice = testeURL.indexOf('.');
    // let finalName = testeURL.slice(22, secondSlice);
    let finalName = card.Name;

    // card.url = images[finalName];
    let prefix = `${card.Type[0].toLowerCase()}`;
    // if (card.Region === "d'Resh") {
    //   finalName = `${card.Name}_d${prefix}_vs`;
    // }
    // if (card.Region === 'Bograth') {
    //   finalName = `bograth_${card.Name}`;
    // }
    // if (card.Set.includes('Voice')) {
    //   console.log(card.Name);
    // }
    // if (card.Region === 'Paradwyn') {
    //   if (card.Set === 'Voice of the Storms') {
    //     finalName = finalName.replaceAll('_', '');
    //     finalName = `${finalName}_p${prefix}_vs`;
    //     console.log(finalName);
    //   }
    //   // }
    //   else {
    //     finalName = `paradwyn_${finalName}`;
    //   }
    // }

    if (card.Set === "Voice of the Storms") {
      finalName = finalName.replaceAll("_", "");
      finalName = `${finalName}_${card.Region[0].toLowerCase()}${prefix}_vs`;
      console.log(finalName);
    }
    // }
    // else {
    //   if (card.Region === 'Paradwyn') finalName = `paradwyn_${finalName}`;

    if (card.Set === "Nightmare's Dawn") {
      finalName = `${card.Region.toLowerCase()}_${finalName}`;
      console.log(card.Region);
      if (card.Region === "Kybar's Teeth") {
        finalName = `kybars_teeth_${card.Name.toLowerCase()}`;
      }
    }
    //

    if (card.Region === "Nar") {
      finalName = `${card.Name}_r${prefix}_vs`;
    }
    if (card.Set === "Unlimited" || card.Rarity === "Limited")
      finalName = finalName[0].toUpperCase() + finalName.slice(1);
    card.url = `https://lackeyccg.com/magination/medium/${finalName}.jpg`;
    // console.log(card.url);
    /////////////////////
    collectionView.populateCollectionREGIONS(card);
  });
}

/// CHANGE DECK 1 TO ACTIVE DECK LATER //////////////////
export function renderBuilder() {
  state.playerDecks.deck_1.magi.forEach((card) => {
    collectionView.populateBuilder(card);
  });
  state.playerDecks.deck_1.crs.forEach((card) => {
    collectionView.populateBuilder(card);
  });
}

function renderDeckButton() {
  deck_btn.forEach((deck, i) => {
    deck.setAttribute("id", `deck_${i + 1}`);
    decksView.addDeckButtonEvents(deck, i);
  });
}

// function renderSaveBtn() {
//   let save_btn = document.querySelectorAll('.save-btn');

//   save_btn.forEach(btn => {
//     btn.classList.add('hidden');
//     decksView.addSaveBtnEvents(btn);
//   });
// }

// function renderEditBtn() {
//   let edit_btn = document.querySelectorAll('.edit-btn');

//   edit_btn.forEach(btn => {
//     btn.classList.add('hidden');
//     decksView.addEditBtnEvents(btn);
//   });
// }

renderRegionsBtns();

function renderRegionsBtns() {
  allregionbtn.forEach((btn, i) => {
    regionsViewObj.addRegionButtonEvents(btn);
  });
}

/////////////// drawFromDeck////////////////////////

////////// make Draggable //////////
// function makeDraggable() {
//   draggables.forEach(draggable => {
//     // console.log(this);
//     draggable.addEventListener('dragstart', () => {
//       draggable.classList.add('dragging');
//     });

//     draggable.addEventListener('dragend', () => {
//       draggable.classList.remove('dragging');
//     });
//   });
// }

///////////

// deck.addEventListener('click', () => drawfromDeck());
//////////////// Draggin events /////////////////
//////////////// OPÇÃO 2 - PRA TESTAR DE NOVO DEPOIS /////////////////
/*

dragareas.forEach(dragarea => {
  dragarea.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(dragarea, e.clientX);
    const dragging = document.querySelector('.dragging');
    // console.log(afterElement);
    if (afterElement == null) {
      console.log(dragging);
      dragarea.appendChild(dragging);
    } else {
      dragarea.insertBefore(dragging, afterElement);
    }
    // console.log(dragging);
  });
});

function getDragAfterElement(dragarea, x) {
  const draggableElements = [
    ...dragarea.querySelectorAll('.cards:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.x - box.width / 2;
      console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}
*/

// ///////// Zoom on Hover //////////

// function zoomOnHover() {
//   let allCollectionCards = document.querySelectorAll(".collection-cards");

//   let draggable = document.querySelectorAll(".field-cards");

//   allCollectionCards.forEach((card) => {
//     card.addEventListener("mouseover", () => {
//       let audioUrl = require("url:./sounds/hoveringCardSound.mp3");
//       let hoveringCardSound = new Audio(audioUrl);
//       hoveringCardSound.play();
//       card.classList.add("zoom");
//     });
//   });

//   allCollectionCards.forEach((card) =>
//     addEventListener("mouseout", () => {
//       card.classList.remove("zoom");
//     })
//   );
// }

///////////////////////
