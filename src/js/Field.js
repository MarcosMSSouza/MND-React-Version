import switchingGameSections from "../sounds/switchingGameSections.mp3";
import hoveringSystemBtns from "../sounds/hoveringSystemBtns.mp3";
import useSound from "use-sound";
import React, { useState, useEffect } from "react";
import { Options, volume } from "./decks";
import { state } from "./model";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  PlayerHand,
  FieldCreateCard,
  FieldCardOpen,
  Log,
} from "./FieldMovingParts";
import { convertedMNDcards } from "./cards";
import {
  getCardPowerNames,
  handleGameAreaCardOpen,
  getMagiPowerNames,
} from "./FieldMovingParts";
import powerUsed from "../sounds/powerUsed.wav";

export function Field({
  selected,
  setSelected,
  handleFieldOpen,
  fieldOpen,
  handleSetPSopen,
  optionsOpen,
  setOptionsOpen,
  scaleValue,
  setScaleValue,
  checked,
  setChecked,
}) {
  // const [optionsOpen, setOptionsOpen] = useState(false);
  function handleSetOtionsOpen() {
    setOptionsOpen((optionsOpen) => !optionsOpen);
  }

  const [play] = useSound(hoveringSystemBtns, { volume });

  const [play2] = useSound(switchingGameSections, { volume });

  const [cardsOnHand, setCardsOnHand] = useState(state.playerHand1);

  const [enemyMagis, setEnemyMagis] = useState([
    convertedMNDcards.Lanyx,
    convertedMNDcards.Morag,
    convertedMNDcards.Qwade,
    convertedMNDcards.Warrada,
    convertedMNDcards.Barak,
  ]);
  const [cardsOnGameArea1, setCardsOnGameArea1] = useState([
    convertedMNDcards["Balamant"],

    convertedMNDcards["Weebo"],
    convertedMNDcards.Eebit,
    convertedMNDcards["Giant Carillion"],
    convertedMNDcards["Furok"],
    convertedMNDcards["Forest Hyren"],
  ]);
  const [cardsOnGameArea2, setCardsOnGameArea2] = useState([
    convertedMNDcards["Corathan"],

    convertedMNDcards["Core Hyren"],
    convertedMNDcards.Severos,
    convertedMNDcards.Szalak,
    convertedMNDcards["Ugger"],
  ]);

  const [cardsOnEnemyHand, setCardsOnEnemyHand] = useState([
    1, 2, 3, 4, 5, 6, 7,
  ]);

  const prevcardsOnHand = React.useRef(cardsOnHand);
  const prevcardsOnGameArea1 = React.useRef(cardsOnGameArea1);

  //=====Update LOG when cards are played ====//
  useEffect(() => {
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

    // let player = e.target.closest(".container").getAttribute("player");

    if (removedItemOnGameArea) {
      setLogActions((logbit) => [
        { player: 1, action: `${addedItemOnHand.Name} left the field` },
        ...logbit,
      ]);
    }

    if (addedItemOnHand && !removedItemOnGameArea) {
      setLogActions((logbit) => [
        { player: 1, action: `${addedItemOnHand.Name} was drawn` },
        ...logbit,
      ]);
    }

    if (addedItemOnGameArea) {
      setLogActions((logbit) => [
        { player: 1, action: `${removedItemOnHand.Name} was played` },
        ...logbit,
      ]);
    }
    prevcardsOnHand.current = cardsOnHand;
    prevcardsOnGameArea1.current = cardsOnGameArea1;
  }, [cardsOnHand, cardsOnGameArea1]);

  const [logActions, setLogActions] = useState([
    { player: "1", action: "Game has started!" },
  ]);

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
    const result = [
      ...(droppableId === "cardsOnHand" ? cardsOnHand : cardsOnGameArea1),
    ];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const reorderedArray = reorder(
        source.droppableId,
        source.index,
        destination.index
      );
      source.droppableId === "cardsOnHand"
        ? setCardsOnHand(reorderedArray)
        : setCardsOnGameArea1(reorderedArray);

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
    console.log(rect);
    const x = rect.right - 120;
    const y = -150;

    setZoomPosition({ x, y });
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
          <img src={targetSrc} alt="Zoomed" className="zoomed-image show" />
        </div>
      )
    );
  };

  const [gameCardTarget, setGameCardTarget] = useState("");
  const [openGameAreaCard, setOpenGameAreaCard] = useState("");

  function handleFieldCardOpen(e, card) {
    console.log(e.target);
    setOpenGameAreaCard(card);
    const rect = e.target.getBoundingClientRect();
    let name = e.target.closest(".gameAreaCardDiv").getAttribute("name");
    console.log(name);
    const x = rect.right - 160;
    const y = -200;
    setZoomPositionGameAreaCard({ x, y });
    setIsFieldCardOpen((cur) => !cur);
    setGameCardTarget(convertedMNDcards[name]);
  }
  return (
    fieldOpen && (
      <>
        <div class="main-container">
          <div class="relics-area relicsSide-2 ">
            {" "}
            <MagiContainer
              deck={enemyMagis}
              player={2}
              setLogActions={setLogActions}
            />
          </div>

          {/* ======== P2 SIDE START=====  */}
          <section class="container player-side-2" player={1}>
            <DragDropContext onDragEnd={onDragEnd}>
              <GameArea2
                class1={"gameArea2"}
                gameArray={cardsOnGameArea2}
                handleMouseEnter={handleMouseEnter}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
              />

              <PlayerHand2
                class1={"player2-hand Hand"}
                gameArray={cardsOnEnemyHand}
              />
            </DragDropContext>
          </section>

          <div class="drawdeck2">
            <div class="card">P2 Deck</div>
          </div>
          <DiscardPile classs={"discard2"}>
            <p>P2 Discard</p>
          </DiscardPile>
          <Log logActions={logActions} setLogActions={setLogActions} />
          {/* //  ======= P1 SIDE START ==========  */}
          <section class="container player-side-1 " player={1}>
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
                    {cardsOnGameArea1?.map((card, index) => (
                      <Draggable
                        draggableId={card.id}
                        key={card.id}
                        index={index}
                      >
                        {(provided) => (
                          <span
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
                              handleFieldCardOpen={handleFieldCardOpen}
                              setIsFieldCardOpen={setIsFieldCardOpen}
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
                cardsOnHand={cardsOnHand}
                handleMouseEnter={handleMouseEnter}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
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

          <div class="relics-area relicsSide-1 ">
            {" "}
            <MagiContainer
              deck={selected.magi}
              player={1}
              setLogActions={setLogActions}
            />
          </div>

          <FieldDeck
            classs={"drawdeck"}
            player={1}
            selected={selected}
            setSelected={setSelected}
            cardsOnHand={cardsOnHand}
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

              <SelectFieldDeck selected={selected} setSelected={setSelected} />
              <button class="console_button" type="button" id="console-Deck_2">
                <p>placeholder</p>
              </button>
              <Options
                optionsOpen={optionsOpen}
                setOptionsOpen={setOptionsOpen}
                scaleValue={scaleValue}
                setScaleValue={setScaleValue}
                checked={checked}
                setChecked={setChecked}
              />
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

  playerNumber === 1 && (state.selectedDeck.magi = selected.magi);
  playerNumber === 1 && (state.selectedDeck.crs = selected.crs);

  const handleDrawCard = function () {
    const cardToDraw = drawfromDeck();

    console.log(cardsOnHand, cardToDraw);

    const newHand = [...cardsOnHand, ...cardToDraw];
    state.playerHand1 = newHand;
    console.log("card draw ", cardToDraw);
    setCardsOnHand(newHand);
  };

  return (
    <div
      className={classs}
      onClick={() => {
        console.log("FieldDeck clicked!");
        if (state.selectedDeck.crs.length === 0) return;
        handleDrawCard();
        console.log(state.selectedDeck);
      }}
    >
      <div class="drawdeck1-innverDiv">
        <span>
          {" "}
          {state.selectedDeck.crs?.length === undefined
            ? "No deck selected!"
            : state.selectedDeck.crs.length + "\ncards left"}
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

function GameArea2({
  class1,
  handleDragDrop,
  gameArray,
  handleMouseEnter,
  handleMouseMove,
  handleMouseLeave,
}) {
  let onP2Side = true;
  const handCards = true;
  return (
    <section className={class1}>
      {gameArray?.map((card, index) => {
        return (
          <span>
            <FieldCreateCard
              index={index}
              state={state}
              card={card}
              class1={"fieldCards"}
              class2={"gameAreaCardDiv"}
              class3={"onP2Side"}
              onP2Side={onP2Side}
              handCards={handCards}
              handleMouseEnter={handleMouseEnter}
              handleMouseMove={handleMouseMove}
              handleMouseLeave={handleMouseLeave}
            />
          </span>
        );
      })}
    </section>
  );
}

function PlayerHand2({ class1, handleDragDrop, gameArray }) {
  return (
    <section className={class1}>
      {gameArray?.map((card, index) => {
        return (
          <span>
            <div className="hand-cards2" alt="handcards2" />
          </span>
        );
      })}
    </section>
  );
}

function MagiContainer({
  classs,
  deck,
  player,
  gameCardTarget,
  setLogActions,
}) {
  // console.log(deck);
  // if (deck === undefined || !deck) return;
  console.log(deck[0]);
  const [powerCost, powerName1, firstPowerText, powerName2, secondPowerText] =
    getMagiPowerNames(deck[0]);

  console.log(powerName1);
  return (
    <>
      <section className={`magiSide-${player}`}>
        {<img className={`magiPileHover-${player}`} src={deck[0].url} alt="" />}
        <div className={`magi-container-${player}`}>
          <div className={"magi-pile"} draggable="false">
            <img src={deck[0]?.url} alt="" />
          </div>
        </div>
        <MagiPowerButton
          deck={deck[0]}
          powerCost={powerCost}
          // isPower={isPower}
          topBtn={"topBtn"}
          powerName={powerName1}
          powerText={firstPowerText}
          handleGameAreaCardOpen={handleGameAreaCardOpen}
          setLogActions={setLogActions}
          player={player}
        />

        <MagiPowerButton
          deck={deck[0]}
          powerCost={powerCost}
          powerName={powerName2}
          downBtn={"downBtn"}
          powerText={secondPowerText}
          handleGameAreaCardOpen={handleGameAreaCardOpen}
          setLogActions={setLogActions}
          player={player}
        />
      </section>
    </>
  );
}

function MagiPowerButton({
  deck,
  powerCost,
  topBtn,
  downBtn,
  powerName,
  powerText,
  handleGameAreaCardOpen,
  setLogActions,
  player,
}) {
  // if (volume > 0.2) {
  //   volume = 0.2;
  // }
  const [play] = useSound(
    powerUsed,
    volume > 0.2 ? { volume: 0.2 } : { volume: 0 }
  );
  if (!deck) return;
  const finalPowerName = powerName.slice(8, powerName.length - 1);
  const isPower = powerName.slice(0, 5) === "Power";
  console.log(isPower);

  if (isPower && powerCost.length > 4) powerCost = 0;
  return powerName ? (
    <div
      className={`MagiBtn ${topBtn ? "topBtn" : "downBtn"} btn${player} ${
        isPower ? "MagiPowerButton" : "MagiEffectButton"
      } `}
      value={finalPowerName}
      onClick={(e) => {
        isPower && play();
        handleGameAreaCardOpen(
          e,
          e.target.closest("div").getAttribute("value"),
          isPower,
          setLogActions,
          player
        );
      }}
    >
      <p>{isPower ? powerCost : "ef."}</p>
      <span className={`magiPowerSpan-${player}`}>
        <p className="cardText-PowerName">{powerName}</p>
        <p className="cardText-restOfText">{powerText}</p>
      </span>
    </div>
  ) : null;
}
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

  let random = generateRandomNumbers();

  return state.selectedDeck.crs.splice(random, 1);
}

function SelectFieldDeck({ selected, setSelected }) {
  return (
    <button
      className="console_button"
      type="button"
      id="console-Deck_1"
      onClick={() => {}}
    >
      <p>placeholder</p>
    </button>
  );
}
