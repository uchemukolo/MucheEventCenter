import model from '../models';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import auth from '../middlewares/authenticate'

const events = model.Events
class Event {
	static create(req, res) {
		const {userId, centerId, eventType, eventDate, duration} = req.body;
		const decoded = jwt.decode(req.headers.token);
		console.log(decoded);
		events.findAll({
			where: {
				centerId,
				eventDate
			}
		})
		.then((event) => {
			console.log(event.length);
			if (event.length >0){
				return res.status(401).send({
					message:'Date Unavailable! Please Pick Another Day'
				})
			}
			return events
			.create ({
        userId: decoded.id,
        centerId,
        eventType,
				eventDate,
				duration
      })
      .then(created =>{
				console.log('heloooo....')
				return res.status(201).send({
					message: 'Event Added Successfully',
          centerId: req.body.centerId,
					eventType,
					eventDate
        });
      })
    })
    .catch(err => {
      console.log(err)
		});
	}
	static modify (req, res) {
    const { eventType, eventDate, duration, decoded } = req.body;
    events.findOne({
      where: {
        userId: req.decoded.id,
      }
    })
      .then(events => {
      if (!events) {
        return res.status(404).send({
        message: 'Event Not Found',
        });
      } else {
        return events
        .update({
        eventType: req.body.eventType || events.eventType,
				eventDate: req.body.eventDate || events.eventDate,
				duration: req.body.duration || events.duration
      })
      .then(updated => {
        return res.status(200).send({
        message: 'Update Successful',
        updated
    });
  })
  .catch((error) => {
      res.status(500).send({
        message: 'Some Error Occured'
      });
    })
  }
  })
}
	static delete (req, res) {
		events.find ({
			where: {
				userId: req.decoded.id,
			}
		})
		.then(events => {
			console.log(events);
		if (!events) {
			return res.status(400).send({
				message: 'Event Not Found',
			});
		} else {
		return events
			.destroy()
			.then(() => res.status(200).send({
					message: 'Event has been deleted'
			}))
		}
	})
	.catch(error => res.status(400).send(error));
}
}
export default Event;