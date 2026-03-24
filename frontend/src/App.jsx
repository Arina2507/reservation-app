import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState("");
  const [time, setTime] = useState("");

  const API = "http://localhost:3000";

  const loadReservations = async () => {
    const res = await axios.get(`${API}/reservations`);
    setReservations(res.data);
  };

  const createReservation = async () => {
    await axios.post(`${API}/reservations`, { user, time });
    setUser("");
    setTime("");
    loadReservations();
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reservations</h1>

      <input
        placeholder="User"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={createReservation}>Create</button>

      <ul>
        {reservations.map((r, i) => (
          <li key={i}>
            {r.user} - {r.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;