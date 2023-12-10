import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const CreateEvent = () => {
    const [EVENT_NAME, setEVENT_NAME] = useState('')
    const [EVENT_DATE, setEVENT_DATE] = useState('')
    const [EVENT_TIME, setEVENT_TIME] = useState('')
    const [EVENT_CATEGORY, setEVENT_CATEGORY] = useState('')
    const [EVENT_VENUE, setEVENT_VENUE] = useState('')
    const [EVENT_COST, setEVENT_COST] = useState('')
    const [EVENT_DESCRIPTION, setEVENT_DESCRIPTION] = useState('')
    const [EVENT_IMAGE, setEVENT_IMAGE] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/Event/createevent', {HOST_USER_ID: window.localStorage.getItem("userid"), EVENT_NAME, EVENT_DATE, EVENT_TIME, EVENT_CATEGORY, EVENT_VENUE, EVENT_COST, EVENT_IMAGE, EVENT_DESCRIPTION})
        .then(result => {

            if(result.data.message == "Event created successfully.")
            {
                toast.success('Event created successfully.', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })

                    
                setTimeout(() => {
                        navigate('/');
                    }, 5000); 

            }

            if(result.data.message == "An event with the same name already exists.")
            {
                toast.error('An event with the same name already exists.', {
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

            if(result.data.message != "Event created successfully." && result.data.message != "An event with the same name already exists.") 
            {
                toast.warn(result.data.message, {
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

        }).catch(err => console.log(err))
    }


  return (
    <div className='payment_body'>
        <br /><br />
        <section className="payment-section">
            <div className="payment_container">
                <div className="payment-wrapper">
                    <div className="payment-left">

                    <form onSubmit={handleSubmit} className="payment-form">
                        <h1 className="payment-title">Host an Event</h1>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_NAME(e.target.value)} />
                            <label htmlFor="EVENT_NAME" className="payment-form-label payment-form-label-required">Event Name</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="date" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_DATE(e.target.value)} />
                            <label htmlFor="EVENT_DATE" className="payment-form-label payment-form-label-required">Event Date</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_TIME(e.target.value)} />
                            <label htmlFor="EVENT_TIME" className="payment-form-label payment-form-label-required">Event Time</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_CATEGORY(e.target.value)} />
                            <label htmlFor="EVENT_CATEGORY" className="payment-form-label payment-form-label-required">Event Category</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_VENUE(e.target.value)} />
                            <label htmlFor="EVENT_VENUE" className="payment-form-label payment-form-label-required">Event Venue</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_COST(e.target.value)} />
                            <label htmlFor="EVENT_COST" className="payment-form-label payment-form-label-required">Event Cost</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_IMAGE(e.target.value)} />
                            <label htmlFor="EVENT_IMAGE" className="payment-form-label payment-form-label-required">Event Image URL</label>
                        </div>

                        <div className="payment-form-group">
                            <input type="text" required placeholder=" " className="payment-form-control" onChange={(e) => setEVENT_DESCRIPTION(e.target.value)} />
                            <label htmlFor="EVENT_DESCRIPTION" className="payment-form-label payment-form-label-required">Event Description</label>
                        </div>

                        <button type="submit" className="payment-form-submit-button"><i className="ri-wallet-line"></i> Host </button>
                    </form>

                        

                    </div>

                
                <div className="payment-right">
                    <div className="payment-header">
                        <div className="payment-header-icon"><i className="ri-flashlight-fill"></i></div>
                        <div className="payment-header-title">Welcome To Eventique</div>
                        <p className="payment-header-description">Please provide necessary details inorder to host your own event.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <ToastContainer />
    <br /><br /><br />
    </div>
  );
};
// aligned the layouts
export default CreateEvent;
