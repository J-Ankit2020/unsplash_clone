import ErrorHandler from '../middlewares/error.js';
import Image from '../models/image.js';

export const getImages = async (req, res, next) => {
  try {
    const images = await Image.find({}).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  const { label, url } = req.body;
  try {
    const image = await Image.create({
      label,
      url,
    });
    res.status(201).json({
      success: true,
      message: 'Image Uploaded Successfully',
      image,
    });
  } catch (err) {
    next(new ErrorHandler('Image should have a url', 406));
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const { password } = req.body;
    console.log(password, process.env.password);

    if (password !== process.env.password)
      return next(new ErrorHandler('Password Not Match', 401));
    const user = await Image.findById(id);
    if (!user) return next(new ErrorHandler('User not exist', 404));

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Image Deleted Successfully',
    });
  } catch (error) {
    next(new ErrorHandler('Invalid Id', 400));
  }
};
