import express from 'express';
import { createToken, loginWithToken, validateToken } from '../Controllers/TokenController.js';

const router = express.Router();

router.post('/generate', createToken);
router.get('/validate/:token', validateToken);
router.post('/login', loginWithToken);

export default router;
