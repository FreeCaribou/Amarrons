import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Marker } from "./marker.entity";

@Entity()
export class MarkerOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  label: string;

  @ManyToMany(
    type => Marker,
    marker => marker.markerOptions
  )
  markers: Marker[];
}