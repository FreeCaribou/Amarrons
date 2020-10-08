import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import { MarkerOption } from "./marker-option.entity";
import { MarkerType } from "./marker-type.entity";

@Entity()
export class Marker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  label: string;

  @Column("double")
  lat: number;

  @Column("double")
  lng: number;

  @ManyToOne(type => MarkerType)
  markerType: MarkerType;

  @JoinTable()
  @ManyToMany(
    type => MarkerOption,
    markerOption => markerOption.markers,
  )
  markerOptions: MarkerOption[];
}