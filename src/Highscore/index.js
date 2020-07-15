import React, { useState, useEffect } from "react";
import "./index.css";
import firebase from "../firebase";

function useTimes(category) {
  const [cat, setTimes] = useState([]);

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
  }, [category]);
  return cat;
}

const Highscore = () => {
  const beginner = useTimes("beginner");
  const intermediate = useTimes("intermediate");
  const expert = useTimes("expert");

  const beginnerLast = beginner[9] && beginner[9].highscore;
  const intermediateLast = intermediate[9] && intermediate[9].highscore;
  const expertLast = expert[9] && expert[9].highscore;

  return (
    <div className="main">
      <div className="category">
        Beginner
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
        Intermediate
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
        Expert
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
