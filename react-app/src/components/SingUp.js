import React ,{useState} from 'react';
import axios from 'axios';
import{} from 'react-router-dom'


function SingUp() 
{ 
  const[firstname,setFirsname]=useState("")
  const[lastname,setLastname]=useState("")
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")

  async function register()
  {
    
    let item={firstname,lastname,username,password}
    console.warn(item);

    const response = await fetch('https://localhost:7182/api/Users/login',{
      body:JSON.stringify(item),
      headers:{
        "Content-type":'application/json',
        "Accept":"application/jdon",
      }
    })
    result =await result.json();
    localStorage.setItem("user-info",JSON.stringify(result))
    console.log("Registration Successful:",result.json);
  }
  return (
    <form>
    <div className="">
      <h1>Register page</h1>
      <input type="text"onChange={(e)=>setFirsname(e.target.value)} className="form-control" placeholder="firstname"/>
      <br/>
      <input type="text" onChange={(e)=>setLastname(e.target.value)} className="form-control" placeholder="lastname"/>
      <br/>
      <input type="text" onChange={(e)=>setUsername(e.target.value)} className="form-control" placeholder="username"/>
      <br/>
      <input type="text" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"/>
      <br/>
      <button onClick={register} className="btn btn-primary">sing Up</button>
    </div>
          <p className="back-to-login">
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </form>
  
  )

}
export default SingUp
