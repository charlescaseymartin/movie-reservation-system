import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../modules/users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.username = faker.internet.userName();
  user.email = faker.internet.email({
    firstName: String(user.firstName).toLowerCase(),
    lastName: String(user.lastName).toLowerCase(),
  });
  user.dateOfBirth = new Date(faker.date.birthdate());
  return user;
});
