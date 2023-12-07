using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Eventique_Final.Data.Models
{
    public class User_Event
    {
        [Key]
        public int USER_EVENT_ID { get; set; }


        [Required]
        public int USER_ID { get; set; }


        [Required]
        public int EVENT_ID { get; set; }

    }
}
