import { builderArea } from "../controllerss.js";
import { state } from "../model.js";
import { builderCollectionCards } from "../controllerss.js";
import { MAGI, CRS, convertedMNDcards } from "../cards.js";
import { cards } from "../cards.js";
import { clear } from "console";
import decksView from "./decksView.js";
// import * as it.querySelectorAll;
builderArea = document.querySelector(".builder-area");

class collectionView {
  _parentElement = document.querySelector(".content-arderial");

  populateCollectionOFFLINE(card) {
    //
    let insertCard = document.createElement("img");
    insertCard.src = card.url;
    insertCard.id = card.id;
    insertCard.dataset.dataName = card.name;
    insertCard.classList.add(`${card.Type}`, "collection-cards");

    card.type === "magi"
      ? this._parentElement.prepend(insertCard)
      : this._parentElement.appendChild(insertCard);
  }

  populateCollectionREGIONS(card) {
    let insertCard = document.createElement("img");

    let regexPatern = /[^A-Za-z0-9]/g;
    let Type = card.Type.replace(regexPatern).toLowerCase();
    insertCard.src = card.url;
    insertCard.id = card.id;
    insertCard.dataset.Name = card.Name;
    insertCard.classList.add(`${Type}`, "collection-cards");

    if (card.Region === "d'Resh") {
      card.Region = "dResh";
    }

    if (card.Region === "Kybar's Teeth") {
      card.Region = "Kybar";
    }

    if (card.Region.includes("/")) return;
    ////////////// TEST FOR DUAL REGION /////////////////////
    // if (card.Region.includes('/')) {
    /
    // }
    ///////////////////////////////////////////////
    let regionTabSelector = document.querySelector(`.content-${card.Region}`);

    Type === "magi"
      ? regionTabSelector.prepend(insertCard)
      : regionTabSelector.appendChild(insertCard);
  }

  addCollectionCardsEvents(card) {
    card.addEventListener("click", () => {
      console.log(card);

      if (state.deckEditor.editable === false) return;

      let [countSingle, countTotal] = this.checkCardCopies(card);

      console.log(countSingle, countTotal);

      if (
        (card.classList.contains("magi") && countSingle === 1) ||
        countTotal === 3
      )
        return;
      console.log(countSingle, countTotal);
      if (!card.classList.contains("magi") && countSingle === 3) return;

      let tempCard = card.cloneNode();
      tempCard.classList.remove("collection-cards");
      tempCard.classList.add("builder-collection-cards");

      tempCard.addEventListener("click", () => {
        if (state.deckEditor.editable === false) return;
        tempCard.remove();
        decksView.CardTypesCounter();
        state.deckEditor.changedCard = true;
        console.log("mudou ", state.deckEditor.changedCard);
      });
      state.deckEditor.changedCard = true;
      console.log("mudou ", state.deckEditor.changedCard);

      tempCard.classList.remove("zoom");

      if (card.classList.contains("magi")) builderArea.prepend(tempCard);
      else builderArea.appendChild(tempCard);
      decksView.CardTypesCounter();
    });
  }

  populateBuilder(card) {
    builderArea = document.querySelector(".builder-area");

    let insertCard = document.createElement("img");
    insertCard.src = card.url;
    insertCard.dataset.Name = card.Name;
    insertCard.id = card.id;
    insertCard.classList.add(`${card.Type}`, "builder-collection-cards");

    insertCard.addEventListener("click", () => {
      console.log(insertCard);
      if (state.deckEditor.editable === false) return;
      insertCard.remove();
      decksView.CardTypesCounter();

      state.deckEditor.changedCard = true;
      console.log("mudou ", state.deckEditor.changedCard);
    });

    card.Type === "magi"
      ? builderArea.prepend(insertCard)
      : builderArea.appendChild(insertCard);
  }

  checkCardCopies(cardtomove) {
    let builderCollectionCards = document.querySelectorAll(
      ".builder-collection-cards"
    );
    let creatureCount = [0, 0];
    let magiCount = [0, 0];

    if (cardtomove.classList.contains("magi")) {
      builderCollectionCards.forEach((card) => {
        if (card.classList.contains("magi")) magiCount[1]++;
        if (card.dataset.Name === cardtomove.dataset.Name) magiCount[0]++;
      });
      return magiCount;
    } else {
      builderCollectionCards.forEach((card) => {
        if (card.dataset.Name === cardtomove.dataset.Name) creatureCount[1]++;
      });
      console.log(creatureCount);
      return creatureCount;
    }
  }
  updateDecktoSave() {
    const allBuilderCards = document.querySelectorAll(
      ".builder-collection-cards"
    );

    let nodeArray = Array.from(allBuilderCards);

    //magi
    state.deckEditor.curMagi = nodeArray
      .map((card) => {
        if (card.classList.contains("magi")) {
          console.log(card.dataset.Name);

          return convertedMNDcards[card.dataset.Name];
        }
      })
      .filter((card) => card !== undefined);

    //cards
    state.deckEditor.curCrs = nodeArray
      .map((card) => {
        if (!card.classList.contains("magi")) {
          console.log(card.dataset.Name, convertedMNDcards[card.dataset.Name]);
          return convertedMNDcards[card.dataset.Name];
        }
      })
      .filter((card) => card !== undefined);

    console.log(state.deckEditor.curMagi, state.deckEditor.curCrs);
  }
}

export default new collectionView();

class regionsView {
  addRegionButtonEvents(regionbtn) {
    regionbtn.addEventListener("mouseover", () => {
      let audioUrl = require("url:../sounds/hoveringDeckBtns.mp3");
      let hoveringDeckBtns = new Audio(audioUrl);
      hoveringDeckBtns.play();
    });

    let allregion_btn = document.querySelectorAll(".region-btn");

    regionbtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`${regionbtn.id} clicked`);

      // Self btn
      allregion_btn = document.querySelectorAll(".region-btn");
      let allRegion_Tabs = document.querySelectorAll(
        ".modal-collection-content"
      );

      allregion_btn.forEach((btn) => btn.classList.remove("Regionselected"));
      regionbtn.classList.add("Regionselected");

      allRegion_Tabs.forEach((btn) => btn.classList.add("hidden"));

      let thisRegionTab = document.querySelector(`.content-${regionbtn.id}`);

      thisRegionTab.classList.remove("hidden");

      console.log(regionbtn, thisRegionTab);

      console.log(state.deckEditor.editable);
    });
  }
}

export const regionsViewObj = new regionsView();
