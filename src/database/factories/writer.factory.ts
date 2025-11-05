import { setSeederFactory } from 'typeorm-extension';
import { Writer } from '../../modules/writers/entities/writer.entity';

export default setSeederFactory(Writer, (faker) => {
  const writer = new Writer();
  writer.name = faker.person.fullName();
  return writer;
});

