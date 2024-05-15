import React, { useState } from "react";
import "./calendar.css";

const Calendar = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [numDays, setNumDays] = useState<number>(1);

  const getWeeksInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const weeks = [];
    let startDate = new Date(year, month, 1);
    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }
    while (startDate.getMonth() <= month) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (startDate.getMonth() === month) {
          week.push(new Date(startDate));
        } else {
          week.push(null);
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      weeks.push(week);
    }

    return weeks;
  };

  const generateMonths = () => {
    const months = [];
    let currentDate = new Date();

    for (let i = 0; i < 6; i++) {
      months.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1),
      );
    }

    return months;
  };

  const handleDateHover = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLTableCellElement;
    target.style.transform = "scale(1.1)";
  };

  const handleDateLeave = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLTableCellElement;
    target.style.transform = "scale(1)";
  };

  const handleToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleNumDaysChange = (value: number) => {
    if (value >= 1 && value <= 7) {
      setNumDays(value);
    }
  };

  const handlePopupClose = () => {
    setShowCalendar(true);
  };

  return (
    <div className="calendar-wrapper">
      <button
        className={`hide-calendar-button toggle-switch ${showCalendar ? "" : "checked"}`}
        onClick={handleToggle}
      >
        <span className="slider round"></span>
      </button>

      {showCalendar && (
        <div className="calendar-container">
          <div className="months-wrapper">
            {generateMonths().map((month, index) => (
              <div key={index} className="month">
                <h3>
                  {month.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <table className="dates-table">
                  <thead>
                    <tr>
                      <th>Sun</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getWeeksInMonth(month).map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week.map((date, dayIndex) => (
                          <td
                            key={dayIndex}
                            className={`date-cell ${date ? (selectedDays.includes(date.getDate()) ? "selected" : "") : "empty"}`}
                            onMouseEnter={handleDateHover}
                            onMouseLeave={handleDateLeave}
                          >
                            {date ? date.getDate() : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <button onClick={handlePopupClose}>Apply</button>
        </div>
      )}

      {!showCalendar && (
        <div className="popup">
          <button onClick={() => handleNumDaysChange(numDays + 1)}>+</button>
          <input type="number" value={numDays} readOnly />
          <button onClick={() => handleNumDaysChange(numDays - 1)}>-</button>
          <button onClick={handlePopupClose}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
