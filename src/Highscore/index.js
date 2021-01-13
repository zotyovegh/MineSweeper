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

const Highscore = (props) => {
  const beginner = useTimes("beginner");
  const intermediate = useTimes("intermediate");
  const expert = useTimes("expert");

  var beginnerLast = 0;
  var intermediateLast = 0;
  var expertLast = 0;

  if (beginner.length < 10) {
    beginnerLast = -1;
  } else {
    beginnerLast = beginner[9] && beginner[9].highscore;
  }

  if (intermediate.length < 10) {
    intermediateLast = -1;
  } else {
    intermediateLast = intermediate[9] && intermediate[9].highscore;
  }

  if (expert.length < 10) {
    expertLast = -1;
  } else {
    expertLast = expert[9] && expert[9].highscore;
  }

  props.lastValue(beginnerLast, intermediateLast, expertLast);

  return (
    <div className="highscore">
      <div className="highscore__category">
        <div className="highscore__title">Beginner</div>
        <ol>
          {beginner.map((data) => (
            <li className="highscore__item" key={data.id}>
              <div>
                <div className="highscore__name">{data.name}</div>
                <div className="highscore__score">{data.highscore}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="highscore__category">
        <div className="highscore__title">Intermediate</div>

        <ol>
          {intermediate.map((data) => (
            <li className="highscore__item" key={data.id}>
              <div>
                <div className="highscore__name">{data.name}</div>
                <div className="highscore__score">{data.highscore}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="highscore__category">
        <div className="highscore__title">Expert</div>
        <ol className="ol">
          {expert.map((data) => (
            <li className="highscore__item" key={data.id}>
              <div>
                <div className="highscore__name">{data.name}</div>
                <div className="highscore__score">{data.highscore}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default Highscore;
