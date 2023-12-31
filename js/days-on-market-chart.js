import Chart from 'chart.js/auto';
import { dom_options } from "./days-on-market-options.js";
import { colours, months_to_show, calculateDifference, calculatePercentageChange, setColorBasedOnValue } from './helpers.js'

export function drawDaysOnMarketChart(code) {

    google.charts.load('current', {
        'packages': ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(initChart);

    function initChart() {
        URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=" + code + "&headers=2";
        var query = new google.visualization.Query(URL);
        //query.setQuery('select *');
        query.setQuery('select A, J');
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

            const tileElement = document.getElementById('days_on_market_box');
            tileElement.style.display = 'block';

            // Value for latest month charted
            var lastValue = series_data[series_data.length - 1].toLocaleString();
            const currentElement = document.getElementById('days_on_market_current');
            currentElement.innerText = `${lastValue}`


            // Percent change
            const percentageChange = calculatePercentageChange(dataset);
            if (percentageChange !== null) {
                // Update the boxes with the percentage change for each dataset
                const changeElement = document.getElementById('days_on_market_chg');
                const arrowElement = document.getElementById('days_on_market_arrow');
                if (changeElement) {
                    changeElement.innerText = `${percentageChange}%`;
                    setColorBasedOnValue(changeElement, arrowElement, percentageChange);
                }
            }

            // Difference
            const difference = calculateDifference(dataset);
            const diffElement = document.getElementById('days_on_market_diff');
            if (diffElement) {
                if (difference < 0) {
                    diffElement.innerText = "Down by " + Math.abs(difference).toLocaleString() + " compared to " + months[months.length - 2];
                }
                else {
                    diffElement.innerText = "Up by " + difference.toLocaleString() + " compared to " + months[months.length - 2];
                }
                //setDiffColorBasedOnValue(diffElement, difference);
            }


        }
        console.log(datasets);

        const chartdata = {
            labels: months,
            datasets: datasets
        };

        var canvas = document.getElementById("dom_chart");
        var chart = Chart.getChart(canvas); // Get the chart object associated with the canvas
        if (chart) {
            chart.destroy(); // Destroy the chart if it exists
        }
        var setup = {
            type: 'bar',
            data: chartdata,
            options: dom_options,
        }
        chart = new Chart(canvas, setup);

    }
}


