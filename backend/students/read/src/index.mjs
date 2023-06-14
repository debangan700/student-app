import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.mjs';

const app = express();
app.use(express.json());

// Connect to database
const dbUrl = 'mongodb+srv://admin:admin@practice.upzqdwk.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.error('Error connecting to database:', error));

// Routes
app.use('/students', studentRouter);

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
