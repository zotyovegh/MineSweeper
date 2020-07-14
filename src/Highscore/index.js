import React, { useState, useEffect } from "react";
import "./index.css";
import firebase from "../firebase";

function useTimes(category) {
  const [beginner, setTimes] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(category)
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
  const beginner = useTimes("beginner");
  const intermediate = useTimes("intermediate");
  const expert = useTimes("expert");
  return (
    <div className="main">
      <div className="category">
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
      <div className="category">
        <ol>
          {intermediate.map((data) => (
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
      <div className="category">
        <ol>
          {expert.map((data) => (
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
    </div>
  );
};
export default Highscore;
