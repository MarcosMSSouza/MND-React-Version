import "./App.css";
import { convertedMNDcards } from "./js/cards";
import { useState } from "react";
import useSound from "use-sound";
// import { renderColDecksss } from "./js/decks";
import { state } from "./js/model";
// import regionPng from "./img/regionSymbols/Arderial.png";
// import {  } from "./js/decks";
import { PlayScreen } from "./js/PlayScreen";
import { Field } from "./js/Field";
import { CollectionDecks, addDeckRegionImg } from "./js/decks";
// const imagens = require.context("./img/regionSymbols", true);
// const imageList = imagens.keys().map((image) => imagens(image));
import hoveringcardSound from "./sounds/hoveringcardSound.mp3";
import changingPage from "./sounds/changingPage.mp3";
// import { Options, optionsOpen } from "./js/decks";
// import {  } from "./js/decks";
// import '.index'
// let optionsOpenss = optionsOpen;
// console.log(optionsOpenss);

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

// let selectedteste;
export default function App() {
  const [selected, setSelected] = useState(state.playerDecks.deck_1);
  state.deckEditor.wholeDeck = [
    ...state.playerDecks.deck_1.magi,
    ...state.playerDecks.deck_1.crs,
  ];
  const [cardsOnEditor, setCardsOnEditor] = useState(
    state.deckEditor.wholeDeck
  );
  const [pSopen, setPSopen] = useState(false);
  const [fieldOpen, setFieldOpen] = useState(false);
  const [regionActive, setRegionActive] = useState("Arderial");

  function handleRegionButtonClick(e, region) {
    setRegionActive(region);
  }

  function handleSetPSopen() {
    setPSopen((ps) => !ps);
    console.log(pSopen);
  }
  function handleFieldOpen() {
    setFieldOpen((field) => !field);
    console.log(pSopen);
  }
  return (
    <>
      <PlayScreen
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
        handleFieldOpen={handleFieldOpen}
      />
      <Collection
        pSopen={pSopen}
        regionActive={regionActive}
        onRegionButtonClick={handleRegionButtonClick}
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
        // setSelectedID={setSelectedID}
        // selectedID={selectedID}
        cardsOnEditor={cardsOnEditor}
        setCardsOnEditor={setCardsOnEditor}
      />
      <Field
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
        handleFieldOpen={handleFieldOpen}
        fieldOpen={fieldOpen}
      />
    </>
  );
}

function Collection({
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
    <div
      className={`modal modal-collection ${!pSopen && "hidden"}`}
      key={"col"}
    >
      <CollectionHeader onRegionButtonClick={onRegionButtonClick} />
      <CollectionContent
        regionActive={regionActive}
        selected={selected}
        setSelected={setSelected}
        cardsOnEditor={cardsOnEditor}
        setCardsOnEditor={setCardsOnEditor}
      />
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
        cardsOnEditor={cardsOnEditor}
        setCardsOnEditor={setCardsOnEditor}
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
    const soundUrl = changingPage;
    const [play] = useSound(soundUrl);
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
          onClick={(e) => {
            play();
            onRegionButtonClick(e, region);
          }}
        >
          <p>{region}</p>
        </div>
      </>
    );
  }
}

// let allcar=[]

