import center from '../controller/centers';
import express from 'express';
import auth from '../middlewares/authenticate';
import validate from '../middlewares/validations';

const router = express.Router();


router.post('/', auth.Verify, auth.Admin, validate.addCenter, center.add);
router.put('/:id', auth.Verify, auth.Admin, validate.addCenter, center.modify);
router.get('/', auth.Verify, center.getAll);
router.get('/:id', auth.Verify, center.getOne);

export default router;
