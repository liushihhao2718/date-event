import React, { useState } from "react";
import { Calendar } from "./calendar.js";
import { Button, Modal, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const events = [
  { date: "2020-08-23", link: "https://www.google.com", title: "Google" },
  { date: "2020-08-23", link: "https://www.yahoo.com", title: "Yahoo" },
  { date: "2020-08-24", link: "https://www.facebook.com", title: "Facebook" },
];

function App() {
  const [date, setDate] = useState(new Date());
  const [showEvent, setShowEvent] = useState(null);
  
  const handleClose = () => setShowEvent(null);
  const handleShow = (d) => setShowEvent(d);

  const buttonStyle = {
    display: "flex",
    alignSelf: "center",
  };

  return (
    <>
      <main className="px-0 px-md-5 pt-3 pb-1 pb-md-5">
        <div className="calendar">
          <div className="month-indicator">
            <Button
              className="btn-secondary"
              style={buttonStyle}
              onClick={() => setDate(changeMonth(date, -1))}
            >
              <LeftArrow />
            </Button>
            <time>
              {date.getFullYear()}
              {" / "}
              {date.toLocaleString("zh-tw", { month: "long" })}
            </time>
            <Button
              className="btn-secondary"
              style={buttonStyle}
              onClick={() => setDate(changeMonth(date, 1))}
            >
              <RightArrow />
            </Button>
          </div>

          <MonthTitle />
          <DayBlock
            month={makeCalendarArray(date)}
            onClick={(d) => {
              handleShow(d)
            }}
          />
        </div>
      </main>
      <Modal show={showEvent !== null} onHide={handleClose}
      className="pb-5"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>{formatDate(showEvent)}</Modal.Title>
        </Modal.Header>
          <Modal.Body closeButton>
            <EventDiary events={events.filter(ev=>ev.date === formatDate(showEvent))}/>
          </Modal.Body>
      </Modal>
    </>
  );
}

function EventDiary(props){
  const {events} = props;
  return (
    <ListGroup>
      {
        events.map(ev=>{
          return(
            <ListGroup.Item>
              <p>{ev.title}</p>
              <p><a href={ev.link}>{ev.link}</a></p>
            </ListGroup.Item>
          )
        })
      }
  </ListGroup>
  )
}

/**
 *
 * @param {Date} date
 * @returns {{date:Date,text:string,sameMonth:boolean,hasEvent:boolean}}
 */
function makeCalendarArray(date) {
  const cal = new Calendar();

  let m = cal
    .monthDates(date.getFullYear(), date.getMonth(), (d) => {
      return {
        date: d,
        text: (" " + d.getDate()).slice(-2),
        sameMonth: date.getMonth() === d.getMonth(),
        hasEvent: events.map((ev) => ev.date).includes(formatDate(d)),
      };
    })
    .flat();
  return m;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function changeMonth(d = new Date(), change = 0) {
  const newDate = new Date(d);
  if (change !== 0) newDate.setMonth(newDate.getMonth() + change);
  console.log(newDate.toLocaleDateString());
  return newDate;
}

function MonthTitle() {
  return (
    <div className="day-of-week">
      <div>Su</div>
      <div>Mo</div>
      <div>Tu</div>
      <div>We</div>
      <div>Th</div>
      <div>Fr</div>
      <div>Sa</div>
    </div>
  );
}

function DayBlock(props) {
  const timeStyle = (day) => {
    return {
      color: day.sameMonth ? "var(--blue-grey-600)" : "lightgray",
    };
  };

  const handleClick = (x) => {
    if (x.hasEvent) onClick(x.date.toLocaleDateString());
  };

  const { month, onClick } = props;
  const days = month.map((x) => {
    return (
      <button
        className={x.hasEvent ? "has-event" : ""}
        key={x.date.toLocaleDateString()}
        onClick={() => handleClick(x)}
      >
        <time dateTime={x.date.toLocaleDateString()} style={timeStyle(x)}>
          {x.text}
        </time>
      </button>
    );
  });
  return <div className="date-grid">{days}</div>;
}

function RightArrow() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-arrow-right"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"
      />
      <path
        fillRule="evenodd"
        d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"
      />
    </svg>
  );
}
function LeftArrow() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-arrow-left"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
      />
      <path
        fillRule="evenodd"
        d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
}

export default App;
