import event from '../controller/events';
import express from 'express';
import validate from '../middlewares/Validations';
import auth from '../middlewares/authenticate';

const router = express.Router();

router.post('/', auth.Verify, validate.createEvent, event.create);
router.put('/:id', auth.Verify, validate.createEvent, event.modify);
router.delete('/:id', auth.Verify, event.delete);

export default router;
