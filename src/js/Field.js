export function Field({ handleSetPSopen }) {
  return (
    <>
      <div class="main-container hidden">
        <div class="relics-area relicsLeft2 dragarea"></div>

        <div class="magi-container2"></div>
        <div class="relics-area relicsRight2 dragarea"></div>

        {/* ======== P2 SIDE START=====  */}
        <div class="container player-side-2">
          <section class="gameArea2 dragarea"></section>

          <section class="player2-hand Hand dragarea"></section>
        </div>

        <div class="drawdeck2">
          <div class="card">DRAW 2</div>
        </div>

        <div class="discard2">
          <div class="card">Discard</div>
        </div>

        <section class="log">LOG</section>
        {/* //  ============== p1 SIDE START ===========  */}
        <div class="container player-side-1">
          <section class="gameArea1 dragarea"></section>

          <section class="player1-hand Hand dragarea"></section>
        </div>

        {/* <!-- <section class="player1_magi_area hor_bar"> --> */}
        <div class="relics-area relicsLeft1 dragarea"></div>

        <div class="magi-container1"></div>
        <div class="relics-area relicsRight1 dragarea"></div>
        {/* </section>  */}

        <div class="drawdeck">
          <div class="card">CLICK HERE TO DRAW!</div>
        </div>

        <section class="menu">
          Shortcuts
          <section class="console hor_bar">
            <button
              class="console_button"
              type="button"
              id="btn-play"
              onClick={() => handleSetPSopen()}
            >
              PLAY
            </button>
            <button
              class="console_button"
              type="button"
              id="btn-collection"
              onClick={() => handleSetPSopen()}
            >
              COLL
            </button>
            <button class="console_button" type="button" id="btn-options">
              OPTIONS
            </button>
            <button class="console_button" type="button" id="console-Deck_1">
              DECK 1
            </button>
            <button class="console_button" type="button" id="console-Deck_2">
              DECK 2
            </button>
          </section>
        </section>

        <div class="discard">
          <div class="card">Discard</div>
        </div>
      </div>
    </>
  );
}
