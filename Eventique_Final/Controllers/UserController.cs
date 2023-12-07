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
using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace Eventique_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }


        // User Signup with Validation and Password Hashing
        [HttpPost("signup")]
        public async Task<ActionResult<ApiResponse<User>>> SignUp(User user)
        {
            var response = new ApiResponse<User>();

            if (!ModelState.IsValid)
            {
                response.Success = false;
                response.Message = "Invalid model state.";
                response.Data = null;
                return Ok(response);
            }

            if (_context.Users.Any(u => u.USER_EMAIL == user.USER_EMAIL))
            {
                response.Success = false;
                response.Message = "Email already in use.";
                response.Data = null;
                return Ok(response);
            }

            user.USER_PASSWORD = HashPassword(user.USER_PASSWORD);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "User created successfully.";
            response.Data = user;

            return CreatedAtAction(nameof(GetUser), new { id = user.USER_ID }, response);
        }




        // User Login with Password Verification
        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<User>>> Login([FromBody] LoginRequest loginRequest)
        {
            var response = new ApiResponse<User>();

            if (string.IsNullOrWhiteSpace(loginRequest.USER_EMAIL) || string.IsNullOrWhiteSpace(loginRequest.USER_PASSWORD))
            {
                response.Success = false;
                response.Message = "Email and password are required.";
                response.Data = null;
                return Ok(response);
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.USER_EMAIL == loginRequest.USER_EMAIL);

            if (user == null || !VerifyPassword(loginRequest.USER_PASSWORD, user.USER_PASSWORD))
            {
                response.Success = false;
                response.Message = "Unauthorized - Invalid email or password.";
                response.Data = null;
                return Ok(response);
            }

            response.Success = true;
            response.Message = "Login successful.";
            response.Data = user;
            return Ok(response);
        }


        [HttpGet("logout")]
        public ActionResult<ApiResponse<object>> Logout()
        {
            var response = new ApiResponse<object>
            {
                Success = true,
                Message = "Logout successful.",
                Data = null
            };

            return Ok(response);
        }




        // Admin approval of user signup
        [HttpPost("approveuser/{id}")]
        public async Task<IActionResult> ApproveUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not Found.");
            }

            user.ISAPPROVED = 1;
            await _context.SaveChangesAsync();

            return Ok("User is Approved.");
        }



        // Get user by ID
        [HttpGet("fetchuser/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not Found.");
            }

            return user;
        }





        // Utility method for password hashing
        private string HashPassword(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Combine the salt and password bytes, and store them in the format "salt:hash"
            return $"{Convert.ToBase64String(salt)}:{hashed}";
        }





        // Utility method for password verification
        private bool VerifyPassword(string providedPassword, string storedHash)
        {
            // Extract the bytes
            string[] hashParts = storedHash.Split(':');
            if (hashParts.Length != 2)
            {
                return false; // The stored password hash format is incorrect
            }

            byte[] salt = Convert.FromBase64String(hashParts[0]);
            string storedHashValue = hashParts[1];

            // Hash the provided password with the same salt
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: providedPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Compare the results
            return hashed == storedHashValue;
        }



    }
}
