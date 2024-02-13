import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Plant } from "./plant.entity";

@Entity()
export class EventLog {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("varchar", { name: "EVENT_NAME", length: 255 })
  eventName: string;

  @Column("integer", { name: "ACTION_ID" })
  actionId: number;

  @Column({ type: 'datetime', name: 'ACTION_AT' })
  actionAt: Date;

  @Column("integer", { name: "IS_ACTIVE" })
  isActive: number;

  @Column("integer", { name: "IS_DELETED" })
  isDeleted: number;

  @Column({ type: 'datetime', name: 'CREATED_DATE' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'MODIFIED_DATE' })
  modifiedDate: Date;

  @Column("integer", { name: "CREATED_BY" })
  createdBy: number;

  @Column("integer", { name: "MODIFIED_BY" })
  modifiedBy: number;

  @Column("integer", { name: "PLANT_ID" })
  plantId: number;

  @ManyToOne(
    () => Plant,
    (plant) => plant.id,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "PLANT_ID", referencedColumnName: "id" }])
  plant: Plant;
}