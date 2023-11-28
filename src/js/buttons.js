import { builderArea } from "./controllerss";
import { state } from "../model";
import collectionView from "./views/collectionView";
import mainView from "./views/mainView";
import decksView from "./views/decksView";

const modal_collection = document.querySelector(".modal-collection");
const builder = document.querySelector(".modal-collection-builder");
const modal_loadingScreen = document.getElementById("modal-loadingScreen");
const modal_PlayScreen = document.getElementById("modal-PlayScreen");
const new_decks_container = document.querySelector(".new-decks-container");

let deck1 = document.getElementById("deck_1");
let deck_btn = document.querySelectorAll(".deck-btn");

//

const btn_play = document.getElementById("btn-play");
btn_play.addEventListener("click", function () {
  modal_PlayScreen.classList.remove("hidden");
});

const PlayScreen_btn_play = document.getElementById("PlayScreen-btn-play");
PlayScreen_btn_play.addEventListener("click", function () {
  modal_PlayScreen.classList.add("hidden");
});

PlayScreen_btn_play.addEventListener("mouseover", function () {
  PlayScreen_btn_play.classList.add("playGlowtest");
  console.log("glow added");
});

PlayScreen_btn_play.addEventListener("mouseout", function () {
  PlayScreen_btn_play.classList.remove("playGlowtest");
  console.log("glow removed");
});

const PlayScreen_btn_collection = document.getElementById(
  "PlayScreen-btn-collection"
);
PlayScreen_btn_collection.addEventListener("click", function () {
  modal_collection.classList.remove("hidden");
  switchingGameSections.play();
  // modal_collection.classList.toggle('hidden');
});

PlayScreen_btn_collection.addEventListener("mouseover", function () {
  PlayScreen_btn_collection.classList.add("playGlowtest");
  console.log("glow added");
});

PlayScreen_btn_collection.addEventListener("mouseout", function () {
  PlayScreen_btn_collection.classList.remove("playGlowtest");
  console.log("glow removed");
});

const btn_collection = document.getElementById("btn-collection");
btn_collection.addEventListener("click", function () {
  switchingGameSections.play();
  modal_collection.remove("hidden");
});

const clickLoadingScreenToHide = document.getElementById("modal-loadingScreen");
clickLoadingScreenToHide.addEventListener("click", function () {
  clickLoadingScreenToHide.classList.toggle("hidden");
});
let audioUrl = require("url:./sounds/switchingGameSections.mp3");
let switchingGameSections = new Audio(audioUrl);

const btn_collection_back = document.getElementById("btn-collection-back");

btn_collection_back.addEventListener("click", function () {
  modal_collection.classList.add("hidden");
  modal_PlayScreen.classList.remove("hidden");
  let audioUrl = require("url:./sounds/hoveringSystemBtns.mp3");
  let hoveringSystemBtns = new Audio(audioUrl);
  hoveringSystemBtns.play();
});

const btn_new_deck = document.getElementById("newDeck-btn");

btn_new_deck.addEventListener("click", function () {
  decksView.renderNewDeckButton();
  console.log("rendered new deck");

  let allcards = document.querySelectorAll(".collection-cards");
  console.log(allcards.length);
});

const btn_consoleDeck_1 = document.getElementById("console-Deck_1");

btn_consoleDeck_1.addEventListener("click", () => {
  state.selectedDeck.magi = state.playerDecks.deck_1.magi;
  state.selectedDeck.crs = state.playerDecks.deck_1.crs;

  mainView.resetGameContainers();
  deck1 = document.getElementById("deck_1");

  deck_btn = document.querySelectorAll(".deck-btn");
  deck_btn.forEach((btn) => btn.classList.remove("selected"));
  console.log(deck1);
  deck1.classList.add("selected");

  mainView.renderMagiPile("deck_1");
  mainView.renderDrawDeck();
});

const btn_consoleDeck_2 = document.getElementById("console-Deck_2");

btn_consoleDeck_2.addEventListener("click", () => {
  state.selectedDeck.magi = state.playerDecks.deck_2.magi;
  state.selectedDeck.crs = state.playerDecks.deck_2.crs;

  mainView.resetGameContainers();

  let deck2 = document.getElementById("deck_2");

  deck_btn = document.querySelectorAll(".deck-btn");
  deck_btn.forEach((btn) => btn.classList.remove("selected"));

  deck2.classList.add("selected");

  mainView.renderMagiPile("deck_2");
  mainView.renderDrawDeck();
});

const menu = document.querySelectorAll(".console_button");

menu.forEach((menuBtn) => {
  menuBtn.addEventListener("mouseover", () => {
    let audioUrl = require("url:./sounds/hoveringSystemBtns.mp3");
    let hoveringSystemBtns = new Audio(audioUrl);
    hoveringSystemBtns.play();
  });
});
