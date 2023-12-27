// ---------------------------------------
// Months of Data to use in Charts
// ---------------------------------------
export var months_to_show = 9;


// ------------------------------------------------
// Calculate Monthly Percent Change for a Column
// -------------------------------------------------

export function calculatePercentageChange(dataset) {
    const data = dataset.data; // Assuming 'data' is an array of values in your dataset

    if (data.length >= 2) {
        const lastValue = data[data.length - 1];
        const secondLastValue = data[data.length - 2];

        const change = lastValue - secondLastValue;
        const percentageChange = ((change / secondLastValue) * 100).toFixed(2);

        return percentageChange;
    }

    return null;
};

// -------------------
//   COLOURS!!!  :-)
// --------------------

export var colours = [
    '#083D77',   // 0 yale blue (palette with byz)
    '#820263',   // 1 byzantium (dark fuscia)
    '#007d9f',   // 2 cerulean
    '#08415C',   // 3 indigo dye (palette with byz)
    '#86A5D9',   // 4 vista blue (palette with byz)
    '#8B8BAE',    // 5 cool grey (palette with byz)
    '#390099',    // 6 palette 1-1 (duke blue)
    '#9E0059',    // 7 palette 1-2  (murray / raspberry)
    '#FF5400',    // 8 palette 1-3   (orange)
    '#9f2200',   // 9 rufous (red/orange)
    '#152028',   // 10 rich black
    '#7C90A0',   // 11 slate grey
    '#B9CDDA',   // 12 columbia blue
    '#D17A22',   // 13 ochre (palette with byz)
    '#A3333D',   // 14 auburn
    '#80727B',   // 15 taupe grey
    '#E57A3E',   // 16 crayola (orange)
    '#9f007d',   // 17 pink
    '#293F14',    // 18 pakistan green (palette with byz)
    '#32A287',    // 19 zomp (palette with byz)
    '420f6b',     // 20 dark purple
    'ee3e41',     // 21  MC red
];

// ----------------------------------------
// Arrays for Area Dropdown
// ----------------------------------------

/// Windsor-Essex County
var wecOptions = [
    ["ALL", "Residential"],
    ['SF', 'Single Family'],
    ['SITE', 'WECAR Stats'],
    ['APT', 'Condos'],
    ['TH', 'Townhouses']
];

// Windsor LaSalle Tecumseh
var wltOptions = [
    ['00 ALL', '00 - Windsor LaSalle Tecumseh Residiential'],
    ['00 SF', '00 - Windsor LaSalle Tecumseh Single Family'],
    ['1', '01 - West Windsor'],
    ['2', '02 - Downtown/West Windsor'],
    ['3', '03 - Central Windsor'],
    ['4', '04 - East Windsor'],
    ['5', '05 - Tecumseh'],
    ['6', '06 - Fountainbleu/Forest Glade'],
    ['7', '07 - South Central'],
    ['8', '08 - South Windsor'],
    ['9', '09 - LaSalle']
];

// Amherstburg
var amhOptions = [
    ['10 ALL', '10 - Amerstburg Residential'],
    ['10 SF', '10 - Amherstburg Single Family'],
    ['12', '12 - Waterfront/Anderdon'],
    ['13', '13 - Amherstburg']
];

// Essex
var esxOptions = [
    ['20 ALL', '20 - Essex Residential'],
    ['21', '21 - Harrow'],
    ['22', '22 - Colchester/Oxley']
];

// Kingsville
var kngOptions = [
    ['30 ALL', '30 - Kingsville Residential'],
    ['33', '33 - Cedar Beach/Linden Beach'],
    ['34', '34 - Kingsville']
];

// Leamington
var lmgOptions = [
    ['40 ALL', '40 - Leamington Residential'],
    ['46', '46 - Southwest Leamington'],
    ['47', '47 - Southeast Leamington/Robson']
];

// Lakeshore
var lksh1Options = [
    ['60 ALL', '60 - Lakeshore Residential'],
    ['61', '61 - Amy Croft/Russell Woods/Orchard Park'],
    ['62', '62 - Monarch Meadows/Heritage Garden/Willowwood']
];

// Essex Kingsville 
var esxKngOptions = [
    ['70 ALL', '70 - Essex, Kingsville Residential'],
    ['71', '71 - Essex'],
    ['72', '72 - Colchester North/Gesto/Paquette/Mcgregor']
];

// Lakeshore - the other one
var lskh2Options = [
    ['80 ALL', '80 - Lakeshore Residential'],
    ['82', '82 - Belle River']
]

// Lakeshore Outside
var lkshOutOptions = [
    ['90 ALL', '90 - Lakeshore/Outside Residential'],
    ['91', '91 - Tilbury North/Lighthouse Cove/Stoney Point'],
    ['94', '94 - Tilbury']
];

export var wecOptGroups = [
    // Label for optgroup, array of corresponding optons for group
    ['Windsor Essex County', wecOptions],
    ['Windsor, LaSalle, Tecumseh', wltOptions],
    ['Amherstburg', amhOptions],
    ['Essex', esxOptions],
    ['Kingsville', kngOptions],
    ['Leamington', lmgOptions],
    ['Lakeshore', lksh1Options],
    ['Essex/Kingsville', esxKngOptions],
    ['Lakeshore', lskh2Options],
    ['Lakeshore/Outside', lkshOutOptions]
];



