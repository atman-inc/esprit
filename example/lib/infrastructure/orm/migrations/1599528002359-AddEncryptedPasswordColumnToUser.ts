import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEncryptedPasswordColumnToUser1599528002359 implements MigrationInterface {
    name = 'AddEncryptedPasswordColumnToUser1599528002359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "encrypted_password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "encrypted_password"`);
    }

}
