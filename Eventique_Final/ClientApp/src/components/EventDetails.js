import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate, useParams} from 'react-router-dom';


const EventDetails = () => {

    const { eventId } = useParams();
    const [eventData, setEventData] = useState("Hi");

    console.log(eventId)

    useEffect(() => {
      axios.post('/api/Event/vieweventData', {EVENT_ID: eventId})
          .then(response => {
              setEventData(response.data);
              console.log(response.data);
          })
          .catch(error => console.log(error));
      }, []);


  return (
    <div>
        <div>
            <br />
            <h3>EVENT DETAILS</h3>
            {eventData['evenT_NAME']}
            <br />
            {eventData['evenT_CATEGORY']}
            <br />
            {eventData['evenT_DESCRIPTION']}
            <br />
            {eventData['evenT_DATE']}
            <br />
            {eventData['evenT_TIME']}
            <br />
            {eventData['evenT_COST']}
            <br />
            {eventData['evenT_VENUE']}
            <br />

            <Link to={`/payment/${eventData.evenT_ID}`}><button>Pay and Join this Event</button></Link>
        </div>
    </div>


  );
};
// modified eventid for payment interface
export default EventDetails;
