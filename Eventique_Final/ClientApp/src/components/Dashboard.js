import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';


const Dashboard = () => {

    const [eventData, setEventData] = useState(null);
    const [hostedeventData, setHostedEventData] = useState(null);

    /* Events User has joined*/
    useEffect(() => {
      axios.post('/api/Event/viewuserevents', {USER_ID: window.localStorage.getItem("userid")})
          .then(response => {
              setEventData(response.data);
              console.log(response.data);
          })
          .catch(error => console.log(error));
      }, []);



    /* Events User has joined*/
    useEffect(() => {
        axios.post('/api/Event/viewhostedevents', {USER_ID: window.localStorage.getItem("userid")})
            .then(response => {
                setHostedEventData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
        }, []);
  

  return (
    <div>
    <h1>Events You have joined</h1>
    {eventData && eventData.map((event, index) => (
        <div key={index}>
            <h4>Event Name: {event.evenT_NAME}</h4>
            <p>ID: {event.evenT_ID}</p>
            <p>Host ID: {event.hosT_USER_ID}</p>
            <p>Date: {event.evenT_DATE}</p>
            <p>Time: {event.evenT_TIME}</p>
            <p>Category: {event.evenT_CATEGORY}</p>
            <p>Venue: {event.evenT_VENUE}</p>
            <p>Cost: {event.evenT_COST}</p>
            <p>Description: {event.evenT_DESCRIPTION}</p>
            <p>Find more in<a>https://eclipse.global/30-ways-to-hold-a-successful-event/</a></p>
        </div>
    ))}


    <hr />
    <hr />


    <h1>Events You have Hosted!</h1>
    {hostedeventData && hostedeventData.map((event, index) => (
        <div key={index}>
            <h4>Event Name: {event.evenT_NAME}</h4>
            <p>ID: {event.evenT_ID}</p>
            <p>Host ID: {event.hosT_USER_ID}</p>
            <p>Date: {event.evenT_DATE}</p>
            <p>Time: {event.evenT_TIME}</p>
            <p>Category: {event.evenT_CATEGORY}</p>
            <p>Venue: {event.evenT_VENUE}</p>
            <p>Cost: {event.evenT_COST}</p>
            <p>Description: {event.evenT_DESCRIPTION}</p>
        </div>
    ))}


</div>


  );
};

export default Dashboard;
