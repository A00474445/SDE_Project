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
        public int AMOUNT { get; set; }


        [DataType(DataType.Date)]
        public DateTime PAYMENT_DATE { get; set; } = DateTime.Now;


    }
}
