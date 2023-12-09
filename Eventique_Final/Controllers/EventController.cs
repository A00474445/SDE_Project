using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventique_Final.Data;
using Eventique_Final.Data.Models;
using System.Threading.Tasks;
using System.Linq;


namespace Eventique_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventController(AppDbContext context)
        {
            _context = context;
        }



        // User creates an event
        [HttpPost("createevent")]
        public async Task<ActionResult<ApiResponse<Event>>> CreateEvent([FromBody] Event @event)
        {
            var response = new ApiResponse<Event>();

            if (!ModelState.IsValid)
            {
                response.Success = false;
                response.Message = "Invalid model state.";
                response.Data = null;
                return Ok(response);
            }

            // Check if an event with the same name already exists
            bool eventExists = await _context.Events.AnyAsync(e => e.EVENT_NAME == @event.EVENT_NAME);
            if (eventExists)
            {
                response.Success = false;
                response.Message = "An event with the same name already exists.";
                response.Data = null;
                return Ok(response);
            }

            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "Event created successfully.";
            response.Data = @event;

            return CreatedAtAction("GetEvent", new { id = @event.EVENT_ID }, response);
        }




        // User joins an event
        [HttpPost("joinevent")]
        public async Task<ActionResult<ApiResponse<User_Event>>> JoinEvent([FromBody] JoinEventRequest request)
        {
            var response = new ApiResponse<User_Event>();

            // Check if the user is the host of the event
            var eventEntity = await _context.Events.FindAsync(request.EVENT_ID);
            if (eventEntity != null && eventEntity.HOST_USER_ID == request.USER_ID)
            {
                response.Success = false;
                response.Message = "The host of the event cannot join as a participant.";
                response.Data = null;
                return Ok(response);
            }

            // Check if the user has already joined the event
            bool alreadyJoined = await _context.UserEvents
                                               .AnyAsync(ue => ue.USER_ID == request.USER_ID && ue.EVENT_ID == request.EVENT_ID);
            if (alreadyJoined)
            {
                response.Success = false;
                response.Message = "User has already joined this event.";
                response.Data = null;
                return Ok(response);
            }

            var userEvent = new User_Event
            {
                USER_ID = request.USER_ID,
                EVENT_ID = request.EVENT_ID
            };

            _context.UserEvents.Add(userEvent);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "User joined the event successfully.";
            response.Data = userEvent;

            return Ok(response);
        }





        // View all events
        [HttpGet("viewallevents")]
        public async Task<ActionResult<IEnumerable<Event>>> GetAllEvents()
        {
            return await _context.Events.ToListAsync();
        }



        // View events specific to a user
        [HttpPost("viewuserevents")]  // Changed to POST since we are using request body
        public async Task<ActionResult<IEnumerable<Event>>> GetUserEvents([FromBody] ViewUserEventsRequest request)
        {
            var events = await _context.UserEvents
                                       .Where(ue => ue.USER_ID == request.USER_ID)
                                       .Join(_context.Events,
                                             ue => ue.EVENT_ID,
                                             e => e.EVENT_ID,
                                             (ue, e) => e)
                                       .ToListAsync();
            return events;
        }// updated a fix

        [HttpPost("viewhostedevents")]  // POST method since we are using request body
        public async Task<ActionResult<IEnumerable<Event>>> GetUserHostedEvents([FromBody] ViewUserEventsRequest request)
        {
            var hostedEvents = await _context.Events
                                             .Where(e => e.HOST_USER_ID == request.USER_ID)
                                             .ToListAsync();

            return hostedEvents;
        }


        [HttpPost("vieweventData")]
        public async Task<ActionResult<Event>> GetEventDetails([FromBody] ViewEventDetailsRequest request)
        {
            var eventDetails = await _context.Events
                                             .FirstOrDefaultAsync(e => e.EVENT_ID == request.EVENT_ID);

            if (eventDetails == null)
            {
                return NotFound();
            }

            return eventDetails;
        }


    }
}
