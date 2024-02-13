import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlantMood } from "./plant_mood.entity";
import { EventLog } from "./event_log.entity";


@Entity()
export class Plant {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("varchar", { name: "NAME", length: 255 })
  name: string;

  @Column({ type: 'datetime', name: "GROWS_TIME" })
  growsTime: Date;

  @Column("integer", { name: "GROWS_LEVEL" })
  growsLevel: number;

  @Column("integer", { name: "IS_ALIVE" })
  isAlive: number;

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

  @OneToMany(
    () => PlantMood,
    (plantMood) => plantMood.plantId
  )
  plantMood: PlantMood[];

  @OneToMany(
    () => EventLog,
    (eventLog) => eventLog.plantId
  )
  eventLog: EventLog[];
}