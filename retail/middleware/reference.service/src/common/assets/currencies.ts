const currencies = {
    "EUR": {
        "name": "Euro",
        "country_code": "YT"
    },
    "AED": {
        "name": "UAE Dirham",
        "country_code": "AE"
    },
    "AFN": {
        "name": "Afghani",
        "country_code": "AF"
    },
    "XCD": {
        "name": "East Caribbean Dollar",
        "country_code": "VC"
    },
    "ALL": {
        "name": "Lek",
        "country_code": "AL"
    },
    "AMD": {
        "name": "Armenian Dram",
        "country_code": "AM"
    },
    "AOA": {
        "name": "Kwanza",
        "country_code": "AO"
    },
    "ARS": {
        "name": "Argentine Peso",
        "country_code": "AR"
    },
    "USD": {
        "name": "US Dollar",
        "country_code": "ZW"
    },
    "AUD": {
        "name": "Australian Dollar",
        "country_code": "ZW"
    },
    "AWG": {
        "name": "Aruban Florin",
        "country_code": "AW"
    },
    "AZN": {
        "name": "Azerbaijan Manat",
        "country_code": "AZ"
    },
    "BAM": {
        "name": "Convertible Mark",
        "country_code": "BA"
    },
    "BBD": {
        "name": "Barbados Dollar",
        "country_code": "BB"
    },
    "BDT": {
        "name": "Taka",
        "country_code": "BD"
    },
    "XOF": {
        "name": "CFA Franc BCEAO",
        "country_code": "TG"
    },
    "BGN": {
        "name": "Bulgarian Lev",
        "country_code": "BG"
    },
    "BHD": {
        "name": "Bahraini Dinar",
        "country_code": "BH"
    },
    "BIF": {
        "name": "Burundi Franc",
        "country_code": "BI"
    },
    "BMD": {
        "name": "Bermudian Dollar",
        "country_code": "BM"
    },
    "BND": {
        "name": "Brunei Dollar",
        "country_code": "BN"
    },
    "BOB": {
        "name": "Boliviano",
        "country_code": "BO"
    },
    "BOV": {
        "name": "Mvdol",
        "country_code": "BO"
    },
    "BRL": {
        "name": "Brazilian Real",
        "country_code": "BR"
    },
    "BSD": {
        "name": "Bahamian Dollar",
        "country_code": "BS"
    },
    "BTN": {
        "name": "Ngultrum",
        "country_code": "BT"
    },
    "INR": {
        "name": "Indian Rupee",
        "country_code": "ZW"
    },
    "NOK": {
        "name": "Norwegian Krone",
        "country_code": "SJ"
    },
    "BWP": {
        "name": "Pula",
        "country_code": "ZW"
    },
    "BYN": {
        "name": "Belarusian Ruble",
        "country_code": "BY"
    },
    "BZD": {
        "name": "Belize Dollar",
        "country_code": "BZ"
    },
    "CAD": {
        "name": "Canadian Dollar",
        "country_code": "CA"
    },
    "CDF": {
        "name": "Congolese Franc",
        "country_code": "CD"
    },
    "XAF": {
        "name": "CFA Franc BEAC",
        "country_code": "TD"
    },
    "CHE": {
        "name": "WIR Euro",
        "country_code": "CH"
    },
    "CHF": {
        "name": "Swiss Franc",
        "country_code": "LI"
    },
    "CHW": {
        "name": "WIR Franc",
        "country_code": "CH"
    },
    "NZD": {
        "name": "New Zealand Dollar",
        "country_code": "TK"
    },
    "CLF": {
        "name": "Unidad de Fomento",
        "country_code": "CL"
    },
    "CLP": {
        "name": "Chilean Peso",
        "country_code": "CL"
    },
    "CNY": {
        "name": "Yuan Renminbi",
        "country_code": "ZW"
    },
    "COP": {
        "name": "Colombian Peso",
        "country_code": "CO"
    },
    "CRC": {
        "name": "Costa Rican Colon",
        "country_code": "CR"
    },
    "CUC": {
        "name": "Peso Convertible",
        "country_code": "CU"
    },
    "CUP": {
        "name": "Cuban Peso",
        "country_code": "CU"
    },
    "CVE": {
        "name": "Cabo Verde Escudo",
        "country_code": "CV"
    },
    "ANG": {
        "name": "Netherlands Antillean Guilder",
        "country_code": "SX"
    },
    "CZK": {
        "name": "Czech Koruna",
        "country_code": "CZ"
    },
    "DJF": {
        "name": "Djibouti Franc",
        "country_code": "DJ"
    },
    "DKK": {
        "name": "Danish Krone",
        "country_code": "GL"
    },
    "DOP": {
        "name": "Dominican Peso",
        "country_code": "DO"
    },
    "DZD": {
        "name": "Algerian Dinar",
        "country_code": "EH"
    },
    "EGP": {
        "name": "Egyptian Pound",
        "country_code": "EG"
    },
    "MAD": {
        "name": "Moroccan Dirham",
        "country_code": "MA"
    },
    "MRU": {
        "name": "Ouguiya",
        "country_code": "MR"
    },
    "ERN": {
        "name": "Nakfa",
        "country_code": "ER"
    },
    "ETB": {
        "name": "Ethiopian Birr",
        "country_code": "ET"
    },
    "FJD": {
        "name": "Fiji Dollar",
        "country_code": "FJ"
    },
    "FKP": {
        "name": "Falkland Islands Pound",
        "country_code": "FK"
    },
    "GBP": {
        "name": "Pound Sterling",
        "country_code": "ZW"
    },
    "GEL": {
        "name": "Lari",
        "country_code": "GE"
    },
    "GHS": {
        "name": "Ghana Cedi",
        "country_code": "GH"
    },
    "GIP": {
        "name": "Gibraltar Pound",
        "country_code": "GI"
    },
    "GMD": {
        "name": "Dalasi",
        "country_code": "GM"
    },
    "GNF": {
        "name": "Guinean Franc",
        "country_code": "GN"
    },
    "GTQ": {
        "name": "Quetzal",
        "country_code": "GT"
    },
    "GYD": {
        "name": "Guyana Dollar",
        "country_code": "GY"
    },
    "HKD": {
        "name": "Hong Kong Dollar",
        "country_code": "HK"
    },
    "HNL": {
        "name": "Lempira",
        "country_code": "HN"
    },
    "HRK": {
        "name": "Kuna",
        "country_code": "HR"
    },
    "HTG": {
        "name": "Gourde",
        "country_code": "HT"
    },
    "HUF": {
        "name": "Forint",
        "country_code": "HU"
    },
    "IDR": {
        "name": "Rupiah",
        "country_code": "ID"
    },
    "ILS": {
        "name": "New Israeli Sheqel",
        "country_code": "PS"
    },
    "IQD": {
        "name": "Iraqi Dinar",
        "country_code": "IQ"
    },
    "IRR": {
        "name": "Iranian Rial",
        "country_code": "IR"
    },
    "ISK": {
        "name": "Iceland Krona",
        "country_code": "IS"
    },
    "JMD": {
        "name": "Jamaican Dollar",
        "country_code": "JM"
    },
    "JOD": {
        "name": "Jordanian Dinar",
        "country_code": "JO"
    },
    "JPY": {
        "name": "Yen",
        "country_code": "ZW"
    },
    "KES": {
        "name": "Kenyan Shilling",
        "country_code": "KE"
    },
    "KGS": {
        "name": "Som",
        "country_code": "KG"
    },
    "KHR": {
        "name": "Riel",
        "country_code": "KH"
    },
    "KMF": {
        "name": "Comorian Franc ",
        "country_code": "KM"
    },
    "KPW": {
        "name": "North Korean Won",
        "country_code": "KP"
    },
    "KRW": {
        "name": "Won",
        "country_code": "KR"
    },
    "KWD": {
        "name": "Kuwaiti Dinar",
        "country_code": "KW"
    },
    "KYD": {
        "name": "Cayman Islands Dollar",
        "country_code": "KY"
    },
    "KZT": {
        "name": "Tenge",
        "country_code": "KZ"
    },
    "LAK": {
        "name": "Lao Kip",
        "country_code": "LA"
    },
    "LBP": {
        "name": "Lebanese Pound",
        "country_code": "LB"
    },
    "LKR": {
        "name": "Sri Lanka Rupee",
        "country_code": "LK"
    },
    "LRD": {
        "name": "Liberian Dollar",
        "country_code": "LR"
    },
    "LSL": {
        "name": "Loti",
        "country_code": "LS"
    },
    "ZAR": {
        "name": "Rand",
        "country_code": "ZW"
    },
    "LYD": {
        "name": "Libyan Dinar",
        "country_code": "LY"
    },
    "MDL": {
        "name": "Moldovan Leu",
        "country_code": "MD"
    },
    "MGA": {
        "name": "Malagasy Ariary",
        "country_code": "MG"
    },
    "MKD": {
        "name": "Denar",
        "country_code": "MK"
    },
    "MMK": {
        "name": "Kyat",
        "country_code": "MM"
    },
    "MNT": {
        "name": "Tugrik",
        "country_code": "MN"
    },
    "MOP": {
        "name": "Pataca",
        "country_code": "MO"
    },
    "MUR": {
        "name": "Mauritius Rupee",
        "country_code": "MU"
    },
    "MVR": {
        "name": "Rufiyaa",
        "country_code": "MV"
    },
    "MWK": {
        "name": "Malawi Kwacha",
        "country_code": "MW"
    },
    "MXN": {
        "name": "Mexican Peso",
        "country_code": "MX"
    },
    "MYR": {
        "name": "Malaysian Ringgit",
        "country_code": "MY"
    },
    "MZN": {
        "name": "Mozambique Metical",
        "country_code": "MZ"
    },
    "NAD": {
        "name": "Namibia Dollar",
        "country_code": "NA"
    },
    "XPF": {
        "name": "CFP Franc",
        "country_code": "WF"
    },
    "NGN": {
        "name": "Naira",
        "country_code": "NG"
    },
    "NIO": {
        "name": "Cordoba Oro",
        "country_code": "NI"
    },
    "NPR": {
        "name": "Nepalese Rupee",
        "country_code": "NP"
    },
    "OMR": {
        "name": "Rial Omani",
        "country_code": "OM"
    },
    "PAB": {
        "name": "Balboa",
        "country_code": "PA"
    },
    "PEN": {
        "name": "Sol",
        "country_code": "PE"
    },
    "PGK": {
        "name": "Kina",
        "country_code": "PG"
    },
    "PHP": {
        "name": "Philippine Peso",
        "country_code": "PH"
    },
    "PKR": {
        "name": "Pakistan Rupee",
        "country_code": "PK"
    },
    "PLN": {
        "name": "Zloty",
        "country_code": "PL"
    },
    "PYG": {
        "name": "Guarani",
        "country_code": "PY"
    },
    "QAR": {
        "name": "Qatari Rial",
        "country_code": "QA"
    },
    "RON": {
        "name": "Romanian Leu",
        "country_code": "RO"
    },
    "RSD": {
        "name": "Serbian Dinar",
        "country_code": "RS"
    },
    "RUB": {
        "name": "Russian Ruble",
        "country_code": "RU"
    },
    "RWF": {
        "name": "Rwanda Franc",
        "country_code": "RW"
    },
    "SAR": {
        "name": "Saudi Riyal",
        "country_code": "SA"
    },
    "SBD": {
        "name": "Solomon Islands Dollar",
        "country_code": "SB"
    },
    "SCR": {
        "name": "Seychelles Rupee",
        "country_code": "SC"
    },
    "SDG": {
        "name": "Sudanese Pound",
        "country_code": "SD"
    },
    "SEK": {
        "name": "Swedish Krona",
        "country_code": "SE"
    },
    "SGD": {
        "name": "Singapore Dollar",
        "country_code": "SG"
    },
    "SHP": {
        "name": "Saint Helena Pound",
        "country_code": "SH"
    },
    "SLL": {
        "name": "Leone",
        "country_code": "SL"
    },
    "SOS": {
        "name": "Somali Shilling",
        "country_code": "SO"
    },
    "SRD": {
        "name": "Surinam Dollar",
        "country_code": "SR"
    },
    "SSP": {
        "name": "South Sudanese Pound",
        "country_code": "SS"
    },
    "STN": {
        "name": "Dobra",
        "country_code": "ST"
    },
    "SVC": {
        "name": "El Salvador Colon",
        "country_code": "SV"
    },
    "SYP": {
        "name": "Syrian Pound",
        "country_code": "SY"
    },
    "SZL": {
        "name": "Lilangeni",
        "country_code": "SZ"
    },
    "THB": {
        "name": "Baht",
        "country_code": "TH"
    },
    "TJS": {
        "name": "Somoni",
        "country_code": "TJ"
    },
    "TMT": {
        "name": "Turkmenistan New Manat",
        "country_code": "TM"
    },
    "TND": {
        "name": "Tunisian Dinar",
        "country_code": "TN"
    },
    "TOP": {
        "name": "Pa’anga",
        "country_code": "TO"
    },
    "TRY": {
        "name": "Turkish Lira",
        "country_code": "TR"
    },
    "TTD": {
        "name": "Trinidad and Tobago Dollar",
        "country_code": "TT"
    },
    "TWD": {
        "name": "New Taiwan Dollar",
        "country_code": "TW"
    },
    "TZS": {
        "name": "Tanzanian Shilling",
        "country_code": "TZ"
    },
    "UAH": {
        "name": "Hryvnia",
        "country_code": "UA"
    },
    "UGX": {
        "name": "Uganda Shilling",
        "country_code": "UG"
    },
    "USN": {
        "name": "US Dollar (Next day)",
        "country_code": "US"
    },
    "UYI": {
        "name": "Uruguay Peso en Unidades Indexadas (UI)",
        "country_code": "UY"
    },
    "UYU": {
        "name": "Peso Uruguayo",
        "country_code": "UY"
    },
    "UZS": {
        "name": "Uzbekistan Sum",
        "country_code": "UZ"
    },
    "VES": {
        "name": "Bolívar Soberano",
        "country_code": "VE"
    },
    "VND": {
        "name": "Dong",
        "country_code": "VN"
    },
    "VUV": {
        "name": "Vatu",
        "country_code": "VU"
    },
    "WST": {
        "name": "Tala",
        "country_code": "WS"
    },
    "YER": {
        "name": "Yemeni Rial",
        "country_code": "YE"
    },
    "ZMW": {
        "name": "Zambian Kwacha",
        "country_code": "ZM"
    }
}

export { currencies };