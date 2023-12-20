import { Chart } from "chart.js";
import { activityData } from "./data-market-activity";
import { activityOptions } from "./options-market-activity";

var ctx = document.getElementById('market_activity_chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: activityData,
    options: activityOptions
});
