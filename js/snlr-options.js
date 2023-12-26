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
                    backgroundColor: 'rgba(255, 99, 132, 0.25)'
                },
                box2: {
                    type: 'box',
                    drawTime: 'beforeDatasetsDraw',
                    xMin: -1,
                    xMax: 12,
                    yMin: 40,
                    yMax: 60,
                    backgroundColor: 'rgba(255, 199, 132, 0.25)'
                },
                box3: {
                    type: 'box',
                    drawTime: 'beforeDatasetsDraw',
                    xMin: -1,
                    xMax: 12,
                    yMin: 60,
                    yMax: 100,
                    backgroundColor: 'rgba(255, 99, 32, 0.25)'
                }
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
            },
            max: 100,
        }
    }
};