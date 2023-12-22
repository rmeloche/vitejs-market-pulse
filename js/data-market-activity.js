import { colours } from './helpers.js'

export var chartdata;

google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(initChart);

function initChart() {
    URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=SITE&headers=2";
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
    console.log(data.toJSON());

    var dataj = JSON.parse(data.toJSON());
    console.log(dataj.cols[0].label);

    const months = [];
    for (var i = 0; i < dataj.rows.length; i++) {
        //if (dataj.cols[c].label != "") {
        months.push(dataj.rows[i].c[0].v);
        //}

    }
    console.log(months);

    // get the two column heading for graphing market activity
    const series_labels = [dataj.cols[1].label, dataj.cols[2].label];
    console.log(series_labels);

    // build the datasets
    const datasets = [];
    for (var i = 1; i < dataj.cols.length; i++) {
        const series_data = [];
        for (var j = 0; j < dataj.rows.length; j++) {
            if (dataj.rows[j].c[i] != null) {
                if (dataj.rows[j].c[i].v != null) {
                    series_data.push(dataj.rows[j].c[i].v);
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

    chartdata = {
        labels: months,
        datasets: datasets
    };
}

window.console.log("chartdata: " + chartdata);
//export var activityData;




/*
export const activityData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
        label: 'apples',
        data: [12, 19, 3, 17, 6, 3, 7],
        backgroundColor: "rgba(153,255,51,0.4)"
    }, {
        label: 'oranges',
        data: [2, 29, 5, 5, 2, 3, 10],
        backgroundColor: "rgba(255,153,0,0.4)"
    }]
}; */