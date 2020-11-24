using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using shoeBackEnd.Models;
using Microsoft.AspNetCore.Identity;

namespace shoeBackEnd.Controllers
{
    // ? Maybe these classes can be in it's own seperate file
    public class JwtPacket
    {
        public string Token { get; set; }
        public string FirstName { get; set; }
    }

    public class LoginData
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    /*** 
        JwtPacket will implement Model User (Not yet implemented)
        Will implement context for communication to DB
        CreateJwtPacket & Register will recieve parameter User object Models.User user
    */

    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private DataBaseContext _context;
        public AuthController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public ActionResult Register([FromBody]User user)
        {
            // TODO validate that email already exists
            // User tmp = _context.user.Where(e => e.Email == user.Email).FirstOrDefault();
            // if(tmp == null)
            //     return BadRequest("Email is in use. Try a different email");
            
            PasswordHasher<User> hash = new PasswordHasher<User>();
            user.Password = hash.HashPassword(user, user.Password);
            // *** Save a new entity to DB ***
            _context.user.Add(user);
            _context.SaveChanges();

            if(user.id == 1)
            {
                user.Role = "Admin";
            }
            else
            {
                user.Role = "Customer";
            }

            _context.SaveChanges();
            return Ok(CreateJwtPacket(user));
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginData logindata)
        {
            // *** Validates if user login in is in DB
            var Hasher = new PasswordHasher<User>();
            var user = _context.user.SingleOrDefault(u => u.Email == logindata.Email);
            if(user != null)
            {
                if(0 != Hasher.VerifyHashedPassword(user, user.Password, logindata.Password))
                {
                    return Ok(CreateJwtPacket(user));
                }
                return NotFound("Email and/or Password are incorrect");
            }

            return NotFound("Email and/or Password are incorrect");
        }

        // *** Implemented when login in and registering a user ***
        JwtPacket CreateJwtPacket(User user)
        {
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MY_KEY_THAT_IS_SECRET"));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(user.id))
            };

            var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signinCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JwtPacket { Token = encodedJwt, FirstName = user.FirstName };
        }
    }
}
