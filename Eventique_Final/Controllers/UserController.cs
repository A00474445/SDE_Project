﻿using System;
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
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

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

            var errors = new List<string>();

            // Custom validation for USER_PHONE
            Regex phoneRegex = new Regex(@"^\+1\d{10}$");
            if (!phoneRegex.IsMatch(user.USER_PHONE))
            {
                errors.Add("Phone number must be a US or Canadian number in the format +1XXXXXXXXXX.");
            }

            // Custom validation for USER_PASSWORD
            Regex passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$");
            if (!passwordRegex.IsMatch(user.USER_PASSWORD))
            {
                errors.Add("Password must be at least 8 characters and include a lowercase letter, an uppercase letter, and a number.");
            }

            // Custom validation for USER_NAME
            Regex usernameRegex = new Regex(@"^[a-zA-Z0-9_]+$");
            if (!usernameRegex.IsMatch(user.USER_NAME))
            {
                errors.Add("Username must contain only letters, numbers, and underscores.");
            }

            // Custom validation for USER_EMAIL
            if (!new EmailAddressAttribute().IsValid(user.USER_EMAIL))
            {
                errors.Add("Invalid email format.");
            }

            // Check if there are any errors
            if (errors.Any())
            {
                response.Success = false;
                response.Message = "Invalid Model State. Errors: " + string.Join(", ", errors);
                response.Data = null;
                return Ok(response); // You can choose to return Ok or another status code
            }

            if (_context.Users.Any(u => u.USER_EMAIL == user.USER_EMAIL))
            {
                response.Success = false;
                response.Message = "Email Already in Use.";
                response.Data = null;
                return Ok(response);
            }

            user.USER_PASSWORD = HashPassword(user.USER_PASSWORD);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "User Created Successfully.";
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
                response.Message = "Unauthorized - Invalid Email or Password.";
                response.Data = null;
                return Ok(response);
            }

            response.Success = true;
            response.Message = "Login Successful.";
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
                //logout response
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



        // Get user by email
        [HttpGet("fetchuser/{USER_EMAIL}")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var user = await _context.Users.FindAsync(email);

            if (user == null)
            {
                return NotFound("User not Found.");
            }

            return user;
        }

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
