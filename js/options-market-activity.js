export const activity_options = {
    plugins: {
        legend: {
            position: 'top',
            color: '#000000',
            labels: {
                usePointStyle: true,
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
            align: 'top',
            formatter: Math.round,
            font: {
                weight: 'bold'
            }
        }
    },
    animation: {
        duration: 1000,
        easing: "linear"
    },
    responsive: true,
};