import jwt from 'jsonwebtoken';
import model from '../models';
import auth from '../middlewares/authenticate';

const center = model.Centers;
const event = model.Events;
/**
 *
 *
 * @class Center
 */
class Center {
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Center
   */
  static add(req, res) {
    const {
      name, image, address, description, decoded, location, capacity, userId, venueType, price, phoneNumber, facilities
    } = req.body;
    const Decoded = jwt.decode(req.headers.token);
    center.create({
      userId: req.decoded.id,
      name,
      image,
      address,
      description,
      phoneNumber,
      location,
      capacity,
      venueType,
      facilities,
      price
    })
      .then(created => res.status(201).send({
        message: 'Center Added Successfully',
        created
      }))
      .catch(err => res.status(500).send({
        message: 'Some error occured!'
      }));
  }
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Center
   */
  static getAll(req, res) {
    center
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
   * @memberof Center
   */
  static getOne(req, res) {
    return center.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: event,
      }],
    })
      .then((center) => {
        if (!center) {
          return res.status(400).send({
            message: 'Center Not Found',
          });
        }
        res.status(200).send({
          center,
        });
      }).catch(err => res.status(500).send({
        message: 'Some error occured!'
      }));
  }
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Center
   */
  static modify(req, res) {
    const {
      userId, name, image, address, description, phoneNumber, location, capacity, venueType, facilities, price
    } = req.body;
    const Decoded = jwt.decode(req.headers.token);
    center.findOne({
      where: {
        userId: req.decoded.id,
      }
    })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found',
          });
        }
        return center
          .update({
            userId: req.body.userId || center.userId,
            name: req.body.name || center.name,
            image: req.body.image || center.image,
            address: req.body.address || center.address,
            description: req.body.description || center.description,
            PhoneNumber: req.body.phoneNumber || center.phoneNumber,
            location: req.body.location || center.location,
            capacity: req.body.capacity || center.capacity,
            venueType: req.body.venueType || center.venueType,
            facilities: req.body.facilities || center.facilities,
            price: req.body.price || center.price
          })
          .then(created => res.status(201).send({
            message: 'Update Successful',
            created
          }))
          .catch(err => res.status(500).send({
            message: 'Some error occured!'
          }));
      });
  }
}
export default Center;
