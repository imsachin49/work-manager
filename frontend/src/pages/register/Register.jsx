import React,{useState,useEffect} from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const hostUrl='http://localhost:8800'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [eyeIconPwd, setEyeIconPwd] = useState('https://cdn-icons-png.flaticon.com/128/709/709724.png');

    const onClickShowPassword=()=>{
        setShowPassword(!showPassword)
        if (eyeIconPwd === 'https://cdn-icons-png.flaticon.com/128/709/709724.png') {
            setEyeIconPwd('https://cdn-icons-png.flaticon.com/128/8276/8276554.png');
        }else{
            setEyeIconPwd('https://cdn-icons-png.flaticon.com/128/709/709724.png');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res=await axios.post('http://localhost:8800/api/users/register',{name,email,password})
            console.log(res.data);
            toast.success('Registered Successfully', {
                position: "center-center",
            });  
            setLoading(false);          
            navigate('/login');
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='loginContainer'>
        <div className='loginWrapper'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className='LoginTitle'>Login</div>
                <p className='logintitleText'>Get Started with personalized TaskApp !!</p>
                <div className='inputFields'>
                    <input type='text' required placeholder='Create an Username' className='inputs' name='name' onChange={e=>setName(e.target.value)} />
                </div>
                <div className='inputFields'>
                    <input type='email' required placeholder='Enter Your Email' className='inputs' name='email' onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className='inputFields'>
                    <input type={showPassword ? "text" : "password"} required placeholder='Enter Password' className='inputs' name='password' onChange={e=>setPassword(e.target.value)}  />
                    <img src={eyeIconPwd} alt='eye' className='eye' onClick={onClickShowPassword}/>
                </div>
                {!loading ? <button className='btn bg-pink' type='submit'>Register</button> : <button className='btn'>Waiting..</button>}
                <p className='newUser'>Already regsitered? <Link to='/login' className='text-blue-500 font-bold'> Login</Link></p>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Register
