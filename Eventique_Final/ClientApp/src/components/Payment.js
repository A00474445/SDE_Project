import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate, useParams} from 'react-router-dom';
import "./Payment.css"
import "./Payment_tailwind.css"

import mastercard from '../images/mastercard.png'
import visa from '../images/visa.png'
import american from '../images/american.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Payment = () => {

    const { eventId } = useParams();
    const [eventCost, setEventCost] = useState("Hi");

    const [FIRST_NAME, setFIRST_NAME] = useState("");
    const [LAST_NAME, setLAST_NAME] = useState("");
    const [EMAIL, setEMAIL] = useState("");
    const [PHONE_NUMBER, setPHONE_NUMBER] = useState("");
    const [CITY, setCITY] = useState("");
    const [STATE, setSTATE] = useState("");
    const [COUNTRY, setCOUNTRY] = useState("");
    const [POSTAL_CODE, setPOSTAL_CODE] = useState("");
    const [CREDIT_CARD_NAME, setCREDIT_CARD_NAME] = useState("");
    const [CREDIT_CARD_TYPE, setCREDIT_CARD_TYPE] = useState("Default");
    const [CREDIT_CARD_NUMBER, setCREDIT_CARD_NUMBER] = useState("");
    const [CREDIT_CARD_EXPIRATION_DATE, setCREDIT_CARD_EXPIRATION_DATE] = useState("");
    const navigate = useNavigate()

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;


    console.log(eventId)

    useEffect(() => {
      axios.post('/api/Event/vieweventData', {EVENT_ID: eventId})
          .then(response => {
              
              setEventCost(window.localStorage.getItem("eventcost"));
              console.log(response.data['evenT_COST']);
          })
          .catch(error => console.log(error));
      }, []);


      const handleSubmit = (e) => {
        e.preventDefault()
        
        axios.post('/api/Payment/makepayment', {USER_ID: window.localStorage.getItem("userid"), EVENT_ID: eventId, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, CITY, STATE, COUNTRY, POSTAL_CODE, CREDIT_CARD_NAME, CREDIT_CARD_TYPE, CREDIT_CARD_NUMBER, CREDIT_CARD_EXPIRATION_DATE, AMOUNT: window.localStorage.getItem("eventcost"), LOGIN_CHECKIN_DATE: window.localStorage.getItem("checkin_time"), PAYMENT_CHECKOUT_DATE: formattedDate})
        .then(result => {
            console.log(result)

            console.log(result.data)

            if(result.data.message != "Payment Successful") 
                        {
                            toast.warn(result.data, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
            
                        }

            
            if (result.data.message == "Payment Successful") {
                    return axios.post('/api/Event/joinevent', {USER_ID: window.localStorage.getItem("userid"), EVENT_ID: eventId})
                    .then(result => {

                        if(result.data.message == "User joined the event successfully.")
                        {
                            toast.success('Payment was Successful. You have successfully joined the event!', {
                                position: "top-center",
                                autoClose: 4000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                })


                            return axios.post('/api/Event/send', {To: "sameer.patel@smu.ca", Subject: "Payment Confirmation and Event Registration Successful", "Body": "Hi There, <br /><br /> We are delighted to inform you that your payment has been successfully processed, and your registration for the Event is now complete! <br /><br /> Regards,<br />Eventique Team "})
                            .then(result => {

                                setTimeout(() => {
                                    navigate('/dashboard');
                                }, 5000);

                            })
            
                        }
            
                        else
                        {
                            toast.error(result.data.message, {
                                position: "top-center",
                                autoClose: 4000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
            
                        }






                        console.log(result)
                    })
            }
        })
        .catch(err => console.log(err))

    }


  return (
    
    <div className='payment_body'>
        <section class="payment-section">
            <div class="payment_container">
                <div class="payment-wrapper">
                    <div class="payment-left">
                        <div class="payment-header">
                            <div class="payment-header-icon"><i class="ri-flashlight-fill"></i></div>
                            <div class="payment-header-title">Order Summary</div>
                            <p class="payment-header-description">Please find below your order summary</p>
                        </div>

                    <div class="payment-content">
                        <div class="payment-body">
                            <div class="payment-plan">
                                <div class="payment-plan-type">B</div>
                                <div class="payment-plan-info">
                                    <div class="payment-plan-info-name">Basic Ticket</div>
                                </div>
                            </div>
                            <div class="payment-summary">
                                <div class="payment-summary-item">
                                    <div class="payment-summary-name">Taxes 15%</div>
                                    <div class="payment-summary-price">{(eventCost * 0.15).toFixed(0)} CAD</div>
                                </div>
                                <div class="payment-summary-divider"></div>
                                <div class="payment-summary-item payment-summary-total">
                                    <div class="payment-summary-name">Total</div>
                                    <div class="payment-summary-price">{eventCost} CAD</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="payment-right">
                    <form onSubmit={handleSubmit} class="payment-form">
                        <h1 class="payment-title">Payment Details</h1>

                        <div class="payment-method">
                            <input type="radio" name="payment-method" id="method-1" onChange={() => setCREDIT_CARD_TYPE("Visa")} checked={CREDIT_CARD_TYPE === "Visa"}/>
                            <label htmlFor="method-1" class="payment-method-item">
                                <img src={visa} alt="Visa" />
                            </label>

                            <input type="radio" name="payment-method" id="method-2" onChange={() => setCREDIT_CARD_TYPE("MasterCard")} checked={CREDIT_CARD_TYPE === "MasterCard"}/>
                            <label htmlFor="method-2" class="payment-method-item">
                                <img src={mastercard} alt="" />
                            </label>

                            <input type="radio" name="payment-method" id="method-3" onChange={() => setCREDIT_CARD_TYPE("American Express")} checked={CREDIT_CARD_TYPE === "American Express"}/>
                            <label htmlFor="method-3" class="payment-method-item">
                                <img src={american} alt="" />
                            </label>
                        </div>

                        <div class="payment-form-group-flex">
                            <div class="payment-form-group">
                                <input type="text" placeholder=" " class="payment-form-control"  required onChange={(e) => setFIRST_NAME(e.target.value)} />
                                <label htmlFor="FIRST_NAME" class="payment-form-label payment-form-label-required">First Name</label>
                            </div>
                            <div class="payment-form-group">
                                <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setLAST_NAME(e.target.value)} />
                                <label htmlFor="LAST_NAME" class="payment-form-label payment-form-label-required">Last Name</label>
                            </div>
                        </div>

                        <div class="payment-form-group">
                            <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setEMAIL(e.target.value)} />
                            <label htmlFor="EMAIL" class="payment-form-label payment-form-label-required">Email Address</label>
                        </div>

                        <div class="payment-form-group">
                            <input type="tel" placeholder=" " class="payment-form-control" required onChange={(e) => setPHONE_NUMBER(e.target.value)} />
                            <label htmlFor="PHONE_NUMBER" class="payment-form-label payment-form-label-required">Mobile No</label>
                        </div>

                        <div class="payment-form-group-flex">
                            <div class="payment-form-group">
                                <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setCITY(e.target.value)}/>
                                <label htmlFor="CITY" class="payment-form-label payment-form-label-required">City</label>
                            </div>
                            <div class="payment-form-group">
                                <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setSTATE(e.target.value)}/>
                                <label htmlFor="STATE" class="payment-form-label payment-form-label-required">State</label>
                            </div>
                        </div>

                        <div class="payment-form-group-flex">
                            <div class="payment-form-group">
                                <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setCOUNTRY(e.target.value)}/>
                                <label htmlFor="COUNTRY" class="payment-form-label payment-form-label-required">Country</label>
                            </div>
                            <div class="payment-form-group">
                                <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setPOSTAL_CODE(e.target.value)}/>
                                <label htmlFor="POSTAL_CODE" class="payment-form-label payment-form-label-required">Postal / Zip</label>
                            </div>
                        </div>

                        <div class="payment-form-group">
                            <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setCREDIT_CARD_NAME(e.target.value)}/>
                            <label htmlFor="CREDIT_CARD_NAME" class="payment-form-label payment-form-label-required">CC Name</label>
                        </div>

                        <div class="payment-form-group">
                            <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setCREDIT_CARD_NUMBER(e.target.value)}/>
                            <label htmlFor="CREDIT_CARD_NUMBER" class="payment-form-label payment-form-label-required">CC Number</label>
                        </div>

                        <div class="payment-form-group-flex">
                            <div class="payment-form-group">
                                <input type="text" placeholder=" " class="payment-form-control" required onChange={(e) => setCREDIT_CARD_EXPIRATION_DATE(e.target.value)}/>
                                <label htmlFor="CREDIT_CARD_EXPIRATION_DATE" class="payment-form-label payment-form-label-required">CC Expiry Date</label>
                            </div>
                            <div class="payment-form-group">
                                <input type="password" placeholder=" " class="payment-form-control" id="cvv" />
                                <label for="cvv" class="payment-form-label payment-form-label-required">CVV</label>
                            </div>
                        </div>

                        <button class="payment-form-submit-button"><i class="ri-wallet-line"></i> Pay</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <ToastContainer />
    </div>

  );
};

export default Payment;
