import Chart from 'chart.js/auto';
import { sale_list_price_options } from "./sale-vs-list-price-options.js";
import { colours, months_to_show, calculateDifference, calculatePercentageChange, setColorBasedOnValue } from './helpers.js'

export var lowest_value;
export var highest_value;
export function DrawSaleVSListPriceChart(code) {

    google.charts.load('current', {
        'packages': ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(initChart);

    function initChart() {
        URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=" + code + "&headers=2";
        var query = new google.visualization.Query(URL);
        //query.setQuery('select *');
        query.setQuery('select A, G, I');
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
                        // for the second column, we calculate the avg list price
                        if (i == 1) {
                            series_data.push(lastNRows[j].c[i].v);
                        } else {
                            let list_price = Math.round((lastNRows[j].c[1].v * (1 / (lastNRows[j].c[i].v / 100))));
                            series_data.push(list_price);
                        }

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

            // fill the area between the lines, set fill on the second dataset
            // SITE data doesn't provide sales to list ratio

            if (i == 1 || code == 'SITE') {
                var dataset = {
                    label: dataj.cols[i].label,
                    backgroundColor: colours[i + 1],
                    //backgroundColor: 'rgb(0,76,109,0.1)',
                    borderColor: colours[i - 1],
                    //fill: 'origin',
                    data: series_data
                }
            } else { //average list price data set

                var ctx = document.getElementById('sale_vs_list_price_chart').getContext('2d');

                var gradient = ctx.createLinearGradient(0, 0, 0, 800);
                gradient.addColorStop(0, 'white');
                gradient.addColorStop(1, colours[3]);

                var dataset = {
                    label: dataj.cols[i].label,
                    backgroundColor: gradient,
                    borderColor: colours[i + 1],
                    fill: '-1',
                    data: series_data,
                    datalabels: {
                        align: 'bottom',
                    }
                }
            }

            datasets.push(dataset);

            // we don't have sales/list ratio for site data, show message and exit
            const currentElement = document.getElementById('prices_list_current');
            const changeElement = document.getElementById('prices_list_chg');
            const arrowElement = document.getElementById('prices_list_arrow');
            const diffElement = document.getElementById('prices_list_diff');
            if (code == "SITE") {
                //tileElement.style.display = 'none';
                currentElement.innerHTML = "List Price data not available";
                changeElement.innerHTML = "";
                arrowElement.style.display = 'none';
                diffElement.innerHTML = "";
                break;
            }

            if (i == 2) {
                // Value for latest month charted
                var lastValue = series_data[series_data.length - 1].toLocaleString();
                currentElement.innerText = `${lastValue}`


                // Percent change
                const percentageChange = calculatePercentageChange(dataset);
                if (percentageChange !== null) {
                    // Update the boxes with the percentage change for each dataset
                    arrowElement.style.display = 'block';
                    if (changeElement) {
                        changeElement.innerText = `${percentageChange}%`;
                        setColorBasedOnValue(changeElement, arrowElement, percentageChange);
                    }
                }

                // Difference
                const difference = calculateDifference(dataset);
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

        }

        // set the series label for average list price 
        if (code != "SITE") { datasets[1].label = "Average List Price"; }


        console.log(datasets);

        const chartdata = {
            labels: months,
            datasets: datasets
        };

        // calculate the max for the chart
        highest_value = parseInt(highest_value) + 20000;
        highest_value = Math.ceil(highest_value / 10000) * 10000;
        lowest_value = parseInt(lowest_value) - 20000;
        lowest_value = Math.round(lowest_value / 10000) * 10000;

        let chart_options = sale_list_price_options;
        chart_options.scales.y.max = highest_value;
        chart_options.scales.y.min = lowest_value;

        var canvas = document.getElementById("sale_vs_list_price_chart");
        var chart = Chart.getChart(canvas); // Get the chart object associated with the canvas
        if (chart) {
            chart.destroy(); // Destroy the chart if it exists so we can redraw it
        }

        var setup = {
            type: 'line',
            data: chartdata,
            options: sale_list_price_options,
        }
        chart = new Chart(canvas, setup);

    }
}

