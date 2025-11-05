import { setSeederFactory } from 'typeorm-extension';
import { Genre } from '../../modules/genres/entities/genre.entity';

export default setSeederFactory(Genre, (faker) => {
  const genre = new Genre();
  genre.name = faker.music.genre();
  return genre;
});
