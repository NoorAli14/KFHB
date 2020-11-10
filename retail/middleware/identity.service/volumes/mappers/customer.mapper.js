// Sample Documents Object


// const documents = {
//     'NATIONAL_ID_FRONT_SIDE': {
//         "mrz": {
//             "Document Class Code": "IP",
//             "Issuing State Code": "IRL",
//             "Document Number": "X80856332",
//             "Date Of Expiry": "2020-04-26",
//             "Date Of Birth": "1975-12-09",
//             "Surname": "NI BHROIN",
//             "Given Names": "AOIBHEANN",
//             "Nationality": "IRI",
//             "Sex": "F",
//             "Surname And Given Names": "NI BHROIN AOIBHEANN",
//             "Nationality Code": "IRI",
//             "Issuing State Name": "Ireland",
//             "MRZ Strings": "IPIRLX808563324<<<<<<<<<<<<<<< 7512098F2004264IRI<<<<<<<<<<<0 NI<BHROIN<<AOIBHEANN<<<<<<<<<<",
//             "Document Number Check Digit": "4",
//             "Date Of Birth Check Digit": "8",
//             "Date Of Expiry Check Digit": "4",
//             "Final Check Digit": "0",
//             "MRZ Strings With Correct Check Sums": "IPIRLX808563324<<<<<<<<<<<<<<< 7512098F2004264IRI<<<<<<<<<<<0 NI<BHROIN<<AOIBHEANN<<<<<<<<<<",
//             "Age": "44",
//             "Remainder Term": "0"
//         },
//         "visualZone": {}
//     },
//     'NATIONAL_ID_BACK_SIDE': {
//         "mrz": {
//             "Document Class Code": "ID",
//             "Issuing State Code": "KWT",
//             "Document Number": "K23003455",
//             "Date Of Expiry": "2021-05-22",
//             "Date Of Birth": "1968-11-16",
//             "Surname": "SIMONE",
//             "Given Names": "HEIKO",
//             "Nationality": "Italy",
//             "Sex": "M",
//             "Surname And Given Names": "SIMONE HEIKO",
//             "Nationality Code": "ITA",
//             "Optional Data": "268111605659",
//             "Issuing State Name": "Kuwait",
//             "MRZ Strings": "IDKWTK230034550268111605659<<< 6811163M2105220ITA21081639<<<6 SIMONE<<HEIKO<<<<<<<<<<<<<<<<<",
//             "Document Number Check Digit": "0",
//             "Date Of Birth Check Digit": "3",
//             "Date Of Expiry Check Digit": "0",
//             "Final Check Digit": "6",
//             "MRZ Strings With Correct Check Sums": "IDKWTK230034550268111605659<<< 6811163M2105220ITA21081639<<<6 SIMONE<<HEIKO<<<<<<<<<<<<<<<<<",
//             "Age": "51",
//             "Line 2 Optional Data": "21081639",
//             "Remainder Term": "7"
//         },
//         "visualZone": {
//             "Serial Number": "9303087910",
//             "Line 2 Optional Data": "00000003"
//         }
//     },
//     PASSPORT: {
//         "mrz": {
//             "Document Class Code": "P",
//             "Issuing State Code": "PAK",
//             "Document Number": "BG0169351",
//             "Date Of Expiry": "2020-08-22",
//             "Date Of Birth": "1994-01-03",
//             "Personal Number": "3520272719351",
//             "Surname": "MAHMOOD",
//             "Given Names": "WAJAHAT MALIK",
//             "Nationality": "Pakistan",
//             "Sex": "M",
//             "Surname And Given Names": "MAHMOOD WAJAHAT MALIK",
//             "Nationality Code": "PAK",
//             "Optional Data": "3520272719351",
//             "Issuing State Name": "Pakistan",
//             "MRZ Strings": "P<PAKMAHMOOD<<WAJAHAT<MALIK<<<<<<<<<<<<<<<<< BG01693516PAK9401035M20082283520272719351<18",
//             "Document Number Check Digit": "6",
//             "Date Of Birth Check Digit": "5",
//             "Date Of Expiry Check Digit": "8",
//             "Final Check Digit": "8",
//             "MRZ Strings With Correct Check Sums": "P<PAKMAHMOOD<<WAJAHAT<MALIK<<<<<<<<<<<<<<<<< BG01693516PAK9401035M20082283520272719351<18",
//             "Age": "26",
//             "Optional Data Check Digit": "1",
//             "Remainder Term": "0"
//         },
//         "visualZone": {
//             "Document Class Code": "P",
//             "Issuing State Code": "PAK",
//             "Date Of Expiry": "2020-08-22",
//             "Date Of Issue": "2015-08-24",
//             "Date Of Birth": "1994-01-03",
//             "Place Of Birth": "MANAMA, BHR",
//             "Personal Number": "3520272719351",
//             "Surname": "MAHMOOD",
//             "Given Names": "WAJAHAT MALIK",
//             "Sex": "M",
//             "Authority": "PAKISTAN",
//             "Surname And Given Names": "MAHMOOD WAJAHAT MALIK",
//             "Issuing State Name": "Pakistan",
//             "Fathers Name": "YOUNUS, MALIK MAHMOOD",
//             "Tracking Number": "20301054877",
//             "Booklet Number": "C9361306",
//             "Age": "26",
//             "Remainder Term": "0"
//         }
//     },
//     'DRIVING_LICENSE': {
//         "mrz": {
//             "Document Class Code": "ID",
//             "Issuing State Code": "KWT",
//             "Document Number": "K23003455",
//             "Date Of Expiry": "2021-05-22",
//             "Date Of Birth": "1968-11-16",
//             "Surname": "SIMONE",
//             "Given Names": "HEIKO",
//             "Nationality": "Italy",
//             "Sex": "M",
//             "Surname And Given Names": "SIMONE HEIKO",
//             "Nationality Code": "ITA",
//             "Optional Data": "268111605659",
//             "Issuing State Name": "Kuwait",
//             "MRZ Strings": "IDKWTK230034550268111605659<<< 6811163M2105220ITA21081639<<<6 SIMONE<<HEIKO<<<<<<<<<<<<<<<<<",
//             "Document Number Check Digit": "0",
//             "Date Of Birth Check Digit": "3",
//             "Date Of Expiry Check Digit": "0",
//             "Final Check Digit": "6",
//             "MRZ Strings With Correct Check Sums": "IDKWTK230034550268111605659<<< 6811163M2105220ITA21081639<<<6 SIMONE<<HEIKO<<<<<<<<<<<<<<<<<",
//             "Age": "51",
//             "Line 2 Optional Data": "21081639",
//             "Remainder Term": "7"
//         },
//         "visualZone": {
//             "Serial Number": "9303087910",
//             "Line 2 Optional Data": "00000003"
//         }
//     }
// };

