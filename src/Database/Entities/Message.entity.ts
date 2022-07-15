import { Column, Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import User from './User.entity';
import Channel from './Channel.entity';

@Entity({ name: 'messages' })
class Message {
  @PrimaryColumn()
  public id: string;

  @Column()
  public content: string;

  @Column()
  public createdTimestamp: string;

  @Column()
  public type: string;

  @Column()
  public system: boolean;

  @Column()
  public pinned: boolean;

  @ManyToOne(() => User, (user) => user.messages, {
    cascade: ['insert'],
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.messages, {
    cascade: ['insert'],
  })
  @JoinColumn()
  channel: Channel;
}

export default Message;
