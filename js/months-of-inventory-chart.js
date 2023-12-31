import Chart from 'chart.js/auto';
import { moi_dial_options, moi_options } from "./months-of-inventory-options.js";
import { colours, months_to_show } from './helpers.js'

export function drawMonthsOfInventoryChart(code) {

    google.charts.load('current', {
        'packages': ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(initChart);

    function initChart() {
        URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=" + code + "&headers=2";
        var query = new google.visualization.Query(URL);
        //query.setQuery('select *');
        query.setQuery('select A, F');
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

        // get the labels for the months
        var months = [];
        for (var i = 0; i < lastNRows.length; i++) {
            if (lastNRows[i].c[0].v != "") {
                months.push(lastNRows[i].c[0].v);
            }

        }

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
                } else {
                    series_data.push(0);
                }

            }
            var dataset = {
                label: dataj.cols[i].label,
                backgroundColor: colours[i + 1],
                borderColor: colours[i + 1],
                data: series_data
            }

            datasets.push(dataset);

        }
        console.log(datasets);

        var lastValue = dataset.data[data.length - 1];

        const chartdata = {
            labels: months,
            datasets: datasets
        };

        // Create the Months of Inventory Bar Chart

        var canvas = document.getElementById("moi_chart");
        var chart = Chart.getChart(canvas); // Get the chart object associated with the canvas
        if (chart) {
            chart.destroy(); // Destroy the chart if it exists
        }
        var setup = {
            type: 'bar',
            data: chartdata,
            options: moi_options,
        }
        chart = new Chart(canvas, setup);

        // Create the Months of Inventory guage/donut chart

        var dial_canvas = document.getElementById("moi_dial");
        var dial_chart = Chart.getChart(dial_canvas);
        if (dial_chart) { dial_chart.destroy(); }
        var dial_setup = {
            type: 'doughnut',
            data: {
                labels: ['Buyers', 'Balanced', 'Sellers'],
                datasets: [{
                    data: [50, 50, 50],
                    backgroundColor: [
                        '#004c6d',
                        'rgb(54, 162, 235)',
                        '#7aa6c2'
                    ],
                }]
            },
            options: moi_dial_options,
        }

        dial_chart = new Chart(dial_canvas, dial_setup);

    }
}


