import React from "react";
import apiData from "./api";
import PersonInfo from "./PersonInfo";

function App() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  //  TODO fetch contacts using apiData function, handle loading and error states

  return (
    <main className="App">
      <aside className="selected">Selected contacts: {selected.length}</aside>

      <section>
        <ul className="list">
          {data.map(personInfo => (
            // @ts-ignore
            <PersonInfo key={personInfo.id} data={personInfo} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
