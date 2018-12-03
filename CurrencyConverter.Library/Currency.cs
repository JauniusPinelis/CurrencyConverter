using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyConverter.Library
{
    public class Currency
    {
        public string Name { get; set; }
        public decimal Rate { get; set; }
        public Currency(string name, decimal rate)
        {
            Name = name;
            Rate = rate;
        }

    }
}
