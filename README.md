# 🏥 MEDIZ - Backend

**MEDIZ** is a hospital administration system backend, built using **Node.js**, **Express**, and **MongoDB**.  
It handles all core services like patient management, doctor scheduling, pharmacy stock control, and AI-based illness prediction.

## 🚀 Features

- 📁 CRUD operations for Patients, Doctors, Staff, and Pharmacy
- 🧠 AI/ML-based Illness Prediction (via Hugging Face or API)
- 📧 Automated email notifications
- 🔄 Real-time pharmacy stock updates
- 🔐 RESTful API design with Express.js

## 🧰 Tech Stack

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **Python** integration (for illness prediction)
- **Axios**, **Dotenv**, **Nodemailer**

## 📁 Folder Structure

```
mediz-backend/
├── src/
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── services/         # Email, AI integration
│   ├── utils/            # Utility functions
│   └── app.js            # Main application entry
├── .env
├── package.json
└── README.md
```

## 🛠️ Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/your-org/mediz-backend.git
cd mediz-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

4. **Run the app**
```bash
npm run dev
```

> You can test APIs using Postman or Thunder Client.

## 🧠 Illness Prediction (AI Integration)

- You can integrate:
  - Hugging Face pre-trained models (via Python)
  - External APIs like Infermedica
- Supports symptom-based predictions and updates assumed diseases.

