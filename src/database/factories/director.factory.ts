import { setSeederFactory } from 'typeorm-extension';
import { Director } from '../../modules/directors/entities/director.entity';

export default setSeederFactory(Director, (faker) => {
  const director = new Director();
  director.name = faker.person.fullName();
  return director;
});

