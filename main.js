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
