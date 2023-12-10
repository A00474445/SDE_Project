import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate, useParams} from 'react-router-dom';
import portfolio1 from '../images/portfolio/portfolio-1.jpg'

const EventDetails = () => {

    const { eventId } = useParams();
    const [eventData, setEventData] = useState("Hi");

    console.log(eventId)

    useEffect(() => {
      axios.post('/api/Event/vieweventData', {EVENT_ID: eventId})
          .then(response => {
              window.localStorage.setItem("eventcost", response['data']['evenT_COST'])
              setEventData(response.data);
              console.log(response.data);
          })
          .catch(error => console.log(error));
      }, []);


  return (
    <main id="main">
        <br /><br /><br />
        <section id="portfolio-details" class="portfolio-details">
            <div class="container">

                <div class="row gy-4">

                    <div class="col-lg-8">
                        <div class="portfolio-details-slider swiper">
                            <div class="swiper-wrapper align-items-center">

                                <div class="swiper-slide">
                                <img src={eventData.evenT_IMAGE} alt="..." style={{ width: '800px', height: '600px', objectFit: 'cover' }}/>
                                </div>

                            </div>

                            <div class="swiper-pagination"></div>
                        </div>
                    </div>

                <div class="col-lg-4">
                    <div class="portfolio-info">
                        <h3>{eventData['evenT_NAME']}</h3>
                        <ul>
                            <li><strong>Event Category : </strong>{eventData['evenT_CATEGORY']}</li>
                            <li><strong>Event Date : </strong>: {eventData['evenT_DATE']}, {eventData['evenT_TIME']}</li>
                            <li><strong>Event Cost : </strong>: {eventData['evenT_COST']} CAD</li>
                            <li><strong>Event Venue : </strong>: {eventData['evenT_VENUE']}</li>
                            {/* <li><strong>Event Venue : </strong>: <a href="#">{eventData['evenT_VENUE']}</a></li> */}
                        </ul>
                    </div>

                    <div class="portfolio-info">
                        <h2>Event Description</h2>
                        <p>
                            {eventData['evenT_DESCRIPTION']}
                        </p>
                        <div class="text-center"><Link to={`/payment/${eventData.evenT_ID}`} className="btn-get-started"><b>Join Event</b></Link></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <br /><br /><br />
  </main>


  );
};

export default EventDetails;