exports.mapper = (documents) => {
    const data = {
        first_name: documents['NATIONAL_ID_FRONT_SIDE']['mrz']['Surname'],
        middle_name: '',
        last_name: documents['NATIONAL_ID_FRONT_SIDE']['mrz']['Given Names'],
        gender: documents['PASSPORT']['mrz']['Sex'],
        date_of_birth: documents['PASSPORT']['mrz']['Date Of Birth'],
        national_id_no: documents['NATIONAL_ID_BACK_SIDE']['mrz']['Optional Data'],
        national_id_expiry: documents['NATIONAL_ID_BACK_SIDE']['mrz']['Date Of Expiry'],
        nationality: documents['NATIONAL_ID_BACK_SIDE']['mrz']['Nationality'],
        nationality_code: documents['NATIONAL_ID_BACK_SIDE']['mrz']['Nationality Code']
    };

    // if you want to throw any error then the resulting object will be look like this...
    // {
    // valid: false,
    //     errors: [{
    //         group: 'PASSPORT', // required: type of the document
    //         errorCode: "IDT-1017", // required: Unique error identifier code
    //         message: 'Only alphanumeric letters allowed', //Required: error descrptive message
    //         field: 'first_name', // Optional: name of the field
    //         value: 'Faiza@n', // Optional: value of the field,
    //          "stack": "instance[\"First Name\"] does not match pattern \"^[A-Z]*$\"",, // Optional: stack trace of the error
    //     }]
    // }
    return {
        valid: true,
        data: data
    }
}