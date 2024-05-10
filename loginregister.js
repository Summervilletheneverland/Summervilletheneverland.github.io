import React, {useState } from 'react'
import './LoginRegister.scss'
import {FaLock,FaEnvelope, FaUser} from 'react-icons/fa';
//import { useNavigate } from 'react-router-dom';
//import LoginValidation from './LoginValidation';
//import SignupValidation from './signupValidation';

function LoginRegister() { 
    let error={}
        //const navigate=useNavigate();
        const [action,setAction]=useState('');
        const registerLink=()=>{
            setAction(' active');
        };
        const loginLink=()=>{
            setAction('');
        };
        const [btn,setBtn]=useState([]);
        const [errors,setErrors]=useState({})
        const[register_success,setRegister_success]=useState('')
       const [values,setValues]=useState({
        email:'',
        password:''
        })
        const [values1,setValues1]=useState({
        username1:'',
        email1:'',
        password1:''
        })
        // function check_email(values1){
        //     const email1=values1.email1;
        //     try{
        //         const response=fetch('http://localhost:4000/register_email',{
        //             method:'POST',
        //             headers:{'Content-Type':'application/json'},
        //             body: JSON.stringify({email1})
            //     }).then( response=>response.json().then(data=>{
            //         // if(data.rowCount>0){
            //         //     alert('email_id already exist')
            //         //     setValues1({username1:'',email1:'',password1:''})
            //         // }
                    
            //         console.log(data?.row?.username)
            //      }))
            // }
            // catch(err){
            //     console.error(err.message)
            // }
        // }
        function LoginValidation(values){
            
            let error={}
            const email=values.email; error.email=''
            const password=values.password;//error.password='Invalid Password or username'
        
             try{
            const response= fetch('http://localhost:4000/login',{
                       method:'POST',
                       headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify({email,password})     
                    }).then(response=>response.json())
                    .then(data=>{
                        
                        if(data.rowCount >0){
                        error.password=''
                        console.log(error.password)
                        alert('login success')
                       window.location.href='https://summervilletheneverland.github.io/dbms_index1.html'
                       //window.location.href='/home'
                    }
                        else{
    
                            console.log('login failed')
                            alert('Invalid username or password')
                        }
                    })
                    .catch(error=>{
                        console.error("Error: "+error)
                    })
            } 
            catch(err){
                console.error(err.message)
                error.password="password or username didn't match"
            }
            // console.log("flag:"+flag)
            // if(flag==0){
            // error.password='Invalid email or password'}
            // else {
            //     error.password='' 
            // }
            if(values.password==''){
                error.password=''
            }
            console.log("error.password:"+error.password) 
            
        }

        function SignupValidation(){
            let error={}
            error.username1=''
            const password_pattern= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            if(!password_pattern.test(values1.password1[0])&&values1.password1[0].length<8){
                error.password1="Password didn't match"
            }
            else{
                console.log("else of validation")
                error.password1=""       
                
                    const username=values1.username1; error.username1='';
                    const email=values1.email1; 
                    const password=values1.password1;error.email1=''
                    fetch('http://localhost:4000/register',{
                       method:'POST',
                       headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify({username,email,password})     
                    }).then( response=>response.json())
                    .then(data=>{
                        console.log("data.rowCOunt:"+data.rowCount)
                     if(data.rowCount>0){
                        console.log('if');
                        alert('email_id already exist')
                        setValues1({username1:'',email1:'',password1:''})
                         error.email1='Email id already taken'
                     }
                     else{
                        console.log('else')
                        error.email1='';
                        console.log('error.password1:'+error.password1)
                     }
                    
                 })
                }
            console.log("pas:"+error.password1+",email:"+error.email1)
           return error;    
    }     
                //    catch(err){  
                //     error.password1="Password didn't match"     
                //    }
                //    if(values1.password1=''){
                //    error.password1='';
                //    }             
            
        //    
        // }
    

        const handleInput = (event)=>{
            setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
            errors.password=''
        }
        const handleInput1 = (event)=>{
            setValues1(prev => ({...prev,[event.target.name]:[event.target.value]}))
           //check_email(values1);          
        }

        const Submit=(event)=>{
            event.preventDefault();
            setErrors(LoginValidation(values)) 
            setValues({email1:'',password1:''})
         
        }
        const Submit1= async(event)=>{
            event.preventDefault();
            
            setErrors(SignupValidation()); 
            console.log("error values:"+errors.username1+"  "+errors.email1+"  "+errors.password1)
            if(errors.username1===""&&errors.email1===''&&errors.password1===''){
                setValues1({username1:'',email1:'',password1:''})
                alert('register successful')
                setAction('');
            }
        }
  return (
    <div className='login_page'>
    <div className={`wrapper${action}`}>
      <div className='form-box login'>
        <form action='iplt20.com' target='' onSubmit={Submit}>
            <h1>Login</h1>
            <div className='input-box'>
                <input type='email' placeholder='Email' name='email' onChange={handleInput} value={values.email}  required/>
                <FaEnvelope className='icon'/>
            </div>
            
            <div className='input-box'>
                <input type='password' placeholder='Password' name='password' onChange={handleInput} value={values.password} required/>
                <FaLock className='icon'/>
            </div>
            {errors.password &&<span className='text-danger'>{errors.password}</span>}
            <button type='submit' >Login</button>
            <div className='register-link'>
                <p>Don't have an account?<a href='#' onClick={registerLink}>Register</a></p>
            </div>
        </form>
      </div>

      <div className='form-box register'>
        <form action='' onSubmit={Submit1}>
            <h1>Register</h1>
            <div className='input-box'>
                <input type='text' placeholder='Username' name='username1' onChange={handleInput1} value={values1.username1} required/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type='email' placeholder='Email' name='email1' onChange={handleInput1} value={values1.email1} required/>
                <FaEnvelope className='icon'/>
            </div>
            <div className='input-box'>
                <input type='password' placeholder='Password' name='password1' onChange={handleInput1} value={values1.password1} required/>
                <FaLock className='icon'/>
                {errors.password1 &&<span className='text-danger'>{errors.password1}</span>}
            </div>
            
            <button type='submit' >Register</button>
            <div className='register-link'>
                <p>Already have an account?<a href='#' onClick={loginLink}>Login</a></p>
            </div>
            {/* <button type='' onClick={button1}>click me</button> */}
           
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginRegister
