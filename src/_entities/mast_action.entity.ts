import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MastAction {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("varchar", { name: "ACTION_NAME", length: 255 })
  actionName: string;

  @Column("varchar", { name: "ACTION_DESCRIPTION", length: 255 })
  actionDescription: string;

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