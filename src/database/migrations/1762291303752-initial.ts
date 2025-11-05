import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1762291303752 implements MigrationInterface {
  name = 'Initial1762291303752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "writer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_e43f7a41e79384a71f5e201c323" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'MODERATOR', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(150) NOT NULL, "last_name" character varying(150) NOT NULL, "username" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "date_of_birth" date NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "director" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cast_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, CONSTRAINT "PK_16132dbea6609f2260f9da3f842" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "description" character varying(250) NOT NULL, "poster" character varying(250) NOT NULL, "price" character varying(250) NOT NULL, "release_date" date NOT NULL, "certification" character varying(10) NOT NULL, "watch_time_seconds" integer NOT NULL, "rating" double precision NOT NULL, "is_published" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_genres_genre" ("movie_id" uuid NOT NULL, "genre_id" uuid NOT NULL, CONSTRAINT "PK_a63e911ed7ae5f720dbd0108cfe" PRIMARY KEY ("movie_id", "genre_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b5a7876b5e3325f8417dd35aa8" ON "movie_genres_genre" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6bdad0a1ca42eba9baabef75ad" ON "movie_genres_genre" ("genre_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_directors_director" ("movie_id" uuid NOT NULL, "director_id" uuid NOT NULL, CONSTRAINT "PK_d2346bac3b8e74978df59be4d41" PRIMARY KEY ("movie_id", "director_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_86f0986dad9a29c6302cd35e3c" ON "movie_directors_director" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0708b006cdf0170dfd27162f00" ON "movie_directors_director" ("director_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_writers_writer" ("movie_id" uuid NOT NULL, "writer_id" uuid NOT NULL, CONSTRAINT "PK_57ef700f0411041bd9ff5236cc3" PRIMARY KEY ("movie_id", "writer_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_178b5aa2509d31a1c2f2827893" ON "movie_writers_writer" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dd2b2651012564ac7c6f30b7a9" ON "movie_writers_writer" ("writer_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_top_casts_cast_member" ("movie_id" uuid NOT NULL, "cast_member_id" uuid NOT NULL, CONSTRAINT "PK_dd191b7f8a7b657facc255d532b" PRIMARY KEY ("movie_id", "cast_member_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_301abd4009db2b8883b345515b" ON "movie_top_casts_cast_member" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b6431790be54aefeee05047120" ON "movie_top_casts_cast_member" ("cast_member_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_b5a7876b5e3325f8417dd35aa85" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_6bdad0a1ca42eba9baabef75ada" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_directors_director" ADD CONSTRAINT "FK_86f0986dad9a29c6302cd35e3c8" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_directors_director" ADD CONSTRAINT "FK_0708b006cdf0170dfd27162f007" FOREIGN KEY ("director_id") REFERENCES "director"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_writers_writer" ADD CONSTRAINT "FK_178b5aa2509d31a1c2f28278937" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_writers_writer" ADD CONSTRAINT "FK_dd2b2651012564ac7c6f30b7a96" FOREIGN KEY ("writer_id") REFERENCES "writer"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_top_casts_cast_member" ADD CONSTRAINT "FK_301abd4009db2b8883b345515bd" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_top_casts_cast_member" ADD CONSTRAINT "FK_b6431790be54aefeee050471207" FOREIGN KEY ("cast_member_id") REFERENCES "cast_member"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query-result-cache"`);
    await queryRunner.query(
      `ALTER TABLE "movie_top_casts_cast_member" DROP CONSTRAINT "FK_b6431790be54aefeee050471207"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_top_casts_cast_member" DROP CONSTRAINT "FK_301abd4009db2b8883b345515bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_writers_writer" DROP CONSTRAINT "FK_dd2b2651012564ac7c6f30b7a96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_writers_writer" DROP CONSTRAINT "FK_178b5aa2509d31a1c2f28278937"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_directors_director" DROP CONSTRAINT "FK_0708b006cdf0170dfd27162f007"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_directors_director" DROP CONSTRAINT "FK_86f0986dad9a29c6302cd35e3c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_6bdad0a1ca42eba9baabef75ada"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_b5a7876b5e3325f8417dd35aa85"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b6431790be54aefeee05047120"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_301abd4009db2b8883b345515b"`,
    );
    await queryRunner.query(`DROP TABLE "movie_top_casts_cast_member"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dd2b2651012564ac7c6f30b7a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_178b5aa2509d31a1c2f2827893"`,
    );
    await queryRunner.query(`DROP TABLE "movie_writers_writer"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0708b006cdf0170dfd27162f00"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_86f0986dad9a29c6302cd35e3c"`,
    );
    await queryRunner.query(`DROP TABLE "movie_directors_director"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6bdad0a1ca42eba9baabef75ad"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b5a7876b5e3325f8417dd35aa8"`,
    );
    await queryRunner.query(`DROP TABLE "movie_genres_genre"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "cast_member"`);
    await queryRunner.query(`DROP TABLE "director"`);
    await queryRunner.query(`DROP TABLE "genre"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "writer"`);
  }
}
