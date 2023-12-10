using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventique_Final.Data;
using Eventique_Final.Data.Models;
using System.Text.RegularExpressions;

namespace Eventique_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaymentController(AppDbContext context)
        {
            _context = context;
        }


        // User makes a payment
        [HttpPost("makepayment")]
        public async Task<ActionResult<Payment>> MakePayment(Payment payment)
        {

            Regex phoneRegex = new Regex(@"^\+1\d{10}$");
            if (!phoneRegex.IsMatch(payment.PHONE_NUMBER))
                return Ok("Phone number must be a US or Canadian number in the format +1XXXXXXXXXX.");

            if (!IsCheckoutDateValid(payment.LOGIN_CHECKIN_DATE, payment.PAYMENT_CHECKOUT_DATE))
                return Ok("Checkout date must be greater than check-in date.");

            var invalidFields = FindInvalidFields(
                ("FIRST_NAME", payment.FIRST_NAME),
                ("LAST_NAME", payment.LAST_NAME),
                ("CITY", payment.CITY),
                ("STATE", payment.STATE),
                ("CREDIT_CARD_NAME", payment.CREDIT_CARD_NAME));

            if (invalidFields.Any())
            {
                return Ok($"Invalid characters found in the following field(s): {string.Join(", ", invalidFields)}.");
            }

            string validationMessage = GetCountryValidationMessage(payment.COUNTRY, payment.POSTAL_CODE);
            if (validationMessage != null)
            {
                return Ok(validationMessage);
            }

            string validationCCMessage = GetCreditCardValidationMessage(payment.CREDIT_CARD_TYPE, payment.CREDIT_CARD_NUMBER, payment.CREDIT_CARD_EXPIRATION_DATE);
            if (validationCCMessage != null)
            {
                return Ok(validationCCMessage);
            }

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayment), new { id = payment.PAYMENT_ID }, new { payment = payment, message = "Payment Successful" });

        }

        private bool IsCheckoutDateValid(string checkinDateString, string checkoutDateString)
        {
            var format = "dd/MM/yyyy";
            var provider = System.Globalization.CultureInfo.InvariantCulture;

            if (DateTime.TryParseExact(checkinDateString, format, provider, System.Globalization.DateTimeStyles.None, out DateTime checkinDate) &&
                DateTime.TryParseExact(checkoutDateString, format, provider, System.Globalization.DateTimeStyles.None, out DateTime checkoutDate))
            {
                return checkoutDate >= checkinDate;
            }
            else
            {
                // Handle the case where the date strings are not in a valid format
                return false;
            }
        }


        private List<string> FindInvalidFields(params (string FieldName, string FieldValue)[] fields)
        {
            var invalidCharsPattern = @"[;:!@#$%^*+?\\/<>\d]";
            var invalidFields = new List<string>();

            foreach (var field in fields)
            {
                if (Regex.IsMatch(field.FieldValue, invalidCharsPattern))
                {
                    invalidFields.Add(field.FieldName);
                }
            }

            return invalidFields;
        }

        private string GetCountryValidationMessage(string country, string postalCode)
        {
            if (country != "Canada" && country != "US")
                return "Invalid country. Only Canada and US are accepted.";

            if (country == "Canada" && !IsValidCanadianPostalCode(postalCode))
                return "Invalid Canadian postal code.";

            if (country == "US" && !IsValidUSZipCode(postalCode))
                return "Invalid US zip code.";

            return null; // No error
        }

        private bool IsValidCanadianPostalCode(string postalCode)
        {
            // Canadian Postal Code regex
            return Regex.IsMatch(postalCode, @"^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] ?\d[ABCEGHJKLMNPRSTVWXYZ]\d$");
        }

        private bool IsValidUSZipCode(string zipCode)
        {
            // US ZIP Code regex
            return Regex.IsMatch(zipCode, @"^\d{5}(?:[-\s]\d{4})?$");
        }

        private string GetCreditCardValidationMessage(string cardType, string cardNumber, string expirationDate)
        {
            if (!IsExpirationDateValid(expirationDate))
                return "Your Credit Card has Expired";

            switch (cardType)
            {
                case "MasterCard":
                    if (!IsMasterCardValid(cardNumber))
                        return "Invalid MasterCard number.";
                    break;
                case "Visa":
                    if (!IsVisaCardValid(cardNumber))
                        return "Invalid Visa card number.";
                    break;
                case "American Express":
                    if (!IsAmericanExpressValid(cardNumber))
                        return "Invalid American Express card number.";
                    break;
                default:
                    return "Invalid card type.";
            }

            return null; // No error
        }

        private bool IsExpirationDateValid(string expirationDate)
        {
            
            bool isValid = Regex.IsMatch(expirationDate, @"^(0[1-9]|1[0-2])\/(201[6-9]|202[0-9]|2031)$");
            return isValid;
        }


        private bool IsMasterCardValid(string cardNumber)
        {
            // MasterCard regex
            return Regex.IsMatch(cardNumber, @"^5[1-5][0-9]{14}$");
        }

        private bool IsVisaCardValid(string cardNumber)
        {
            // Visa card regex
            return Regex.IsMatch(cardNumber, @"^4[0-9]{12}(?:[0-9]{3})?$");
        }

        private bool IsAmericanExpressValid(string cardNumber)
        {
            // American Express regex
            return Regex.IsMatch(cardNumber, @"^3[47][0-9]{13}$");
        }



        // Get payment by ID
        [HttpGet("viewpayment/{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
        }

    }
}
