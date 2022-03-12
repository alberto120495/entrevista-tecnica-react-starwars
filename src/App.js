import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getPeople, getCharacter, searchCharacter } from "./api/people";
/* import data from "./data.json"; */

function App() {
  const [people, setPeople] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false });
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [details, setDetails] = useState({});

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const [page, setPage] = useState(1);

  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  };

  const showDetails = (character) => {
    const id = Number(character.url.split("/").slice(-2)[0]);
    setCurrentCharacter(id);
  };

  const onChangeTextSearch = (e) => {
    e.preventDefault();
    const text = inputRef.current.value;
    setInput(text);
  };

  const onSearchSubmit = (e) => {
    if (e.key !== "Enter") return;
    inputRef.current.value = "";
    setDetails({});
    searchCharacter(input)
      .then((data) => setPeople(data))
      .catch(handleError);
  };

  const onChangePage = (next) => {
    if (!people.previous && page + next <= 0) return;
    if (!people.next && page + next >= 9) return;

    setPage(page + next);
  };

  useEffect(() => {
    getPeople(page)
      .then((data) => setPeople(data))
      .catch(handleError);
  }, [page]);

  useEffect(() => {
    getCharacter(currentCharacter)
      .then((data) => setDetails(data))
      .catch(handleError);
  }, [currentCharacter]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Busca un personaje"
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
      />
      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}
        {people?.results?.map((character) => (
          <li onClick={() => showDetails(character)} key={character.name}>
            {character.name}
          </li>
        ))}
      </ul>

      <section>
        <button onClick={() => onChangePage(-1)}>Prev</button>
        {page}
        <button onClick={() => onChangePage(+1)}>Next</button>
      </section>

      {details && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>height:{details.height}</li>
            <li>mass:{details.mass}</li>
            <li>Year of Birth:{details.birth_year}</li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default App;
