import "./App.css";
import { useState } from "react";

function App() {
  const [lessonsCount, setLessonsCount] = useState(null);
  const [time, setTime] = useState("");
  const [startLessonDate, setStartLessonDate] = useState("");
  const [lessonsDays, setLessonsDays] = useState([]);

  function findNextLessonsDays() {
    const startDate = new Date(startLessonDate); // Boshlang'ich sana
    const result = [];
    const allowedDays = time == "even" ? [2, 4, 6] : [1, 3, 5];

    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate()); // Ertasidan boshlaymiz

    while (result.length < lessonsCount) {
      const dayOfWeek = currentDate.getDay();
      if (allowedDays.includes(dayOfWeek)) {
        result.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }

  const onSubmitClick = (e) => {
    e.preventDefault();
    // Natijalarni konsolda ko'rsatish
    const days = findNextLessonsDays();
    setLessonsDays(days.map((day) => day.toDateString()));
  };
  return (
    <>
      <h1>TimeTable</h1>
      <form>
        <div className="formGroup">
          <label htmlFor="start">Start lesson</label>
          <input
            type="date"
            onChange={(e) => setStartLessonDate(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="lessons">number of lessons</label>
          <input
            type="number"
            onChange={(e) => setLessonsCount(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="odd">
            <input
              type="radio"
              name="time"
              value="odd"
              onChange={(e) => {
                setTime(e.target.value);
              }}
              id="odd"
            />
            Toq
          </label>
          <label htmlFor="even">
            <input
              type="radio"
              name="time"
              value="even"
              onChange={(e) => {
                setTime(e.target.value);
              }}
              id="even"
            />
            Juft
          </label>
        </div>
        <button onClick={onSubmitClick}>Submit</button>
      </form>

      <div className="container">
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>date</td>
            </tr>
          </thead>
          <tbody>
            {lessonsDays &&
              lessonsDays.map((date, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
