import React, {useState} from 'react'
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

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
            navigate('/login')
            console.log(result)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='FULL_NAME'>Full Name</label>
                    <input type='text' placeholder='Enter Full Name...' onChange={(e) => setFULL_NAME(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='USER_NAME'>Username</label>
                    <input type='text' placeholder='Enter Username...' onChange={(e) => setUSER_NAME(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='USER_EMAIL'>Email</label>
                    <input type='text' placeholder='Enter Email...' onChange={(e) => setUSER_EMAIL(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='USER_PASSWORD'>Password</label>
                    <input type='password' placeholder='Enter Password...' onChange={(e) => setUSER_PASSWORD(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='USER_PHONE'>Mobile No</label>
                    <input type='text' placeholder='Enter Mobile No...' onChange={(e) => setUSER_PHONE(e.target.value)}/>
                </div>

                <button>Submit</button>
                <Link to="/login"><button>Login</button></Link>

            </form>
        </div>
    )
}

export default Registration