import React, {useRef, useState, useEffect} from 'react'
import './login.css'
import loginImage from '../images/loginImage.png'
import userImage from '../images/userImage.svg'
import keyImage from '../images/keyImage.svg'
import eyeImage from '../images/eyeImage.svg'
import axios from 'axios'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import Home from './Home'



// const api=();







const Login = () => {
  const initialLoginValue = {
    username:'',
    password:''
  };
  const [passwordVisible,setPasswordVisible]= useState(false);
  const [loginValues,setLoginValues] = useState(initialLoginValue);
  const [verified,setVerified] = useState(false);
  const [invalid,setInvalid] = useState(false);
  const [empty,setEmpty] = useState(false);
  const nav = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  const eyeBtnHandler = (e)=>{
    e.preventDefault();
    if(passwordVisible==true)
      setPasswordVisible(false);
    else
      setPasswordVisible(true);
  }


  const inputHandler = (e)=>{
    setEmpty(false);
    setInvalid(false);
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value.trim() });
    // console.log(loginValues);
  }

  
  
  const submitLoginFunction=(e)=>{
    console.log(loginValues);
    e.preventDefault();
    if(loginValues.username==''|| loginValues.password=='')
      setEmpty(true);
    if(verified===true&& empty===false && invalid===false){
    axios.post(`${process.env.REACT_APP_LOGIN}`,
    {email:loginValues.username,
      password:loginValues.password
    }
    ).then((e)=>{console.log('submitted');
      setLoginValues(initialLoginValue);
      if(e.data==='Matched'){
      console.log(e.data);
      nav('/home');
      }
      else
        setInvalid(true);
    }
    ).catch((error)=>{console.log(error.message);
      setInvalid(true);})
    console.log(loginValues);
  }
}

  

  return (
    <div className="wrap--Box">
      <div className="wrap--form">
        <div className=' wrap--imageBackground loginImage'>
          <img src={loginImage} alt=''/>
        </div>
        {/* <form className='form loginForm' onSubmit={handleSubmit}> */}
        <form className='form loginForm' onSubmit={submitLoginFunction}>
            <h2 className='formHeading'>Login</h2>

            <p className={invalid?'invalidText':'invisible'}>Invalid Username or Password</p>
            <p className={empty?'invalidText':'invisible'}>Username or password can't be empty</p>

            {/* Username */}
            <span className='borderInput borderInputBox'>
              <img src={userImage} alt='user' className='logo--login'/>
              <input type='email' placeholder='Username' name='username' onChange={inputHandler}/>
            </span>


            {/* Password */}
            <span className='borderInput borderInputBox'>
              <img src={keyImage} alt='password'  className='logo--login'/>
              <input type={passwordVisible?'text':'password'} placeholder='Password' onChange={inputHandler} name='password'/>
              <button id='eyeBtn' onClick={eyeBtnHandler}><img src={eyeImage} alt='password'  className='logo--login'/></button>
            </span>


            {/* Forgot Password */}

            <NavLink to='/reset' className='forgotPasswordText'>Fogot Password?</NavLink>
              {/* <NavLink to='/ForgotPassword'><span>Forget Password?</span></NavLink> */}
            <div className='sameLevel'>
            <ReCAPTCHA className='captchaLogin'
                  sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                   onChange={onChange}
            />
            </div>
            <div className='sameLevel rememberMe'>
              {/* <span className='boxLevel'><input type='checkBox' />I'm not a robot</span> */}
              <span className='boxLevel'><input type='checkBox' />Remember Me?</span>
            </div>
            <button type='submit'  className='btn--loginSubmit marginTop'>Sign In</button>
            <div>
              <span>Don't have a account? <NavLink to='/register'>Register</NavLink></span>
            </div>
            
        </form>
      </div>
    </div>
  )
}

export default Login;





