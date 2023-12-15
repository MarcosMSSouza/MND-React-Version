import { convertedMNDcards } from "./cards.js"; ///////////////
import cloneDeep from "lodash/cloneDeep";
// import { MAGI } from './cards.js'; ///////////////

export const state = {
  playerHand1: [],
  playerHand2: [],
  player1Board: [],
  player2Board: [],
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
    wholeDeck: [],
    curMagi: [],
    curCrs: [],
  },

  playerDecks: {
    deck_1: {
      id: "deck_1",
      name: "Warrada's Deck",
      magi: [
        convertedMNDcards.sperri,
        convertedMNDcards.yaki,
        convertedMNDcards.evu,
        // convertedMNDcards.marella,
      ],
      crs: [
        convertedMNDcards.carillion,
        convertedMNDcards.jip,
        convertedMNDcards.grow,
        convertedMNDcards.equilibrate,
        convertedMNDcards.weebo,
        convertedMNDcards.energy_band,
        convertedMNDcards.forest_blessing,
      ],
    },
    deck_2: {
      id: "deck_2",
      name: "deck 2",
      magi: [
        convertedMNDcards.warrada,
        convertedMNDcards.hrada,
        // convertedMNDcards.trygar,
      ],
      crs: [
        convertedMNDcards.core_grag,
        // convertedMNDcards.wasperine,
        // convertedMNDcards.wildfire,
        convertedMNDcards.wudge,
        convertedMNDcards.szalak,
        // convertedMNDcards.corrupt,
      ],
    },
    deck_3: {
      id: "deck_3",
      name: " test Deck",
      magi: [
        convertedMNDcards.iain,
        convertedMNDcards.kiersta,
        convertedMNDcards.ookami,
      ],
      crs: [
        convertedMNDcards.terkoz,
        convertedMNDcards.lahalou,
        convertedMNDcards.janx,
        convertedMNDcards.jungle_hyren,
        // convertedMNDcards.terkoz,
        // convertedMNDcards.ookamis_drums,
        convertedMNDcards.bloom,
      ],
    },
    deck_4: {
      id: "deck_4",
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

        convertedMNDcards.warlum,
        convertedMNDcards.wildfire,
      ],
    },
    deck_5: { id: "deck_5", name: "", magi: [], crs: [] },
    deck_6: { id: "deck_6", name: "", magi: [], crs: [] },
    deck_7: { id: "deck_7", name: "", magi: [], crs: [] },
    deck_8: { id: "deck_8", name: "", magi: [], crs: [] },
    deck_9: { id: "deck_9", name: "", magi: [], crs: [] },
    // deck_6: {},
    // deck_7: {},
    // deck_8: {},
    // deck_9: {},
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
