using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace EveRaiders.Data.Extensions
{
    public static class StringExtensions
    {
        public static string RemoveWhitespace(this string str) {
            return string.Join("", str.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries));
        }


        public static string SplitCamelCase(this string input)
        {
            return string.Join(" ", input.SplitCamelCaseRegex());
        }

        private static IEnumerable<string> SplitCamelCaseRegex(this string input)
        {
            return Regex.Split(input, @"([A-Z]?[a-z]+)").Where(str => !string.IsNullOrEmpty(str));
        }
    }
}