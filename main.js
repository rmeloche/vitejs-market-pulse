import './style.css'
import * as Helpers from './js/helpers.js';
import { DrawMarketActivityChart } from './js/market-activity-chart.js';
import { DrawAvgMedPriceChart } from './js/avg-med-price-chart.js';
import { DrawSaleVSListPriceChart } from './js/sale-vs-list-price-chart.js';

const appDiv = document.getElementById('app-title');
appDiv.innerHTML = '<h1>Windsor-Essex County Market Pulse</h1>';

// --------------------------
//  Show/Hide App Sections
// --------------------------

var pageNames = ["area-charts", "styles-price-ranges", "custom"];
var namespace = "mktpls";

function pageNameSelector(pageName, type) {
  var element = document.getElementById([namespace, pageName, type].join("-"));
  return element;
}

var pages = pageNames.map(function (pageName) {
  return {
    nav: pageNameSelector(pageName, "nav"),
    div: pageNameSelector(pageName, "div")
  };
});

pages.forEach(function (page) {
  page.nav.addEventListener('click', function () {
    clearPages(pages);
    page.div.style.display = "block";
  })
});

function clearPages(pages) {
  pages.forEach(function (page) {
    page.div.style.display = "none";
  });
}

// ------------------------------------------
// Hide Price Ranges and Custom on page load
// -------------------------------------------
// Set the display property of the element to none using CSS
document.getElementById("mktpls-styles-price-ranges-div").style.display = "none";
document.getElementById("mktpls-custom-div").style.display = "none";

// ------------------------------------
//    AREA CHARTS - Build drowpdown
// ------------------------------------

var areaSelectList = document.getElementById('area');
// wecOptGroups is an array with label, array of data pairs
for (var i = 0; i < Helpers.wecOptGroups.length; i++) {
  // create an optgroup element and add the label
  var optGroup = document.createElement('optgroup');
  optGroup.label = Helpers.wecOptGroups[i][0];
  areaSelectList.appendChild(optGroup);
  // get the array of options for the group and its length
  var arrayOptions = Helpers.wecOptGroups[i][1];
  var numberOfOptions = arrayOptions.length;
  for (var j = 0; j < numberOfOptions; j++) {
    var newOption;// = document.createElement('option');
    // get each value/text pair
    var subarrayOptions = arrayOptions[j];
    for (var k = 0; k < 2; k++) {
      // only add option when k is even
      if (k % 2 == 0) {
        if (i == 0 && j == 0 && k == 0) {
          // first one is default
          newOption = new Option(subarrayOptions[k + 1], subarrayOptions[k], true);
        } else {
          newOption = new Option(subarrayOptions[k + 1], subarrayOptions[k]);
        }
      }
    }
    areaSelectList.appendChild(newOption);
  }
}

// *********************************************
// AREA CHARTS - Draw Charts for Selected Area
//**********************************************

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('area_title').innerHTML = '<h2>All Residential</h2>';
  DrawMarketActivityChart("ALL");
  DrawAvgMedPriceChart("ALL");
  DrawSaleVSListPriceChart("ALL");
});

// Area Charts - Get option and refresh charts
document.addEventListener('DOMContentLoaded', () => {
  const areaSelect = document.getElementById('area');
  areaSelect.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    let sheetCode = selectedOption.value;
    area = selectedOption.textContent;
    document.getElementById('area_title').innerHTML = '<h2>' + area + '</h2>';
    redrawCharts(sheetCode);
  });
});

function redrawCharts(sheetCode) {
  DrawMarketActivityChart(sheetCode);
  DrawAvgMedPriceChart(sheetCode);
  DrawSaleVSListPriceChart(sheetCode);
}


/*
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))


// Remove the display property after the page loads using the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("myElement").style.display = "block";
});

*/
