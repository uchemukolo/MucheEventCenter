import user from '../controller/users';
import express from 'express';
import validate from '../middlewares/validations';

const router = express.Router();

router.post('/', validate.signup, user.signup);
router.post('/login', validate.signin, user.signin);

export default router;