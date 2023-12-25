import { state } from "./model";
import useSound from "use-sound";
import deckSelected from "../sounds/deckSelected.mp3";
import switchingGameSections from "../sounds/switchingGameSections.mp3";
import hoveringDeckBtns from "../sounds/hoveringDeckBtns.mp3";
import hoveringSystemBtns from "../sounds/hoveringSystemBtns.mp3";
import React, { useState } from "react";
import introMusic from "../sounds/StickerbushSymphony.mp3";
export let selectedID;
// import React from "react";

export let volume = 1;

export function CollectionDecks({
  state,
  regionImg,
  selected,
  setSelected,
  handleSetPSopen,
  setSelectedID,
  cardsOnEditor,
  setCardsOnEditor,
  optionsOpen,
  setOptionsOpen,
  scaleValue,
  setScaleValue,
  checked,
  setChecked,
}) {
  function handleSelectDeck(id) {
    setSelected(state.playerDecks[id]);

    let onEditor = [...selected.magi, ...selected.crs];
    setCardsOnEditor(onEditor);
  }

  const [play] = useSound(switchingGameSections, { volume });

  const [play2] = useSound(hoveringSystemBtns, { volume });

  return (
    <div className="modal-collection-decks">
      <div className="decks-title">DECKS</div>
      <Options
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        scaleValue={scaleValue}
        setScaleValue={setScaleValue}
        checked={checked}
        setChecked={setChecked}
      />

      <NewDeck
        setSelectedID={setSelectedID}
        setSelected={setSelected}
        handleSelectDeck={handleSelectDeck}
        setCardsOnEditor={setCardsOnEditor}
      />
      <DeleteDeck
        selected={selected}
        setSelected={setSelected}
        setCardsOnEditor={setCardsOnEditor}
        handleSelectDeck={handleSelectDeck}
      />

      {/* <!-- /////// DECKS CONTAINER ///////// --> */}
      <div className="new-decks-container">
        {Object.values(state.playerDecks).map(
          (deck, i) =>
            deck.name && (
              <DeckBtn
                deck={deck}
                key={deck.id}
                regionImg={regionImg}
                i={i + 1}
                selected={selected}
                setSelected={setSelected}
                handleSelectDeck={handleSelectDeck}
                cardsOnEditor={cardsOnEditor}
                setCardsOnEditor={setCardsOnEditor}
              />
            )
        )}
      </div>
      <div className="backnoptionsbtns">
        <button
          className="console_button backBtn"
          type="button"
          id="btn-collection-back"
          onClick={() => {
            play();
            handleSetPSopen();
          }}
          onMouseEnter={play2}
        >
          <p>BACK</p>
        </button>

        <button
          className="optionsBtn"
          onMouseEnter={play2}
          onClick={() => {
            play();
            setOptionsOpen((optionsOpen) => !optionsOpen);
          }}
        ></button>
      </div>
    </div>
  );
}

