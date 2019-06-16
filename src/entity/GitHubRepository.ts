import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class GitHubRepository {
  @Column()
  public archived!: boolean;

  @Column()
  public created_at!: string;

  @Column()
  public disabled!: boolean;

  @Column("varchar", { nullable: true })
  public description!: string | null;

  @Column()
  public fork!: boolean;

  @Column()
  public forks_count!: number;

  @Column()
  public html_url!: string;

  @PrimaryColumn()
  public id!: number;

  @Column("varchar", { nullable: true })
  public language!: string | null;

  @Column()
  public name!: string;

  @Column()
  public private!: boolean;

  @Column("varchar", { nullable: true })
  public pushed_at!: string | null;

  @Column()
  public stargazers_count!: number;

  @Column("varchar", { nullable: true })
  public updated_at!: string | null;

  @Column()
  public watchers_count!: number;
}
