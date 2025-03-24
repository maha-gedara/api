const router = require("express").Router();
const StaffMember = require("../models/staffMember");

router.route("/add").post((req,res)=>{

   const employeeID = req.body.employeeID;
   const name = req.body.name;
   const age = Number(req.body.age);
   const gender = req.body.gender;
   const nic = req.body.nic;
   const email = req.body.email;
   const address = req.body.address;
   const jobtype = req.body.jobtype;


   const newStaffMember = new StaffMember({
      
      employeeID,
      name,
      age,
      gender,
      nic,
      email,
      address,
      jobtype

}) 
newStaffMember.save().then(()=>{
    res.json("Staff Member Added")

}).catch((err)=>{
    console.log(err);

})
})

router.route("/").get((req,res)=>{
      StaffMember.find().then((staffMembers)=>{
         res.json(staffMembers)
      }).catch((err)=>{
         console.log(err);
      })
})

router.route("/update/:id").put(async(req, res) => {
  try{
   let userId = req.params.id;
   const {employeeID,name,age,gender,nic,email,address,jobtype} = req.body;

   const updateStaffMember = {

      employeeID,
      name,
      age,
      gender,
      nic,
      email,
      address,
      jobtype
};
const update = await StaffMember.findByIdAndUpdate(userId,updateStaffMember,{new:true});
if(!update){
   return res.status(404).send({status: "Staff Member not found"});
}
res.status(200).send({status: "Staff Member Updated", updateStaffMember})
}catch(error){
      console.log(err);
      res.status(500).send({status: "Error with updating data",error: err.message});
   }

});
router.route("/delete/:id").delete(async (req,res) => {
   let userId = req.params.id;

   await StaffMember.findByIdAndDelete(userId)
   .then(() => {
      res.status(200).send({status: "Staff Member Deleted"});
   }).catch((err) => {
      console.log(err.message);
      res.status(500).send({status: "Error with deleting user", error: err.message});
   })
})

router.route("/get/:id").get(async (req,res) => {
      let userId = req.params.id;
      const user = await StaffMember.findById(userId)
      .then((member) => { 
         res.status(200).send({status: "Staff Member", member})
      }).catch(() => {
         console.log(err.message);
         res.status(500).send({status: "Error with get user", error: err.message});
      })
   })
      
module.exports = router;