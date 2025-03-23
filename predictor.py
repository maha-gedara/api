import sys
import json
from transformers import pipeline

# Load pre-trained Hugging Face model
model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# List of possible diseases
possible_diseases = [
    "Common Cold", "Flu", "COVID-19", "Pneumonia", "Asthma",
    "Migraine", "Diabetes", "Hypertension", "Heart Disease", "Malaria"
]

# Read symptoms from Node.js input
symptoms_input = json.loads(sys.argv[1])  # Symptoms sent from Node.js

# Predict disease
result = model(" ".join(symptoms_input), possible_diseases)
predicted_disease = result["labels"][0]  # Get the highest probability disease

# Send back result to Node.js
print(predicted_disease)
