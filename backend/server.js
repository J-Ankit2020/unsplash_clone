import app from './app.js';
import connectDB from './configs/mongoose.js';

connectDB();

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