function CollectionContent({
  regionActive,
  selected,
  setSelected,
  cardsOnEditor,
  setCardsOnEditor,
}) {
  return (
    <>
      {/* {console.log(regionActive)} */}
      {regions.map((region) => (
        // regionActive === region &&
        <div
          className={`modal-collection-content content-${region} ${
            regionActive !== region ? "hidden" : ""
          }`}
          key={`content-${region}`}
        >
          {Object.values(convertedMNDcards).map((card) => {
            if (card.Type !== "magi") return;
            // =====Render Magi First ====== //
            return renderCollectionREGIONS(
              card,
              region,
              selected,
              setSelected,
              cardsOnEditor,
              setCardsOnEditor
            );
          })}
          {/* // =====Render C R S ====== // */}
          {Object.values(convertedMNDcards).map((card) => {
            if (
              card.Type === "magi" ||
              card.Type === "relic" ||
              card.Type === "spell"
            )
              return;
            return renderCollectionREGIONS(
              card,
              region,
              selected,
              setSelected,
              cardsOnEditor,
              setCardsOnEditor
            );
          })}
          {Object.values(convertedMNDcards).map((card) => {
            if (
              card.Type === "magi" ||
              card.Type === "creature" ||
              card.Type === "spell"
            )
              return;
            return renderCollectionREGIONS(
              card,
              region,
              selected,
              setSelected,
              cardsOnEditor,
              setCardsOnEditor
            );
          })}
          {Object.values(convertedMNDcards).map((card) => {
            if (
              card.Type === "magi" ||
              card.Type === "relic" ||
              card.Type === "creature"
            )
              return;
            return renderCollectionREGIONS(
              card,
              region,
              selected,
              setSelected,
              cardsOnEditor,
              setCardsOnEditor
            );
          })}
        </div>
      ))}
    </>
  );
}

/////////////

function renderCollectionREGIONS(
  card,
  region,
  selected,
  setSelected,
  cardsOnEditor,
  setCardsOnEditor
) {
  // Object.values(convertedMNDcards).map((card) => {
  let regexPatern = /[^A-Za-z0-9_]/g;

  if (card.Region !== region) return;

  // ==== Special Rules for getting the correct URL =======//
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
  // console.log(card.Name, card.Type);
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

  /////////////////////

  let Type = card.Type.replace(regexPatern).toLowerCase();

  ///////////To handle when magis are more than simple 'magi'
  // let magiCheck = card.Type.slice(0, 4);
  // if (magiCheck === "magi") card.Type = "magi";

  // let relicCheck = card.Type.slice(0, 5);
  // if (relicCheck === "relic") card.Type = "relic";

  /////////////

  if (card.Region.includes("/")) return;
  ////////////// TEST FOR DUAL REGION /////////////////////

  ///////////////////////////////////////////////
  function addCardsToEditor() {
    // let onEditor = [...selected.magi, ...selected.crs];
    // setCardsOnEditor(onEditor);
    // console.log(setCardsOnEditor);
    let shallowIDCopy = {};

    if (card.Type === "magi") {
      selected.magi = [...selected.magi, card];
      state.deckEditor.curMagi = selected.magi;
      // console.log(card.Type.slice(0, 4));
      // console.log(state.deckEditor.curMagi);
    } else {
      if (card.Type !== "magi") {
        let copyCounter = 0;
        selected.crs.forEach((car) => {
          if (card.Name === car.Name) {
            copyCounter++;
          }
        });
        // console.log(crsCount);

        if (copyCounter === 3) return;
        shallowIDCopy = Object.assign({}, card);
        // shallowIDCopy.id = `${card.id}C${copyCounter > 0 ? copyCounter : ""}`;
        shallowIDCopy.id = `${card.id}${
          copyCounter > 0 ? `C${copyCounter}` : ""
        }`;
        console.log(shallowIDCopy.id);
        selected.crs = [shallowIDCopy, ...selected.crs];
      }

      // selected.crs = [shallowIDCopy, ...selected.crs];
      if (!shallowIDCopy.id) selected.crs = [card, ...selected.crs];

      state.deckEditor.curCrs = selected.crs;
      // console.log(state.deckEditor.curCrs);
    }
    const onEditor = [...selected.magi, ...selected.crs];
    setCardsOnEditor(onEditor);

    console.log(card, "added to", selected.id, cardsOnEditor);
  }

  return (
    <>
      <CreateCard
        card={card}
        Type={Type}
        key={card.id}
        selected={selected}
        setSelected={setSelected}
        addCardsToEditor={addCardsToEditor}
        // removeCardsFromEditor={removeCardsFromEditor}
        cardsOnEditor={cardsOnEditor}
        setCardsOnEditor={setCardsOnEditor}
      />
    </>
  );

  //////ok//////////
}

