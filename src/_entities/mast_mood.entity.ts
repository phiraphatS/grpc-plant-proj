import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MastMood {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("varchar", { name: "MOOD", length: 255 })
  mood: string;

  @Column("varchar", { name: "MOOD_DESCRIPTION", length: 1000 })
  moodDescription: string;

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
}