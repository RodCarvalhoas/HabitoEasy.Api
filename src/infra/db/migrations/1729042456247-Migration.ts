import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729042456247 implements MigrationInterface {
    name = 'Migration1729042456247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "AUTHENTICATION_USER" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NAME" character varying NOT NULL, "EMAIL" character varying NOT NULL, "PASSWORD" character varying NOT NULL, "USER_TYPE" character varying NOT NULL, "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32a61911bced591ac930a423f9d" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "AUTHENTICATION_USER"`);
    }

}
