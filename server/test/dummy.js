import faker from 'faker';

const dummyData = {
  newUsers: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    phoneNumber: '08027270618',
    password: '11110000',
    confirmPassword: '11110000'
  },

  noFullNameUsers: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phoneNumber: '08027270618',
    password: '11110000',
    confirmPassword: '11110000'
  },

  noEmailUsers: {
    username: faker.internet.userName(),
    fullName: faker.name.firstName(),
    phoneNumber: '08027270618',
    password: '11110000',
    confirmPassword: '11110000'
  },

  noPasswordUsers: {
    username: faker.internet.userName(),
    fullName: faker.name.firstName(),
    email: faker.internet.email(),
    phoneNumber: '08027270618',
    confirmPassword: '11110000'
  },
  passMismatchUsers: {
    username: faker.internet.userName(),
    fullName: faker.name.firstName(),
    email: faker.internet.email(),
    phoneNumber: '08027270618',
    password: '111100',
    confirmPassword: '11110000'
  },
  lessPass: {
    username: faker.internet.userName(),
    fullName: faker.name.firstName(),
    email: faker.internet.email(),
    phoneNumber: '08027270618',
    password: '111',
    confirmPassword: '11110000'
  },
  noUsernameUsers: {
    fullName: faker.name.firstName(),
    email: faker.internet.email(),
    phoneNumber: '08027270618',
    password: '11110000',
    confirmPassword: '11110000'
  },

};

export default dummyData;
