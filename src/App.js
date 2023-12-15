import "./App.css";
import { convertedMNDcards } from "./js/cards";
import { useState, useEffect, Children } from "react";
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
import toggleFilterSound from "./sounds/toggleFilterSound.wav";
import changingPage from "./sounds/changingPage.mp3";
// import { Options, optionsOpen } from "./js/decks";

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

      <ProgressBar />
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
      />
      {/* </div> */}

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

function FilterBar({
  cardSetFilter,
  setCardSetFilter,
  cardTypeFilter,
  setCardTypeFilter,
  query,
  setQuery,
}) {
  const sets = [
    "Unlimited",
    "Awakening",
    "Nightmare's Dawn",
    "Promo",
    "Voice of the Storms",
    "Dream's End",
  ];
  const soundUrl = toggleFilterSound;
  const [play] = useSound(soundUrl);

  const types = ["magi", "creature", "relic", "spell"];
  // const [filterBarOpen, setFilterBarOpen] = useState(false);

  // const [query, setQuery] = useState("");
  function handleResetFilters() {
    play();
    setCardSetFilter([]);
    setCardTypeFilter([]);
    setQuery("");
  }

  return (
    <wrapper className={"newfilterbar"}>
      {/* <span className={"filterLabel "}></span> */}
      <p className="filterLabel">Filter by Set:</p>
      <div className={"setSymbolsWrapper"}>
        {sets.map((set) => (
          <FilterSetIcons
            set={set}
            cardSetFilter={cardSetFilter}
            setCardSetFilter={setCardSetFilter}
          />
        ))}
      </div>
      <p className="filterLabel">Filter by Type:</p>
      <div className={"typeSymbolsWrapper"}>
        {types.map((type) => (
          <FilterTypeIcons
            type={type}
            cardTypeFilter={cardTypeFilter}
            setCardTypeFilter={setCardTypeFilter}
          />
        ))}
      </div>
      <label className="searchLabel"></label>
      <input
        type="text"
        className={"searchBarWrapper"}
        placeholder="Search cards..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          console.log(query);
        }}
      ></input>
      <div
        className={"XFilterBtn"}
        // style={{
        //   marginBottom: "5px",
        //   backgroundImage: `url(${require("./img/x3.png")})`,
        // }}
        alt="X"
        onClick={(e) => handleResetFilters()}
      />
      {/* </div> */}
    </wrapper>
  );
}

function FilterSetIcons({ set, cardSetFilter, setCardSetFilter }) {
  // const [filterBarOpen, setFilterBarOpen] = useState(false);
  const soundUrl = toggleFilterSound;
  const [play] = useSound(soundUrl);

  function handleFilterSet(id) {
    play();
    const value = id;
    console.log(value);
    if (!cardSetFilter.some((set) => set === value))
      setCardSetFilter((cur) => [...cur, value]);

    if (cardSetFilter.some((set) => set === value))
      setCardSetFilter((cur) => (cur = cur.filter((curr) => curr !== set)));
  }

  // const handleCheckFilterActive = function (id) {
  //   if (!setFilter.some((set) => set === id)) return true;
  // };

  let filename = set;
  if (set === "Nightmare's Dawn") filename = "NightmaresDawn";
  if (set === "Voice of the Storms") filename = "VoiceoftheStorms";
  if (set === "Dream's End") filename = "DreamsEnd";
  return (
    <div
      className={`setSymbolFilter ${
        !cardSetFilter.some((sets) => sets === set) && "noFilter"
      }`}
      style={{
        backgroundImage: `url(${require(`./img/setSymbols/${filename}.png`)})`,
      }}
      id={set}
      alt={set}
      onClick={(e) => handleFilterSet(e.target.id)}
    />
  );
}

