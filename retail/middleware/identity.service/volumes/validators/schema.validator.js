const getSchema = () => {
  return [
    {
      name: 'Issuing State Code',
      type: 'string',
      pattern: '^[A-Z]*$', // Regex: Only uppercase letter allowed
      groups: ['NATIONAL_ID_FRONT_SIDE', 'NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      required: true,
      context: {
        pattern: {
          errorCode: 'IDT-1001',
          message: 'Only uppercase letters allowed',
        },
        required: {
          errorCode: 'IDT-1041',
          message: "Issuing State Code can't be blank",
        },
      },
    },
    {
      name: 'Document Number',
      type: 'string',
      pattern: '^[a-zA-Z0-9]*$', // Regex for Alphanumeric
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        required: {
          errorCode: 'IDT-1024',
          message: "Document Number can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1023',
          message: 'Only alphanumeric letters allowed',
        },
      },
    },
    // Not in case of UAE Front Side.
    {
      name: 'Date Of Expiry',
      type: 'string',
      format: 'date', // Only date format valid: 1992-12-04
      required: true,
      groups: ['NATIONAL_ID_FRONT_SIDE', 'NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        format: {
          errorCode: 'IDT-1002',
          message: 'Must be a valid date format YYYY-MM-DD',
        },
        required: {
          errorCode: 'IDT-1004',
          message: "Date of expiry can't be blank",
        },
      },
    },

    // In case of Kuwait, DOB will be on front side.
    {
      name: 'Date Of Birth',
      type: 'string',
      format: 'date', // Only date format valid: 1992-12-04
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        format: {
          errorCode: 'IDT-1002',
          message: 'Must be a valid date format YYYY-MM-DD',
        },
        required: {
          errorCode: 'IDT-1005',
          message: "Date of birth can't be blank",
        },
      },
    },
    // Personal Number Only will Come for Bahrain and Kuwait

    {
      name: 'Personal Number',
      type: 'string',
      pattern: '^[0-9()-.s]+$', // Only string numbers are allowed
      required: true,
      groups: [],
      context: {
        required: {
          errorCode: 'IDT-1006',
          message: "Personal number can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1007',
          message: 'Only number letters are allowed',
        },
      },
    },
    {
      name: 'Surname',
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z\\s]*$', // Only letters and spaces are allowed
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        required: {
          errorCode: 'IDT-1008',
          message: "Surname can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1009',
          message: 'Only letters are allowed',
        },
      },
    },
    {
      name: 'Given Names',
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z\\s]*$', // Only letters and spaces are allowed
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        required: {
          errorCode: 'IDT-1010',
          message: "Given name can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1011',
          message: 'Only letters are allowed',
        },
      },
    },
    {
      name: 'Nationality',
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z\\s]*$', // Only letters and spaces are allowed
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        required: {
          errorCode: 'IDT-1012',
          message: "Nationality can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1013',
          message: 'Only letters are allowed',
        },
      },
    },
    {
      name: 'Sex',
      type: 'string',
      enum: ['M', 'F'],
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        required: {
          errorCode: 'IDT-9001',
          message: "Gender can't be blank",
        },
        enum: {
          errorCode: 'IDT-9002',
          message: 'Invalid gender value',
        },
      },
    },

    // In case of Bahrain, it's on FrontSide
    {
      name: 'Surname And Given Names',
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z\\s]*$', // Only letters and spaces are allowed
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'NATIONAL_ID_FRONT_SIDE'],
      context: {
        required: {
          errorCode: 'IDT-1014',
          message: "Surname And Given Names can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1015',
          message: 'Only letters are allowed',
        },
      },
    },
    {
      name: 'Nationality Code',
      type: 'string',
      pattern: '^[A-Z]*$', // Regex: Only uppercase letter allowed
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        required: {
          errorCode: 'IDT-1016',
          message: "Nationality Code can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1017',
          message: 'Only uppercase letters allowed',
        },
      },
    },
    // Only Comes in case of Kuwait and UAE.

    {
      name: 'Optional Data',
      type: 'string',
      pattern: '^[a-zA-Z0-9]*$', // Regex for Alphanumeric
      required: true,
      groups: [],
      context: {
        required: {
          errorCode: 'IDT-1018',
          message: "Optional Data can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1019',
          message: 'Only alphanumeric letters allowed',
        },
      },
    },

    // In Case Of Bahrain & Kuwait, it's on Front Side.
    {
      name: 'Issuing State Name',
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z\\s]*$', // Only letters and spaces are allowed
      required: true,
      groups: ['NATIONAL_ID_FRONT_SIDE', 'NATIONAL_ID_BACK_SIDE', 'PASSPORT'],
      context: {
        required: {
          errorCode: 'IDT-1020',
          message: `Issuing state name can't be blank`,
        },
        pattern: {
          errorCode: 'IDT-1021',
          message: `Issuing state name only contains letters and spaces`,
        },
      },
    },
    {
      name: 'Age',
      type: ['string', 'integer'],
      pattern: '^[1-9][0-9]*$',
      minimum: 2,
      context: {
        required: {
          errorCode: 'IDT-1022',
          message: "Age can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1023',
          message: "Age can't be blank",
        },
      },
      required: true,
      groups: ['NATIONAL_ID_BACK_SIDE'],
    },
    {
      name: 'Identity Card Number',
      type: 'string',
      pattern: '^[0-9()-.s]+$', // Only string numbers are allowed
      required: true,
      groups: [],
      context: {
        required: {
          errorCode: 'IDT-1033',
          message: "Identity Card Number can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1034',
          message: 'Only number letters are allowed',
        },
      },
    },
    {
      name: 'Passport Number',
      type: 'string',
      pattern: '^[a-zA-Z0-9]*$', // Regex for Alphanumeric
      required: true,
      groups: [],
      context: {
        required: {
          errorCode: 'IDT-1035',
          message: "Passport Number can't be blank",
        },
        pattern: {
          errorCode: 'IDT-1036',
          message: 'Only alphanumeric letters are allowed',
        },
      },
    },
  ];
};

