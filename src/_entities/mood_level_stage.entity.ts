import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlantMood } from "./plant_mood.entity";

@Entity()
export class MoodLevelStage {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("integer", { name: "MOOD_LEVEL" })
  moodLevel: number;

  @Column("integer", { name: "STAGE" })
  stage: number;

  @Column("integer", { name: "MAX_STAGE" })
  maxStage: number;

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

  @Column("integer", { name: "PLANT_MOOD_ID" })
  plantMoodId: number;

  @ManyToOne(
    () => PlantMood,
    (plantMood) => plantMood.id,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "PLANT_MOOD_ID", referencedColumnName: "id" }])
  plantMood: PlantMood;
}