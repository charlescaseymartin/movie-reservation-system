import { setSeederFactory } from 'typeorm-extension';
import { CastMember } from '../../modules/cast-members/entities/cast-member.entity';

export default setSeederFactory(CastMember, (faker) => {
  const cast = new CastMember();
  cast.name = faker.person.fullName();
  return cast;
});
