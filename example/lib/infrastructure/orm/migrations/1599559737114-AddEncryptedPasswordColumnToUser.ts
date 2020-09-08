import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEncryptedPasswordColumnToUser1599559737114 implements MigrationInterface {
    name = 'AddEncryptedPasswordColumnToUser1599559737114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "encryptedPassword" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "encryptedPassword"`);
    }

}
