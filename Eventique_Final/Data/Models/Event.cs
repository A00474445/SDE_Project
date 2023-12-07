using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Eventique_Final.Data.Models
{
    public class Event
    {
        [Key]
        public int EVENT_ID { get; set; }


        [Required]
        public int HOST_USER_ID { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? EVENT_NAME { get; set; }


        [Required]
        [DataType(DataType.Date)]
        public DateTime EVENT_DATE { get; set; } = DateTime.Now;


        [Required]
        [MaxLength(15), Column(TypeName = "nvarchar(15)")]
        public string? EVENT_TIME { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? EVENT_CATEGORY { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? EVENT_VENUE { get; set; }


        [Required]
        public int EVENT_COST { get; set; }


        [Required]
        [MaxLength(500), Column(TypeName = "nvarchar(500)")]
        public string? EVENT_DESCRIPTION { get; set; }
    }
}
