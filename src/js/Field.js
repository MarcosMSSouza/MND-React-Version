import switchingGameSections from "../sounds/switchingGameSections.mp3";
import hoveringSystemBtns from "../sounds/hoveringSystemBtns.mp3";
import useSound from "use-sound";
import React, { useState, useEffect } from "react";
import { Options } from "./decks";
import { state } from "./model";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  PlayerHand,
  FieldCreateCard,
  FieldCardOpen,
  Log,
} from "./FieldMovingParts";
import { convertedMNDcards } from "./cards";
// import { reorder, move, onDragEnd } from "./dragNdrop";
// import { useCallback, useReducer } from "react";
// import { convertedMNDcards } from "./cards";

// let copyOFactiveDeck = [...state.selectedDeck.crs];

export function Field({
  selected,
  setSelected,
  handleFieldOpen,
  fieldOpen,
  handleSetPSopen,
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  function handleSetOtionsOpen() {
    setOptionsOpen((optionsOpen) => !optionsOpen);

    // return <Options optionsOpen={optionsOpen} />;
  }

  const soundUrl = hoveringSystemBtns;
  const [play] = useSound(soundUrl);

  const soundUrl2 = switchingGameSections;
  const [play2] = useSound(soundUrl2);
  ///////////////

  const [cardsOnHand, setCardsOnHand] = useState(state.playerHand1);
  const [cardsOnGameArea1, setCardsOnGameArea1] = useState([
    convertedMNDcards["Balamant"],

    convertedMNDcards["Weebo"],
    convertedMNDcards.Eebit,
    convertedMNDcards["Giant Carillion"],
    convertedMNDcards["Furok"],
  ]);
  const [cardsOnGameArea2, setCardsOnGameArea2] = useState([
    convertedMNDcards["Corathan"],

    convertedMNDcards["Core Hyren"],
    convertedMNDcards.Severos,
    convertedMNDcards.Szalak,
    convertedMNDcards["Ugger"],
  ]);

  const [cardsOnEnemyHand, setCardsOnEnemyHand] = useState([
    "1",
    "2",
    3,
    4,
    5,
    6,
    7,
  ]);

  const prevcardsOnHand = React.useRef(cardsOnHand);
  const prevcardsOnGameArea1 = React.useRef(cardsOnGameArea1);

  //=====Update LOG when cards are played ====//
  useEffect(() => {
    // console.log("cardsOnHand mudou");
    const addedItemOnHand = cardsOnHand.find(
      (item) => !prevcardsOnHand.current.includes(item)
    );
    const removedItemOnHand = prevcardsOnHand.current?.find(
      (item) => !cardsOnHand.includes(item)
    );
    const addedItemOnGameArea = cardsOnGameArea1.find(
      (item) => !prevcardsOnGameArea1.current.includes(item)
    );
    const removedItemOnGameArea = prevcardsOnGameArea1.current?.find(
      (item) => !cardsOnGameArea1.includes(item)
    );

    if (removedItemOnGameArea) {
      // console.log("Item added:", addedItem);
      setLogActions((logbit) => [
        `${addedItemOnHand.Name} left the field`,
        ...logbit,
      ]);
    }

    if (addedItemOnHand && !removedItemOnGameArea) {
      setLogActions((logbit) => [
        `${addedItemOnHand.Name} was drawn`,
        ...logbit,
      ]);
    }

    if (addedItemOnGameArea) {
      // console.log("Item removed:", removedItem);
      setLogActions((logbit) => [
        `${removedItemOnHand.Name} was played`,
        ...logbit,
      ]);
      // setLogActions((a) => [power, ...a]);
    }
    prevcardsOnHand.current = cardsOnHand;
    prevcardsOnGameArea1.current = cardsOnGameArea1;
  }, [cardsOnHand, cardsOnGameArea1]);

  const [logActions, setLogActions] = useState(["Game has started!"]);

  const move = (results) => {
    const { source, destination } = results;

    const fonte = [
      ...(source.droppableId === "cardsOnHand"
        ? cardsOnHand
        : cardsOnGameArea1),
    ];
    const [removed] = fonte.splice(source.index, 1);
    source.droppableId === "cardsOnHand"
      ? setCardsOnHand(fonte)
      : setCardsOnGameArea1(fonte);

    const alvo = [
      ...(destination.droppableId === "cardsOnHand"
        ? cardsOnHand
        : cardsOnGameArea1),
    ];
    alvo.splice(destination.index, 0, removed);

    destination.droppableId === "cardsOnHand"
      ? setCardsOnHand(alvo)
      : setCardsOnGameArea1(alvo);

    return;
  };

  const reorder = (droppableId, startIndex, endIndex) => {
    // console.log(droppableId, startIndex, endIndex);
    const result = [
      ...(droppableId === "cardsOnHand" ? cardsOnHand : cardsOnGameArea1),
    ];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) return;

    // console.log(source.droppableId, destination.droppableId);
    if (source.droppableId === destination.droppableId) {
      const reorderedArray = reorder(
        source.droppableId,
        source.index,
        destination.index
      );
      source.droppableId === "cardsOnHand"
        ? setCardsOnHand(reorderedArray)
        : setCardsOnGameArea1(reorderedArray);

      // newState[sInd] = items;
      console.log({ source, destination });
    } else {
      console.log({ destination });

      const resultado = result;

      move(resultado);
    }
  }

  //////////////////////////

  const [isZoomed, setZoomed] = useState(false);
  const [isFieldCardOpen, setIsFieldCardOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomPositionGameAreaCard, setZoomPositionGameAreaCard] = useState({
    x: 0,
    y: 0,
  });
  const [targetSrc, setTargetSrc] = useState("");

  const handleMouseEnter = (e) => {
    setZoomed(true);

    setTargetSrc(e.target.src);
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = rect.right - 140;
    const y = -150;

    setZoomPosition({ x, y });
    // console.log(zoomPosition);
  };

  const handleMouseLeave = () => {
    setZoomed(false);
  };
  const ImageZoom = () => {
    return (
      isZoomed && (
        <div
          className="zoomed-image-div"
          style={{ left: `${zoomPosition.x}px`, top: `${zoomPosition.y}px` }}
        >
          <img src={targetSrc} alt="Zoomed" className="zoomed-image" />
        </div>
      )
    );
  };

  const [gameCardTarget, setGameCardTarget] = useState("");
  const [openGameAreaCard, setOpenGameAreaCard] = useState("");

  function handleFielCardOpen(e, card) {
    console.log(e.target);
    setOpenGameAreaCard(card);
    const rect = e.target.getBoundingClientRect();
    let name = e.target.closest(".gameAreaCardDiv").getAttribute("name");
    console.log(name);
    const x = rect.right - 160;
    const y = -200;
    setZoomPositionGameAreaCard({ x, y });
    setIsFieldCardOpen((cur) => !cur);
    // setGameCardTarget(convertedMNDcards[e.target.name]);
    setGameCardTarget(convertedMNDcards[name]);
    // console.log(gameCardTarget);
  }
  /////Fieldcardopen///////
  return (
    fieldOpen && (
      <>
        <div class="main-container">
          {/* ///////////////// */}
          {/* <div class="relics-area relicsLeft2 dragarea"></div> */}
          <RelicsArea classs={"relics-area relicsLeft2"} />
          {/* <div class="magi-container2"></div> */}
          <MagiContainer deck={state.playerDecks.deck_2.magi} player={2} />
          {/* <div class="relics-area relicsRight2 dragarea"></div> */}
          <RelicsArea classs={"relics-area relicsRight2 "} />
          {/* ======== P2 SIDE START=====  */}
          <section class="container player-side-2">
            <DragDropContext onDragEnd={onDragEnd}>
              {/* <section class="gameArea2 dragarea"></section> */}
              <GameArea2 class1={"gameArea2"} gameArray={cardsOnGameArea2} />

              {/* <section class="player2-hand Hand dragarea"></section> */}

              <PlayerHand2
                class1={"player2-hand Hand"}
                gameArray={cardsOnEnemyHand}
              />
              {/* <PlayerHand classs={"player2-hand Hand dragarea"} player={2} /> */}
            </DragDropContext>
          </section>

          <div class="drawdeck2">
            <div class="card">P2 Deck</div>
          </div>
          <DiscardPile classs={"discard2"}>
            <p>P2 Discard</p>
          </DiscardPile>
          <Log logActions={logActions} setLogActions={setLogActions} />
          {/* //  ============== p1 SIDE START ===========  */}
          <section class="container player-side-1">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="cardsOnGameArea1"
                type="group"
                direction="horizontal"
              >
                {(provided) => (
                  <section
                    className={"gameArea1"}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {/* {onPlayerHand1?.map((card, index) => ( */}
                    {/* {console.log(cardsOnGameArea1)} */}
                    {cardsOnGameArea1?.map((card, index) => (
                      <Draggable
                        draggableId={card.id}
                        key={card.id}
                        index={index}
                      >
                        {(provided) => (
                          <span
                            // className="store-container"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <FieldCreateCard
                              onGameArea={true}
                              onP1Side={true}
                              state={state}
                              card={card}
                              class1={"fieldCards"}
                              class2={"gameAreaCardDiv"}
                              handleFieldCardOpen={handleFielCardOpen}
                              setIsFieldCardOpen={setIsFieldCardOpen}
                              // setLogActions={setLogActions}
                            />
                          </span>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </section>
                )}
              </Droppable>
              <PlayerHand
                classs={"player1-hand Hand"}
                player={1}
                // onPlayerHand1={onPlayerHand1}
                cardsOnHand={cardsOnHand}
                handleMouseEnter={handleMouseEnter}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                // handleDragDrop={onDragEnd}
              />
            </DragDropContext>
            <ImageZoom />
            <FieldCardOpen
              isFieldCardOpen={isFieldCardOpen}
              setIsFieldCardOpen={setIsFieldCardOpen}
              zoomPositionGameAreaCard={zoomPositionGameAreaCard}
              gameCardTarget={gameCardTarget}
              openGameAreaCard={openGameAreaCard}
              setLogActions={setLogActions}
            />
          </section>

          <div class="relics-area relicsLeft1 "></div>

          <MagiContainer deck={selected.magi} player={1} />
          <div class="relics-area relicsRight1"></div>
          <FieldDeck
            classs={"drawdeck"}
            player={1}
            selected={selected}
            setSelected={setSelected}
            cardsOnHand={cardsOnHand}
            // setOnPlayerHand1={setOnPlayerHand1}
            setCardsOnHand={setCardsOnHand}
          >
            <p>CLICK HERE TO DRAW!</p>
          </FieldDeck>
          <section class="menu">
            <h1> Shortcuts</h1>
            <div class="console hor_bar">
              <FieldSystemButton
                onclick={handleFieldOpen}
                onclicksound={play2}
                onmouseoversound={play}
              >
                <p>PLAY</p>
              </FieldSystemButton>

              <FieldSystemButton
                onclick={handleFieldOpen}
                onclick2={handleSetPSopen}
                onclicksound={play2}
                onmouseoversound={play}
              >
                <p>COLLEC</p>
              </FieldSystemButton>

              <FieldSystemButton
                onclick={handleSetOtionsOpen}
                onclicksound={play2}
                onmouseoversound={play}
              >
                <p>OPTIONS</p>
              </FieldSystemButton>
              <h1>---------</h1>
              {/* <button class="console_button" type="button" id="console-Deck_1">
                <p>Deck 1</p>
              </button> */}
              <SelectFieldDeck selected={selected} setSelected={setSelected} />
              <button class="console_button" type="button" id="console-Deck_2">
                <p>placeholder</p>
              </button>
              <Options optionsOpen={optionsOpen} />
            </div>
          </section>
          <DiscardPile classs={"discard"}>
            <p>P1 Discard</p>
          </DiscardPile>
        </div>
      </>
    )
  );
}

function FieldSystemButton({
  children,
  onclick,
  onclick2,
  onclicksound,
  onmouseoversound,
}) {
  return (
    <button
      class="console_button console_field_button"
      type="button"
      // id="btn-play"
      onClick={() => {
        onclicksound();
        onclick();
        onclick2 && onclick2();
      }}
      onMouseEnter={onmouseoversound}
    >
      {children}
    </button>
  );
}

function FieldDeck({
  children,
  classs,
  player,
  selected,
  setSelected,
  cardsOnHand,
  setOnPlayerHand1,
  setCardsOnHand,
}) {
  const playerNumber = player;
  // playerNumber === 1 && setSelected(state.playerDecks.deck_1);
  // console.log("selected is ", selected);
  // console.log(selected);
  // console.log(state.selectedDeck);

  // playerNumber === 1 && console.log("FIELDDECK RENDERIZADO");
  playerNumber === 1 && (state.selectedDeck.magi = selected.magi);
  playerNumber === 1 && (state.selectedDeck.crs = selected.crs);

  const handleDrawCard = function () {
    const cardToDraw = drawfromDeck();
    ///changeIDforCopies
    // let copyCounter = 0;
    // cardsOnHand.forEach((card) => {
    //   if (card.Name === cardToDraw.Name) copyCounter++;
    // });

    console.log(cardsOnHand, cardToDraw);
    // let copyCounter = 0;

    // }
    ///
    // console.log("resta no deck", state.selectedDeck.crs);
    // console.log("card to draw => ", ...cardToDraw);
    const newHand = [...cardsOnHand, ...cardToDraw];
    // console.log(newHand);
    // setOnPlayerHand1((a) => newHand);
    state.playerHand1 = newHand;
    console.log("card draw ", cardToDraw);
    setCardsOnHand(newHand);
    // console.log(onPlayerHand1);
  };

  return (
    <div
      className={classs}
      onClick={() => {
        console.log("FieldDeck clicked!");
        if (state.selectedDeck.crs.length === 0) return;
        handleDrawCard();
        console.log(state.selectedDeck);
        // setOnPlayerHand1([...onPlayerHand1, cardDrawn]);
        // console.log(onPlayerHand1);
      }}
    >
      <div class="drawdeck1-innverDiv">
        <span>
          {" "}
          {state.selectedDeck.crs?.length === undefined
            ? "No deck selected!"
            : state.selectedDeck.crs.length + "\ncards left"}
          {/* copyOFactiveDeck.length + "\ncards left"} */}
        </span>
        <p>.Click to draw.</p>
      </div>
    </div>
  );
}

function DiscardPile({ children, classs }) {
  return (
    <div className={classs}>
      <div class="card">{children}</div>
    </div>
  );
}

////////playerhand //////////

/////fieldcreatecard///////

// function GameArea({ class1, handleDragDrop, gameArray }) {
//   // console.log(cardsOnGameArea1);
//   return (
//     <Droppable droppableId={gameArray} type="group" direction="horizontal">
//       {(provided) => (
//         <section
//           className={class1}
//           {...provided.droppableProps}
//           ref={provided.innerRef}
//         >
//           {gameArray?.map((card, index) => {
//             return (
//               <Draggable draggableId={card.id} key={card.id} index={index}>
//                 {(provided) => (
//                   <span
//                     className={class1}
//                     {...provided.dragHandleProps}
//                     {...provided.draggableProps}
//                     ref={provided.innerRef}
//                   >
//                     <FieldCreateCard
//                       state={state}
//                       card={card}
//                       class1={"fieldCards"}
//                       class2={"gameAreaCardDiv"}
//                     />
//                   </span>
//                 )}
//               </Draggable>
//             );
//           })}
//         </section>
//       )}
//     </Droppable>
//   );
// }

function GameArea2({ class1, handleDragDrop, gameArray }) {
  // console.log(cardsOnGameArea1);
  return (
    <section className={class1}>
      {gameArray?.map((card, index) => {
        return (
          // <span className={class1}>
          <span>
            <FieldCreateCard
              index={index}
              state={state}
              card={card}
              class1={"fieldCards"}
              class2={"gameAreaCardDiv"}
              class3={"onP2Side"}
            />
          </span>
        );
      })}
    </section>
  );
}

function PlayerHand2({ class1, handleDragDrop, gameArray }) {
  // console.log(cardsOnGameArea1);
  return (
    <section className={class1}>
      {gameArray?.map((card, index) => {
        return (
          // <span className={class1}>
          <span>
            {/* <FieldCreateCard
              index={index}
              state={state}
              card={card}
              class1={"hand-cards"}
              class2={"gameAreaCardDiv"}
              class3={"onP2Side"}
            /> */}
            <div className="hand-cards2" alt="handcards2" />
          </span>
        );
      })}
    </section>
  );
}

function MagiContainer({ classs, deck, player }) {
  // const playerNumber = player;

  return (
    <div className={`magi-container-${player}`}>
      <div className={"magi-pile"} draggable="false">
        <img src={deck[0]?.url} alt="" />
      </div>
    </div>
  );
}
// `magi-pile-${playerNumber}`
function RelicsArea({ classs }) {
  return <div className={classs}></div>;
}

function generateRandomNumbers() {
  if (
    state.selectedDeck.crs?.length === 0 ||
    state.selectedDeck.crs?.length === undefined
  )
    return;

  let randomNumber = Math.floor(Math.random() * state.selectedDeck.crs.length);
  console.log("length ", +state.selectedDeck.crs.length);

  return randomNumber;
}

function drawfromDeck() {
  if (
    state.selectedDeck.crs?.length === 0 ||
    state.selectedDeck.crs?.length === undefined
  )
    return;

  // let hand = document.querySelector(".player1-hand");
  // let selectedDeck = state.selectedDeck.crs;
  let random = generateRandomNumbers();

  // console.log("drawn card", state.selectedDeck.crs.splice(random, 1));
  return state.selectedDeck.crs.splice(random, 1);
}

function SelectFieldDeck({ selected, setSelected }) {
  return (
    <button
      className="console_button"
      type="button"
      id="console-Deck_1"
      onClick={() => {
        // handleResetFieldDeck();
      }}
    >
      <p>placeholder</p>
    </button>
  );
}
