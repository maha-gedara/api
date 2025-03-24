const router = require('express').Router();
const Salary = require('../models/Salary');

router.route('/add').post((req, res) => {
    const employeeID = req.body.employeeID;
    const name = req.body.name;
    const salary = Number(req.body.salary);
    const month = req.body.month;

    const newSalary = new Salary({
        
        employeeID,
        name,
        salary,
        month
    });

    newSalary.save().then(() => {
        res.json('Salary Added');
    }).catch((err) => {
        console.log(err);
    })
})

router.route('/').get((req, res) => {
    Salary.find().then((salaries) => {
        res.json(salaries);
    }).catch((err) => {
        console.log(err);
    })
})
router.route("/update/:id").put(async (req, res) => {
  try {
      let salaryId = req.params.id;
      const { employeeID, name, salary, month } = req.body;

      const updateSalary = {
          employeeID,
          name,
          salary,
          month,
      };

      const update = await Salary.findByIdAndUpdate(salaryId, updateSalary, { new: true });

      if (!update) {
          return res.status(404).send({ status: "Salary record not found" });
      }

      res.status(200).send({ status: "Salary Updated", updateSalary });
  } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Error with updating data", error: error.message });
  }
});



router.route('/delete/:id').delete(async (req, res) => {
  let salaryId = req.params.id;

  await Salary.findByIdAndDelete(salaryId)
  .then(() => {
    res.status(200).send({status: 'Salary Deleted'});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: 'Error with deleting data', error: err.message});
  })

})

router.route("/get/:id").get(async (req, res) => {
  let salaryId = req.params.id;
  const salary = await Salary.findById(salaryId)
  .then((salary) => {
    res.status(200).send({status: 'Salary Found', salary})
  }).catch((error) => {
    console.log(error);
    res.status(500).send({status: 'Error with getting data', error: error.message});
  })
}
)
module.exports = router;