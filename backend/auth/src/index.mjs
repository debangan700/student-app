import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.mjs';

const app = express();
app.use(express.json());

// Set up database connection

const dbUrl = 'mongodb+srv://admin:admin@practice.upzqdwk.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to Database');
    // Start the server here
  })
  .catch((error) => {
    console.error('Failed to connect to database', error);
  });

  app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
