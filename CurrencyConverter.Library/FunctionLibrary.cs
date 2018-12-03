using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace CurrencyConverter.Library
{
    public class FunctionLibrary
    {
        List<Currency> currencies;

        public FunctionLibrary()
        {
            var fileUrl = Path.GetDirectoryName(
                System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase) 
                + @"\\Resources\\data.csv";
            // Removing "file:\" from fileurl
            fileUrl = fileUrl.Substring(6);

            currencies = new List<Currency>();
            ImportData(fileUrl);
        }

        public void ImportData(string url)
        {

            using (TextFieldParser parser = new TextFieldParser(url))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
                while (!parser.EndOfData)
                {
                    //Process row
                    string[] fields = parser.ReadFields();
                    decimal rate;
                    if (fields.Length == 2 && Decimal.TryParse(fields[1], out rate))
                    {
                        currencies.Add(new Currency(fields[0], rate));
                    }
                }
            }
        }

        public List<Currency> GetData()
        {
            return currencies;
        }

        public decimal Calculate(string currencyFrom, string currencyTo, decimal amount)
        {
            var rateFrom = currencies.Find(c => c.Name == currencyFrom);
            var rateTo = currencies.Find(c => c.Name == currencyTo);

            if (rateFrom != null && rateTo != null)
            {
                return
                    amount * rateFrom.Rate / rateTo.Rate;
            }
            else
            {
                return 0;
            }
        }

        public string FormatOutput(decimal input)
        {
            // Formatting 18 digits after the separator
            var output = input != 0 ? String.Format("{0:0.##################}", input) : "";
            return output;
        }

        public string GetConvertedValue(string currencyFrom, string currencyTo, decimal amount)
        {
            return FormatOutput(Calculate(currencyFrom, currencyTo, amount));
        }
    }
}
