import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import model from '../models';


require('dotenv').config();

const users = model.Users;
/**
 *
 *
 * @class User
 */
class User {
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof User
   */
  static signup(req, res) {
    const {
      username, fullName, email, phoneNumber, password
    } = req.body;
    users.find({
      where: {
        $or: [
          { email },
          { username },
          { phoneNumber }
        ]
      }
    })
      .then((found) => {
        if (found) {
          let email;
          let username;
          let phoneNumber;
          if (found.email === email) {
            email = 'Email is already in use';
          }
          if (found.username === username) {
            username = 'Username already taken';
          }
          if (found.phoneNumber === phoneNumber) {
            phoneNumber = 'Username already taken';
          }
          return res.status(409).send({
            email,
            username,
            phoneNumber
          });
        }
      });
    return users.create({
      username,
      email,
      fullName,
      phoneNumber,
      password: bcrypt.hashSync(password, 10),
    })
      .then((user) => {
        const newUser = {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber
        };
        res.status(201).send({
          message: 'Signup Successful',
          newUser
        });
      })
    // return res.status(400).send({
    //   message: 'User already exists'
    // });
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
   * @memberof User
   */
  static signin(req, res) {
    // const {
    //   username, email, phoneNumber, password,
    // } = req.body;
    users.findOne({
      where: {
        $or: [
          { username: req.body.username },
          { email: req.body.username },
          { phoneNumber: req.body.username }
        ]
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(400).send({
            message: 'Incorrect Signin Credentials!'
          });
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          const user = {
            id: foundUser.id,
            role: foundUser.role,
            username: foundUser.username
          };
          const token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24
          });
          return res.status(200).send({
            message: 'Signin Successful!',
            Token: token
          });
        } else {
          res.status(400).send({
            message: 'Incorrect Password'
          });
        }
      });
  }
}
export default User;
