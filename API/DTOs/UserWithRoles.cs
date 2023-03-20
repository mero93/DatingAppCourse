using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserWithRoles
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string[] Roles { get; set; } = Array.Empty<string>();
    }
}