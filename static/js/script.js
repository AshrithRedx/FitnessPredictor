document.getElementById('predictForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const age = document.querySelector('input[name="age"]').value;
    const bmi = document.querySelector('input[name="bmi"]').value;
    const daily_steps = document.querySelector('input[name="daily_steps"]').value;
    const hours_sleep = document.querySelector('input[name="hours_sleep"]').value;
    const stress_level = document.querySelector('input[name="stress_level"]').value;
    const hydration_level = document.querySelector('input[name="hydration_level"]').value;

    if (!age || !bmi || !daily_steps || !hours_sleep || !stress_level || !hydration_level) {
        alert('Please fill all the fields!');
        return;
    }

    if (age < 12 || age > 80 ||
        bmi < 10 || bmi > 40 ||
        daily_steps < 500 || daily_steps > 25000 ||
        hours_sleep < 3 || hours_sleep > 12 ||
        stress_level < 1 || stress_level > 10 ||
        hydration_level < 1 || hydration_level > 10) {
        alert('Please enter valid values within the valid range.');
        return;
    }

    const data = {
        age: age,
        bmi: bmi,
        daily_steps: daily_steps,
        hours_sleep: hours_sleep,
        stress_level: stress_level,
        hydration_level: hydration_level
    };

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            document.getElementById('popupMessage').innerText =
                `Predicted Fitness Level: ${result.fitness_level}\n\n${result.message}`;
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('resultPopup').style.display = 'block';
            // Show Fitness Progress Bar
const barContainer = document.getElementById('fitnessBarContainer');
const bar = document.getElementById('fitnessBar');
barContainer.style.display = 'block';

let percent = 0;
let color = '#ccc';

if (result.fitness_level === "Unfit") {
    percent = 30;
    color = 'red';
} else if (result.fitness_level === "Average") {
    percent = 60;
    color = 'orange';
} else if (result.fitness_level === "Fit") {
    percent = 90;
    color = 'green';
}

bar.style.width = percent + '%';
bar.style.background = color;

        
            // 🔵 Visualization section: scaled radar chart
            const scaledInputs = {
                age: Math.min((parseFloat(age) / 100) * 10, 10),
                bmi: Math.min((parseFloat(bmi) / 40) * 10, 10),
                daily_steps: Math.min((parseFloat(daily_steps) / 20000) * 10, 10),
                hours_sleep: Math.min((parseFloat(hours_sleep) / 10) * 10, 10),
                stress_level: Math.min(parseFloat(stress_level), 10),
                hydration_level: Math.min(parseFloat(hydration_level), 10)
            };
        
            const labels = ["Age", "BMI", "Daily Steps", "Sleep Hours", "Stress Level", "Hydration"];
            const dataPoints = [
                scaledInputs.age,
                scaledInputs.bmi,
                scaledInputs.daily_steps,
                scaledInputs.hours_sleep,
                scaledInputs.stress_level,
                scaledInputs.hydration_level
            ];
        
            const chartCanvas = document.getElementById('inputRadarChart');
            chartCanvas.style.display = 'block';
        
            if (window.radarChart) {
                window.radarChart.destroy();
            }
        
            window.radarChart = new Chart(chartCanvas, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Input Overview (Scaled 0–10)',
                        data: dataPoints,
                        fill: true,
                        backgroundColor: 'rgba(0, 123, 255, 0.3)',  
                        borderColor: '#00ffff',                     
                        pointBackgroundColor: '#ffffff',            
                        pointBorderColor: '#00ffff',
                        pointHoverBackgroundColor: '#00ffff',
                        pointHoverBorderColor: '#ffffff',
                        borderWidth: 3,
                    }]
                    
                },
                options: {
                    responsive: true,
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 10,
                            angleLines: {
                                color: '#666'  
                            },
                            grid: {
                                color: '#444'  
                            },
                            pointLabels: {
                                color: '#ddd', 
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                color: '#ccc',
                                backdropColor: 'transparent',
                                stepSize: 2
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#eee',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }
                
            });
        })
        
        .catch(error => {
            alert('❗ Error predicting fitness level.');
            console.error('Error:', error);
        });
});

function showPopup(message) {
    document.getElementById("popupMessage").innerText = message;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("resultPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("resultPopup").style.display = "none";
}

function clearForm() {
    document.querySelector('input[name="age"]').value = '';
    document.querySelector('input[name="bmi"]').value = '';
    document.querySelector('input[name="daily_steps"]').value = '';
    document.querySelector('input[name="hours_sleep"]').value = '';
    document.querySelector('input[name="stress_level"]').value = '';
    document.querySelector('input[name="hydration_level"]').value = '';
}
