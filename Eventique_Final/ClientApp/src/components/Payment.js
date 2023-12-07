import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate, useParams} from 'react-router-dom';


const Payment = () => {

    const { eventId } = useParams();
    const [eventCost, setEventCost] = useState("Hi");

    console.log(eventId)

    useEffect(() => {
      axios.post('/api/Event/vieweventData', {EVENT_ID: eventId})
          .then(response => {
              
              setEventCost(response.data['evenT_COST']);
              console.log(response.data['evenT_COST']);
          })
          .catch(error => console.log(error));
      }, []);


      const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/Event/joinevent', {USER_ID: window.localStorage.getItem("userid"), EVENT_ID: eventId})
        .then(result => {
            console.log(result)
            
            if (result.data.message === "Event created successfully.") {
                    return axios.post('/api/Payment/makepayment', {USER_ID: window.localStorage.getItem("userid"), EVENT_ID: eventId, AMOUNT:eventCost})
                    .then(result => {
                        console.log(result)
                    })
            }
        })
        .catch(err => console.log(err))





    }


  return (
    <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='FULL_NAME'>Full Name</label>
                    <input type='text' placeholder='Enter Full Name...' />
                </div>

                <button>Submit</button>
            </form>
        </div>


  );
};

export default Payment;
