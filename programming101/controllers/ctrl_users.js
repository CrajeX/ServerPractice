const { Users } = require('../models/users');
const bcrypt = require('bcrypt');
const {validateUser, validateLogin} = require('../validations/vld_users')



// Look for the user and compare there inputed password hash it and compare it to the hashed password in the database
const signUser = async (req, res) => {
  const data = req.body;
  const {error}= validateLogin(data)
  if (error)
    return res.status(400).json({message:`${error.message}`})
  try {
    // 1. Find the user in the database by username
    const checkUser = await Users.findOne({ username: data.username });

    // 2. If user does not exist, return error
    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // 3. Compare the candidate password with the stored hash
    // --> Used built in method from the model
    const isMatch = await checkUser.isMatch(data.password);
    // --->release Data
    // ---->release message
    // ----->Release token


    // 4. If passwords match, return success response
    if (isMatch) {
      return res.status(200).json({ message: 'Account found' });
    } else {
      // If password does not match, return error
      return res.status(400).json({ message: "Invalid password" });
    }

  } catch (error) {
    // If there was an error with the database or other processing
    return res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};


const registerUser = async (req, res) => {
  const data = req.body;
  // // Gets the value of the database based on the filter (username)
  // const checkUser = await Users.findOne({username:data.username});
  //CHECK USER
  const {error}= validateUser(data)
  if (error)
    return res.status(400).json({message:`${error.message}`})
  try {
      const checkEmail = await Users.findOne({email:data.email})
      if(checkEmail){
          return res.status(400).json({message: 'Email already in use'});
      }


      const checkUser = await Users.findOne({email:data.email})
      if(checkUser){
          return res.status(400).json({message: 'Username already Exist'});
      }


     
      const newUser = new Users({
          name:data.name,
          username: data.username,
          email:data.email,
          role:data.role,
           // transform password
          password: data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(10))
      })
      await newUser.save();
      res.status(200).json({message: 'Account has been created'})
  }
  catch (error){
      res.status(500).json({message:'Error registering user',error: error.message});
  }
};
const deleteUser = async (req, res) => {
  const data = req.body;
  // console.log(data);
  // check if user exist
  const checkUser = await Users.findOne({ username: data.username });
  if (checkUser)
    {
      let user = await Users.deleteOne({ username: data.username });
      res.status(200).send('User Deleted');
      
    } 
  else{
    return res.status(404).send('User not found');
  }
 
};

const updateUser = async (req, res) => {
  const data = req.body;
  // console.log(data);
  // check if user exist
  const checkUser = await Users.findOne({ username: data.username });
  if (!checkUser) return res.status(404).send('User not found');

  let user = await Users.updateOne(
    { username: data.username }, // filter
    {
      $set: {
        username: data.username,
        // Hash the password using bcrypt
        password: data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(10))
      },
    }
    
  ); //update data
  res.status(200).json({message: 'Account has been updated'})
};
module.exports = {registerUser,deleteUser,updateUser,signUser};

