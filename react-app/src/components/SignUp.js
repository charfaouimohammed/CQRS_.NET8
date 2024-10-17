import React ,{useState} from 'react';
import axios from 'axios';
import{ useNavigate ,Link} from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Login.css'; // Import CSS for styling
import logo from '../assec/logoV.png'; // Import your logo

function SingUp() 
{ 
  const[firstname,setFirsname]=useState("")
  const[lastname,setLastname]=useState("")
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const [setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate

  async function register()
  {
    if (password.length <= 3) {
      setErrorMessage('Password must be at least 10 characters long.');
      return;
    }
    let item={firstname,lastname,username,password}
    console.warn(item);
    try {
          Swal.fire({
            title: 'Votre demande est en cours',
            text: 'Veuillez patienter...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            });
          let result = await  axios.post('https://localhost:7182/api/Users/register',item, {
          headers:{
            "content-type":'application/json',
            "accept":'application/json',
          }
        });
        
        Swal.close();

        if (result.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Account created successfully!',
            showConfirmButton: false,
            timer: 15,
            
          })
          navigate("/login");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.data.message,
          });
        }
      } catch (error) {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || error.message,
        });
      }
  }
  return (
    <div className="main_body">
    <div className="login-container">
      <form>
      <h1>Register page</h1>
      <div className="form-group">
      <label htmlFor="firstname">firstname:</label>
      <input type="text"onChange={(e)=>setFirsname(e.target.value)} className="form-control" placeholder="firstname"/>
      </div>
      <div className="form-group">
      <label htmlFor="firstname">lastname:</label>
      <input type="text" onChange={(e)=>setLastname(e.target.value)} className="form-control" placeholder="lastname"/>
      </div>
      <div className="form-group">
      <label htmlFor="firstname">username:</label>
      <input type="text" onChange={(e)=>setUsername(e.target.value)} className="form-control" placeholder="username"/>
      </div>
      <div className="form-group">
      <label htmlFor="firstname">password:</label>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"/>
      </div>
      <button onClick={register} className="login-button">sing Up</button>
      </form>
      <p className="back-to-login">
        Already have an account? <Link to="/Login">Back to Login</Link>
      </p>
    </div>
    </div>
  )

}
export default SingUp
