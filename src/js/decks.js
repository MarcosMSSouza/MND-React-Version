import { state } from "./model";
import useSound from "use-sound";
import deckSelected from "../sounds/deckSelected.mp3";
import switchingGameSections from "../sounds/switchingGameSections.mp3";
import hoveringDeckBtns from "../sounds/hoveringDeckBtns.mp3";
import hoveringSystemBtns from "../sounds/hoveringSystemBtns.mp3";
import { useState } from "react";
// import { useSoundDeckSelected, useHoveringSystemBtns } from "./Sounds";
// import Checkbox from "@mui/material/checkbox";

// import decksView from "./js/views/decksView";

export let selectedID;

// export let optionsOpen = true;
// let optionsOpen = true;
//   }
export function CollectionDecks({
  state,
  regionImg,
  selected,
  setSelected,
  handleSetPSopen,
  setSelectedID,
  cardsOnEditor,
  setCardsOnEditor,
}) {
  function handleSelectDeck(id) {
    setSelected(state.playerDecks[id]);

    let onEditor = [...selected.magi, ...selected.crs];
    setCardsOnEditor(onEditor);
  }

  // function handleOptions() {
  //   !optionsOpen

  // }
  // let deckRegion = addDeckRegionImg(deck);
  const soundUrl = switchingGameSections;
  const [play] = useSound(soundUrl);

  const soundUrl2 = hoveringSystemBtns;
  const [play2] = useSound(soundUrl2);
  const [optionsOpen, setOptionsOpen] = useState(false);
  return (
    <div className="modal-collection-decks">
      <div className="decks-title">DECKS</div>
      <Options optionsOpen={optionsOpen} />

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

      {/* <!-- //////// DECKS CONTAINER ///////////// --> */}
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
            console.log(optionsOpen);
            play();
            setOptionsOpen((optionsOpen) => !optionsOpen);
            // optionsOpen = !optionsOpen;
          }}
        ></button>
      </div>
    </div>
  );
}

