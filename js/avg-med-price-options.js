import ChartDataLabels from 'chartjs-plugin-datalabels';

const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "symbol",
}); // Change locale according to your currency and country


export const avg_med_price_options = {
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
            text: 'Prices',
            fontColor: 'rgb(0, 18, 58)',
            padding: 5,
            font: {
                size: '18'
            }
        },
        datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: function (value, context) {
                return "$" + value.toLocaleString();
            },
            color: '#333',
            font: {
                //weight: 'bold',
                size: 14,
            },
            display: function (context) {
                return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
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
            ticks: {
                callback: function (value, index, values) {
                    //pass tick values as a string into Number function
                    return Number((value / 1000).toString()) + 'K';
                }
            },
            min: 300000,
            max: 650000,
            startAtZero: false,
            grid: {
                display: false
            }
        }
    }
};