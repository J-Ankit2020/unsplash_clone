import mongoose from 'mongoose';
import validator from 'validator';
import ErrorHandler from '../middlewares/error.js';
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error();
      }
    },
  },
  label: {
    type: String,
    required: true,
  },
});

imageSchema.methods.toJSON = function () {
  const image = this;
  const imageObject = image.toObject();
  delete imageObject.__v;
  return imageObject;
};

const Image = mongoose.model('Image', imageSchema);

export default Image;
