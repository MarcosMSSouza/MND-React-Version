import { convertedMNDcards } from "./cards.js"; ///////////////
// import cloneDeep from "lodash/cloneDeep";

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
        convertedMNDcards.Sperri,
        convertedMNDcards.Yaki,
        convertedMNDcards.Evu,
      ],
      crs: [
        convertedMNDcards.Carillion,
        convertedMNDcards.Jip,
        convertedMNDcards.Grow,
        convertedMNDcards.Equilibrate,
        // convertedMNDcards.Weebo,
        convertedMNDcards["Energy Band"],
        convertedMNDcards["Forest Blessing"],
      ],
    },
    deck_2: {
      id: "deck_2",
      name: "deck 2",
      magi: [
        convertedMNDcards.Hrada,
        convertedMNDcards.Warrada,
        convertedMNDcards.Trygar,
      ],
      crs: [
        convertedMNDcards["Core Grag"],
        convertedMNDcards.Wasperine,
        convertedMNDcards["Jungle Jile"],
        convertedMNDcards.Wudge,
        convertedMNDcards.Szalak,
        convertedMNDcards["Thunder Hyren"],
        // convertedMNDcards.Corrupt,
      ],
    },
    deck_3: {
      id: "deck_3",
      name: " Paradwyn's Deck",
      magi: [
        convertedMNDcards.Iain,
        convertedMNDcards.Kiersta,
        convertedMNDcards.Ookami,
      ],
      crs: [
        convertedMNDcards.Lahalou,
        convertedMNDcards["Jungle Jile"],
        convertedMNDcards["Inyx"],
        convertedMNDcards["Tropical Plith"],
        convertedMNDcards["Ookami's Drums"],
        convertedMNDcards.Bloom,
      ],
    },
    deck_4: {
      id: "deck_4",
      name: " Arderial",
      magi: [
        convertedMNDcards.Niffer,
        convertedMNDcards.Sorreah,
        convertedMNDcards.Elios,
      ],
      crs: [
        // convertedMNDcards.elder_vellup,
        convertedMNDcards.Wasperine,
        // convertedMNDcards.flutter_yup,
        convertedMNDcards.Rayalon,
        convertedMNDcards.Corrupt,
        convertedMNDcards.Tranquility,

        convertedMNDcards.Warlum,
        convertedMNDcards.Wildfire,
      ],
    },
    deck_5: { id: "deck_5", name: "", magi: [], crs: [] },
    deck_6: { id: "deck_6", name: "", magi: [], crs: [] },
    deck_7: { id: "deck_7", name: "", magi: [], crs: [] },
    deck_8: { id: "deck_8", name: "", magi: [], crs: [] },
    deck_9: { id: "deck_9", name: "", magi: [], crs: [] },
  },
};
