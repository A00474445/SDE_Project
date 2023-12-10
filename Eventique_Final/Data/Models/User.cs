using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eventique_Final.Data.Models
{
    public class User
    {
        [Key]
        public int USER_ID { get; set; }

        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? FULL_NAME { get; set; }

        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? USER_NAME { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? USER_EMAIL { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        [DataType(DataType.Password)]
        public string? USER_PASSWORD { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? USER_PHONE { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? USER_ROLE { get; set; }


        [Required]
        [Column(TypeName = "int")]
        public int ISAPPROVED { get; set; } = 0;
    }
}
