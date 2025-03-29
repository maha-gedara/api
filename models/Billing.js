const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    medicines: [
        {
            medName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number }, // Auto-calculated, no need for `required`
    paymentMethod: { type: String, required: true },
    date: { type: Date, required: true }
});

// Auto-calculate totalAmount before saving
billingSchema.pre("save", function (next) {
    this.totalAmount = this.medicines.reduce((sum, med) => sum + med.quantity * med.price, 0);
    next();
});

// Auto-calculate totalAmount before updating
billingSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.medicines) {
        update.totalAmount = update.medicines.reduce((sum, med) => sum + med.quantity * med.price, 0);
    }
    next();
});

module.exports = mongoose.model("Billing", billingSchema);




/*const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    medicines: [
        {
            medicineId: { type: String, required: true },
            medName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number }, // Auto-calculated, no need for `required`
    paymentMethod: { type: String, required: true },
    date: { type: Date, required: true }
});

// Auto-calculate totalAmount before saving
billingSchema.pre("save", function (next) {
    this.totalAmount = this.medicines.reduce((sum, med) => sum + med.quantity * med.price, 0);
    next();
});

// Auto-calculate totalAmount before updating
billingSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.medicines) {
        update.totalAmount = update.medicines.reduce((sum, med) => sum + med.quantity * med.price, 0);
    }
    next();
});

module.exports = mongoose.model("Billing", billingSchema);*/
