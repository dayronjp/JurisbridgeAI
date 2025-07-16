// src/routes/userRoutes.js
import express from 'express';
import multer from 'multer';
import {
  registerUser,
  loginUser,
  getUserProfile,        
  updateDescription,
  updateAvatar,
  getAvatar,
  getAllUsers      
} from '../../../backend/src/controllers/userController.js';

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.put('/update-description', updateDescription);
router.get('/avatar/:name', getAvatar);
router.put('/update-avatar', upload.single('avatar'), updateAvatar);
router.get('/all', getAllUsers);


export default router;