import "./App.css";
import { convertedMNDcards } from "./js/cards";
import { useState } from "react";
// import { renderColDecksss } from "./js/decks";
import { state } from "./js/model";
import regionPng from "./img/regionSymbols/Arderial.png";
// import {  } from "./js/decks";
import { PlayScreen } from "./js/PlayScreen";
import { Field } from "./js/Field";
import { DeckBtn, CollectionDecks, selectedID } from "./js/decks";
// const imagens = require.context("./img/regionSymbols", true);
// const imageList = imagens.keys().map((image) => imagens(image));

// import '.index'
const regions = [
  "Arderial",
  "Cald",
  "Orothe",
  "Naroom",
  "Underneath",
  "Core",
  "d'Resh",
  "Kybar's Teeth",
  "Bograth",
  "Paradwyn",
  "Weave",
  "Nar",
  "Universal",
];

let selectedteste;
export default function App() {
  const [selected, setSelected] = useState(state.playerDecks.deck_1);
  let selectedDeck = [...selected.magi, ...selected.crs];

  const [selectedID, setSelectedID] = useState("deck_1");
  const [pSopen, setPSopen] = useState(false);
  selectedteste = selected;
  // console.log(state.playerDecks);
  // const regionImg = regionPng;
  const [regionActive, setRegionActive] = useState("Arderial");

  function handleRegionButtonClick(e, region) {
    // regionbtn.addEventListener("mouseover", () => {

    // renderColDecksss();
    setRegionActive(region);
  }

  function handleSetPSopen() {
    setPSopen((ps) => !ps);
    console.log(pSopen);
  }
  return (
    <>
      <PlayScreen
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
      />
      <CollectionBackground
        pSopen={pSopen}
        regionActive={regionActive}
        onRegionButtonClick={handleRegionButtonClick}
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
        setSelectedID={setSelectedID}
        selectedID={selectedID}
      />
      {/* <Field handleSetPSopen={handleSetPSopen} /> */}
    </>
  );
}

function CollectionBackground({
  pSopen,
  onRegionButtonClick,
  regionActive,
  selected,
  setSelected,
  handleSetPSopen,
  setSelectedID,
  selectedID,
  cardsOnEditor,
  setCardsOnEditor,
}) {
  return (
    <div className={`modal modal-collection ${!pSopen && "hidden"}`}>
      <CollectionHeader onRegionButtonClick={onRegionButtonClick} />
      <CollectionContent regionActive={regionActive} selected={selected} />
      <CollectionBuilder
        state={state}
        selected={selected}
        setSelected={setSelected}
        selectedID={selectedID}
        cardsOnEditor={cardsOnEditor}
        setCardsOnEditor={setCardsOnEditor}
      />
      <CollectionDecks
        state={state}
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
        setSelectedID={setSelectedID}
      ></CollectionDecks>
    </div>
  );
}

function CollectionHeader({ onRegionButtonClick }) {
  return (
    <div className="modal-collection-header">
      {regions.map((region) => (
        <RegionButton
          region={region}
          onRegionButtonClick={onRegionButtonClick}
          key={region}
        />
      ))}
    </div>
  );

  function RegionButton({ region, onRegionButtonClick }) {
    return (
      <>
        <div
          className="region-btn"
          role="button"
          id={
            region
            // region === "D'resh"
            //   ? (region = "D'resh")
            //   ? (region = "Kybar's Teeth")
            //   : region
          }
          key={region}
          onClick={(e) => onRegionButtonClick(e, region)}
        >
          <p>{region}</p>
        </div>
      </>
    );
  }
}

// let allcar=[]

function CollectionContent({ regionActive, selected }) {
  return (
    <>
      {console.log(regionActive)}
      {regions.map((region) => (
        // regionActive === region &&
        <div
          // className={`modal-collection-content content-${region}`}

          className={`modal-collection-content content-${region} ${
            regionActive !== region ? "hidden" : ""
          }`}
          key={`content-${region}`}
        >
          {Object.values(convertedMNDcards).map((card) => {
            return renderCollectionREGIONS(card, region, selected);
            // return (

            //   console.log(allmagi);
          })}
        </div>
      ))}
    </>
  );
}

/////////////

