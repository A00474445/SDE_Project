import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import services1 from '../images/services-1.jpg'


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
<<<<<<< HEAD
    
    <section id="services" class="services section-bg">
        <br /><br /><br />
        <div class="container">

            <div class="section-title">
                <h2 data-aos="fade-in">Events Joined</h2>
            </div>

            <div class="row">
            {eventData && eventData.map((event, index) => (
                <div key={index} class="col-md-6 d-flex" data-aos="fade-right">
                    <div class="card">
                        <div class="card-img">
                            <img src={event.evenT_IMAGE} alt="..." style={{ width: '600px', height: '400px', objectFit: 'cover' }}/>
                        </div>
                    
                        <div class="card-body">
                            <h5 class="card-title"><Link href="/"> {event.evenT_NAME}</Link></h5>
                            <p class="card-text">{event.evenT_CATEGORY} - {event.evenT_DATE}</p>
                            <div class="read-more"><Link to={`/event_details/${event.evenT_ID}`}><i class="bi bi-arrow-right"></i>More Details</Link></div>
                        </div>
                    </div>
                </div>

            ))}
            </div>
=======
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
>>>>>>> c9459183b5e1d3f5ab4ad42a189f139499c5700c
        </div>


<<<<<<< HEAD
        <div class="container">

            <div class="section-title">
                <h2 data-aos="fade-in">Events Hosted</h2>
            </div>

            <div class="row">
            {hostedeventData && hostedeventData.map((event, index) => (
                <div key={index} class="col-md-6 d-flex" data-aos="fade-right">
                    <div class="card">
                        <div class="card-img">
                            <img src={event.evenT_IMAGE} alt="..." style={{ width: '600px', height: '400px', objectFit: 'cover' }}/>
                        </div>
                    
                        <div class="card-body">
                            <h5 class="card-title"><Link href="/"> {event.evenT_NAME}</Link></h5>
                            <p class="card-text">{event.evenT_CATEGORY} - {event.evenT_DATE}</p>
                            <div class="read-more"><Link to={`/event_details/${event.evenT_ID}`}><i class="bi bi-arrow-right"></i>More Details</Link></div>
                        </div>
                    </div>
                </div>

            ))}
            </div>
=======
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
>>>>>>> c9459183b5e1d3f5ab4ad42a189f139499c5700c
        </div>
        <br /><br /><br />
    </section>

  );
};

export default Dashboard;
