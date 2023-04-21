import express from 'express';
import { deleteImage, getImages, uploadImage } from '../controllers/image.js';
const router = express.Router();

router.get('/images/all', getImages);

// upload
router.post('/upload', uploadImage);

router.delete('/images/:id', deleteImage);

export default router;
