from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model and scaler
model = pickle.load(open('model/knn_model.pkl', 'rb'))
scaler = pickle.load(open('model/scaler.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

   
    features = [
        float(data['age']),
        float(data['bmi']),
        float(data['daily_steps']),
        float(data['hours_sleep']),
        float(data['stress_level']),
        float(data['hydration_level'])
    ]

    # Scale
    input_scaled = scaler.transform([features])

    # Predict
    prediction = model.predict(input_scaled)[0]

    
    if prediction == 'Fit':
        message = ("🎉 Excellent! You are maintaining a healthy lifestyle. "
                   "Keep your routine consistent with good sleep, regular hydration, and physical activity. "
                   "Remember, fitness is a lifelong journey — stay active and positive!")
        
    elif prediction == 'Average':
        message = ("😊 You are doing okay but there is room for improvement. "
                   "Try increasing your daily steps, managing stress better, and ensuring 7-8 hours of sleep. "
                   "Small changes in your daily routine can make a big difference over time!")
        
    else:  # Unfit
        message = ("⚠️ Your fitness level is currently low. "
                   "Focus on improving your sleep cycle, drinking enough water daily, and reducing stress levels. "
                   "Consider walking at least 5000 steps daily and eating balanced meals. "
                   "Your health is in your hands — start small, stay consistent, and you will see improvement!")

    return jsonify({'fitness_level': prediction, 'message': message})


if __name__ == '__main__':
    app.run(debug=True,port=5001)
