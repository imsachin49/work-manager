import React,{useState} from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setLogin } from '../../state'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()
    const dispatch=useDispatch()
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
            setLoading(true);
            const res=await axios.post('https://work-manage-49.vercel.app/api/users/login', {email, password})
            console.log(res.data)
            toast.success('LoggedIn Successfully', {
                position: "bottom-center",
            });   
            dispatch(setLogin({
                user: res.data.user,
                token: res.data.token
            }))
            setLoading(false);
            navigate('/')     
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='loginContainer'>
        <div className='loginWrapper'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className='LoginTitle'>Login</div>
                <p className='logintitleText'>Welcome to personalized TaskApp !!</p>
                <div className='inputFields'>
                    <input type='email' required placeholder='Enter Your Email' className='inputs text-black' onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className='inputFields'>
                    <input type={showPassword ? "text" : "password"} required placeholder='Enter Password' className='inputs text-black' onChange={e=>setPassword(e.target.value)} />
                    <img src={eyeIconPwd} alt='eye' className='eye' onClick={onClickShowPassword} />
                </div>
                <button className='btn bg-pink'>{loading ? "Waiting . . ." : "Login"}</button>
                <p className='newUser'>New to TaskApp? <Link to='/register' className='text-blue-600 font-bold'>Join Now</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login
