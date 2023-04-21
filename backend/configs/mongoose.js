import mongoose from 'mongoose';

export default function () {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: 'unsplash',
    })
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err.message));
}
