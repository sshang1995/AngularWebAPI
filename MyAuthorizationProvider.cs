using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using WebAPI.Models;

namespace WebAPI
{
    public class MyAuthorizationProvider: OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            TMEntities db = new TMEntities();
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            var loginuser = db.Users.Where(x => (x.Name == context.UserName && x.Password == context.Password)).FirstOrDefault();
            if (loginuser != null)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                identity.AddClaim(new Claim("username", "user"));
                identity.AddClaim(new Claim(ClaimTypes.Name, "user"));
                context.Validated(identity);

            } else
            {
                context.SetError("invalid grant", "Username and password is incorrect");
                return;
            }

            //if (context.UserName =="admin" && context.Password == "admin")
            //{
            //    identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
            //    identity.AddClaim(new Claim("username", "admin"));
            //    identity.AddClaim(new Claim(ClaimTypes.Name, "Admin"));
            //    context.Validated(identity);

            //}else if(context.UserName == "user" && context.Password == "user")
            //{
            //    identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
            //    identity.AddClaim(new Claim("username", "user"));
            //    identity.AddClaim(new Claim(ClaimTypes.Name, "SS"));
            //    context.Validated(identity);
            //}
            //else
            //{
            //    context.SetError("invalid grant", "Username and password is incorrect");
            //    return;
            //}
        }
    }
}