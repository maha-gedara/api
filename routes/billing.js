const router = require("express").Router();
let Billing = require("../models/Billing");

// Create Billing Entry
router.route("/addbi").post((req, res) => {
    const { customerName, medicines, paymentMethod, date } = req.body;

    // Create a new Billing entry with auto-calculated totalAmount
    const newBilling = new Billing({
        customerName,
        medicines,
        paymentMethod,
        date
    });

    newBilling.save()
        .then(() => {
            res.json("Billing Added Successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error adding billing" });
        });
});

// Get All Billing Entries
router.route("/bi").get((req, res) => {
    Billing.find()
        .then((billings) => {
            res.json(billings);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error fetching billings" });
        });
});

// Update Billing Entry
router.route("/upbi/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { customerName, medicines, paymentMethod, date } = req.body;

    // Update totalAmount automatically before saving
    const updateBilling = {
        customerName,
        medicines,
        paymentMethod,
        date
    };

    try {
        const update = await Billing.findByIdAndUpdate(userId, updateBilling, { new: true });
        res.status(200).send({ status: "Billing updated", billing: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating billing", error: err.message });
    }
});

// Delete Billing Entry
router.route("/deletebi/:id").delete(async (req, res) => {
    let userId = req.params.id;

    try {
        await Billing.findByIdAndDelete(userId);
        res.status(200).send({ status: "Billing Deleted Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting billing", error: err.message });
    }
});

// Get Single Billing Entry by ID
router.route("/getbi/:id").get(async (req, res) => {
    let userId = req.params.id;

    try {
        const billing = await Billing.findById(userId);
        if (billing) {
            res.status(200).send({ status: "Billing fetched", billing });
        } else {
            res.status(404).send({ status: "Billing not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching billing", error: err.message });
    }
});

module.exports = router;



/*const router = require("express").Router();
let Billing = require("../models/Billing");

//create
router.route("/addbi").post((req,res)=>{

    const { customerName , medicineId, medName, quantity , price , totalAmount , paymentMethod , date } = req.body;

    const newBilling = new Billing ({
        customerName,
        medicineId,
        medName,
        quantity,
        price,
        totalAmount,
        paymentMethod,
        date

    })

    newBilling.save().then(()=>{
        res.json("Billing Adedd")
    }).catch((err)=>{
        console.log(err);
    })

})

//get
router.route("/bi").get((req,res)=>{
    Billing.find().then((billings)=>{
        res.json(billings)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/upbi/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {customerName, medicineId, medName, quantity, price, totalAmount, paymentMethod, date} = req.body;

    const updateBilling = {
        customerName,
        medicineId,
        medName,
        quantity,
        price,
        totalAmount,
        paymentMethod,
        date
    }

    const update = await Billing.findByIdAndUpdate(userId, updateBilling)
    .then(()=> {
        res.status(200).send({status: "User updated", user: update})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })

})

router.route("/deletebi/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Billing.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Billing Deleted Succesfully"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete order",error:err.message});
    })
})

router.route("/getbi/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await Billing.findById(userId)
    .then(()=> {
        res.status(200).send({status: "user fetched", user:user})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "error with a get user", error: err.message});
    })
})


module.exports = router;*/