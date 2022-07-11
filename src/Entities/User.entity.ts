import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public username: string;

  @Column()
  public bot: boolean;

  @Column({
    nullable: true,
  })
  public avatar?: string | null;

  @Column({
    nullable: true,
  })
  public email?: string | null;
}

export default User;
