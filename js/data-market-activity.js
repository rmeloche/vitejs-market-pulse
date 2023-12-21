var chartdata;

google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(initChart);

function initChart() {
    URL = "https://docs.google.com/spreadsheets/d/1wQFTtqdiWov2-IcdjV42V0VfQ66nG1usM23P_F8HtA4/gviz/tq?sheet=SITE&headers=2";
    var query = new google.visualization.Query(URL);
    //query.setQuery('select *');
    query.setQuery('select A, G, H');
    query.send(function (response) {
        activityData = handleQueryResponse(response);
    });
}

function handleQueryResponse(response) {
    // grab the data
    var data = response.getDataTable();
    var columns = data.getNumberOfColumns();
    var rows = data.getNumberOfRows();

    // put data in json format
    var dataj = JSON.parse(data.toJSON());

    // get the labels from the json data 
    var labels = [];
    for (var c = 1; c < dataj.cols.length; c++) {
        if (dataj.cols[c].label != "") {
            labels.push(dataj.cols[c].label);
        }

    }
    const datasets = [];
    for (var i = 0; i < dataj.rows.length; i++) {
        const series_data = [];
        for (var j = 1; j < dataj.rows[i].c.length; j++) {
            if (dataj.rows[i].c[j] != null) {
                if (dataj.rows[i].c[j].v != null) {
                    series_data.push(dataj.rows[i].c[j].v);
                } else {
                    series_data.push(0);
                }
            }

        }

        const colors = ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 206, 86)', 'rgb(153, 102, 255)'];
        var dataset = {
            label: dataj.rows[i].c[0].v,
            //backgroundColor: colors[i],
            //borderColor: colors[i],
            data: series_data
        }

        datasets.push(dataset);

    }
    chartdata = {
        labels: labels,
        datasets: datasets
    };
    window.console.log("chartdata: " + chartdata);
    //return chartdata;
}

window.console.log("chartdata: " + chartdata);
export var activityData;




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