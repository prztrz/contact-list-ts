import React from "react";
import apiData from "./api";
import PersonInfo from "./PersonInfo";
import Loader from "./components/Loader/Loader";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import { Datum } from "./types";

function App() {
  const [data, setData] = React.useState<Datum[]>([]);
  const [selected, setSelected] = React.useState<Datum[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);

  //  TODO fetch contacts using apiData function, handle loading and error states

  return (
    <main className="App">
      <aside className="selected">Selected contacts: {selected.length}</aside>

      <section>
        {isLoading && <Loader />}
        {isError && !isLoading && <ErrorAlert />}
        {!isLoading && (
          <ul className="list">
            {data.map(personInfo => (
              // @ts-ignore
              <PersonInfo key={personInfo.id} data={personInfo} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