export function Options({ optionsOpen, setOptionsOpen }) {
  // let optionsOpen;
  // console.log(optionsOpen);

  return (
    optionsOpen && (
      <div className="modal-options">
        <h1>OPTIONS (placeholder)</h1>
        <div className="options-content">
          {/* <Checkbox /> */}

          <h2>placeholder</h2>
          <p>
            Some basic rules for the editor: For the magis, (the red border
            cards) you can only have 1 of each type in a deck, or 3 in total.
            For the other types of cards, you can have up to 3 copies of each.
          </p>
          <p>1 Disable Magi red borders</p>
          <p>2 Increase collection card Zoom on Hover</p>
        </div>
      </div>
    )
  );
}
// const label = { inputProps: { "aria-label": "Checkbox demo" } };
// function Checkbox() {
//   const [isChecked, setIsChecked] = useState(false);
//   <div
//     name="demo-checkbox"
//     checked={isChecked}
//     size={24}
//     label="I agree to self-isolate"
//     onChange={() => setIsChecked(!isChecked)}
//     // onMouseDown={playActive}
//     // onMouseUp={() => {
//     //   isChecked ? playOff() : playOn();
//     // }}
//   />;
// }

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
    // setSelectedID(primeirodecksemnome.id);
    // setSelected(primeirodecksemnome.id);
    console.log("checkPrimeirodecksemnome chamado");
    handleSelectDeck(id);
    let onEditor = [
      ...state.playerDecks[id].magi,
      ...state.playerDecks[id].crs,
    ];
    setCardsOnEditor(onEditor);
  }
  const soundUrl = deckSelected;
  const [play] = useSound(soundUrl);

  const soundUrl2 = hoveringSystemBtns;
  const [play2] = useSound(soundUrl2);
  // const playDeckSelectedSound = useSoundDeckSelected;
  // const playHoveringSystemBtns = useHoveringSystemBtns;

  return (
    <button
      className="console_button"
      id="newDeck-btn"
      type="button"
      onClick={() => {
        play();
        // playDeckSelectedSound();
        // playDeckSelectedSound();
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
  // }
  function removeSelectedDeck() {
    let id = selected.id;
    console.log(selected);
    console.log(id);
    state.playerDecks[id].magi = [];
    state.playerDecks[id].crs = [];
    state.playerDecks[id].name = "";

    // handleSelectDeck(id);
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
    console.log(selected);
  }
  const soundUrl = hoveringSystemBtns;
  const [play] = useSound(soundUrl);
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

//   );
// }
/////////////

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
  // console.log(handleSelectDeck);

  // setSelected(state.playerDecks[id]);
  // console.log(state.deckEditor.wholedeck);
  // console.log("test", cardsOnEditor);
  let deckName = deck.name;

  let deckRegion = addDeckRegionImg(deck);

  // console.log(selected.id);

  let id = `deck_${i}`;
  // console.log(id);
  const soundUrl = deckSelected;
  const [play] = useSound(soundUrl);

  const soundUrl2 = hoveringDeckBtns;
  const [play2] = useSound(soundUrl2);

  return (
    // <div className="bgtests">
    <div
      className={`deck-btn ${deckRegion} ${PSdeck ? "PSdeckBtn" : ""} ${
        id === selected?.id ? "selected" : ""
      } `}
      id={id}
      onClick={(e) => {
        play();
        // console.log(e.target);
        // console.log(handleSelectDeck);

        // onSelectDeck(e.target.id);
        handleSelectDeck(e.target.id);
        console.log("hi");
      }}
      onMouseEnter={play2}
      // style={{ backgroundImage: 'url("/src/img/regionSymbols/Core.png")' }}
    >
      <h1 style={{ pointerEvents: "none" }}>{!deckRegion && "no magi"}</h1>
      {/* <p className="deck-title" style={{ pointerEvents: "none" }}> */}
      <p
        className={`${PSdeck ? "PSdeck-title" : "deck-title"}`}
        style={{ pointerEvents: "none" }}
      >
        {deckName}
      </p>
      {/* <div className="deck-btns-container"> */}
      {/* {!PSdeck && (
          <>
            {id === selected.id && (
              <>
                <SaveBtn
                  id={id}
                  cardsOnEditor={cardsOnEditor}
                  setCardsOnEditor={setCardsOnEditor}
                />
                <EditBtn />
              </>
            )}
          </>
        )} */}
      {/* </div> */}
    </div>
    // </div>
  );
}
//   );
export function addDeckRegionImg(deck) {
  if (!deck?.magi) return;
  let curDeck = deck.magi;

  let magiTypes = curDeck.map((magi) => {
    // console.log(magi);
    return magi.Region === "Kybar's Teeth" ? "Kybar" : magi.Region;
  });
  // console.log(magiTypes);

  let deckRegion = magiTypes[0] === magiTypes[1] ? magiTypes[0] : magiTypes[2];
  // console.log(deckRegion);
  return magiTypes.length > 2 ? deckRegion : magiTypes[0];
}
// }

// function SaveBtn({ id, selected, cardsOnEditor, setCardsOnEditor }) {
//   // console.log("SAVE btn clicked");
//   function handleSaveDeck() {
//     selected.playerDecks[id] = state.playerDecks[id].magi;
//   }
//   return (
//     <button
//       className="deck-inner-btn save-btn "
//       onClick={() => {
//         handleSaveDeck();
//       }}
//     >
//       SAVE
//     </button>
//   );
// }

// function EditBtn() {
//   return <button className="deck-inner-btn edit-btn ">EDIT</button>;
// }

// function handleAddtoEditor(card, selected, setSelected) {
//   // let deck = state.playerDecks[selected];
//   if (card.Type === "magi") selected.magi = [...selected.magi, card];
//   else selected.crs = [...selected.crs, card];

//   setSelected((selected) => selected);
//   console.log(selected);
//   // card.Type === 'magi' &&
// }
