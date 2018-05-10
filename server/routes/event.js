import express from 'express';
import event from '../controller/events';
import validate from '../middlewares/validations';
import auth from '../middlewares/authenticate';

const router = express.Router();

router.post('/', auth.Verify, validate.createEvent, event.create);
router.put('/:id', auth.Verify, validate.createEvent, event.modify);
router.get('/', auth.Verify, event.getAll);
router.delete('/:id', auth.Verify, event.delete);

export default router;
