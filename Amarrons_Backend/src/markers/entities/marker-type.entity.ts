import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MarkerType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  label: string;
}