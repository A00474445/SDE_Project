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
using System.Text.RegularExpressions;
using System.Net;
using System.Net.Mail;



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
            var errors = new List<string>();

            Regex specialCharsRegex = new Regex(@"^[a-zA-Z0-9_ ]+$");
            Regex numberRegex = new Regex(@"^[0-9]+$");
            Regex timeRegex = new Regex(@"^([01]?\d|2[0-3]):[0-5]\d$");


            if (!specialCharsRegex.IsMatch(@event.EVENT_NAME))
            {
                errors.Add("Event name must contain only letters, numbers, and underscores." + @event.EVENT_NAME);
            }

            if (!timeRegex.IsMatch(@event.EVENT_TIME))
            {
                errors.Add("Time must be in the format HH:MM.");
            }

            if (!specialCharsRegex.IsMatch(@event.EVENT_CATEGORY))
            {
                errors.Add("Event category must contain only letters, numbers, and underscores.");
            }

            if (!specialCharsRegex.IsMatch(@event.EVENT_VENUE))
            {
                errors.Add("Event venue must contain only letters, numbers, and underscores.");
            }

            if (@event.EVENT_COST < 0)
            {
                errors.Add("Event cost must be a non-negative number.");
            }

            if (!ModelState.IsValid || errors.Any())
            {
                response.Success = false;
                response.Message = "Invalid model state. " + (errors.Any() ? "Errors: " + string.Join(", ", errors) : "");
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



        [HttpPost("viewusereventsnotjoined")]  // Renamed route to reflect the new functionality
        public async Task<ActionResult<IEnumerable<Event>>> GetUserEventsNotJoined([FromBody] ViewUserEventsRequest request)
        {
            // Get a list of event IDs that the user has already joined or hosted
            var joinedOrHostedEventIds = await _context.UserEvents
                                                       .Where(ue => ue.USER_ID == request.USER_ID)
                                                       .Select(ue => ue.EVENT_ID)
                                                       .ToListAsync();

            // Add the events hosted by the user to the list
            joinedOrHostedEventIds.AddRange(await _context.Events
                                                          .Where(e => e.HOST_USER_ID == request.USER_ID)
                                                          .Select(e => e.EVENT_ID)
                                                          .ToListAsync());

            // Retrieve events that the user has not joined or hosted
            var eventsNotJoinedOrHosted = await _context.Events
                                                        .Where(e => !joinedOrHostedEventIds.Contains(e.EVENT_ID))
                                                        .ToListAsync();
            return eventsNotJoinedOrHosted;
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

        [HttpPost("deletevieweventData")]
        public async Task<ActionResult<IEnumerable<Event>>> DeleteViewEventDAta([FromBody] ViewUserEventsRequest request)
        {
            var hostedEvents = await _context.Events
                                             .Where(e => e.HOST_USER_ID == request.USER_ID)
                                             .FirstOrDefaultAsync();
            _context.Remove(hostedEvents);

            await _context.SaveChangesAsync();

            return Ok(hostedEvents);
        }



        [HttpPost("send")]
        public IActionResult SendEmail([FromBody] EmailModel emailModel)
        {
            try
            {
                using (var smtpClient = new SmtpClient("smtp.gmail.com"))
                {
                    smtpClient.Port = 587;
                    smtpClient.Credentials = new NetworkCredential("eventiqueproject@gmail.com", "cfnq yyim uilw lnqm");
                    smtpClient.EnableSsl = true;

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("eventiqueproject@gmail.com"), // Your email address
                        To = { new MailAddress(emailModel.To) },
                        Subject = emailModel.Subject,
                        Body = emailModel.Body,
                        IsBodyHtml = true, // Assuming the body is HTML, change if necessary
                    };

                    smtpClient.Send(mailMessage);
                }

                return Ok("Email sent successfully");
            }
            catch (System.Exception ex)
            {
                return BadRequest("Could not send email: " + ex.Message);
            }
        }


    }
}
