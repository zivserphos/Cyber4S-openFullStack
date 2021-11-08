import "./addContact.scss";
import axios from "axios";



async function addContact(event) {   
    event.preventDefault(); 
    const label = document.getElementById("resultdiv")
    try{
        console.log("outside if")
        const firstName = document.getElementById("firstName").value;
        console.log("first")
        const lastName = document.getElementById("lastName").value;
        console.log("last")
        const number = document.getElementById("number").value;
        console.log("number") 
         if(validateFirstName(firstName) && validateLastName(lastName) && validateNumber(number)){             
             label.innerText = "Loading...";
            console.log("inside the if of add contact")
            const response =await axios.post("http://localhost:3001/api/persons", {
                name: firstName + " " + lastName,
                number: number
            });
            label.innerText = `Added ${firstName} ${lastName} Successfuly`    
            setTimeout(()=>{label.innerText=""}, 3*1000);  
            
         }        
    } catch(error){
        label.innerText = "";
        console.log(error);
        return error;
    }    
}

const addButton=document.getElementById("addButton")
addButton.addEventListener("click", addContact);
console.log(addButton)

function validateFirstName(name){
    if(/^[a-zA-Z]/.test(name)){
        return true;
    }
    console.log("First name is not invaid");
    return false;
}

function validateLastName(name){
    if(/^[a-zA-Z]/.test(name)){
        return true;
    }
    console.log("Last name is not invaid");
    return false;
}

function validateNumber(number){
    if(number.length <= 11 &&  number.length >= 7){
        return true;
    }
    console.log("Number is not invaid");
    return false;
}





