const router = require("express").Router();
let Inventory = require("../models/Inventory");

/// New route to check existing inventory
router.route("/checkin").get(async (req, res) => {
    const { medicineName, price, expiryDate } = req.query;

    try {
        // Convert price to number to ensure accurate comparison
        const numericPrice = parseFloat(price);

        // Find an inventory entry matching medicine name, price, and expiry date
        const existingInventory = await Inventory.findOne({
            medicineName, 
            price: numericPrice, 
            expiryDate
        });

        if (existingInventory) {
            res.json({ 
                exists: true, 
                medicine: existingInventory 
            });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking inventory:', error);
        res.status(500).json({ 
            message: 'Error checking inventory', 
            error: error.message 
        });
    }
});

// Existing route for adding inventory (previously modified)
router.route("/addin").post(async (req, res) => {
    const { medicineName, category, price, quantity, expiryDate, supplier } = req.body;

    try {
        // Check if an inventory entry with the same medicine, price, and expiry date exists
        const existingInventory = await Inventory.findOne({
            medicineName, 
            price, 
            expiryDate
        });

        if (existingInventory) {
            // If exists, update the quantity
            existingInventory.quantity += quantity;
            await existingInventory.save();
            
            return res.json({
                message: "Inventory Updated Successfully.",
                inventory: existingInventory
            });
        }

        // If no existing entry, create a new inventory
        const newInventory = new Inventory({
            medicineName,
            category,
            price,
            quantity,
            expiryDate,
            supplier
        });

        await newInventory.save();
        res.status(201).json({
            message: "New Inventory Added Successfully.",
            inventory: newInventory
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            error: "Error processing inventory.", 
            details: err.message 
        });
    }
});


router.route("/in").get(async (req, res) => {
    
    Inventory.find().then((Inventory) => {
        res.json(Inventory);
    }).catch((err) => {
        console.log(err);
    });

});

router.route("/updatein/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const{medicineName,category,price,quantity,expiryDate,supplier} = req.body;

    const updateInventory = {
        medicineName,
        category,
        price,
        quantity,
        expiryDate,
        supplier
    }

    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(userId, updateInventory);
        if (!updatedInventory) {
            return res.status(404).send({ status: "Error with Updating Inventory", error: "Inventory not found" });
        }
        res.status(200).send({ status: "Inventory Updated Successfully", user: updateInventory });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Inventory", error: err.message });
    }
});

router.route("/deletein/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Inventory.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"Inventory Deleted Succesfully"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete inventory",error:err.message});
    })
});



router.route("/getin/:id").get(async (req, res) => {
    try {
        const inventoryRecord = await Inventory.findById(req.params.id);
        if (!inventoryRecord) {
            return res.status(404).json({ error: "Inventory record not found" });
        }
        res.status(200).json(inventoryRecord);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching inventory record" });
    }
});




module.exports = router;
