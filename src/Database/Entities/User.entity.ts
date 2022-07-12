import { Column, Entity, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import Message from './Message.entity';

@Entity({ name: 'users' })
class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public username: string;

  @Column()
  public createdTimestamp: string;

  @Column()
  public bot: boolean;

  @Column()
  public system: boolean;

  @Column()
  public avatar: string;

  @Column()
  public discriminator: string;

  @Column({
    nullable: true,
  })
  public email?: string;

  @Column({
    nullable: true,
  })
  banner?: string;

  @Column({
    nullable: true,
  })
  accentColor?: string;

  @OneToMany(() => Message, (message) => message.user)
  @JoinColumn()
  messages: Message[];
}

export default User;