export const Options = ({
  optionsOpen,
  setOptionsOpen,
  scaleValue,
  setScaleValue,
  checked,
  setChecked,
}) => {
  // const [values, setValues] = useState(50);
  // console.log(scaleValue);
  // const [checked, setChecked] = useState(true);
  function handleToggleChange(checkbox) {
    // checkbox.checked = !checkbox.checked;
    if (volume === 1) {
      volume = 0;
      setChecked(false);
    } else {
      volume = 1;
      setChecked(true);
    }
    console.log(checked);
  }
  function handleChangeColCardsScale(newValue) {
    setScaleValue(newValue);
    console.log(scaleValue);
  }

  return (
    optionsOpen && (
      <div className="modal-options">
        <h1>OPTIONS</h1>
        <div
          className="closeOptions"
          onClick={() => {
            setOptionsOpen((a) => !a);
          }}
        ></div>
        <div className="options-content">
          {/* /////// */}
          <div className="checkbox-container">
            <span> Sounds:</span>
            <label class="switch">
              <input
                type="checkbox"
                id="myCheckbox"
                checked={checked}
                onClick={(e) => handleToggleChange(e.target)}
              />
              <div class="slidercheck round"></div>
            </label>
          </div>
          {/* ////////// */}
          <div class="slide-container">
            <label>Cards zoom size:</label>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.75"
              value={scaleValue}
              class="slider"
              id="myRange"
              onChange={(e) => handleChangeColCardsScale(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  );
};

function NewDeck({
  setSelected,
  setSelectedID,
  handleSelectDeck,
  setCardsOnEditor,
}) {
  function checkPrimeirodecksemnome() {
    let firstNamelessDeck = Object.values(state.playerDecks).find(
      (deck) => !deck.name
    );
    if (firstNamelessDeck === undefined) {
      alert("Cant create more than 9 decks!");
      return;
    }
    let id = firstNamelessDeck.id;
    firstNamelessDeck.name = id;
    console.log(id);
    console.log("checkPrimeirodecksemnome chamado");
    handleSelectDeck(id);
    let onEditor = [
      ...state.playerDecks[id].magi,
      ...state.playerDecks[id].crs,
    ];
    setCardsOnEditor(onEditor);
  }

  const [play] = useSound(deckSelected, { volume });

  const [play2] = useSound(hoveringSystemBtns, { volume });

  return (
    <button
      className="console_button"
      id="newDeck-btn"
      type="button"
      onClick={() => {
        play();
        checkPrimeirodecksemnome();
      }}
      onMouseEnter={play2}
    >
      <p> New Deck</p>
    </button>
  );
}

function DeleteDeck({
  selected,
  setSelected,
  setSelectedID,
  setCardsOnEditor,
  handleSelectDeck,
}) {
  function removeSelectedDeck() {
    const decksLeft = Object.values(state.playerDecks).filter(
      (deck) => deck.name
    ).length;

    if (decksLeft < 2) {
      alert("You can't delete all decks!");
      return;
    }

    let id = selected.id;
    console.log(selected);
    console.log(id);
    state.playerDecks[id].magi = [];
    state.playerDecks[id].crs = [];
    state.playerDecks[id].name = "";

    let onEditor = [];
    console.log(onEditor);

    let firstNamedDeck = Object.values(state.playerDecks).find(
      (deck) => deck.name
    );

    console.log("REMOVESELECTEDDECK CALLED");
    setSelected(firstNamedDeck);
    handleSelectDeck(firstNamedDeck.id);
    console.log(selected);
    setCardsOnEditor(onEditor);
    console.log(
      Object.values(state.playerDecks).filter((deck) => deck.name).length
    );
  }

  const [play] = useSound(hoveringSystemBtns, { volume });
  return (
    <button
      className="console_button"
      id="delete-btn"
      type="button"
      onClick={() => removeSelectedDeck()}
      onMouseEnter={play}
    >
      <p>Delete Deck</p>
    </button>
  );
}

export function DeckBtn({
  deck,
  i,
  selected,
  setSelected,
  handleSelectDeck,
  PSdeck,
  cardsOnEditor,
  setCardsOnEditor,
}) {
  let deckName = deck.name;

  let deckRegion = addDeckRegionImg(deck);

  let id = `deck_${i}`;
  // let options = {
  //   volume,
  // };
  const [play] = useSound(deckSelected, { volume });

  const [play2] = useSound(hoveringDeckBtns, { volume });

  return (
    <div
      className={`deck-btn ${deckRegion} ${PSdeck ? "PSdeckBtn" : ""} ${
        id === selected?.id ? "selected" : ""
      } `}
      id={id}
      onClick={(e) => {
        play();
        handleSelectDeck(e.target.id);
        console.log("hi");
      }}
      onMouseEnter={play2}
    >
      <h1 style={{ pointerEvents: "none" }}>{!deckRegion && "no magi"}</h1>

      <p
        className={`${PSdeck ? "PSdeck-title" : "deck-title"}`}
        style={{ pointerEvents: "none" }}
      >
        {deckName}
      </p>
    </div>
  );
}
export function addDeckRegionImg(deck) {
  if (!deck?.magi) return;
  let curDeck = deck.magi;

  let magiTypes = curDeck.map((magi) => {
    return magi.Region === "Kybar's Teeth" ? "Kybar" : magi.Region;
  });

  let deckRegion = magiTypes[0] === magiTypes[1] ? magiTypes[0] : magiTypes[2];
  return magiTypes.length > 2 ? deckRegion : magiTypes[0];
}
