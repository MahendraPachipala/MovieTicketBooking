import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = (req, res) => {
  const { username, email, password, phoneNumber, pincode } = req.body; 
  
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ success:true,message: 'User already exists' });
      }

      const newUser = new User({ username, email, password, phoneNumber, pincode });

      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
          newUser.password = hashedPassword;
          return newUser.save();
        })
        .then(savedUser => {
          const token = savedUser.generateAuthToken();
          res.header('x-auth-token', token).json({success:true, message: 'User registered successfully', token });
        })
        .catch(error => {
          console.error('Error registering user:', error);
          res.status(500).json({ success:false,message: 'Internal server error' });
        });
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
};

export const Login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ success:false,message: 'User does not exist with this email' });
      }

      bcrypt.compare(password, user.password)
        .then(validPassword => {
          if (!validPassword) {
            return res.status(400).json({ success:false,message: 'Incorrect password' });
          }

          const token = user.generateAuthToken();
            
          res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
         }).status(200).json({success:true,message: 'Login successful', token,user:user})
        })
        .catch(error => {
          console.error('Error comparing passwords:', error);
          res.status(500).json({ success:true,message: 'Internal server error' });
        });
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ success:false,message: 'Internal server error' });
    });
};


User.prototype.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY ); 
  return token;
};


