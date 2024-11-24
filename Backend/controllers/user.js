
const User = require('../models/user');

exports.getAllAppointments = (req, res, next) => {
    User.findAll()
    .then((users)=>{
        console.log(users)
        res.status(200).json(users);
    })
    .catch((err)=>{
        console.log("err in getAllApoointment method");
    });
  };
  
  exports.postAddAppointment = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const phonNumber = req.body.phone;
    
    User.create({
        username: username,
        email: email,
        phonNumber: phonNumber,
    })
   .then((res)=>{
    console.log("appointmnet created successfully");
    console.log(res);
    res.status(201).json({ message: 'Appointment created', user });
    })
    .catch((err)=>{
      console.log(err , 'in postAddAppoin method');
    });

     
   
  };

  exports.deleteAppointment = (req,res,next)=>{
    const id = req.params.id;
    User.destroy({
        where : {
            id:id
        }
    })
    .then((result)=>{
        console.log(result,"user deleted");
    })
    .catch((err)=>{
        console.log(err ,"error while deleting user by id");
    })
  }

  exports.editAppointment = (req,res,next)=>{
    const id = req.params.id;
    const updatedUser = req.body;

    User.update(updatedUser, {
        where: {
            id: id
        }
    })
    .then(([updatedCount]) => {
        if (updatedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'user updated successfully' });
    })
    .catch((err)=>{
        console.log(err ,"error while edititng user by id");
    });
  }