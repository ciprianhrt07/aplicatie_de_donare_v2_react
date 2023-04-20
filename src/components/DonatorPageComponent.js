//import { Button } from "bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DonatorService from "../service/DonatorService";
import LocatiiComponent from "./LocatiiComponent";
import ProgramariService from "../service/ProgramariService";
function DonatorPageComponent() {
  const [loading1, setLoading1] = useState(false);
  const [programari, setProgramari] = useState();
  const { username } = useParams();
  const navigate = useNavigate();

  const [donator, setDonator] = useState({
    id: "",
    nume: "",
    prenume: "",
    username: "",
    password: "",
    grupa: "",
    judet: "",
  });

  const [loading, setLoading] = useState(true);
 

  const anuleazaProgramarea = (e, id) => {
    e.preventDefault();
    ProgramariService.anuleaza(id).then((res) => {
      if (programari && Array.isArray(programari)) {
        setProgramari((prevProgramari) =>
          prevProgramari.filter((programare) => programare.id !== id)
        );
      }
    });
  };
       
 
 

  useEffect(() => {
    setLoading(true);
    DonatorService.getDonatorByUsername(username).then(response => {
      setDonator(response.data);
      setLoading(false);
    });
  }, [username]);
  
  useEffect(() => {
    if (donator) {
      setLoading1(true);
      ProgramariService.getAllPD(donator).then(response => {
        setProgramari(response.data);
        setLoading1(false);
      });
    }
  }, [donator]);

 
  

  return (
    <div>
      <h1 className="text-center">Hello I'm donator page</h1>

      <button onClick={() => navigate("/actualizare-donator/:" + donator.id)}>
        {" "}
        Actualizeaza datele{" "}
      </button>

      {!loading && (
        <>
          <LocatiiComponent donator={donator} />
          <br></br>
          <table>
            <thead>
              <tr>
                <td> Id </td>
                <td> Data </td>
                <td> Nume_Locatie </td>
                <td> Anuleaza </td>
              </tr>
            </thead>

            {!loading1 && (
              <tbody>
                {programari.map((programare) => (
                  <tr>
                    <td> {programare.id} </td>
                    <td> {programare.date} </td>
                    <td> {programare.locatie.nume} </td>
                    <button onClick={(e,id)=>anuleazaProgramarea(e,programare.id)}> ANULEAZA </button>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </>
      )}
    </div>
  );
}

export default DonatorPageComponent;
