import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState("");
  const [time, setTime] = useState("");

  const API = "http://host.docker.internal:3000";

  const loadReservations = async () => {
    const res = await axios.get(`${API}/reservations`);
    setReservations(res.data);
  };

  const createReservation = async () => {
    if (!user || !time) return;

    await axios.post(`${API}/reservations`, { user, time });
    setUser("");
    setTime("");
    loadReservations();
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Reservation App</h2>

        <input
          className="input"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          className="input"
          placeholder="Time (HH:MM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button className="button" onClick={createReservation}>
          Create Reservation
        </button>

        <ul className="list">
        {reservations.map((r, i) => (
          <li key={i} className="item">
            <span>{r.user}</span>
            <span>{r.time}</span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;