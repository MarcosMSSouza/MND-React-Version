import "./App.css";
import { convertedMNDcards } from "./js/cards";
import { useState } from "react";
import { renderColDecksss } from "./js/decks";
import { state } from "./js/model";
import regionPng from "./img/regionSymbols/Arderial.png";
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

export default function App() {
  // console.log(state.playerDecks);
  // const regionImg = regionPng;
  const [regionActive, setRegionActive] = useState("Arderial");

  function handleRegionButtonClick(e, region) {
    // regionbtn.addEventListener("mouseover", () => {

    renderColDecksss();
    setRegionActive(region);
  }

  return (
    <CollectionBackground
      regionActive={regionActive}
      onRegionButtonClick={handleRegionButtonClick}
    />
  );
}

function CollectionBackground({ onRegionButtonClick, regionActive }) {
  const [selected, setSelected] = useState("deck_1");
  return (
    <div className="modal modal-collection ">
      <CollectionHeader onRegionButtonClick={onRegionButtonClick} />
      <CollectionContent regionActive={regionActive} />
      <CollectionBuilder state={state} selected={selected} />
      <CollectionDecks
        state={state}
        selected={selected}
        setSelected={setSelected}
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

function CollectionContent({ regionActive }) {
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
            return renderCollectionREGIONS(card, region);
            // return (

            //   console.log(allmagi);
          })}
        </div>
      ))}
    </>
  );
}

/////////////

function renderCollectionREGIONS(card, region) {
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
      <CreateCard card={card} Type={Type} key={card.Name} />
    </>
  );

  //////ok//////////
}

function CollectionBuilder({ state, selected }) {
  let selectedDeck = [
    ...state.playerDecks[`${selected}`].magi,
    ...state.playerDecks[`${selected}`].crs,
  ];
  const builder = true;
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
          <CreateCard card={card} builder={builder} />
        ))}
      </div>
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
  // let regionTabSelector = document.querySelector(`.content-${card.Region}`);
  // console.log(regionTabSelector);

  // {SELECIONAR CADA TAB DE CADA REGIÃO PRA INSERIR AS RESPECTIVAS CARTAS DENTRO }
  // <CreateCard card={card} type={Type} />;
  return (
    <div>
      <CreateCard card={card} />
    </div>
  );
  // Type === "magi"
  //   ? regionTabSelector.prepend(insertCard)
  //   : regionTabSelector.appendChild(insertCard);
}

function CreateCard({ card, builder }) {
  // console.log(card);
  // const [hovered, setHovered] = useState(false);
  // const toggleHover = () => setHovered(!hovered);

  return (
    <div cardtype={card.Type} key={card.Name} className="cardtest">
      <img
        // hovered ? "zoom" : ""`${card.Type}
        className={builder ? "builder-collection-cards " : "collection-cards"}
        src={card.url}
        id={card.id}
        dataset={card.Name}
        alt={card.Name}
        // onMouseEnter={toggleHover}
        // onMouseLeave={toggleHover}
      />
    </div>
  );
}

// function zoomOnHover(id) {
//   // let allCollectionCards = document.querySelectorAll(".collection-cards");

//   // let draggable = document.querySelectorAll(".field-cards");

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

////////////// RENDER DECKS ////////////////
function CollectionDecks({ state, regionImg, selected, setSelected }) {
  // const [selected, setSelected] = useState("deck_1");
  // console.log(selected);
  // let url = `./img/regionSymbols/Arderial.png`;
  // let deckimg = regionPng;
  function handleSelectDeck(id) {
    setSelected(id);
    // console.log(selected);
  } // let deckRegion = addDeckRegionImg(deck);

  return (
    <div className="modal-collection-decks">
      <div className="decks-title">DECKS</div>

      <button className="console_button" id="newDeck-btn" type="button">
        New Deck
      </button>

      <button className="console_button" id="editDeck-btn" type="button">
        Delete Deck
      </button>

      {/* <!-- //////// DECKS CONTAINER ///////////// --> */}
      <div className="new-decks-container">
        {Object.values(state.playerDecks).map((deck, i) => (
          <DeckBtn
            deck={deck}
            regionImg={regionImg}
            i={i + 1}
            selected={selected}
            onSelectDeck={handleSelectDeck}
          />
        ))}
      </div>

      <button className="console_button" type="button" id="btn-collection-back">
        BACK
      </button>
    </div>
  );
}

// function DecksB({ state }) {
//   // state.playerDecks.map((deck) => <DeckCol deck={deck} />);
//   Object.values(state.playerDecks).map((deck) => <DeckCol deck={deck} />);
// }

function DeckBtn({ deck, i, selected, onSelectDeck }) {
  let deckName = deck.name;
  let deckRegion = addDeckRegionImg(deck);

  // console.log(regionPng);

  let id = `deck_${i}`;
  // console.log(imageList[1]);

  return (
    <div
      className={`deck-btn ${deckRegion}  ${id === selected ? "selected" : ""}`}
      // id={deckRegion}
      // value={id}
      id={id}
      onClick={(e) => onSelectDeck(e.target.id)}
      // style={{ backgroundImage: 'url("/src/img/regionSymbols/Core.png")' }}
    >
      <h1 className="deck-title" style={{ pointerEvents: "none" }}>
        {deckName}
      </h1>
      <div className="deck-btns-container">
        <button className="deck-inner-btn save-btn ">SAVE</button>
        <button className="deck-inner-btn edit-btn ">EDIT</button>
      </div>
    </div>
  );
}

function addDeckRegionImg(deck) {
  let curDeck = deck.magi;

  let magiTypes = curDeck.map((magi) => magi.Region);
  // console.log(magiTypes);

  let deckRegion = magiTypes[0] === magiTypes[1] ? magiTypes[0] : magiTypes[2];

  return magiTypes.length > 2 ? deckRegion : magiTypes[0];
}
