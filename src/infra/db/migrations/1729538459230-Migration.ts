import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729538459230 implements MigrationInterface {
    name = 'Migration1729538459230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DAY_OF_WEEK" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "DAY" integer NOT NULL, "HABIT" uuid, CONSTRAINT "PK_ec4c2a3c4c7ec3e69a013b49cf3" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "HABIT" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NAME" character varying NOT NULL, "DURATION_IN_MINUTES" integer NOT NULL, "AUTHENTICATION_USER" uuid, CONSTRAINT "PK_e77dbcd0663e69c1ef28d0f1843" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "DAY_OF_WEEK" ADD CONSTRAINT "FK_6cb73ccc29f1afd2b28c8f92102" FOREIGN KEY ("HABIT") REFERENCES "HABIT"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "HABIT" ADD CONSTRAINT "FK_567e060b9b43f1d8ad52b3a4af5" FOREIGN KEY ("AUTHENTICATION_USER") REFERENCES "AUTHENTICATION_USER"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HABIT" DROP CONSTRAINT "FK_567e060b9b43f1d8ad52b3a4af5"`);
        await queryRunner.query(`ALTER TABLE "DAY_OF_WEEK" DROP CONSTRAINT "FK_6cb73ccc29f1afd2b28c8f92102"`);
        await queryRunner.query(`DROP TABLE "HABIT"`);
        await queryRunner.query(`DROP TABLE "DAY_OF_WEEK"`);
    }

}
