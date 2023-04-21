import mongoose from 'mongoose';

export default function () {
  mongoose
    .connect('mongodb://127.0.0.1:27017', {
      dbName: 'unsplash',
    })
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err.message));
}
