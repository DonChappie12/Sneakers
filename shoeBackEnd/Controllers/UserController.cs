using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using shoeBackEnd.Models;
using Microsoft.AspNetCore.Identity;

namespace shoeBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private DataBaseContext _context;
        public UserController(DataBaseContext context)
        {
            _context = context;
        }

        [Authorize]
        // GET api/values
        [HttpGet("allUsers")]
        public ActionResult GetAllUsers()
        {
            var result = GetSecureUser();

            if(result != null)
            {
                if(result.Role == "Admin")
                {
                    List<User> users = _context.user.ToList();
                    return Ok(users);
                }
                return BadRequest("You don't have these permissions");
            }

            return NotFound("User not found");
        }

        [Authorize]
        // GET api/values
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            var result = GetSecureUser();
            var user = _context.user.SingleOrDefault(u => u.id == Convert.ToInt32(id));
            if(result != null)
            {
                if(user != null)
                    return Ok(user);
            }

            return NotFound("User not found");
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult Get()
        {
            // *** Can get User from back end but not on front end ***
            return Ok(GetSecureUser());
        }

        [Authorize]
        [HttpPost("me")]
        public ActionResult Post()
        {
            // TODO User posts update personal info
            // var user = GetSecureUser()
            // *** double ? validates that if profileDate.FirstName is null it will revert back to user.FirstName
            // user.FirstName = profileDate.FirstName ?? user.FirstName
            // user.LastName = profileDate.LastName ?? user.LastName
            // _context.SaveChanges()
            // return ok(user);
            return Ok("Secure");
        }

        // POST api/values
        [Authorize]
        [HttpPost("create")]
        public ActionResult CreateUser([FromBody]User newUser)
        {
            var result = GetSecureUser();

            if(result != null)
            {
                if(result.Role == "Admin")
                {
                    PasswordHasher<User> hash = new PasswordHasher<User>();
                    newUser.Password = hash.HashPassword(newUser, newUser.Password);

                    _context.user.Add(newUser);
                    _context.SaveChanges();

                    return Ok(newUser);
                }

                return BadRequest("You don't have permissions for this");
            }

            return NotFound("User doesn't exist");
        }

        // PUT api/values/5
        [Authorize]
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]User user)
        {
            var result = GetSecureUser();

            if(result != null)
            {
                User editUser = _context.user.SingleOrDefault(eu => eu.id == id);
                if(editUser != null)
                {
                    PasswordHasher<User> hash = new PasswordHasher<User>();
                    user.Password = hash.HashPassword(user, user.Password);
                    // TODO verify why double ? doesn't work when no input is made
                    // editUser.FirstName = user.FirstName ?? editUser.FirstName;
                    // editUser.LastName = user.LastName ?? editUser.LastName;
                    // editUser.Email = user.Email ?? editUser.Email;
                    // editUser.Password = user.Password ?? editUser.Password;
                    // editUser.Role = user.Role ?? editUser.Role;

                    editUser.FirstName = user.FirstName;
                    editUser.LastName = user.LastName;
                    editUser.Email = user.Email;
                    editUser.Password = user.Password;
                    editUser.Role = user.Role;

                    _context.SaveChanges();
                    return Ok(editUser);
                }

                return BadRequest("You don't have permissions for this");
            }

            return NotFound("User doesn't exist");
        }

        [Authorize]
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = GetSecureUser();

            if(user != null)
            {
                if(user.Role == "Admin")
                {
                    User deleteUser = _context.user.SingleOrDefault(del => del.id == id);

                    _context.Remove(deleteUser);
                    _context.SaveChanges();

                    return Ok(deleteUser);
                }

                return BadRequest("You don't have permissions for this");
            }

            return NotFound("User doesn't exist");
        }

        Models.User GetSecureUser()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.First().Value);
            return _context.user.SingleOrDefault(u => u.id == id);
        }

    }
}
