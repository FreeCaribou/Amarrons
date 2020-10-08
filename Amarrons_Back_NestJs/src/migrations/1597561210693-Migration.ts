import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

export class Mirgation1597561210693 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // drop all table
        await queryRunner.query(
            `SET foreign_key_checks = 0`
        );
        await queryRunner.query(
            `TRUNCATE TABLE marker`
        );
        await queryRunner.query(
            `TRUNCATE TABLE marker_type`
        );
        await queryRunner.query(
            `TRUNCATE TABLE user`
        );
        await queryRunner.query(
            `TRUNCATE TABLE role`
        );
        await queryRunner.query(
            `SET foreign_key_checks = 1`
        );

        // init some table
        // marker types
        await queryRunner.query(
            `INSERT INTO marker_type ('id', 'code', 'label') VALUES (NULL, '1', 'Port')`
        );
        await queryRunner.query(
            `INSERT INTO marker_type ('id', 'code', 'label') VALUES (NULL, '2', 'View')`
        );

        // some markers
        await queryRunner.query(
            `INSERT INTO marker VALUES (NULL, 'Cinquantenaire', '1', '50.840255', '4.394491')`
        );
        await queryRunner.query(
            `INSERT INTO marker VALUES (NULL, 'Akershus Festning', '1', '59.907684', '10.737054')`
        );
        await queryRunner.query(
            `INSERT INTO marker VALUES (NULL, 'Le Berlaymont', '1', '50.843656', '4.382397')`
        );

        // the role
        await queryRunner.query(
            "INSERT INTO `role` (`id`, `code`, `label`) VALUES (NULL, '1', 'simple-user')"
        );
        await queryRunner.query(
            "INSERT INTO `role` (`id`, `code`, `label`) VALUES (NULL, '2', 'modo')"
        );
        await queryRunner.query(
            "INSERT INTO `role` (`id`, `code`, `label`) VALUES (NULL, '3', 'admin')"
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
