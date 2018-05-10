import jwt from 'jsonwebtoken';
import model from '../models';

const events = model.Events;
/**
 *
 *
 * @class Event
 */
class Event {
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Event
   */
  static create(req, res) {
    const {
      centerId, eventType, eventDate, duration
    } = req.body;
    const decoded = jwt.decode(req.headers.token);
    events.findAll({
      where: {
        centerId,
        eventDate
      }
    })
      .then((event) => {
        if (event.length > 0) {
          return res.status(401).send({
            message: 'Date Unavailable! Please Pick Another Day'
          });
        }
        return events
          .create({
            userId: decoded.id,
            centerId,
            eventType,
            eventDate,
            duration
          })
          .then(created => res.status(201).send({
            message: 'Event Booked Successfully',
            centerId: req.body.centerId,
            created,
            eventType,
            eventDate
          }));
      })
      .catch(() => {
        res.status(500).send({
          message: 'some error occured!'
        });
      });
  }
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Event
   */
  static modify(req, res) {
    events.findOne({
      where: {
        userId: req.decoded.id,
      }
    });
    // .then((events) => {
    if (!events) {
      return res.status(404).send({
        message: 'Event Not Found',
      });
    }
    return events
      .update({
        eventType: req.body.eventType || events.eventType,
        eventDate: req.body.eventDate || events.eventDate,
        duration: req.body.duration || events.duration
      })
      .then(updated => res.status(200).send({
        message: 'Update Successful',
        updated
      }))
      .catch(() => {
        res.status(500).send({
          message: 'Some Error Occured'
        });
      });
  }
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Event
   */
  static getAll(req, res) {
    events
      .all()
      .then(getAll => res.status(200).send({
        message: 'Successful',
        getAll
      }));
  }
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Event
   */
  static delete(req, res) {
    events.find({
      where: {
        userId: req.decoded.id,
      }
    })
      .then(() => {
        if (!events) {
          return res.status(400).send({
            message: 'Event Not Found',
          });
        }
        return events
          .destroy()
          .then(() => res.status(200).send({
            message: 'Event has been deleted'
          }));
      })
      .catch(error => res.status(400).send(error));
  }
}
export default Event;
