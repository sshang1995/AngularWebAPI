using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI;
using WebAPI.Data;
using WebAPI.Models;

namespace TaskManagement.Controllers
{
    
    public class UsersController : ApiController
    {
        //private UserContext db = new UserContext();
        private TMEntities db = new TMEntities();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {

            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string name)
        {
            User user = db.Users.Where(x => (x.Name == name)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //GET: api/users/name and password
        
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUserLogin(string name, string password)
        {
            User user = db.Users.Where(x => (x.Name == name && x.Password == password )).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //GET: api/users/name or email 
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUserExist(string name, string email)
        {
            User user = db.Users.Where(x => (x.Name == name || x.Email == email)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(string name, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (name != user.Name)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(name))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { name = user.Name }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(string name)
        {
            User user = db.Users.Where(x => (x.Name == name)).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string name)
        {
            return db.Users.Count(e => e.Name == name) > 0;
        }
    }
}