import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DonatorService from "../service/DonatorService";

import { useState } from "react";

function Locatii({ locatie, donator }) {
  //const [date, setDate] = useState(new Date());

  const [programare, setProgramare] = useState({
    donatorId: donator.id,
    locatieId: locatie.id,
    date: new Date()
  });

  const handleDateChange = (date) => {
   
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
 
    setProgramare({
      ...programare,
      date:  utcDate.toISOString().slice(0, 10)
    });
  };

  const saveProgramare = (e) => {
    e.preventDefault();
    DonatorService.saveProgramare(programare)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <tr>
      <td> {locatie.nume}</td>
      <td> {locatie.judet}</td>
      <td> {locatie.strada}</td>
      <td> {locatie.orar}</td>
      <td> {locatie.numarMaximProgramari}</td>
      <td> {locatie.numarProgramari}</td>

      <div>
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={programare.date}  >

          </Calendar>

          
        </div>
      </div>

      <button onClick={saveProgramare}> PROGRAMARE </button>
    </tr>
  );
}

export default Locatii;
