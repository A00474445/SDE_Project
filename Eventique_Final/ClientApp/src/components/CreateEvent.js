import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';


const CreateEvent = () => {
    const [EVENT_NAME, setEVENT_NAME] = useState('')
    const [EVENT_DATE, setEVENT_DATE] = useState('')
    const [EVENT_TIME, setEVENT_TIME] = useState('')
    const [EVENT_CATEGORY, setEVENT_CATEGORY] = useState('')
    const [EVENT_VENUE, setEVENT_VENUE] = useState('')
    const [EVENT_COST, setEVENT_COST] = useState('')
    const [EVENT_DESCRIPTION, setEVENT_DESCRIPTION] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/Event/createevent', {HOST_USER_ID: window.localStorage.getItem("userid"), EVENT_NAME, EVENT_DATE, EVENT_TIME, EVENT_CATEGORY, EVENT_VENUE, EVENT_COST, EVENT_DESCRIPTION})
        .then(result => {
            navigate('/')
            console.log(result)
        }).catch(err => console.log(err))
    }


  return (
    <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='EVENT_NAME'>Name</label>
                    <input type='text' placeholder='Enter Event Name...' onChange={(e) => setEVENT_NAME(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='EVENT_DATE'>Date</label>
                    <input type='date' placeholder='Enter Event Date...' onChange={(e) => setEVENT_DATE(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='EVENT_TIME'>Time</label>
                    <input type='text' placeholder='Enter Event Time...' onChange={(e) => setEVENT_TIME(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='EVENT_CATEGORY'>Category</label>
                    <input type='text' placeholder='Enter Event Category...' onChange={(e) => setEVENT_CATEGORY(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='EVENT_VENUE'>Venue</label>
                    <input type='text' placeholder='Enter Event Venue...' onChange={(e) => setEVENT_VENUE(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='EVENT_COST'>Cost</label>
                    <input type='text' placeholder='Enter Event Cost...' onChange={(e) => setEVENT_COST(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='EVENT_DESCRIPTION'>Description</label>
                    <input type='text' placeholder='Enter Event Description...' onChange={(e) => setEVENT_DESCRIPTION(e.target.value)}/>
                </div>

                <button>Submit</button>
                <Link to="/"><button>Login</button></Link>

            </form>
        </div>
  );
};
// aligned the layouts
export default CreateEvent;