function CollectionBuilder({
  card,
  state,
  selected,
  setSelected,
  cardsOnEditor,
  setCardsOnEditor,

  selectedID,
}) {
  // console.log(card);

  //     );
  //////
  // Function to check for elements with the same property and change the property in the clones
  // const updateDuplicateProperty = (array, property) => {
  //   const propertyCount = new Map();

  //   for (const obj of array) {
  //     const value = obj[property];

  //     // Check if the property has been encountered before
  //     if (propertyCount.has(value)) {
  //       // Duplicate found, update the property in the clone
  //       obj[property] = `${value}_clone${propertyCount.get(value) + 1}`;
  //       propertyCount.set(value, propertyCount.get(value) + 1);
  //     } else {
  //       // First encounter of the property, add it to the map
  //       propertyCount.set(value, 1);
  //     }
  //   }
  // };

  // // Update duplicates in the array
  // updateDuplicateProperty(selected.crs, "id");

  // Display the modified array
  // console.log(selected.crs);

  //////////
  state.deckEditor.curMagi = selected.magi;
  state.deckEditor.curCrs = selected.crs;

  let onEditor = [...state.deckEditor.curMagi, ...state.deckEditor.curCrs];

  // }
  /////////
  // setCardsOnEditor(selected);
  // console.log(selectedDeck);
  const builder = true;
  // setCardsOnEditor(selectedDeck);

  return (
    <div className="modal modal-collection-builder">
      <TypeCounters onEditor={onEditor} />
      <div className="builder-area dragarea">
        {onEditor.map((card) => (
          <CreateCard
            state={state}
            card={card}
            key={card.id}
            builder={builder}
            selected={selected}
            setSelected={setSelected}
            // removeCardsFromEditor={removeCardsFromEditor}
            selectedID={selectedID}
            cardsOnEditor={cardsOnEditor}
            setCardsOnEditor={setCardsOnEditor}
          />
        ))}
      </div>
    </div>
  );
}
// selectedID;
function TypeCounters({ onEditor }) {
  let magi = 0;
  let relics = 0;
  let creatures = 0;
  let spells = 0;
  onEditor.forEach((card) => {
    if (card.Type === "magi") magi++;
    if (card.Type === "creature") creatures++;
    if (card.Type === "relic") relics++;
    if (card.Type === "spell") spells++;
  });
  ////
  return (
    <div className="editorfont-title">
      <p className="editor-title">DECK EDITOR</p>
      <div className="typeImages">
        <div className="editor-type-img editor-type-img-magi">
          <p>{magi}</p>
        </div>
        <div className="editor-type-img editor-type-img-creature">
          <p> {creatures}</p>
        </div>
        <div className="editor-type-img editor-type-img-relic">
          <p>{relics}</p>
        </div>
        <div className="editor-type-img editor-type-img-spell">
          <p>{spells}</p>
        </div>

        {/* <img className="deck-editor-img-test" alt="no"></img>
        <img className="deck-editor-img-test" alt="no"></img>
        <img className="deck-editor-img-test" alt="no"></img> */}
      </div>

      {/* <p className="TypeCounters">{`M = ${magi} / C = ${creatures} / R = ${relics} / S = ${spells}`}</p> */}
    </div>
  );
}

