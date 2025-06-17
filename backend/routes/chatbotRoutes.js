import express from 'express';
const router = express.Router();
// const { chatWithAI } = require('../controllers/chatbotController');
import { chatWithAI } from '../controllers/chatbotController.js';

router.post('/chatb', chatWithAI);

export default router;