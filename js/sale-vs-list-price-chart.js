import { sale_list_price_options } from "./sale-vs-list-price-options.js";
import { colours, months_to_show } from './helpers.js'

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
        console.log("****Months******" + months);


        // get the two column heading for market activity series
        const series_labels = [dataj.cols[1].label, dataj.cols[2].label];
        console.log(series_labels);

        // build the datasets from lastNRows
        highest_value = 1;
        lowest_value = 1;
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
                        highest_value = Math.max(highest_value, lastNRows[j].c[i].v);
                        if (lastNRows[j].c[i].v > 0) {
                            lowest_value = Math.min(lowest_value, lastNRows[j].c[i].v);
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
                    backgroundColor: colours[i - 1],
                    borderColor: colours[i - 1],
                    data: series_data
                }
            } else {

                var ctx = document.getElementById('sale_vs_list_price_chart').getContext('2d');

                var gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, colours[0]);
                gradient.addColorStop(1, colours[1]);

                var dataset = {
                    label: dataj.cols[i].label,
                    backgroundColor: gradient,
                    borderColor: colours[i - 1],
                    fill: '-1',
                    data: series_data
                }

            }

            datasets.push(dataset);

        }
        console.log(datasets);

        const chartdata = {
            labels: months,
            datasets: datasets
        };

        // calculate the max for the chart
        highest_value = parseInt(highest_value) + 60000;
        highest_value = Math.ceil(highest_value / 10000) * 10000;
        lowest_value = parseInt(lowest_value) - 60000;
        lowest_value = Math.round(lowest_value / 10000) * 10000;

        let chart_options = sale_list_price_options;
        chart_options.scales.y.max = highest_value;
        chart_options.scales.y.min = lowest_value;


        var canvas = document.getElementById("sale_vs_list_price_chart");
        var chart = Chart.getChart(canvas); // Get the chart object associated with the canvas
        if (chart) {
            chart.destroy(); // Destroy the chart if it exists
        }

        var setup = {
            type: 'line',
            data: chartdata,
            options: sale_list_price_options,
        }
        chart = new Chart(canvas, setup);

    }
}

