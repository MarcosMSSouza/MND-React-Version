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
  // onPlayerHand1,
  handleMouseEnter,
  handleMouseMove,
  handleMouseLeave,
  handleDragDrop,
  cardsOnHand,
}) {
  const handCards = true;
  return (
    // <DragDropContext onDragEnd={handleDragDrop}>
    <Droppable droppableId="cardsOnHand" type="group" direction="horizontal">
      {(provided) => (
        <section
          className={classs}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {/* {onPlayerHand1?.map((card, index) => ( */}
          {cardsOnHand.map((card, index) => {
            // setIDforCopies.push(card);
            return (
              <Draggable draggableId={card.id} key={card.id} index={index}>
                {(provided) => (
                  <div
                    // className="store-container"
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
    // </DragDropContext>
  );
}

export function FieldCreateCard({
  card,
  class1,
  class2,
  handleMouseEnter,
  handleMouseMove,
  handleMouseLeave,
  handCards,
  handleFieldCardOpen,
  setIsFieldCardOpen,
  onGameArea,
}) {
  // console.log(card);

  // const playerNumber = player;
  return (
    <div
      cardtype={card.Type}
      key={card.Name}
      className={`${class2} ${onGameArea && card.Type}`}
    >
      <img
        className={class1}
        name={card.Name}
        src={card.url}
        id={card.id}
        // dataset={card.Name}
        alt={card.Name}
        // value={card}
        onClick={(e) => {
          console.log(card);
          !handCards && handleFieldCardOpen(e, card);
        }}
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
      {!handCards && (
        <div className={"FieldCard-EnergyCounter"}>{card.Energy}</div>
      )}
    </div>
  );
}

export function FieldCardOpen({
  isFieldCardOpen,
  setIsFieldCardOpen,
  zoomPositionGameAreaCard,
  gameCardTarget,
  openGameAreaCard,
}) {
  console.log(gameCardTarget);
  const handleOutsideClick = (event) => {
    // console.log(event.target);
    if (
      event.target.closest(".gameArea-cardOpen-1") ||
      event.target.closest(".zoomed-gameAreaCard-image") ||
      event.target.closest(".fieldCards")
    ) {
      return;
    }
    // console.log("outside click");
    // console.log(isFieldCardOpen);
    setIsFieldCardOpen(false);
  };

  useEffect(() => {
    if (!isFieldCardOpen) return;

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isFieldCardOpen]);
  // console.log(gameCardTarget);
  let cardTextBGregion = gameCardTarget?.Region;
  ///////////===Card Powers====//////
  let firstSlice = gameCardTarget.Text?.indexOf(":");
  let powerName1 = gameCardTarget.Text?.slice(0, firstSlice + 1);

  let restOfText = gameCardTarget.Text?.slice(firstSlice + 1);

  // let secondPower = restOfText.indexOf("Power");
  let secondSlice = restOfText?.indexOf("Power");

  let firstPowerText =
    secondSlice !== -1 ? restOfText?.slice(0, secondSlice) : restOfText;

  // let secondPowerText = restOfText?.slice(secondSlice);

  // let p2firstSlice = secondPowerText?.indexOf(":");
  // let powerName2 = secondPowerText?.slice(0, p2firstSlice + 1);
  // let restOfP2Text = secondPowerText?.slice(p2firstSlice + 2);
  // console.log(restOfText);
  let restOfP2Text = restOfText?.slice(secondSlice);

  let p2firstSlice = restOfP2Text?.indexOf(":");
  let powerName2 = restOfP2Text?.slice(0, p2firstSlice + 1);
  let secondPowerText = restOfP2Text?.slice(p2firstSlice + 2);
  // let restOfP1Text = gameCardTarget.Text?.slice(firstSlice + 1, secondSlice);

  function handleGameAreaCardOpen(power) {
    // console.log("power used!");
    // let secondslice = gameCardTarget?.Text.indexOf(":");
    // let powerName = gameCardTarget.Text.slice(0, secondslice + 1);

    console.log(power);
    // console.log(powerName1);
    // console.log(firstPowerText);
    // console.log(powerName2);
    // console.log(restOfP2Text);
  }

  return (
    isFieldCardOpen && (
      // <span className="zoomed-image-div-background">
      <div
        className="gameArea-cardOpen-1"
        style={{
          left: `${zoomPositionGameAreaCard.x}px`,
          top: `${zoomPositionGameAreaCard.y}px`,
        }}
      >
        <img
          // src={gameCardTargetSrc}.url.url
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
            />
            {powerName2 && (
              <PowerButton
                handleGameAreaCardOpen={handleGameAreaCardOpen}
                powerName={powerName2}
                powerText={secondPowerText}
              />
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    )
  );
}

function PowerButton({ powerName, powerText, handleGameAreaCardOpen }) {
  const finalPowerName = powerName.slice(8, powerName.length - 1);
  console.log(powerName);
  const isPower = powerName.slice(0, 5) === "Power";
  // console.log(isPower);
  const soundUrl = powerUsed;
  // const volume = 0.2;
  const [play] = useSound(soundUrl, { volume: 0.3 });

  return (
    <button
      className={isPower ? "CardPower" : "CardEffect"}
      value={finalPowerName}
      onClick={(e) => {
        isPower && play();
        handleGameAreaCardOpen(e.target.closest("button").value);
      }}
    >
      <p className="cardText-PowerName">{powerName}</p>
      <p className="cardText-restOfText">{powerText}</p>
    </button>
  );
}
