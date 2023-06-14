import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.mjs';
import crypto from 'crypto';

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
  };
  
const secretKey = generateSecretKey();

const login = async (req, res) => {

    const { email, password } = req.body;

    try
    {
        const user = await User.findOne({ email });
    if (!user) 
    {
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) 
    {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
    
    } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
  };
  
  const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  export { login,signupUser };
  