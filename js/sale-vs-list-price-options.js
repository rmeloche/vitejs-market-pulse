import ChartDataLabels from 'chartjs-plugin-datalabels';
import { highest_value, lowest_value } from "./sale-vs-list-price-chart";


const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "symbol",
}); // Change locale according to your currency and country

export const sale_list_price_options = {
    layout: {
        padding: {
            //left: 50,
            right: 50,
            //top: 50,
            //bottom: 50
        }
    },
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
            text: 'Sale and List Prices',
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
                },
                padding: 20,
            },
            min: lowest_value,
            max: highest_value,
            //suggestedMax: 650000,
            startAtZero: false,
            grid: {
                display: false
            }
        }
    }
};