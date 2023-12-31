import "./App.css";
import { convertedMNDcards } from "./js/cards";
import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { state } from "./js/model";
import { PlayScreen, ProgressBar } from "./js/PlayScreen";
import { Field } from "./js/Field";
import { CollectionDecks, addDeckRegionImg, volume } from "./js/decks";
import hoveringcardSound from "./sounds/hoveringcardSound.mp3";
import changingPage from "./sounds/changingPage.mp3";

import { FilterBar } from "./js/Filterbar";

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
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [scaleValue, setScaleValue] = useState(1.75);
  const [checked, setChecked] = useState(true);

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

      <ProgressBar />
      <Collection
        pSopen={pSopen}
        regionActive={regionActive}
        onRegionButtonClick={handleRegionButtonClick}
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
        cardsOnEditor={cardsOnEditor}
        setCardsOnEditor={setCardsOnEditor}
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        scaleValue={scaleValue}
        setScaleValue={setScaleValue}
        checked={checked}
        setChecked={setChecked}
      />
      <Field
        selected={selected}
        setSelected={setSelected}
        handleSetPSopen={handleSetPSopen}
        handleFieldOpen={handleFieldOpen}
        fieldOpen={fieldOpen}
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        scaleValue={scaleValue}
        setScaleValue={setScaleValue}
        checked={checked}
        setChecked={setChecked}
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
  optionsOpen,
  setOptionsOpen,
  scaleValue,
  setScaleValue,
  checked,
  setChecked,
}) {
  const [cardSetFilter, setCardSetFilter] = useState([]);
  const [cardTypeFilter, setCardTypeFilter] = useState([]);
  const [query, setQuery] = useState("");

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
        cardSetFilter={cardSetFilter}
        cardTypeFilter={cardTypeFilter}
        setCardTypeFilter={setCardTypeFilter}
        setCardSetFilter={setCardSetFilter}
        query={query}
        setQuery={setQuery}
        scaleValue={scaleValue}
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
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        scaleValue={scaleValue}
        setScaleValue={setScaleValue}
        checked={checked}
        setChecked={setChecked}
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
    const [play] = useSound(changingPage, { volume });
    return (
      <>
        <div
          className="region-btn"
          role="button"
          id={region}
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

function CollectionContent({
  regionActive,
  selected,
  setSelected,
  cardsOnEditor,
  setCardsOnEditor,
  cardSetFilter,
  setCardSetFilter,
  cardTypeFilter,
  setCardTypeFilter,
  query,
  setQuery,
  scaleValue,
}) {
  return (
    <div className="modal-collection-content-wrapper">
      <div className="content-wrapper">
        {regions.map(
          (region) =>
            regionActive === region && (
              <CollectionRegionTab region={region} regionActive={regionActive}>
                {Object.values(convertedMNDcards).map((card) => {
                  if (card.Type !== "magi") return;
                  // =====Render Magi First ====== //
                  return (
                    <RenderCollectionREGIONS
                      card={card}
                      region={region}
                      selected={selected}
                      setSelected={setSelected}
                      cardsOnEditor={cardsOnEditor}
                      setCardsOnEditor={setCardsOnEditor}
                      cardSetFilter={cardSetFilter}
                      setCardSetFilter={setCardSetFilter}
                      cardTypeFilter={cardTypeFilter}
                      setCardTypeFilter={setCardTypeFilter}
                      query={query}
                      setQuery={setQuery}
                      scaleValue={scaleValue}
                    />
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
                  return (
                    <RenderCollectionREGIONS
                      card={card}
                      region={region}
                      selected={selected}
                      setSelected={setSelected}
                      cardsOnEditor={cardsOnEditor}
                      setCardsOnEditor={setCardsOnEditor}
                      cardSetFilter={cardSetFilter}
                      setCardSetFilter={setCardSetFilter}
                      cardTypeFilter={cardTypeFilter}
                      setCardTypeFilter={setCardTypeFilter}
                      query={query}
                      setQuery={setQuery}
                      scaleValue={scaleValue}
                    />
                  );
                })}
                {Object.values(convertedMNDcards).map((card) => {
                  if (
                    card.Type === "magi" ||
                    card.Type === "creature" ||
                    card.Type === "spell"
                  )
                    return;
                  return (
                    <RenderCollectionREGIONS
                      card={card}
                      region={region}
                      selected={selected}
                      setSelected={setSelected}
                      cardsOnEditor={cardsOnEditor}
                      setCardsOnEditor={setCardsOnEditor}
                      cardSetFilter={cardSetFilter}
                      setCardSetFilter={setCardSetFilter}
                      cardTypeFilter={cardTypeFilter}
                      setCardTypeFilter={setCardTypeFilter}
                      query={query}
                      setQuery={setQuery}
                      scaleValue={scaleValue}
                    />
                  );
                })}

                {Object.values(convertedMNDcards).map((card) => {
                  if (
                    card.Type === "magi" ||
                    card.Type === "relic" ||
                    card.Type === "creature"
                  )
                    return;
                  return (
                    <RenderCollectionREGIONS
                      card={card}
                      region={region}
                      selected={selected}
                      setSelected={setSelected}
                      cardsOnEditor={cardsOnEditor}
                      setCardsOnEditor={setCardsOnEditor}
                      cardSetFilter={cardSetFilter}
                      setCardSetFilter={setCardSetFilter}
                      cardTypeFilter={cardTypeFilter}
                      setCardTypeFilter={setCardTypeFilter}
                      query={query}
                      setQuery={setQuery}
                      scaleValue={scaleValue}
                    />
                  );
                })}
              </CollectionRegionTab>
            )
        )}
      </div>
      <FilterBar
        cardSetFilter={cardSetFilter}
        cardTypeFilter={cardTypeFilter}
        setCardSetFilter={setCardSetFilter}
        setCardTypeFilter={setCardTypeFilter}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
}

function CollectionRegionTab({ region, regionActive, children }) {
  return (
    <div
      className={`modal-collection-content content-${region} 
      `}
      key={`content-${region}`}
    >
      {children}
    </div>
  );
}

function RenderCollectionREGIONS({
  card,
  region,
  selected,
  setSelected,
  cardsOnEditor,
  setCardsOnEditor,
  cardSetFilter,
  cardTypeFilter,
  setCardSetFilter,
  setCardTypeFilter,
  query,
  setQuery,
  scaleValue,
}) {
  let regexPatern = /[^A-Za-z0-9_]/g;

  if (card.Region !== region) return;

  if (
    cardSetFilter.length > 0 &&
    cardSetFilter.every((set) => set !== card.Set)
  )
    return;
  if (
    cardTypeFilter.length > 0 &&
    cardTypeFilter.every((type) => type !== card.Type)
  )
    return;

  if (!card.Name.toLowerCase().replaceAll("_", " ").includes(query)) return;

  if (
    card.Set === "UnreleasedPromos" ||
    card.Set === "Daybreak" ||
    card.Set === "Traitor's Reach"
  )
    return;

  // ==== Special Rules for getting the correct URL ====//

  let Type = card.Type.replace(regexPatern).toLowerCase();

  if (card.Region.includes("/")) return;

  function addCardsToEditor() {
    let shallowIDCopy = {};

    if (card.Type === "magi") {
      selected.magi = [...selected.magi, card];
      state.deckEditor.curMagi = selected.magi;
    } else {
      if (card.Type !== "magi") {
        let copyCounter = 0;
        selected.crs.forEach((car) => {
          if (card.Name === car.Name) {
            copyCounter++;
          }
        });

        if (copyCounter === 3) return;
        shallowIDCopy = Object.assign({}, card);

        shallowIDCopy.id = `${card.id}${
          copyCounter > 0 ? `C${copyCounter}` : ""
        }`;
        console.log(shallowIDCopy.id);
        selected.crs = [shallowIDCopy, ...selected.crs];
      }

      if (!shallowIDCopy.id) selected.crs = [card, ...selected.crs];

      state.deckEditor.curCrs = selected.crs;
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
        cardsOnEditor={cardsOnEditor}
        setCardsOnEditor={setCardsOnEditor}
        scaleValue={scaleValue}
      />
    </>
  );
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
  state.deckEditor.curMagi = selected?.magi;
  state.deckEditor.curCrs = selected?.crs;

  let onEditor = [...state.deckEditor?.curMagi, ...state.deckEditor?.curCrs];

  const builder = true;

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
            selectedID={selectedID}
            cardsOnEditor={cardsOnEditor}
            setCardsOnEditor={setCardsOnEditor}
          />
        ))}
      </div>
    </div>
  );
}

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
      </div>
    </div>
  );
}

