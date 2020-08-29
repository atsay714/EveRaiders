using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Flurl.Http;
using Newtonsoft.Json;

namespace EveRaiders.Bot.OCR
{
    public enum OCRSpaceLanguages
    {
        [Description("Czech")]
        ce,
        [Description("Danish")]
        dan,
        [Description("Dutch")]
        dut,
        [Description("English")]
        eng,
        [Description("Finnish")]
        fin,
        [Description("French")]
        fre,
        [Description("German")]
        ger,
        [Description("Hungarian")]
        hun,
        [Description("Italian")]
        ita,
        [Description("Norwegian")]
        nor,
        [Description("Polish")]
        pol,
        [Description("Portuguese")]
        por,
        [Description("Spanish")]
        spa,
        [Description("Swedish")]
        swe,
        [Description("Chinese Simplified")]
        chs,
        [Description("Greek")]
        gre,
        [Description("Japanese")]
        jpn,
        [Description("Russian")]
        rus,
        [Description("Turkish")]
        tur,
        [Description("Chinese Traditional")]
        cht,
        [Description("Korean")]
        kor
    }

    public class OCRSpace 
    {
        private const string APIURLFree = "https://api.ocr.space/parse/image";
        private const string ApiKey = "5cf4aa0d7e88957";

        public OCRSpaceLanguages Language { get; set; } = OCRSpaceLanguages.eng;
        public bool Overlay { get; set; }

        public OCRSpace(OCRSpaceLanguages language = OCRSpaceLanguages.eng, bool overlay = false)
        {
            Language = language;
            Overlay = overlay;
        }

        public async Task<OCRSpaceResponse> DoOCR(Uri uri)
        {
            var apiString = await $"https://api.ocr.space/parse/imageurl?apikey={ApiKey}&url={uri}&scale=true&OCREngine=2".GetJsonAsync<OCRSpaceResponse>();


            return apiString;
        }
    }

    public class OCRSpaceResponse
    {
        public List<OCRSpaceParsedResult> ParsedResults { get; set; }
        public int OCRExitCode { get; set; }
        public bool IsErroredOnProcessing { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }
        public string ProcessingTimeInMilliseconds { get; set; }
    }

    public class OCRSpaceParsedResult
    {
        public OCRSpaceTextOverlay TextOverlay { get; set; }
        public int FileParseExitCode { get; set; }
        public string ParsedText { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }
    }

    public class OCRSpaceTextOverlay
    {
        public List<OCRSpaceLine> Lines { get; set; }
        public bool HasOverlay { get; set; }
        public string Message { get; set; }
    }

    public class OCRSpaceLine
    {
        public List<OCRSpaceWord> Words { get; set; }
        public int MaxHeight { get; set; }
        public int MinTop { get; set; }
    }

    public class OCRSpaceWord
    {
        public string WordText { get; set; }
        public int Left { get; set; }
        public int Top { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
    }
}
