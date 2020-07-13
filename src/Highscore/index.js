import React, { useState, useEffect } from "react";
import "./index.css";
import firebase from "../firebase";

function useTimes() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("times")
      .onSnapshot((snapshot) => {
        const newTimes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimes(newTimes);
      });
  }, []);
  return times;
}

const Highscore = () => {
  const times = useTimes();
  return (
    <div>
      <ol>
        {times.map((time) => (
          <li key={time.id}>
            <div>
              {time.title}
              <code>
                {"  "}
                {time.highscore}
              </code>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Highscore;
