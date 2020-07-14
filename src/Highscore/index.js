import React, { useState, useEffect } from "react";
import "./index.css";
import firebase from "../firebase";

function useTimes() {
  const [beginner, setTimes] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("beginner")
      .orderBy("highscore", "asc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimes(newData);
      });
    return () => unsubscribe();
  }, []);
  return beginner;
}

const Highscore = () => {
  const beginner = useTimes();
  return (
    <div>
      <ol>
        {beginner.map((data) => (
          <li key={data.id}>
            <div>
              {data.name}
              <code>
                {"  "}
                {data.highscore}
              </code>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Highscore;
