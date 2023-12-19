import './style.css'
import * as Helpers from './js/helpers.js';
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

const appDiv = document.getElementById('app-title');
appDiv.innerHTML = '<h1>Windsor-Essex County Market Pulse</h1>';

var pageNames = ["home", "area-charts", "styles-price-ranges", "custom"];
var namespace = "mktpls";

var pages = pageNames.map(function (pageName) {
  return {
    nav: pageNameSelector(pageName, "nav"),
    div: pageNameSelector(pageName, "div")
  };
});

pages.forEach(function (page) {
  page.nav.click(function () {
    clearPages(pages);
    page.div.show();
  });
});

function pageNameSelector(pageName, type) {
  return $(["#" + namespace, pageName, type].join("-"));
}

function clearPages(pages) {
  pages.forEach(function (page) {
    page.div.hide();
  });
}


// ------------------------------------
//    AREA CHARTS - Show map
// ------------------------------------
document.querySelector('#area_map_button').click(function () {
  Helpers.openMap();
});

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
          // fist one is default
          newOption = new Option(subarrayOptions[k + 1], subarrayOptions[k], true);
        } else {
          newOption = new Option(subarrayOptions[k + 1], subarrayOptions[k]);
        }
      }
    }
    areaSelectList.appendChild(newOption);
  }
}




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
