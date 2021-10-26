import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Group } from "./group";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  login!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column("integer")
  age!: number;

  @Column("boolean")
  isDeleted!: boolean;

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }

  @ManyToMany(() => Group, group => group.users)
  groups!: Group[];
}