function CreateCard({
  card,
  builder,
  selected,
  scaleValues,
  setSelected,
  addCardsToEditor,
  cardsOnEditor,
  setCardsOnEditor,
  scaleValue,
}) {
  function handleAddtoEditor() {
    let onEditor = [...state.deckEditor.curMagi, ...state.deckEditor.curCrs];

    state.deckEditor.wholeDeck = onEditor;
    setCardsOnEditor(onEditor);

    let [countSingle, countTotal] = checkCardCopies(card);

    console.log(countSingle, countTotal);

    if ((card.Type === "magi" && countSingle === 1) || countTotal === 3) return;
    console.log(countSingle, countTotal);
    if (card.Type !== "magi" && countSingle === 3) return;

    addCardsToEditor();

    addDeckRegionImg(selected);
  }

  function removeCardsFromEditor(card) {
    if (card.Type === "magi") {
      let filteredMagi = state.deckEditor.curMagi.filter(
        (car) => car.Name !== card.Name
      );

      let onEditor = [...filteredMagi, ...state.deckEditor.curCrs];
      console.log(card, "removed from Editor");
      selected.magi = filteredMagi;

      setCardsOnEditor(onEditor);
    } else {
      let filteredCrs = state.deckEditor.curCrs.filter(
        (car) => car.id !== card.id
      );

      let onEditor = [...state.deckEditor.curMagi, ...filteredCrs];
      console.log(card + " removed from Editor");
      selected.crs = filteredCrs;

      setCardsOnEditor(onEditor);
    }
  }

  function checkCardCopies(cardtomove) {
    let magiCount = [0, 0];
    let crsCount = [0, 0];
    console.log(selected);

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
  }

  // const ReactDOM = require("react-dom");
  const [play] = useSound(hoveringcardSound, { volume });

  return (
    <img
      className={`cards ${card.Type === "magi" ? "magi" : "nonMagi"} ${
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
      onMouseEnter={(e) => {
        play();
        // console.log(e.target.className);
        if (
          e.target.className.includes("collection-cards") &&
          !e.target.className.includes("builder-collection-cards")
        ) {
          e.target.style.transform = `scale(${scaleValue})`;
          // e.target.style.overflowY = "hidden";
          e.target.style.zIndex = 2;
          // e.target.style.position = "relative";
        }
      }}
      onMouseOut={(e) => {
        // play();
        e.target.style.transform = "scale(1)";
        e.target.style.zIndex = 0;
      }}
    />
  );
}

/////////////////////////////////////

// allColCards?.addEventListener("mouseover", () => {
//   allColCards.style.transform = "scale(1.5)";
// });

// allColCards?.addEventListener("mouseout", () => {
//   allColCards.style.transform = "scale(1)";
// });