function CreateCard({
  card,
  builder,
  selected,
  // selectedID,
  setSelected,
  addCardsToEditor,
  cardsOnEditor,
  setCardsOnEditor,
  // removeCardsFromEditor,
}) {
  // console.log(updateCardsOnEditor);

  function handleAddtoEditor() {
    // console.log(state);
    let onEditor = [...state.deckEditor.curMagi, ...state.deckEditor.curCrs];
    // console.log(onEditor);
    // console.log("HANDLEADDTOEDITOR CHAMADO");
    // console.log(state.deckEditor.wholeDeck);
    state.deckEditor.wholeDeck = onEditor;
    setCardsOnEditor(onEditor);
    // console.log(cardsOnEditor);
    // console.log("teste 1");
    let [countSingle, countTotal] = checkCardCopies(card);
    // console.log(countSingle, countTotal);
    console.log(countSingle, countTotal);

    // console.log(magiCheck);
    if ((card.Type === "magi" && countSingle === 1) || countTotal === 3) return;
    console.log(countSingle, countTotal);
    if (card.Type !== "magi" && countSingle === 3) return;

    ////////////////
    // console.log(cardsOnEditor);
    // let deck = state.playerDecks[selected]
    addCardsToEditor();
    // onEditor = [...state.deckEditor.curMagi, ...state.deckEditor.curCrs];
    // setCardsOnEditor(onEditor);
    // console.log(cardsOnEditor);
    // let selectedDeck = [...selected.magi, ...selected.crs];

    addDeckRegionImg(selected);
    // console.log(updateCardsOnEditor);
    //
  }
  // function handleRemovefromEditor(card) {
  //   removeCardsFromEditor();
  //   let onEditor = [...state.deckEditor.curMagi, ...state.deckEditor.curCrs];
  //   setCardsOnEditor(onEditor);
  // }
  function removeCardsFromEditor(card) {
    // console.log(card);
    if (card.Type === "magi") {
      // selected.magi = [...selected.magi, card];
      // let cardToRemove = state.deckEditor.curMagi.some(
      //   (car) => car.Name === card.Name && card
      // console.log(state.deckEditor.curMagi);
      let filteredMagi = state.deckEditor.curMagi.filter(
        (car) => car.Name !== card.Name
      );
      // console.log("magi", filteredMagi);
      // state.deckEditor.curMagi = filtered;
      let onEditor = [...filteredMagi, ...state.deckEditor.curCrs];
      console.log(card, "removed from Editor");
      selected.magi = filteredMagi;
      // console.log(onEditor);
      setCardsOnEditor(onEditor);
      // console.log("removeCardsFromEditor CHAMADO");
    } else {
      // console.log(state.deckEditor.curCrs);
      let filteredCrs = state.deckEditor.curCrs.filter(
        (car) => car.id !== card.id
      );
      // console.log("crs", filteredCrs);
      // state.deckEditor.curMagi = filtered;
      let onEditor = [...state.deckEditor.curMagi, ...filteredCrs];
      console.log(card + " removed from Editor");
      selected.crs = filteredCrs;
      // console.log(onEditor);
      setCardsOnEditor(onEditor);
      // console.log(onEditor);
    }
  }

  function checkCardCopies(cardtomove) {
    // let builderCollectionCards = document.querySelectorAll(

    let magiCount = [0, 0];
    let crsCount = [0, 0];
    console.log(selected);
    // if (selected.magi === "" || selected.crs === "") return [0, 0];
    if (cardtomove.Type === "magi") {
      selected.magi.forEach((card) => {
        if (card.Type === "magi") magiCount[1]++;
        if (cardtomove.Name === card.Name) magiCount[0]++;
      });
      console.log(magiCount);
      return magiCount;
    } else {
      selected.crs.forEach((card) => {
        if (cardtomove.Name === card.Name) {
          crsCount[0]++;
        }
      });

      return crsCount;
    }
    ///ID////
  }
  const soundUrl = hoveringcardSound;
  const [play] = useSound(soundUrl);

  return (
    <div cardtype={card.Type} key={card.Name} className="cardtest">
      <img
        className={`${card.Type === "magi" ? "magi" : "nonMagi"} ${
          builder ? "builder-collection-cards " : "collection-cards"
        }`}
        src={card.url}
        id={card.id}
        key={card.Name}
        dataset={card.Name}
        alt={card.Name}
        value={card}
        onClick={() => {
          builder ? removeCardsFromEditor(card) : handleAddtoEditor();
        }}
        onMouseEnter={play}
      />
    </div>
  );
}
/////////////////////////////////////
