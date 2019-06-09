import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Repository {
  @Column()
  private archived: boolean;

  @Column()
  private created_at: string;

  @Column()
  private disabled: boolean;

  @Column("varchar", { nullable: true })
  private description: string | null;

  @Column()
  private fork: boolean;

  @Column()
  private forks_count: number;

  @Column()
  private html_url: string;

  @PrimaryColumn()
  private id: number;

  @Column("varchar", { nullable: true })
  private language: string | null;

  @Column()
  private name: string;

  @Column()
  private private: boolean;

  @Column("varchar", { nullable: true })
  private pushed_at: string | null;

  @Column()
  private stargazers_count: number;

  @Column("varchar", { nullable: true })
  private updated_at: string | null;

  @Column()
  private watchers_count: number;
}