function renderCollectionREGIONS(card, region, selected) {
  // Object.values(convertedMNDcards).map((card) => {
  let regexPatern = /[^A-Za-z0-9_]/g;

  if (card.Region !== region) return;

  if (
    card.Set === "UnreleasedPromos" ||
    card.Set === "Daybreak" ||
    card.Set === "Traitor's Reach"
  )
    return;

  if (card.Name.includes("spirit_of")) {
    card.Name = card.Name.toLowerCase().replaceAll("_", "");
    // console.log(card.Name);
  }

  if (card.Set !== "Unlimited") {
    card.Name = card.Name.toLowerCase().replaceAll(" ", "_");
  }
  card.Name = card.Name.replaceAll(" ", "_").replace(regexPatern, "");
  ////////////

  card.url = `https://lackeyccg.com/magination/medium/${card.Name}.jpg`;
  ////////cl

  let finalName = card.Name;

  // card.url = images[finalName];
  let prefix = `${card.Type[0].toLowerCase()}`;

  if (card.Set === "Voice of the Storms") {
    finalName = finalName.replaceAll("_", "");
    finalName = `${finalName}_${card.Region[0].toLowerCase()}${prefix}_vs`;
    // console.log(finalName);
  }

  if (card.Set === "Nightmare's Dawn") {
    finalName = `${card.Region.toLowerCase()}_${finalName}`;
    // console.log(card.Region);
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

  // let regexPatern = /[^A-Za-z0-9]/g;
  let Type = card.Type.replace(regexPatern).toLowerCase();
  // insertCard.src = card.url;

  if (card.Region.includes("/")) return;
  ////////////// TEST FOR DUAL REGION /////////////////////

  ///////////////////////////////////////////////

  return (
    <>
      <CreateCard card={card} Type={Type} key={card.Name} selected={selected} />
    </>
  );

  //////ok//////////
}

function CollectionBuilder({
  state,
  selected,
  setSelected,

  selectedID,
}) {
  // const [forceRender, setForceRender] = useState(false);
  // console.log(cardsOnEditor);
  let selectedDeck = [...selected.magi, ...selected.crs];
  const [cardsOnEditor, setCardsOnEditor] = useState(selectedDeck);

  function updateCardsOnEditor() {
    // console.log(selectedteste);
    // selectedteste = [...selectedteste.magi, ...selectedteste.crs];
    setSelected(selectedDeck);
  }
  console.log(updateCardsOnEditor);

  // console.log(selectedteste2);
  // let selectedteste2 = [...selectedteste.magi, ...selectedteste.crs];
  // console.log(selectedDeck);
  const builder = true;
  // setCardsOnEditor(selectedDeck);
  // function updateCardsOnEditor() {
  //   let selectedDeck = [...selected.magi, ...selected.crs];
  //   setCardsOnEditor(selectedDeck);
  // }
  // console.log("tewsteeeeeeeeee");
  //////
  // this.forceUpdate();
  ////
  // console.log(selectedDeck);
  // console.log(state.playerDecks);
  return (
    <div className="modal modal-collection-builder">
      <div className="editor-title">
        <p>DECK EDITOR</p>

        <p className="TypeCounters">M = 1 / C = 9 / S = 3 / R = 2</p>
      </div>
      <div className="builder-area dragarea">
        {selectedDeck.map((card) => (
          <CreateCard
            state={state}
            card={card}
            builder={builder}
            selected={selected}
            setSelected={setSelected}
            onUpdateCardsOnEditor={updateCardsOnEditor}
            selectedID={selectedID}
          />
        ))}
      </div>
    </div>
  );
}
// selectedID;
function CreateCard({
  card,
  builder,
  selected,
  selectedID,
  setSelected,
  onUpdateCardsOnEditor,

  setCardsOnEditor,
}) {
  // console.log(updateCardsOnEditor);
  function handleAddtoEditor() {
    // console.log(state);
    // let deck = state.playerDecks[selected];
    // let updatedSelected = [];
    if (card.Type === "magi") selected.magi = [...selected.magi, card];
    else selected.crs = [...selected.crs, card];
    let selectedDeck = [...selected.magi, ...selected.crs];
    // setForceRender(!forceRender);
    // setSelected(selectedDeck);
    console.log(setSelected);
    console.log(selectedDeck);

    // console.log(updateCardsOnEditor);
    //
  }

  return (
    <div cardtype={card.Type} key={card.Name} className="cardtest">
      <img
        className={builder ? "builder-collection-cards " : "collection-cards"}
        src={card.url}
        id={card.id}
        dataset={card.Name}
        alt={card.Name}
        value={card}
        // onClick={() => onUpdateCardsOnEditor()}
      />
    </div>
  );
}
/////////////////////////////////////

function populateCollectionREGIONS(card) {
  // let insertCard = document.createElement("img");

  let regexPatern = /[^A-Za-z0-9]/g;
  let Type = card.Type.replace(regexPatern).toLowerCase();
  // insertCard.src = card.url;
  // insertCard.id = card.id;
  // insertCard.dataset.Name = card.Name;
  // insertCard.classList.add(`${Type}`, "collection-cards");

  if (card.Region === "d'Resh") {
    card.Region = "dResh";
  }

  if (card.Region === "Kybar's Teeth") {
    card.Region = "Kybar";
  }

  if (card.Region.includes("/")) return;
  ////////////// TEST FOR DUAL REGION /////////////////////

  ///////////////////////////////////////////////

  return (
    <div>
      <CreateCard card={card} />
    </div>
  );
  // Type === "magi"
  //   ? regionTabSelector.prepend(insertCard)
  //   : regionTabSelector.appendChild(insertCard);
}
