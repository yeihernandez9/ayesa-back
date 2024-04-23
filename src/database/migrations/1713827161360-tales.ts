import { MigrationInterface, QueryRunner } from "typeorm";

export class Tales1713827161360 implements MigrationInterface {
    name = 'Tales1713827161360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "lastname" character varying, "avatar" character varying, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), "datail_id" uuid NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_e9a87388523f59c099c5085b8f" UNIQUE ("datail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e9a87388523f59c099c5085b8fb" FOREIGN KEY ("datail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e9a87388523f59c099c5085b8fb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13380e7efec83468d73fc37938"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99b019339f52c63ae615358738"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
    }

}
