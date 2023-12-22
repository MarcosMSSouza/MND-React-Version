import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { state } from "./model";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import { convertedMNDcards } from "./cards";
import { clear } from "@testing-library/user-event/dist/clear";
import powerUsed from "../sounds/powerUsed.wav";

export function PlayerHand({
  classs,
  player,
  handleMouseEnter,
  handleMouseMove,
  handleMouseLeave,
  handleDragDrop,
  cardsOnHand,
}) {
  const handCards = true;
  return (
    <Droppable droppableId="cardsOnHand" type="group" direction="horizontal">
      {(provided) => (
        <section
          className={classs}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {cardsOnHand.map((card, index) => {
            return (
              <Draggable draggableId={card.id} key={card.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <FieldCreateCard
                      state={state}
                      card={card}
                      class1={"hand-cards"}
                      handCards={handCards}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseMove={handleMouseMove}
                      handleMouseLeave={handleMouseLeave}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
}

export function FieldCreateCard({
  card,
  class1,
  class2,
  class3,
  handleMouseEnter,
  handleMouseMove,
  handleMouseLeave,
  handCards,
  handleFieldCardOpen,
  setIsFieldCardOpen,
  onGameArea,
  onP1Side,
  onP2Side,
  index,
}) {
  return (
    <div
      index={index}
      cardtype={card.Type}
      key={card.Name}
      name={card.Name}
      className={`${class2} ${class3} ${onGameArea && card.Type}`}
      onClick={(e) => {
        console.log(card);
        onP1Side && handleFieldCardOpen(e, card);
      }}
    >
      <img
        index={index}
        className={class1}
        name={card.Name}
        src={card.url}
        id={card.id}
        alt={card.Name}
        onMouseEnter={(e) => {
          handCards && handleMouseEnter(e);
        }}
        onMouseMove={(e) => {
          handCards && handleMouseMove(e);
        }}
        onMouseLeave={(e) => {
          handCards && handleMouseLeave(e);
        }}
      />
      {onP1Side || onP2Side ? (
        <div
          className={"FieldCard-EnergyCounter"}
          style={{ pointerEvents: "none" }}
          cardEnergy={card.Energy}
        >
          {card.Energy}
        </div>
      ) : null}
    </div>
  );
}

export function FieldCardOpen({
  isFieldCardOpen,
  setIsFieldCardOpen,
  zoomPositionGameAreaCard,
  gameCardTarget,
  openGameAreaCard,
  setLogActions,
}) {
  const handleOutsideClick = (event) => {
    if (
      event.target.closest(".gameArea-cardOpen-1") ||
      event.target.closest(".zoomed-gameAreaCard-image") ||
      event.target.closest(".fieldCards")
    ) {
      return;
    }
    setIsFieldCardOpen(false);
  };

  useEffect(() => {
    if (!isFieldCardOpen) return;

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isFieldCardOpen]);
  let cardTextBGregion = gameCardTarget?.Region;
  ///////////===Card Powers====//////

  const [powerName1, firstPowerText, powerName2, secondPowerText] =
    getCardPowerNames(gameCardTarget);

  return (
    isFieldCardOpen && (
      <div
        className="gameArea-cardOpen-1"
        style={{
          left: `${zoomPositionGameAreaCard.x}px`,
          top: `${zoomPositionGameAreaCard.y}px`,
        }}
      >
        <img
          src={gameCardTarget.url}
          alt="Zoomed"
          className="zoomed-gameAreaCard-image "
        />

        <div className={`CardText`}>
          <div className={`CardTextBG ${cardTextBGregion}`}>
            <PowerButton
              handleGameAreaCardOpen={handleGameAreaCardOpen}
              powerName={powerName1}
              powerText={firstPowerText}
              setLogActions={setLogActions}
            />
            {powerName2 && (
              <PowerButton
                handleGameAreaCardOpen={handleGameAreaCardOpen}
                powerName={powerName2}
                powerText={secondPowerText}
                setLogActions={setLogActions}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}

function PowerButton({
  powerName,
  powerText,
  handleGameAreaCardOpen,
  setLogActions,
}) {
  const finalPowerName = powerName.slice(8, powerName.length - 1);
  const isPower = powerName.slice(0, 5) === "Power";
  const soundUrl = powerUsed;
  const [play] = useSound(soundUrl, { volume: 0.2 });

  return (
    <button
      className={isPower ? "CardPowerBtn" : "CardEffect"}
      value={finalPowerName}
      onClick={(e) => {
        isPower && play();
        handleGameAreaCardOpen(
          e.target.closest("button").value,
          isPower,
          setLogActions
        );
      }}
    >
      <p className="cardText-PowerName">{powerName}</p>
      <p className="cardText-restOfText">{powerText}</p>
    </button>
  );
}

export function Log({ logActions, setLogActions }) {
  return (
    <section className="log">
      <h1>LOG</h1>
      <div className="logWrapper">
        {logActions.map((action, i) => {
          return <LogBit action={action} key={i} />;
        })}
      </div>
    </section>
  );
}

function LogBit({ action, key }) {
  return (
    <div className="logBit" id={key}>
      {action}
    </div>
  );
}

export function getMagiPowerNames(gameCardTarget) {
  console.log(gameCardTarget);
  let firstSlice = gameCardTarget.Text?.indexOf("-");
  console.log(firstSlice);

  let powerName0 = gameCardTarget.Text.slice(firstSlice - 7).trim();
  let powerName1 = powerName0.slice(0, powerName0.indexOf(":") + 1);

  let restOfText = gameCardTarget.Text?.slice(firstSlice + 1);
  let secondSlice =
    restOfText?.indexOf("Power -") !== -1
      ? restOfText?.indexOf("Power -")
      : restOfText?.indexOf("Effect -");

  console.log(restOfText.slice(restOfText.indexOf(":") + 2, secondSlice));
  let restOfP2Text = restOfText?.slice(secondSlice);

  let p2firstSlice = restOfP2Text?.indexOf(":");
  console.log(restOfText);
  let firstPowerText =
    secondSlice !== -1
      ? restOfText.slice(restOfText.indexOf(":") + 2, secondSlice)
      : restOfText.slice(restOfText.indexOf(":") + 2);

  let powerName2 = restOfP2Text?.slice(0, p2firstSlice + 1);
  let secondPowerText = restOfP2Text?.slice(p2firstSlice + 2);

  ////Power Cost ///////
  let whichisPower = powerName1.includes("Power -")
    ? firstPowerText
    : powerName2.includes("Power -") && secondPowerText;
  console.log(whichisPower);
  let powerCost =
    whichisPower &&
    whichisPower?.slice(
      whichisPower?.indexOf("(") + 1,
      whichisPower?.indexOf(")")
    );
  console.log(whichisPower, powerCost);
  // console.log(powerOrEffect1);
  console.log(powerName1);
  console.log(firstPowerText);
  // console.log(powerOrEffect2);
  console.log(powerName2);
  console.log(secondPowerText);
  return [powerCost, powerName1, firstPowerText, powerName2, secondPowerText];
}

export function getCardPowerNames(gameCardTarget) {
  let firstSlice = gameCardTarget.Text?.indexOf(":");

  let powerName1 = gameCardTarget.Text?.slice(0, firstSlice + 1);
  console.log(powerName1);
  let restOfText = gameCardTarget.Text?.slice(firstSlice + 1);

  let secondSlice =
    restOfText?.indexOf("Power -") !== -1
      ? restOfText?.indexOf("Power -")
      : restOfText?.indexOf("Effect -");

  let firstPowerText =
    secondSlice !== -1 ? restOfText?.slice(0, secondSlice) : restOfText;

  let restOfP2Text = restOfText?.slice(secondSlice);

  let p2firstSlice = restOfP2Text?.indexOf(":");
  let powerName2 = restOfP2Text?.slice(0, p2firstSlice + 1);
  let secondPowerText = restOfP2Text?.slice(p2firstSlice + 2);

  console.log(powerName1);
  return [powerName1, firstPowerText, powerName2, secondPowerText];
}

class AllCreaturePowers {
  vitalize() {
    console.log("Vitalize was used!!!!");
  }

  stomp() {
    console.log("Stomp was used!!!!");
  }
}

export function handleGameAreaCardOpen(power, isPower, setLogActions) {
  console.log(power, isPower);
  isPower && setLogActions((action) => [`${power} was used`, ...action]);
  const powerName = power.toLowerCase();

  let powers = new AllCreaturePowers();

  const hasFunction = powerName in powers;
  hasFunction && powers[powerName]();
}
