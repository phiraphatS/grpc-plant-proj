import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Plant } from "./plant.entity";
import { MoodLevelStage } from "./mood_level_stage.entity";


@Entity()
export class PlantMood {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("integer", { name: "MOOD_ID" })
  moodId: number;

  @Column("integer", { name: "MOOD_LEVEL" })
  moodLevel: number;

  @Column("integer", { name: "IS_POSITIVE" })
  isPositive: number;

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

  @OneToMany(
    () => MoodLevelStage,
    (moodLevelStage) => moodLevelStage.plantMoodId
  )
  moodLevelStage: MoodLevelStage[];
}