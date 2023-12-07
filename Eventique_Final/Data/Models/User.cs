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
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username must contain only letters, numbers, and underscores.")]
        public string? USER_NAME { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? USER_EMAIL { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", ErrorMessage = "Password must be at least 8 characters and include a lowercase letter, an uppercase letter, and a number.")]
        public string? USER_PASSWORD { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        [RegularExpression(@"^\+1\d{10}$", ErrorMessage = "Phone number must be a US or Canadian number in the format +1XXXXXXXXXX.")]
        public string? USER_PHONE { get; set; }


        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string? USER_ROLE { get; set; }


        [Required]
        [Column(TypeName = "int")]
        public int ISAPPROVED { get; set; } = 0;
    }
}
