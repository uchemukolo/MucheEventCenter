class Validation {
  static signup(req, res, next) {
    const {
      username, fullName, email, phoneNumber, password, confirmPassword 
} = req.body;
    if (!username || typeof username !== 'string') {
      return res.status(400).send({
        username: 'Please Enter Username'
      });
    } else if (!fullName || typeof fullName !== 'string') {
      return res.status(400).send({
        email: 'Please Enter Your First Name'
      });
    } else if (!email || typeof email !== 'string') {
      return res.status(400).send({
        email: 'Please Enter Email'
      });
    } else if (!phoneNumber) {
      return res.status(400).send({
        email: 'Please Enter Your Phone Number'
      });
    } else if (!password) {
      return res.status(400).send({
        password: 'Please Enter password'
      });
    } else if (password.length < 6) {
      return res.status(400).send({
        password: 'Password is too short!'
      });
    } else if (password !== confirmPassword) {
      return res.status(400).send({
        password: 'password does not match'
      });
    } next();
  }
  static signin(req, res, next) {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string') {
      res.status(400).send({
        message: 'Please enter Your username or email or Phone Number'
      });
    } else if (!password) {
      res.status(400).send({
        message: 'Please enter Your Password'
      });
    } next();
  }
  static createEvent(req, res, next) {
    const {
      userId, centerId, eventType, eventDate, duration
    } = req.body;
    if (!centerId || isNaN(centerId)) {
      res.status(400).send({
        message: 'Please include the center ID '
      });
    } else if (!eventType || typeof eventType !== 'string') {
      res.status(400).send({
        message: 'Please Select Type Of Event'
      });
    } else if (!eventDate) {
      res.status(400).send({
        message: 'Please Choose a Date'
      });
    } else if (!duration) {
      res.status(400).send({
        message: 'Please Provide the number of days of Event'
      });
    } next();
  }
  static addCenter(req, res, next) {
	  const {
		  userId, name, address, description, location, capacity, venueType, price, phoneNumber 
    }
	= req.body;
    if (!name || typeof name !== 'string') {
      res.status(400).send({
        message: 'Please Add Name Of The Center!'
      });
    } else if (!address || typeof address !== 'string') {
      res.status(400).send({
        message: 'Please Add Description!'
      });
    } else if (!description || typeof description !== 'string') {
      res.status(400).send({
        message: 'Please Add Description!'
      });
    } else if (!userId) {
      return res.status(400).send({
        message: 'Field Cannot Be Empty!'
      });
    } else if (!location || typeof location !== 'string') {
      res.status(400).send({
        message: 'Please Select location Of Event Center'
      });
    } else if (!capacity) {
      res.status(400).send({
        message: 'Please add Capacity'
      });
    } else if (!venueType || typeof venueType !== 'string') {
      res.status(400).send({
        message: 'Please Select Venue Type'
      });
    } else if (!price || typeof price !== 'string') {
      res.status(400).send({
        message: 'Please Select Venue Type'
      });
    } else if (!phoneNumber || typeof phoneNumber !== 'string') {
      res.status(400).send({
        message: 'Please Select Venue Type'
      });
    } next();
  }
}
export default Validation;
