import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("name");
  const [person, setPerson] = useState(null); //fetch from api
  const [value, setValue] = useState("random person");
  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      console.log(e.target); //no values does not give any value
      const newValue = e.target.dataset.label;
      setTitle(e.target.dataset.label);
      console.log(person);
      setValue(person[newValue]);
    }
  };
  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const details = data.results[0];
    console.log(details);
    const { age } = details.dob;
    //2 syntaxes
    // const {large:image} = details.picture;

    const {
      picture: { large },
    } = details; //renamed
    const {
      name: { first, last },
    } = details;
    const { email, phone } = details;
    const { password } = details.login;
    const {
      location: {
        street: { number, name },
      },
    } = details; //nested syntax you can use any
    const newPerson = {
      image: large,
      phone,
      email,
      age,
      password,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };

    setLoading(false);
    setPerson(newPerson);
    setValue(newPerson.name);
  };
  useEffect(() => {
    getPerson();
  }, []);
  return (
    <main>
      <div className="block bcg-black"> </div>
      <div className="block">
        <div className="container">
          {/* if person object is there then display else not needed */}
          <img
            className="user-image"
            src={(person && person.image) || defaultImage}
            alt="image"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              data-label="password"
              className="icon"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? "...loading" : "Random User"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
