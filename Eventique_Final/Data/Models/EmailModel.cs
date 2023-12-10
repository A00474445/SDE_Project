using System.Collections.Generic;
using System.Net.Mail;


namespace Eventique_Final.Data.Models

{
    public class EmailModel
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
 
    }
}
