using CurrencyConverter.Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CurrencyConverter.Controllers
{
    public class HomeController : Controller
    {
        private IEnumerable<Currency> data;
        private FunctionLibrary converter;

        public HomeController()
        {
            converter = new FunctionLibrary();
            data = converter.GetData();
        }

        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult GetData()
        {

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCurrencies()
        {
            var currencies = data.Select(c => c.Name).ToList<string>();
            return Json(currencies, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Calculate(string currencyFrom, string currencyTo, decimal amount)
        {
            var value = converter.GetConvertedValue(currencyFrom, currencyTo, amount);
            if (value != "")
            {
                return Json(value, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = "error", message = "Error happened while calculating conversion" });
            }
        }
    }
}