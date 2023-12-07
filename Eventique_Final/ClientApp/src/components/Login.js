import React, {useState} from 'react'
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

function Login() {
    const [USER_EMAIL, setUSER_EMAIL] = useState('')
    const [USER_PASSWORD, setUSER_PASSWORD] = useState('')
    const navigate = useNavigate()

    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/User/login', {USER_EMAIL, USER_PASSWORD})
        .then(result => {
            window.localStorage.setItem("userid", result['data']['data']['useR_ID'])
            navigate('/dashboard')
            console.log(result)
    }).catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='USER_EMAIL'>Email</label>
                    <input type='text' placeholder='Enter Email...' onChange={(e) => setUSER_EMAIL(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='USER_PASSWORD'>Password</label>
                    <input type='password' placeholder='Enter Password...' onChange={(e) => setUSER_PASSWORD(e.target.value)}/>
                </div>

                <button>Submit</button>
                <Link to="/signup"><button>Register</button></Link>

            </form>
        </div>
    )
}

export default Login