import { activity_options } from "./market-activity-options.js";
import { colours, months_to_show } from './helpers.js'

export function DrawMarketActivityChart(code) {

    google.charts.load('current', {
        'packages': ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(initChart);

    function initChart() {
        URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=" + code + "&headers=2";
        var query = new google.visualization.Query(URL);
        //query.setQuery('select *');
        query.setQuery('select A, B, C');
        query.send(function (response) {
            handleQueryResponse(response);
        });
    }

    function handleQueryResponse(response) {
        var data = response.getDataTable();
        var columns = data.getNumberOfColumns();
        var rows = data.getNumberOfRows();
        console.log("number of rows" + rows);
        console.log(data.toJSON());


        const dataj = JSON.parse(data.toJSON());
        // the area we're charting:
        console.log(dataj.cols[0].label);

        // we only want to use the number of months configured in helper
        const startIndex = Math.max(rows - months_to_show, 0); // Calculate the starting index
        const lastNRows = dataj.rows.slice(startIndex); // Extract the last 'numberOfRows' rows
        console.log(lastNRows);



        var months = [];
        for (var i = 0; i < lastNRows.length; i++) {
            if (lastNRows[i].c[0].v != "") {
                months.push(lastNRows[i].c[0].v);
            }

        }
        console.log("****Months******" + months);


        // get the two column heading for market activity series
        const series_labels = [dataj.cols[1].label, dataj.cols[2].label];
        console.log(series_labels);

        // build the datasets from lastNRows
        const datasets = [];
        for (var i = 1; i < dataj.cols.length; i++) {
            const series_data = [];
            for (var j = 0; j < lastNRows.length; j++) {
                if (lastNRows[j].c[i] != null) {
                    if (lastNRows[j].c[i].v != null) {
                        series_data.push(lastNRows[j].c[i].v);
                    } else {
                        series_data.push(0);
                    }
                }

            }
            var dataset = {
                label: dataj.cols[i].label,
                backgroundColor: colours[i - 1],
                borderColor: colours[i - 1],
                data: series_data
            }

            datasets.push(dataset);

        }
        console.log(datasets);

        const chartdata = {
            labels: months,
            datasets: datasets
        };

        var canvas = document.getElementById("market_activity_chart");
        var chart = Chart.getChart(canvas); // Get the chart object associated with the canvas
        if (chart) {
            chart.destroy(); // Destroy the chart if it exists
        }
        var setup = {
            type: 'bar',
            data: chartdata,
            options: activity_options,
        }
        chart = new Chart(canvas, setup);

    }
}

/*
console.log("In the chart file: " + activity_data);

var ctx = document.getElementById('market_activity_chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: activity_data,
    options: activity_options
});  */

