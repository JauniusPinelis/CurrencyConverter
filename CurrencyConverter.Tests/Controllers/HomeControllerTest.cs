using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CurrencyConverter;
using CurrencyConverter.Controllers;
using CurrencyConverter.Library;
using System.IO;

namespace CurrencyConverter.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        FunctionLibrary library;
      
        public HomeControllerTest()
        {
            
        }

        [TestInitialize]
        public void SetUp()
        {
            library = new FunctionLibrary();
        }

        [TestMethod]
        public void CheckIfCalculateReturnCorrectValue1()
        {
            var output = library.Calculate("BTC", "BTC", 1);
            Assert.AreEqual("1", output.ToString());
        }

        [TestMethod]
        public void CheckIfCalculateReturnCorrectValue2()
        {
            var output = library.Calculate("BTC", "BTC", 0);
            Assert.AreEqual("0", output.ToString());
        }
        [TestMethod]
        public void TestToCheckIfFormattingIsCorrect1()
        {
            var output = library.GetConvertedValue("EUR", "USD", 11);
            Assert.AreEqual("13.587750002031368625", output.ToString());
        }
        [TestMethod]
        public void TestToCheckIfFormattingIsCorrect2()
        {
            var output = library.GetConvertedValue("ETH", "BTC", 2);
            Assert.AreEqual("0.196441355464149586", output.ToString());
        }

        [TestMethod]
        public void TestIfWrongCurrencyGivesAnError()
        {
            HomeController homeController = new HomeController();
            var json = homeController.Calculate("LIT", "BTC", 1) as JsonResult;

            var status = (string)(new PrivateObject(json.Data, "status")).Target;

            Assert.AreEqual("error", status);
        }

    }
}
