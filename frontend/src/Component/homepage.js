import React ,{ useEffect, useState} from "react";
import Axios from "axios";


function HomePage (){
    const [username, setUsername] = useState("");
	const [city, setCity] = useState("");
    const addUser = async ()=>{
        try{
            let data={ user_name: username, city:city }
            await Axios.post("/api/addUser", data);
            alert("Insert Succesfull!");
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <input placeholder="Full name"  required onChange={
                (e)=>{
                    console.log(e.target.value)
                    setUsername(e.target.value)
                }
                }/>
            <input placeholder="city"  required onChange={
                (e)=>{
                    console.log(e.target.value)
                    setCity(e.target.value)
                }
                }/>
            <input type="submit" value={"Submit"} onClick={addUser}></input>
        </div>

    )
}

export default HomePage;