function FilterTypeIcons({ type, cardTypeFilter, setCardTypeFilter }) {
  // const [filterBarOpen, setFilterBarOpen] = useState(false);
  const soundUrl = toggleFilterSound;
  const [play] = useSound(soundUrl);

  function handleFilterSet(id) {
    play();
    const value = id;
    console.log(value);
    if (!cardTypeFilter.some((typ) => typ === value))
      setCardTypeFilter((cur) => [...cur, value]);

    if (cardTypeFilter.some((set) => set === value))
      setCardTypeFilter((cur) => (cur = cur.filter((curr) => curr !== type)));
  }

  // const handleCheckFilterActive = function (id) {
  //   if (!setFilter.some((set) => set === id)) return true;
  // };

  let filename = type;
  // if (set === "Nightmare's Dawn") filename = "NightmaresDawn";
  // if (set === "Voice of the Storms") filename = "VoiceoftheStorms";
  // if (set === "Dream's End") filename = "DreamsEnd";
  return (
    <div
      className={`setSymbolFilter ${
        !cardTypeFilter.some((sets) => sets === type) && "noFilter"
      }`}
      style={{
        backgroundImage: `url(${require(`./img/typeSymbols/${filename}-inverted.png`)})`,
      }}
      id={type}
      alt={type}
      onClick={(e) => handleFilterSet(e.target.id)}
    />
  );
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
}) {
  return (
    <div className="modal-collection-content-wrapper">
      <div className="content-wrapper">
        {regions.map(
          (region) =>
            // regionActive === region &&
            // <div
            //   className={`modal-collection-content content-${region} ${
            //     regionActive !== region ? "hidden" : ""
            //   }`}
            //   key={`content-${region}`}
            // >
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
                    />
                  );
                })}
              </CollectionRegionTab>
            )
        )}
        {/* <div className="newfilterbar">
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </div> */}
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
      // ${regionActive !== region ? "hidden" : ""}
      key={`content-${region}`}
    >
      {children}
    </div>
  );
}
/////////////

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
}) {
  // Object.values(convertedMNDcards).map((card) => {
  let regexPatern = /[^A-Za-z0-9_]/g;

  if (card.Region !== region) return;

  // ===== Filter Bar on Collection ======
  // if (cardSetFilter.some((set) => set !== card.Set)) return;
  // if (CardSetFilter.includes("Awakening") && card.Set === "Awakening") return;
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
  //   }
  if (!card.Name.toLowerCase().replaceAll("_", " ").includes(query)) return;
  // });
  // if (card.Set !== "Awakening") return;
  // console.log(filteredCard && filteredCard);
  if (
    card.Set === "UnreleasedPromos" ||
    card.Set === "Daybreak" ||
    card.Set === "Traitor's Reach"
    // card === filteredCard
  )
    return;

  // ==== Special Rules for getting the correct URL =======//
  ////////////////

  ///////////////////////////
  let Type = card.Type.replace(regexPatern).toLowerCase();

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

  //////////
  state.deckEditor.curMagi = selected?.magi;
  state.deckEditor.curCrs = selected?.crs;

  let onEditor = [...state.deckEditor?.curMagi, ...state.deckEditor?.curCrs];

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
    let onEditor = [...state.deckEditor.curMagi, ...state.deckEditor.curCrs];

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

    addCardsToEditor();

    addDeckRegionImg(selected);
  }

  function removeCardsFromEditor(card) {
    // console.log(card);
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

  // card.url = `url(${require(`./img/cardback.jpg`)})`;

  return (
    // <div cardtype={card.Type} key={card.Name}>
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
      onMouseEnter={play}
    />
    // </div>
  );
}
/////////////////////////////////////

const ProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const progressBarInterval = setInterval(() => {
      if (width < 100) {
        setWidth((prevWidth) => prevWidth + 0.2);
      }

      // const modalLoadingScreen = document.getElementById("modal-loadingScreen");
      // const modalPlayScreen = document.getElementById("modal-PlayScreen");

      if (width >= 55) {
        clearInterval(progressBarInterval);
        // modalLoadingScreen.classList.add("hidden");
        // modalPlayScreen.classList.remove("hidden");
      }
    }, 5);

    document.addEventListener("click", () => {
      clearInterval(progressBarInterval);
      setWidth((a) => {
        // if (a !== 100) a = 100;
        // return a + 50;
      });
    });

    return () => {
      document.removeEventListener("click", clearInterval(progressBarInterval));
      clearInterval(progressBarInterval);
    };
  }, [width]);

  return (
    width < 100 && (
      <div class="modal" id="modal-loadingScreen">
        <div class="modal-dialog">
          <div class="modal-loadingScreen-content">
            <div class="modal-loadingScreen-MNDLogo"></div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                data-label="Loading..."
                style={{ width: `${width}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
