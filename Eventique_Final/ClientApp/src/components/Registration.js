import React, {useState} from 'react'
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function Registration() {
    const [FULL_NAME, setFULL_NAME] = useState('')
    const [USER_NAME, setUSER_NAME] = useState('')
    const [USER_EMAIL, setUSER_EMAIL] = useState('')
    const [USER_PASSWORD, setUSER_PASSWORD] = useState('')
    const [USER_PHONE, setUSER_PHONE] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/User/signup', {FULL_NAME, USER_NAME, USER_EMAIL, USER_PASSWORD, USER_PHONE, USER_ROLE:"User"})
        .then(result => {

            console.log("here")
            console.log(result)

            if(result.data.message == "User Created Successfully.")
            {
                toast.success('User Created Successfully.', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })

                    
                setTimeout(() => {
                        navigate('/login');
                    }, 5000); 

            }

            if(result.data.message == "Email Already in Use.")
            {
                toast.warn('Email Already in Use.', {
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

            if(result.data.message != "Email Already in Use." && result.data.message != "User Created Successfully.") 
            {
                toast.error(result.data.message, {
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


            // navigate('/login')
            // console.log(result)


        }).catch(err => console.log(err))
    }

    return (
        <div className='payment_body'>
            <br /><br /><br />
        <section className="payment-section">
            <div className="payment_container">
                <div className="payment-wrapper">
                    <div className="payment-left">

                    <form onSubmit={handleSubmit} className="payment-form">
                        <h1 className="payment-title">Registration</h1>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setFULL_NAME(e.target.value)} />
                            <label htmlFor="FULL_NAME" className="payment-form-label payment-form-label-required">Full Name</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setUSER_NAME(e.target.value)} />
                            <label htmlFor="USER_NAME" className="payment-form-label payment-form-label-required">User Name</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setUSER_PHONE(e.target.value)} />
                            <label htmlFor="USER_PHONE" className="payment-form-label payment-form-label-required">Mobile No</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setUSER_EMAIL(e.target.value)} />
                            <label htmlFor="USER_EMAIL" className="payment-form-label payment-form-label-required">Email Address</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="password" required placeholder=" " className="payment-form-control" onChange={(e) => setUSER_PASSWORD(e.target.value)} />
                            <label htmlFor="USER_PASSWORD" className="payment-form-label payment-form-label-required">Password</label>
                        </div>

                        <button type="submit" className="payment-form-submit-button"><i className="ri-wallet-line"></i> Register </button>
                    </form>

                        

                    </div>

                
                <div className="payment-right">
                    <div className="payment-header">
                        <div className="payment-header-icon"><i className="ri-flashlight-fill"></i></div>
                        <div className="payment-header-title">Welcome To Eventique</div>
                        <p className="payment-header-description">Registration Page</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <ToastContainer />
    <br /><br /><br />
    </div>
    )
}

export default Registration