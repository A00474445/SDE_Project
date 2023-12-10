using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Eventique_Final.Data.Models
{
    public class Payment
    {
        
        [Key]
        public int PAYMENT_ID { get; set; }



        [Required]
        public int USER_ID { get; set; }



        [Required]
        public int EVENT_ID { get; set; }



        [Required]
        public string? FIRST_NAME { get; set; }



        [Required]
        public string? LAST_NAME { get; set; }



        [Required]
        [EmailAddress]
        public string? EMAIL { get; set; }


        [Required]
        public string? PHONE_NUMBER { get; set; }



        [Required]
        public string? CITY { get; set; }



        [Required]
        public string? STATE { get; set; }



        [Required]
        public string? COUNTRY { get; set; }



        [Required]
        public string? POSTAL_CODE { get; set; }



        [Required]
        public string? CREDIT_CARD_NAME { get; set; }



        [Required]
        public string? CREDIT_CARD_TYPE { get; set; }



        [Required]
        public string? CREDIT_CARD_NUMBER { get; set; }



        [Required]
        public string? CREDIT_CARD_EXPIRATION_DATE { get; set; }


        [Required]
        public int AMOUNT { get; set; }


        [Required]
        public string? LOGIN_CHECKIN_DATE { get; set; }


        [Required]
        public string? PAYMENT_CHECKOUT_DATE { get; set; }


    }
}
