import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

export const snlr_options = {
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
            text: 'Sales to New Listings Ratio',
            fontColor: 'rgb(0, 18, 58)',
            padding: 5,
            font: {
                size: '18'
            }
        },
        annotation: {
            annotations: {
                box1: {
                    // Indicates the type of annotation
                    type: 'box',
                    drawTime: 'beforeDatasetsDraw',
                    xMin: -1,
                    xMax: 12,
                    yMin: 0,
                    yMax: 40,
                    backgroundColor: 'rgb(8,61,119, 0.25)'
                },
                box2: {
                    type: 'box',
                    drawTime: 'beforeDatasetsDraw',
                    xMin: -1,
                    xMax: 12,
                    yMin: 40,
                    yMax: 60,
                    backgroundColor: 'rgb(139,139,174, 0.75)'
                },
                box3: {
                    type: 'box',
                    drawTime: 'beforeDatasetsDraw',
                    xMin: -1,
                    xMax: 12,
                    yMin: 60,
                    yMax: 100,
                    backgroundColor: 'rgb(130,2,99, 0.25)'
                },
                label1: {
                    type: 'label',
                    drawTime: 'beforeDatasetsDraw',
                    xValue: 1,
                    yValue: 80,
                    //backgroundColor: 'rgba(245,245,245)',
                    content: ["Seller's Market"],
                    color: 'grey',
                    font: {
                        size: 16,
                    }
                },
                label2: {
                    type: 'label',
                    drawTime: 'beforeDatasetsDraw',
                    xValue: 1,
                    yValue: 20,
                    //backgroundColor: 'rgba(245,245,245)',
                    content: ["Buyer's Market"],
                    color: 'grey',
                    font: {
                        size: 16,
                    }
                },
                label3: {
                    type: 'label',
                    drawTime: 'beforeDatasetsDraw',
                    xValue: 1,
                    yValue: 50,
                    //backgroundColor: 'rgba(245,245,245)',
                    content: ["Balanced Market"],
                    color: 'grey',
                    font: {
                        size: 16,
                    }
                }
            }
        },
        datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: function (value, context) {
                return value.toLocaleString() + "%";
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
            grid: {
                display: false
            },
            max: 100,
        }
    }
};


export const snlr_dial_options = {
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
