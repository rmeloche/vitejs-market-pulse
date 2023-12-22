import Chart from 'chart.js/auto'


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

    const colors = ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 206, 86)', 'rgb(153, 102, 255)'];
    var dataj = JSON.parse(data.toJSON());
    console.log(dataj.cols[0].label);
    const labels = [];

    for (var c = 0; c < dataj.rows.length; c++) {
        //if (dataj.cols[c].label != "") {
        labels.push(dataj.rows[c].c[0].v);
        //}

    }
    console.log(labels);

    const datasets = [];
    for (var i = 1; i < dataj.cols.length; i++) {
        const series_data = [];
        for (var j = 1; j < dataj.rows[j].c[i].length; j++) {
            if (dataj.rows[j].c[i] != null) {
                if (dataj.rows[j].c[i].v != null) {
                    series_data.push(dataj.rows[j].c[i].v);
                } else {
                    series_data.push(0);
                }
            }

        }
        var dataset = {
            label: dataj.cols[0].label,
            backgroundColor: colors[0],
            borderColor: colors[0],
            data: series_data
        }

        datasets.push(dataset);

    }
    console.log(datasets);

    const chartdata = {
        labels: labels,
        datasets: datasets
    };
    var canvas = document.getElementById("myChart");
    var setup = {
        type: 'bar',
        data: chartdata,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: dataj.cols[0].label
                }
            },
            responsive: true,
        }
    }
    var chart = new Chart(canvas, setup);

}