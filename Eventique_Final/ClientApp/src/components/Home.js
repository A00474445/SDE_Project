import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';


const Home = () => {

    const [eventData, setEventData] = useState(null);

    useEffect(() => {
      axios.get('/api/Event/viewallevents')
          .then(response => {
              setEventData(response.data);
              console.log(response.data);
          })
          .catch(error => console.log(error));
      }, []);
  

  return (
    <div>
    {eventData && eventData.map((event, index) => (
        <div key={index}>
            <h2>Event Name: {event.evenT_NAME}</h2>
            <p>Date: {event.evenT_DATE}</p>
            <p>Category: {event.evenT_CATEGORY}</p>
            <Link to={`/event_details/${event.evenT_ID}`}><button>More Details</button></Link>
        </div>
    ))}
</div>


  );
};

export default Home;