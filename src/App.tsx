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

  const reorderData = (selected: string[]) => {
    const sorted = [...data].sort((a, b) => {
      const isASelected = selected.includes(a.id);
      const isBSelected = selected.includes(b.id);

      if (isASelected === isBSelected) {
        return Number(a.id) - Number(b.id);
      }

      return isASelected ? -1 : 1;
    });

    setData(sorted);
  };

  const handleSelect = (id: string) => {
    const currentItem = selected.find(item => item === id);
    const updatedSelected = currentItem
      ? selected.filter(item => item !== currentItem)
      : [...selected, id];

    setSelected(updatedSelected);
    reorderData(updatedSelected);
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

        {!isLoading && !isError && (
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
