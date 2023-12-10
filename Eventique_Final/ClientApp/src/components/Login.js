import React, {useState} from 'react'
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import "./Login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function Login() {
    const [USER_EMAIL, setUSER_EMAIL] = useState('')
    const [USER_PASSWORD, setUSER_PASSWORD] = useState('')
    const navigate = useNavigate()

    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/User/login', {USER_EMAIL, USER_PASSWORD})
        .then(result => {
            
            if(result.data.message == "Login Successful.")
            {
                toast.success('Login Successful', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })


                window.localStorage.setItem("userid", result['data']['data']['useR_ID'])

                const date = new Date();
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();

                const formattedDate = `${day}/${month}/${year}`;
                window.localStorage.setItem("checkin_time", formattedDate);
                    
                setTimeout(() => {
                        navigate('/dashboard');
                    }, 5000); 

            }

            if(result.data.message == "Unauthorized - Invalid Email or Password.")
            {
                toast.error('UnAuthorised Access - Invalid Email or Password', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });

            }

            if(result.data.message == "Email and password are required.")
            {
                toast.warn('Email and password are required.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });

            }



            console.log(result)
    }).catch(err => console.log(err))
    }

    return (
        <div className='payment_body'>
            <br /><br /><br />
        <section className="payment-section">
            <div className="payment_container">
                <div className="payment-wrapper">
                    <div className="payment-left">
                        <div className="payment-header">
                            <div className="payment-header-icon"><i className="ri-flashlight-fill"></i></div>
                            <div className="payment-header-title">Welcome To Eventique</div>
                            <p className="payment-header-description">Login Page</p>
                        </div>
                </div>

                
                <div className="payment-right">
                    <form onSubmit={handleSubmit} className="payment-form">
                        <h1 className="payment-title">Login</h1>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setUSER_EMAIL(e.target.value)} />
                            <label htmlFor="USER_EMAIL" className="payment-form-label payment-form-label-required">Email Address</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="password" required placeholder=" " className="payment-form-control" onChange={(e) => setUSER_PASSWORD(e.target.value)} />
                            <label htmlFor="USER_PASSWORD" className="payment-form-label payment-form-label-required">Password</label>
                        </div>

                        <button type="submit" className="payment-form-submit-button"><i className="ri-wallet-line"></i> Login</button>
                        
                    </form>
                </div>
            </div>
        </div>
    </section>
    <ToastContainer />
    <br /><br /><br />
    </div>

    

    )
}

export default Login