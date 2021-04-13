import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);

  const [foodList, setFoodList] = useState([]);
    
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => { //just send the information. That's why don't need a then
    console.log(foodName)
    Axios.post('http://localhost:3001/insert',
      {
        foodName: foodName,
        days: days
      });
  }

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label>Food name: </label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days since you ate it: </label>
      <input
        type="number"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={addToList}>Add to list</button>
      <h1>Food List: </h1>

      {foodList.map((val, key) => {
        return (
          <div key={key}>
            <h1> Food name: {val.foodName} </h1>
            <h1> Days since I Ate: {val.daysSinceIAte}</h1>
          </div>
        )
      })}
    </div>
  );
}

export default App;
