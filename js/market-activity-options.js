import ChartDataLabels from 'chartjs-plugin-datalabels';

export const activity_options = {
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
            text: 'Market Activity',
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