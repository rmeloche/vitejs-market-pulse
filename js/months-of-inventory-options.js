import ChartDataLabels from 'chartjs-plugin-datalabels';

export const moi_options = {
    plugins: {
        legend: {
            position: 'top',
            color: '#000000',
            labels: {
                usePointStyle: false,
            }
        },
        title: {
            display: true,
            text: 'Months of Inventory',
            fontColor: 'rgb(0, 18, 58)',
            padding: 5,
            font: {
                size: '18'
            }
        },
        datalabels: {
            anchor: 'end',
            align: 'bottom',
            //formatter: Math.round,
            color: 'white',
            font: {
                //weight: 'bold',
                size: 14,
            }
        }
    },
    animation: {
        duration: 1000,
        easing: "linear"
    },
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};


export const moi_dial_options = {
    cutout: 30,
    circumference: 180,
    rotation: 270,
    aspectRatio: 1.5,
    plugins: {
        tooltip: {
            enabled: false
        },
        legend: {
            display: false
        },
        datalabels: {
            formatter: function (value, context) {
                return context.chart.data.labels[context.dataIndex];
            },
            color: '#fff',
        },
    }
};