import toggleFilterSound from "../sounds/toggleFilterSound.wav";
import useSound from "use-sound";
import { volume } from "./decks";

export function FilterBar({
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

  const [play] = useSound(toggleFilterSound, { volume });

  const types = ["magi", "creature", "relic", "spell"];

  function handleResetFilters() {
    play();
    setCardSetFilter([]);
    setCardTypeFilter([]);
    setQuery("");
  }

  return (
    <wrapper className={"newfilterbar"}>
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
        alt="X"
        onClick={(e) => handleResetFilters()}
      />
    </wrapper>
  );
}

export function FilterSetIcons({ set, cardSetFilter, setCardSetFilter }) {
  const [play] = useSound(toggleFilterSound, { volume });

  function handleFilterSet(id) {
    play();
    const value = id;
    console.log(value);
    if (!cardSetFilter.some((set) => set === value))
      setCardSetFilter((cur) => [...cur, value]);

    if (cardSetFilter.some((set) => set === value))
      setCardSetFilter((cur) => (cur = cur.filter((curr) => curr !== set)));
  }

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
        backgroundImage: `url(${require(`../img/setSymbols/${filename}.png`)})`,
      }}
      id={set}
      alt={set}
      onClick={(e) => handleFilterSet(e.target.id)}
    />
  );
}

export function FilterTypeIcons({ type, cardTypeFilter, setCardTypeFilter }) {
  const [play] = useSound(toggleFilterSound, { volume });

  function handleFilterSet(id) {
    play();
    const value = id;
    console.log(value);
    if (!cardTypeFilter.some((typ) => typ === value))
      setCardTypeFilter((cur) => [...cur, value]);

    if (cardTypeFilter.some((set) => set === value))
      setCardTypeFilter((cur) => (cur = cur.filter((curr) => curr !== type)));
  }

  let filename = type;

  return (
    <div
      className={`setSymbolFilter ${
        !cardTypeFilter.some((sets) => sets === type) && "noFilter"
      }`}
      style={{
        backgroundImage: `url(${require(`../img/typeSymbols/${filename}-inverted.png`)})`,
      }}
      id={type}
      alt={type}
      onClick={(e) => handleFilterSet(e.target.id)}
    />
  );
}
