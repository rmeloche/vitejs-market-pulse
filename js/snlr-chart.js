import { snlr_options } from "./snlr-options.js";
import { colours, months_to_show } from './helpers.js'
Chart.register(ChartDataLabels);

export function drawSNLRChart(code) {

    google.charts.load('current', {
        'packages': ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(initChart);

    function initChart() {
        URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=" + code + "&headers=2";
        var query = new google.visualization.Query(URL);
        //query.setQuery('select *');
        query.setQuery('select A, E');
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
            const buyers_data = [];
            const balanced_data = [];
            const sellers_data = [];
            for (var j = 0; j < lastNRows.length; j++) {
                if (lastNRows[j].c[i] != null) {
                    if (lastNRows[j].c[i].v != null) {
                        series_data.push(lastNRows[j].c[i].v);
                        buyers_data.push(40);
                        balanced_data.push(60);
                        sellers_data.push(100);
                    } else {
                        series_data.push(0);
                        buyers_data.push(40);
                        balanced_data.push(60);
                        sellers_data.push(100);
                    }
                } else {
                    series_data.push(0);
                    buyers_data.push(40);
                    balanced_data.push(60);
                    sellers_data.push(100);
                }

            }

            // only put datalabels on first series
            var dataset = {
                label: dataj.cols[i].label,
                backgroundColor: colours[i - 1],
                borderColor: colours[i - 1],
                data: series_data,
                datalabels: {
                    anchor: 'end',
                    align: 'bottom',
                    color: 'white',
                    font: {
                        size: 14,
                    }
                }
            };

            datasets.push(dataset);

            var buyerset = {
                label: "Buyer's Market",
                backgroundColor: colours[6],
                borderColor: colours[6],
                type: 'line',
                fill: 'stack',
                data: buyers_data,
                datalabels: {
                    labels: {
                        title: null
                    }
                }
            };

            datasets.push(buyerset);

            var balanceset = {
                label: "Balanced Market",
                backgroundColor: colours[7],
                borderColor: colours[7],
                type: 'line',
                fill: 'stack',
                data: balanced_data,
                datalabels: {
                    labels: {
                        title: null
                    }
                }
            };

            datasets.push(balanceset);

            var sellerset = {
                label: "Seller's Market",
                backgroundColor: colours[8],
                borderColor: colours[8],
                type: 'line',
                fill: 'stack',
                data: sellers_data,
                datalabels: {
                    labels: {
                        title: null
                    }
                }
            };

            datasets.push(sellerset);

        }

        console.log("*****SNLR DATASET*****");
        console.log(datasets);

        const chartdata = {
            labels: months,
            datasets: datasets
        };

        var canvas = document.getElementById("snlr_chart");
        var chart = Chart.getChart(canvas); // Get the chart object associated with the canvas
        if (chart) {
            chart.destroy(); // Destroy the chart if it exists
        }
        var setup = {
            type: 'bar',
            data: chartdata,
            options: snlr_options,
        }
        chart = new Chart(canvas, setup);

    }
}

