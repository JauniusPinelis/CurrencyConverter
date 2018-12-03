using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CurrencyConverter
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            
            routes.MapRoute(
               name: "GetCurrencies",
               url: "api/getCurrencies",
               defaults: new { controller = "Home", action = "GetCurrencies" }
           );
            routes.MapRoute(
              name: "Calculate",
              url: "api/calculate",
              defaults: new { controller = "Home", action = "Calculate" }
          );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
