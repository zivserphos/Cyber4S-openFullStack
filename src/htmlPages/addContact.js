import "./addContact.scss";
import axios from "axios";


async function addContact(event) {
    try{
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const number = document.querySelector("#number").value; 
        const response = axios.post("http://localhost:3001/api/persons", {
            name: firstName + " " + lastName,
            number: number
        });
        return response.data;
    } catch(error){
        return error;
    }    
}



