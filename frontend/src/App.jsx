import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const API = "http://host.docker.internal:3000";

  const loadReservations = async () => {
    const res = await axios.get(`${API}/reservations`);
    setReservations(res.data);
  };

  const createReservation = async () => {
    try {
      setError("");

      if (!user || !time) {
        setError("Fill all fields");
        return;
      }

      await axios.post(`${API}/reservations`, { user, time });

      setUser("");
      setTime("");
      loadReservations();

    } catch (e) {
      if (e.response) {
        setError(e.response.data);
      } else {
        setError("Server error");
      }
    }
  };

  const deleteReservation = async (index) => {
  await axios.delete(`${API}/reservations/${index}`);
  loadReservations();
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Reservation App</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

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
              <button className="delete" onClick={() => deleteReservation(i)}>
                ✕
              </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;