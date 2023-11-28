import { convertedMNDcards } from "./cards.js"; ///////////////
import cloneDeep from "lodash/cloneDeep";
// import { MAGI } from './cards.js'; ///////////////

export const state = {
  player1Hand: [],
  player1Board: [],
  selectedDeck: {
    magi: [],
    crs: [],
  },
  tempDeck: {
    magi: [],
    crs: [],
  },
  deckEditor: {
    editable: false,
    changedCard: false,
    curMagi: [],
    curCrs: [],
  },

  playerDecks: {
    deck_1: {
      name: "Warrada's Deck",
      magi: [
        convertedMNDcards.warrada,
        convertedMNDcards.hrada,
        convertedMNDcards.marella,
      ],
      crs: [
        convertedMNDcards.equilibrate,
        convertedMNDcards.inyx,
        convertedMNDcards.jip,
        convertedMNDcards.cataclysm,
        convertedMNDcards.wildfire,
      ],
    },
    deck_2: {
      name: "deck 2",
      magi: [
        convertedMNDcards.sorrowing_ogar,
        convertedMNDcards.prek,
        convertedMNDcards.trygar,
      ],
      crs: [
        convertedMNDcards.corrupt,
        convertedMNDcards.wasperine,
        convertedMNDcards.wildfire,
        convertedMNDcards.sarf,
        convertedMNDcards.corrupt,
        convertedMNDcards.wasperine,
      ],
    },
    deck_3: {
      name: " test Deck",
      magi: [
        convertedMNDcards.quilla,
        convertedMNDcards.tuku,
        convertedMNDcards.voda,
      ],
      crs: [
        convertedMNDcards.corrupt,
        convertedMNDcards.wasperine,
        convertedMNDcards.wildfire,
        convertedMNDcards.sarf,
        convertedMNDcards.corrupt,
        convertedMNDcards.wasperine,
        convertedMNDcards.corrupt,
        convertedMNDcards.wasperine,
        convertedMNDcards.wildfire,
      ],
    },
    deck_4: {
      name: " Arderial",
      magi: [
        convertedMNDcards.kalius,
        convertedMNDcards.sorreah,
        convertedMNDcards.elios,
      ],
      crs: [
        convertedMNDcards.elder_vellup,
        convertedMNDcards.wasperine,
        convertedMNDcards.flutter_yup,
        convertedMNDcards.rayalon,
        convertedMNDcards.corrupt,
        convertedMNDcards.tranquility,
        convertedMNDcards.corrupt,
        convertedMNDcards.warlum,
        convertedMNDcards.wildfire,
        convertedMNDcards.elder_vellup,
        convertedMNDcards.wasperine,
        convertedMNDcards.flutter_yup,
        convertedMNDcards.rayalon,
        convertedMNDcards.corrupt,
        convertedMNDcards.tranquility,
        convertedMNDcards.corrupt,
        convertedMNDcards.warlum,
        convertedMNDcards.wildfire,
        convertedMNDcards.elder_vellup,
        convertedMNDcards.wasperine,
        convertedMNDcards.flutter_yup,
        convertedMNDcards.rayalon,
        convertedMNDcards.corrupt,
        convertedMNDcards.tranquility,
        convertedMNDcards.corrupt,
        convertedMNDcards.warlum,
        convertedMNDcards.wildfire,
      ],
    },
  },
};

///////////////PROGRESS BAR //////////////

// const progressBar = document.getElementsByClassName("progress-bar")[0];

// const progressBarInterval = setInterval(() => {
//   const computedStyle = getComputedStyle(progressBar);
//   let width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
//   if (width < 110) progressBar.style.setProperty("--width", width + 0.1);
//   const modal_loadingScreen = document.getElementById("modal-loadingScreen");
//   const modal_PlayScreen = document.getElementById("modal-PlayScreen");
//   if (width >= 100) {
//     clearInterval(progressBarInterval);
//     modal_loadingScreen.classList.add("hidden");
//     modal_PlayScreen.classList.remove("hidden");
//   }
// }, 5);

// console.log(cloneDeep);
