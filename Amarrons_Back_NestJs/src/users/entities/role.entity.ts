import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * code 1 - simple-user
 * code 2 - modo - can propose new location
 * code 3 - admin - can accept and create new location / change other user role
 */
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  label: string;
}