import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import HeroImg from '../images/hero-img.png';

import client1 from '../images/clients/client-1.png'
import client2 from '../images/clients/client-2.png'
import client3 from '../images/clients/client-3.png'
import client4 from '../images/clients/client-4.png'
import client5 from '../images/clients/client-5.png'
import client6 from '../images/clients/client-6.png'

import services1 from '../images/services-1.jpg'
import services2 from '../images/services-2.jpg'

import features1 from '../images/features-1.svg'
import features2 from '../images/features-2.svg'
import features3 from '../images/features-3.svg'
import features4 from '../images/features-4.svg'

import team1 from '../images/team/team-1.jpg'
import team2 from '../images/team/team-2.jpg'
import team3 from '../images/team/team-3.jpg'

const Home = () => {

    const [eventData, setEventData] = useState(null);

      useEffect(() => {
        axios.post('/api/Event/viewusereventsnotjoined', {USER_ID: window.localStorage.getItem("userid")})
            .then(response => {
                setEventData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
        }, []);
  

  return (
<<<<<<< HEAD
    
    <div>
            <section id="hero">
            <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className=" col-lg-6 py-5 py-lg-0 order-2 order-lg-1" data-aos="fade-right">
                            <h1>Welcome to Eventique</h1>
                            <h2>WHERE MOMENTS UNFOLD, TICKETS AWAIT, AND MEMORIES ARE MADE!</h2>
                            <Link to="/signup" className="btn-get-started scrollto">Get Started</Link>
                        </div>
                
                        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
                            <img src={HeroImg} className="img-fluid" alt="" />
                        </div>
                    </div>
            </div>
            </section>


            <main id="main">

                <section id="clients" className="clients section-bg">
                    
                    <div className="container">
                        <div className="row no-gutters clients-wrap clearfix wow fadeInUp">

                            <div className="col-lg-2 col-md-4 col-6">
                                <div className="client-logo">
                                    <img src={client1} className="img-fluid" alt="" data-aos="flip-right" />
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-6">
                                <div className="client-logo">
                                    <img src={client2} className="img-fluid" alt="" data-aos="flip-right" data-aos-delay="100" />
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-6">
                                <div className="client-logo">
                                    <img src={client3} className="img-fluid" alt="" data-aos="flip-right" data-aos-delay="200" />
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-6">
                                <div className="client-logo">
                                    <img src={client4} className="img-fluid" alt="" data-aos="flip-right" data-aos-delay="300" />
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-6">
                                <div className="client-logo">
                                    <img src={client5} className="img-fluid" alt="" data-aos="flip-right" data-aos-delay="400" />
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-6">
                                <div className="client-logo">
                                    <img src={client6} className="img-fluid" alt="" data-aos="flip-right" data-aos-delay="500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="about" className="about section-bg">
                    <div className="container">

                        <div className="row gy-4">
                            <div className="image col-xl-5"></div>
                                <div className="col-xl-7">
                                    <div className="content d-flex flex-column justify-content-center ps-0 ps-xl-4">
                                        <h3 data-aos="fade-in" data-aos-delay="100">Your gateway to a world of unforgettable experiences!</h3>
                                        <p data-aos="fade-in">At Eventique, we believe in the magic of moments and the power of bringing people together through exceptional events.</p>
              
              
                                        <div className="row gy-4 mt-3">
                
                                            <div className="col-md-6 icon-box" data-aos="fade-up">
                                                <i className="bx bx-receipt"></i>
                                                <h4><a href="#">Corporate Events</a></h4>
                                                <p>Elevate your business with our tailor-made corporate events perfect for conferences, team-building, and product launches.</p>
                                            </div>

                                            <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                                                <i className="bx bx-cube-alt"></i>
                                                <h4><a href="#">Social Events</a></h4>
                                                <p>Celebrate life"s special moments with our exquisite social event planning from enchanting weddings to memorable birthday parties</p>
                                            </div>

                                            <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                                                <i className="bx bx-images"></i>
                                                <h4><a href="#">Educational Events</a></h4>
                                                <p>Expand your knowledge and skills through our engaging educational events, including workshops, seminars, and webinars.</p>
                                            </div>

                                            <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                                                <i className="bx bx-shield"></i>
                                                <h4><a href="#">Networking Events</a></h4>
                                                <p>Connect and grow with our networking events, designed to bring professionals together for meaningful business relationships and opportunities</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>


                <section id="services" class="services section-bg">
                    <div class="container">

                        <div class="section-title">
                        <h2 data-aos="fade-in">Events</h2>
                        <p data-aos="fade-in">Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div class="row">
                        {eventData && eventData.map((event, index) => (
                            <div key={index} class="col-md-6 d-flex" data-aos="fade-right">
                                <div class="card">
                                    <div class="card-img">
                                        <img src={event.evenT_IMAGE} style={{ width: '600px', height: '400px', objectFit: 'cover' }} alt="..." />
                                    </div>
                                
                                    <div class="card-body">
                                        <h5 class="card-title"><Link href="/">{event.evenT_NAME}</Link></h5>
                                        <p class="card-text"><b>Event Category</b> : {event.evenT_CATEGORY} </p>
                                        <p class="card-text"><b>Event Time</b> : {event.evenT_DATE.split('T')[0]}</p>
                                        <div class="read-more"><Link to={`/event_details/${event.evenT_ID}`}><i class="bi bi-arrow-right"></i>More Details</Link></div>
                                    </div>
                                </div>
                            </div>

                        ))}
                        </div>
                    </div>
                </section>



                <section id="features" class="features section-bg">
                    <div class="container">

                        <div class="section-title">
                            <h2 data-aos="fade-in">Our Highlights</h2>
                            <p data-aos="fade-in">On a mission to revolutionize the way you discover, attend, and host events. We aim to create a seamless platform that caters to the needs of both event organizers and enthusiastic attendees, making every event a resounding success.</p>
                        </div>

                        <div class="row content">
                            <div class="col-md-5 order-1 order-md-2" data-aos="fade-left">
                                <img src={features4} class="img-fluid" alt="" />
                            </div>

                            <div class="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right">
                                <h3>Eventique provides a one-stop solution for event organizers to effortlessly create, manage, and promote their events.</h3>
                                <p>
                                Our user-friendly interface ensures that browsing, booking, and attending events is a smooth and enjoyable experience for all users.
                                </p>
                                <p>
                                From electrifying concerts to enlightening conferences and captivating exhibitions, Eventique offers a diverse range of events to cater to every interest.

                                </p>
                            </div>
                        </div>

                    </div>
                </section>



                <section id="team" class="team section-bg">
                    <div class="container">

                        <div class="section-title">
                            <h2 data-aos="fade-in">Our Team</h2>
                        </div>

                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-6">
                                <div class="member" data-aos="fade-up">
                                    <div class="pic"><img src={team1} alt="" /></div>
                                    <h4>Sameer Patel</h4>
                                    

                                    <div class="social">
                                        <a href=""><i class="bi bi-twitter"></i></a>
                                        <a href=""><i class="bi bi-facebook"></i></a>
                                        <a href=""><i class="bi bi-instagram"></i></a>
                                        <a href=""><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-6">
                                <div class="member" data-aos="fade-up" data-aos-delay="100">
                                    <div class="pic"><img src={team2} alt="" /></div>
                                    <h4>Roy Jasper</h4>
                                    

                                    <div class="social">
                                        <a href=""><i class="bi bi-twitter"></i></a>
                                        <a href=""><i class="bi bi-facebook"></i></a>
                                        <a href=""><i class="bi bi-instagram"></i></a>
                                        <a href=""><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-6">
                                <div class="member" data-aos="fade-up" data-aos-delay="200">
                                    <div class="pic"><img src={team3} alt="" /></div>
                                    <h4>Di Sun</h4>
                                    

                                    <div class="social">
                                        <a href=""><i class="bi bi-twitter"></i></a>
                                        <a href=""><i class="bi bi-facebook"></i></a>
                                        <a href=""><i class="bi bi-instagram"></i></a>
                                        <a href=""><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="faq" class="faq section-bg">
                    <div class="container">

                        <div class="section-title">
                            <h2 data-aos="fade-in">Frequently Asked Questions</h2>
                            <p data-aos="fade-in">Our platform is designed to simplify the process of hosting, finding, and joining local events. Whether you're planning a large gathering or looking to attend a small local interesting happening, we've got you covered.</p>
                        </div>

                        <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up">
                            <div class="col-lg-5">
                                <i class="bx bx-help-circle"></i>
                                <h4>What is Eventique?</h4>
                            </div>

                            <div class="col-lg-7">
                                <p>
                                Eventique provides a one-stop solution for event organizers to effortlessly create, manage, and promote their events.
                                </p>
                            </div>
                        </div>



                        <div class="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                            <div class="col-lg-5">
                                <i class="bx bx-help-circle"></i>
                                <h4>Whats the Technology Stack behind Eventique?</h4>
                            </div>

                            <div class="col-lg-7">
                                <p>
                                From a technological aspect, We've used React for our Client Logic, C# for the Backend Logic, MSSQL for Database, and Azure for Deployment.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

=======
      <div>
          <header>
              <Link to="/" className="logo">
                  MyBlog
              </Link>
              <nav>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  <a href="">About</a>
              </nav>
          </header>
    {eventData && eventData.map((event, index) => (
        <div key={index}>
            <h2>Event Name: {event.evenT_NAME}</h2>
            <p>Date: {event.evenT_DATE}</p>
            <p>Category: {event.evenT_CATEGORY}</p>
            <Link to={`/event_details/${event.evenT_ID}`}><button>More Details</button></Link>
            <div>
            <img>Mush it with other details</img>
            </div>
        </div>
    ))}
</div>
>>>>>>> c9459183b5e1d3f5ab4ad42a189f139499c5700c

    </div>

  );
};

export default Home;
