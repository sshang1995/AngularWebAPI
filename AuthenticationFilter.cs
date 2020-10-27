using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http.Controllers;
using WebAPI.Models;

namespace WebAPI
{
    public class AuthenticationFilter: System.Web.Http.Filters.ActionFilterAttribute
    {
        TMEntities db = new TMEntities();
        
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
            }
            else
            {
                string authenticationToken = actionContext.Request.Headers.Authorization.Parameter;
                string decodedToken = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));
                string userName = decodedToken.Substring(0, decodedToken.IndexOf(":"));
                string userPassword = decodedToken.Substring(decodedToken.IndexOf(":") + 1);

                User user = db.Users.Where(x => (x.Name == userName && x.Password == userPassword)).FirstOrDefault();

                if (user != null)
                {
                    //authorized
                }else
                {
                    actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
                }

            }
        }

    }
}