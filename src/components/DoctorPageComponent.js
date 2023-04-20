import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DoctorService from "../service/DoctorService";
import ProgramariService from "../service/ProgramariService";

function DoctorPageComponent() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [programari, setProgramari] = useState();
  const [doctor, setDoctor] = useState({
    username: "",
    password: "",
    nume: "",
    prenume: "",
    specializare: "",
    locatie: "",
  });

  
  const absentProgramare = (e, id) => {
    e.preventDefault();
    ProgramariService.absent(id)
  };

  const [loading, setLoading] = useState(true);

  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    setLoading(true);
    DoctorService.getDoctorByUsername(username).then((response) => {
      setDoctor(response.data);
      setLoading(false);
    });
  }, [username]);

  useEffect(() => {
    if (doctor) {
      setLoading1(true);
      ProgramariService.getProgramariFromLocation(doctor.locatie.id).then(
        (response) => {
          setProgramari(response.data);
          setLoading1(false);
        }
      );
    }
  }, [doctor]);

  //------------------

  return (
    <div>
      <>
        <h1>Hello, {doctor.nume}</h1>
        <h1> Doctor Page: </h1>
      </>
      <br />
      {!loading && (
        <table>
          <thead>
            <tr>
              <td>Nume_Donator</td>
              <td>Prenume_Donator</td>
              <td>Grupa_Sanguina</td>
              <td>Data Programarii</td>
              <td>Absent</td>
              <td>Donare cu succes</td>
              <td> Absent_la_donare </td>
            </tr>
          </thead>

          {!loading1 && (
            <tbody>
              {programari.map((programare) => (
                <tr>
                  <td> {programare.donator.nume} </td>
                  <td> {programare.donator.prenume} </td>
                  <td> {programare.donator.grupa} </td>
                  <td> {programare.date}</td>
                  <td> {programare.stare}</td>
                  <td> {programare.anulat} </td>
                  <button onClick={(e,id)=>absentProgramare(e,programare.id)}> Absent_Donare </button>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
}

export default DoctorPageComponent;
