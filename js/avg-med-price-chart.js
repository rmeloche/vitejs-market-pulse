import Chart from 'chart.js/auto';
import { avg_med_price_options } from "./avg-med-price-options.js";
import { colours, months_to_show, calculatePercentageChange, setColorBasedOnValue, calculateDifference, setDiffColorBasedOnValue } from './helpers.js'

export var lowest_value;
export var highest_value;

export function DrawAvgMedPriceChart(code) {

    google.charts.load('current', {
        'packages': ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(initChart);

    function initChart() {
        URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=" + code + "&headers=2";
        var query = new google.visualization.Query(URL);
        //query.setQuery('select *');
        query.setQuery('select A, G, H');
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

        // build the datasets from lastNRows
        highest_value = 1;
        lowest_value = 900000;
        const datasets = [];
        for (var i = 1; i < dataj.cols.length; i++) {
            const series_data = [];
            for (var j = 0; j < lastNRows.length; j++) {
                if (lastNRows[j].c[i] != null) {
                    if (lastNRows[j].c[i].v != null) {
                        series_data.push(lastNRows[j].c[i].v);

                        // keep track of highest and lowest values for the chart scale options
                        highest_value = Math.max(highest_value, series_data[j]);
                        if (series_data[j] > 0) {
                            lowest_value = Math.min(lowest_value, series_data[j]);
                        }

                    } else {
                        series_data.push(0);
                    }
                } else {
                    series_data.push(0);
                }

            }
            var dataset = {
                label: dataj.cols[i].label,
                backgroundColor: colours[i - 1],
                borderColor: colours[i - 1],
                data: series_data
            }

            datasets.push(dataset);

            // Add data to Monthly Change boxes

            // Value for latest month charted
            var lastValue = series_data[series_data.length - 1].toLocaleString();
            const currentElement = document.getElementById(`prices_current_${i}`);
            currentElement.innerText = `$${lastValue}`

            // Percent Change
            const percentageChange = calculatePercentageChange(dataset);
            if (percentageChange !== null) {
                // Update the HTML elements or tiles with the percentage change for each dataset
                const tileElement = document.getElementById(`prices_${i}`);
                const arrowElement = document.getElementById(`prices_arrow_${i}`);
                if (tileElement) {
                    tileElement.innerText = `${percentageChange}%`;
                    setColorBasedOnValue(tileElement, arrowElement, percentageChange);
                }
            }
            // Difference
            const difference = calculateDifference(dataset);
            const diffElement = document.getElementById(`prices_diff_${i}`);
            if (diffElement) {
                if (difference < 0) {
                    diffElement.innerText = "(- $" + Math.abs(difference).toLocaleString() + ")";
                }
                else {
                    diffElement.innerText = "+ $" + difference.toLocaleString();
                }
                //setDiffColorBasedOnValue(diffElement, difference);
            }
        }

        console.log(datasets);

        const chartdata = {
            labels: months,
            datasets: datasets
        };

        // calculate the min and max for the chart
        highest_value = parseInt(highest_value) + 50000;
        highest_value = Math.ceil(highest_value / 10000) * 10000;
        lowest_value = parseInt(lowest_value) - 50000;
        lowest_value = Math.round(lowest_value / 10000) * 10000;

        let chart_options = avg_med_price_options;
        chart_options.scales.y.max = highest_value;
        chart_options.scales.y.min = lowest_value;

        var canvas = document.getElementById("average_median_price_chart");
        var chart = Chart.getChart(canvas); // Get the chart object associated with the canvas
        if (chart) {
            chart.destroy(); // Destroy the chart if it exists
        }

        var setup = {
            type: 'bar',
            data: chartdata,
            options: avg_med_price_options,
        }

        chart = new Chart(canvas, setup);





    }
}
