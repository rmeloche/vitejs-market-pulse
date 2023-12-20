import { Chart } from "chart.js";
import { activityData } from 'data-market-activity.js';

var ctx = document.getElementById('market_activity_chart').getContext('2d');
var marketActivityChart = new Chart(ctx, {
    type: 'bar',
    data: activityData,
    /* options: {
        title: {
            display: true,
            text: 'Market Activity'
        },
        // backgroundColor: white, 
    } */
});
