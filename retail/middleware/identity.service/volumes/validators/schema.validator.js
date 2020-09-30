exports.SCHEMA = [
  {
    name: "Document Class Code",
    type: "string",
    required: false,
  },
  {
    name: "Issuing State Code",
    type: "string",
    pattern: "^[A-Z]*$", // Regex: Only uppercase letter allowed
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      pattern: {
        errorCode: "IDT-1001",
        message: "Only uppercase letters allowed",
      },
    },
  },
  {
    name: "Document Number",
    type: "string",
    pattern: "^[a-zA-Z0-9]*$", // Regex for Alphanumeric
    required: true,
    groups: ["NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      required: {
        errorCode: "IDT-1024",
        message: "Document Number can't be blank",
      },
      pattern: {
        errorCode: "IDT-1023",
        message: "Only alphanumeric letters allowed",
      },
    },
  },
  {
    name: "Date Of Expiry",
    type: "string",
    format: "date", // Only date format valid: 1992-12-04
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      format: {
        errorCode: "IDT-1002",
        message: "Must be a valid date format YYYY-MM-DD",
      },
      required: {
        errorCode: "IDT-1004",
        message: "Date of expiry can't be blank",
      },
    },
  },
  {
    name: "Date Of Birth",
    type: "string",
    format: "date", // Only date format valid: 1992-12-04
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      format: {
        errorCode: "IDT-1002",
        message: "Must be a valid date format YYYY-MM-DD",
      },
      required: {
        errorCode: "IDT-1005",
        message: "Date of birth can't be blank",
      },
    },
  },
  {
    name: "Personal Number",
    type: "string",
    pattern: "^[0-9()-.s]+$", // Only string numbers are allowed
    required: true,
    groups: [""],
    context: {
      required: {
        errorCode: "IDT-1006",
        message: "Personal number can't be blank",
      },
      pattern: {
        errorCode: "IDT-1007",
        message: "Only number letters are allowed",
      },
    },
  },
  {
    name: "Surname",
    type: "string",
    pattern: "^[a-zA-Z][a-zA-Z\\s]*$", // Only letters and spaces are allowed
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      required: {
        errorCode: "IDT-1008",
        message: "Surname can't be blank",
      },
      pattern: {
        errorCode: "IDT-1009",
        message: "Only letters are allowed",
      },
    },
  },
  {
    name: "Given Names",
    type: "string",
    pattern: "^[a-zA-Z][a-zA-Z\\s]*$", // Only letters and spaces are allowed
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      required: {
        errorCode: "IDT-1010",
        message: "Given name can't be blank",
      },
      pattern: {
        errorCode: "IDT-1011",
        message: "Only letters are allowed",
      },
    },
  },
  {
    name: "Nationality",
    type: "string",
    pattern: "^[a-zA-Z][a-zA-Z\\s]*$", // Only letters and spaces are allowed
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      required: {
        errorCode: "IDT-1012",
        message: "Nationality can't be blank",
      },
      pattern: {
        errorCode: "IDT-1013",
        message: "Only letters are allowed",
      },
    },
  },
  {
    name: "Sex",
    type: "string",
    enum: ["M", "F"],
    required: true,
    groups: ["NATIONAL_ID_BACK_SIDE", "NATIONAL_ID_FRONT_SIDE", "PASSPORT"],
    context: {
      required: {
        errorCode: "IDT-9001",
        message: "Gender can't be blank",
      },
      enum: {
        errorCode: "IDT-9002",
        message: "Invalid gender value",
      },
    },
  },
  {
    name: "Surname And Given Names",
    type: "string",
    pattern: "^[a-zA-Z][a-zA-Z\\s]*$", // Only letters and spaces are allowed
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE"],
    context: {
      required: {
        errorCode: "IDT-1014",
        message: "Surname And Given Names can't be blank",
      },
      pattern: {
        errorCode: "IDT-1015",
        message: "Only letters are allowed",
      },
    },
  },
  {
    name: "Nationality Code",
    type: "string",
    pattern: "^[A-Z]*$", // Regex: Only uppercase letter allowed
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      required: {
        errorCode: "IDT-1016",
        message: "Nationality Code can't be blank",
      },
      pattern: {
        errorCode: "IDT-1017",
        message: "Only uppercase letters allowed",
      },
    },
  },
  {
    name: "Optional Data",
    type: "string",
    pattern: "^[a-zA-Z0-9]*$", // Regex for Alphanumeric
    required: true,
    groups: ["NATIONAL_ID_BACK_SIDE"],
    context: {
      required: {
        errorCode: "IDT-1018",
        message: "Optional Data can't be blank",
      },
      pattern: {
        errorCode: "IDT-1019",
        message: "Only alphanumeric letters allowed",
      },
    },
  },
  {
    name: "Issuing State Name",
    type: "string",
    pattern: "^[a-zA-Z][a-zA-Z\\s]*$", // Only letters and spaces are allowed
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE", "PASSPORT"],
    context: {
      required: {
        errorCode: "IDT-1020",
        message: `Issuing state name can't be blank`,
      },
      pattern: {
        errorCode: "IDT-1021",
        message: `Issuing state name only contains letters and spaces`,
      },
    },
  },
  {
    name: "Age",
    type: ["string", "integer"],
    pattern: "^[1-9][0-9]*$",
    minimum: 2,
    context: {
      required: {
        errorCode: "IDT-1022",
        message: "Age can't be blank",
      },
      pattern: {
        errorCode: "IDT-1023",
        message: "Age can't be blank",
      },
    },
    required: true,
    groups: ["NATIONAL_ID_FRONT_SIDE", "NATIONAL_ID_BACK_SIDE"],
  },
];