exports.SCHEMA = (group, processedData) => {
  console.log(`Start Validating -> #${group}`);
  console.log(`Processed Data is -> ${JSON.stringify(processedData, null, 2)}`);
  let schema = getSchema();
  if (group === 'NATIONAL_ID_FRONT_SIDE') {
    if (processedData['Issuing State Code'] === 'OMN') {
      const document_number = schema.find(s => s.name === 'Document Number');
      document_number.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const age = schema.find(s => s.name === 'Age');
      age.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const date_of_birth = schema.find(s => s.name === 'Date Of Birth');
      date_of_birth.groups = ['NATIONAL_ID_FRONT_SIDE'];

      schema = schema.filter(s => s.name != 'Surname And Given Names');
    } else if (processedData['Issuing State Code'] === 'BHR') {
      const personal_number = schema.find(s => s.name === 'Personal Number');
      personal_number.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const nationality = schema.find(s => s.name === 'Nationality');
      nationality.groups = ['NATIONAL_ID_FRONT_SIDE'];
    } else if (processedData['Issuing State Code'] === 'ARE') {
      schema = schema.filter(s => s.name != 'Date Of Expiry');

      const idNumber = schema.find(s => s.name === 'Identity Card Number');
      idNumber.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const nationality = schema.find(s => s.name === 'Nationality');
      nationality.groups = ['NATIONAL_ID_FRONT_SIDE'];
    } else if (processedData['Issuing State Code'] === 'KWT') {
      const personal_number = schema.find(s => s.name === 'Personal Number');
      personal_number.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const date_of_birth = schema.find(s => s.name === 'Date Of Birth');
      date_of_birth.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const nationality = schema.find(s => s.name === 'Nationality');
      nationality.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const sex = schema.find(s => s.name === 'Sex');
      sex.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const age = schema.find(s => s.name === 'Age');
      age.groups = ['NATIONAL_ID_FRONT_SIDE'];

      const passport_number = schema.find(s => s.name === 'Passport Number');
      passport_number.groups = ['NATIONAL_ID_FRONT_SIDE'];
    }
  } else if (group === 'NATIONAL_ID_BACK_SIDE') {
    if (processedData['Issuing State Code'] === 'OMN') {
      // Some Conditions
    } else if (processedData['Issuing State Code'] === 'BHR') {
      // Some Conditions
    } else if (processedData['Issuing State Code'] === 'ARE') {
      const optional_data = schema.find(s => s.name === 'Optional Data');
      optional_data.groups = ['NATIONAL_ID_BACK_SIDE'];
    } else if (processedData['Issuing State Code'] === 'KWT') {
      const optional_data = schema.find(s => s.name === 'Optional Data');
      optional_data.groups = ['NATIONAL_ID_BACK_SIDE'];
    }
  }
  const _schema = schema.filter(s => s.groups.includes(group));
  console.log(JSON.stringify(_schema, null, 2));
  return _schema;
};