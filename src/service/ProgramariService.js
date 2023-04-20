import axios from "axios"

const PROGRAMARI_GET_FROM_LOCATION = "http://localhost:8080/get-from-location/";
const PROGRAMARI_GET_ALL_PROGRAMARI= "http://localhost:8080/get-all-programari";
class ProgramariService{

    getProgramariFromLocation(id){
        return axios.get(PROGRAMARI_GET_FROM_LOCATION+id);
    }

    getAll(){
        return axios.get(PROGRAMARI_GET_ALL_PROGRAMARI);
    }
    getAllPD(donator){
        return axios.post("http://localhost:8080/getProgramariDonator",donator);
    }

    anuleaza(id){
        axios.post("http://localhost:8080/anuleaza-programarea/"+id);
    }
    
    absent(id){
        axios.post("http://localhost:8080/finalizeaza-programarea/"+id);
    }

}

export default new ProgramariService();