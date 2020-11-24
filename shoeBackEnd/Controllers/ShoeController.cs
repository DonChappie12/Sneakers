using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using shoeBackEnd.Models;

namespace shoeBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoeController : ControllerBase
    {
        private DataBaseContext _context;
        public ShoeController(DataBaseContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public ActionResult Get()
        {
            List<Shoe> shoes = _context.shoe.ToList();
            if(shoes == null)
                return NotFound("No shoes exist in DB");

            return Ok(shoes);

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            Shoe shoe = _context.shoe.SingleOrDefault(s => s.id == id);
            if(shoe == null)
                return NotFound("Shoe does not exist");
                
            return Ok(shoe);
        }

        [Authorize]
        [HttpPost("createShoe")]
        public ActionResult Post([FromBody]Shoe shoe)
        {
            // *** Only admin can post a new sneaker ***
            var id = Convert.ToInt32(HttpContext.User.Claims.First().Value);
            var result = _context.user.SingleOrDefault(u => u.id == id);

            if(result != null)
            {
                if(result.Role == "Admin")
                {
                    shoe.user_id = id;

                    _context.shoe.Add(shoe);
                    _context.SaveChanges();

                    return Ok(shoe);
                }
                else
                {
                    return BadRequest("You don't have permission for this");
                }
            }
            return BadRequest("You're not logged in");
        }

        [Authorize]
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Shoe newShoe)
        {
            Shoe updateShoe = _context.shoe.SingleOrDefault(shoe => shoe.id == id);
            if(updateShoe != null)
            {
                updateShoe.Name = newShoe.Name;
                updateShoe.Brand = newShoe.Brand;
                updateShoe.Price = newShoe.Price;
                updateShoe.Sex = newShoe.Sex;
                updateShoe.Description = newShoe.Description;

                // _context.Update(updateShoe);
                _context.SaveChanges();

                return Ok(updateShoe);
            }

            return NotFound("Shoe not found");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            Shoe deleteingShoe = _context.shoe.SingleOrDefault(x => x.id == id);
            if(deleteingShoe != null)
            {
                _context.Remove(deleteingShoe);
                _context.SaveChanges();

                return Ok(deleteingShoe);
            }

            return BadRequest("Shoe not found");
        }
    }
}