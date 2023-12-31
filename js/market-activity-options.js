import ChartDataLabels from 'chartjs-plugin-datalabels';

export const activity_options = {
    plugins: {
        legend: {
            position: 'top',
            labels: {
                usePointStyle: false,
                color: '#000'
            }
        },
        title: {
            display: true,
            text: 'Market Activity',
            color: '#000',
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
            },
            ticks: {
                callback: function (value, index, ticks) {
                    let characterLimit = 3;
                    let label = this.getLabelForValue(value);
                    if (label.length >= characterLimit) {
                        return label.slice(0, label.length).substring(0, characterLimit).trim();
                    }
                    return label;
                }
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};