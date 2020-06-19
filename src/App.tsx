import React from "react";
import apiData from "./api";
import PersonInfo from "./PersonInfo";
import Loader from "./components/Loader/Loader";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import { Datum } from "./types";

function App() {
  const [data, setData] = React.useState<Datum[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const handleSelect = (id: string) => {
    const currentItem = selected.find(item => item === id);
    setSelected(s =>
      currentItem ? s.filter(item => item !== currentItem) : [...selected, id]
    );
  };

  const fetchData = React.useCallback(async () => {
    if (isLoading) {
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const response = await apiData();

      setData(response);
    } catch (e) {
      console.error(e);
      setError(true);
    }

    setLoading(false);
  }, [isLoading]);

  React.useEffect(() => {
    if (!data.length && !isError && !isLoading) {
      fetchData();
    }
  }, [data.length, fetchData, isError, isLoading]);

  return (
    <main className="App">
      <aside className="selected">Selected contacts: {selected.length}</aside>

      <section>
        {isLoading && <Loader />}
        {isError && !isLoading && <ErrorAlert onTryAgain={fetchData} />}
        {!isLoading && (
          <ul className="list">
            {data.map(personInfo => (
              <PersonInfo
                onSelect={handleSelect}
                key={personInfo.id}
                data={personInfo}
                isSelected={selected.includes(personInfo.id)}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
