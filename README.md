**🌍 Smart AQI Monitoring & Prediction System**

A full-stack web application that provides real-time air quality monitoring, AQI prediction using Machine Learning, health recommendations to help users understand air pollution and take preventive measures.

**📌 Project Overview**

Air pollution is a growing environmental and health concern. This project aims to provide users with an interactive platform to:
* Monitor real-time Air Quality Index (AQI)
* Analyze pollutant levels
* Predict future AQI trends using Machine Learning
* Receive health recommendations
* Interact with an AI chatbot for AQI-related guidance
* Access the system securely using authentication

**🎯 Key Features**

*🔹 Frontend Features*
* 🌐 City-based AQI selection (All India)
* 📊 Real-time AQI dashboard
* 🧪 Pollutant visualization (PM2.5, PM10, CO, NO₂, SO₂, O₃)
* 📈 AQI prediction charts (hourly, weekly, monthly)
* 🩺 Health recommendations based on AQI levels
* 🌗 Dark / Light theme toggle
* 🔐 User Login & Registration
* 📤 Export AQI dashboard as PDF
* 📱 Responsive UI with modern design

*🔹 Backend Features (Flask)*
* 🌍 Real-time AQI data fetching using OpenWeather API
* 🧠 Machine Learning AQI prediction model
* 🗃️ MongoDB database integration
* 🔐 Secure authentication using JWT
* 🔄 CORS-enabled API communication
* 📡 RESTful API architecture
* 🧪 Data preprocessing & AQI computation
* 📊 Historical AQI data handling

*🧠 Machine Learning Module*

* Dataset sourced from Kaggle (Indian Air Quality Data)
* Features: PM2.5, PM10, CO, NO₂, SO₂, O₃
* Model Used: RandomForestRegressor
* Output: Accurate AQI prediction (continuous values)
* Evaluation: MAE, R² Score

**🛠️ Tech Stack**

*Frontend*
* React.js
* Tailwind CSS
* Recharts
* Headless UI
* Heroicons

*Backend*
* Python (Flask)
* Flask-CORS
* Flask-JWT-Extended
* OpenWeather API

*Database*
* MongoDB

*Machine Learning* 

* Scikit-learn
* Pandas
* NumPy
* Joblib


**▶️ How to Run the Project**

*🔹 Backend Setup*

cd smart_aqi_backend

pip install -r requirements.txt

python app.py

Backend runs at:
http://127.0.0.1:5000

*🔹 Frontend Setup*

cd smart_aqi_frontend

npm install

npm start

Frontend runs at:
http://localhost:3000


**🔑 Environment Variables**

*Backend .env*
* OPENWEATHER_API_KEY=your_api_key
* MONGO_URI=mongodb://localhost:27017/
* SECRET_KEY=smart_aqi_secret_key
* JWT_SECRET_KEY=smart_aqi_jwt_secret_key

**👥 Team Details**

* Rahul Kummara - rahulksree2005@gmail.com   
* Ruchitha Mallela - mallelaruchitha@gmail.com

**🏁 Conclusion**

This project successfully integrates real-time data, machine learning, and AI assistance into a single platform that enhances public awareness about air quality. The system supports informed decision-making by providing actionable insights, predictions, and personalized guidance in an intuitive and secure manner.

**⭐ Future Enhancements**

* Mobile application
* Email/SMS AQI alerts
* City-wise AQI history analysis
* Deployment on cloud (AWS / GCP)
* Advanced deep learning prediction models
