import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user";

@Entity("groups")
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column("varchar", { array: true })
  permissions!: string[];

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }

  @ManyToMany(() => User, user => user.groups, { cascade: true })
  @JoinTable({ name: "user_group" })
  users!: User[];
}
