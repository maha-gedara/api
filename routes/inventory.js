const router = require("express").Router();
let Billing = require("../models/Billing");

// Create a new bill
router.route("/addbi").post(async (req, res) => {
    try {
        const { customerName, medicines, paymentMethod, date } = req.body;

        // Calculate total amount dynamically
        let totalAmount = medicines.reduce((sum, med) => sum + med.quantity * med.price, 0);

        const newBilling = new Billing({
            customerName,
            medicines,
            totalAmount,
            paymentMethod,
            date
        });

        await newBilling.save();
        res.status(201).json({ message: "Billing Added Successfully", billing: newBilling });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding billing record" });
    }
});

// Get all billing records
router.route("/bi").get(async (req, res) => {
    try {
        const billings = await Billing.find();
        res.json(billings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching billing records" });
    }
});

// Update a billing record
router.route("/upbi/:id").put(async (req, res) => {
    try {
        let billId = req.params.id;
        const { customerName, medicines, paymentMethod, date } = req.body;

        // Recalculate total amount
        let totalAmount = medicines.reduce((sum, med) => sum + med.quantity * med.price, 0);

        const updatedBilling = await Billing.findByIdAndUpdate(
            billId,
            { customerName, medicines, totalAmount, paymentMethod, date },
            { new: true }
        );

        if (!updatedBilling) {
            return res.status(404).json({ error: "Billing record not found" });
        }

        res.status(200).json({ message: "Billing updated", billing: updatedBilling });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating billing record" });
    }
});

// Delete a billing record
router.route("/deletebi/:id").delete(async (req, res) => {
    try {
        let billId = req.params.id;
        const deletedBilling = await Billing.findByIdAndDelete(billId);

        if (!deletedBilling) {
            return res.status(404).json({ error: "Billing record not found" });
        }

        res.status(200).json({ message: "Billing Deleted Successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting billing record" });
    }
});

// Get a specific billing record
router.route("/getbi/:id").get(async (req, res) => {
    try {
        let billId = req.params.id;
        const billing = await Billing.findById(billId);

        if (!billing) {
            return res.status(404).json({ error: "Billing record not found" });
        }

        res.status(200).json({ message: "Billing fetched successfully", billing });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching billing record" });
    }
});

module.exports = router;
