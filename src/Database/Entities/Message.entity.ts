import { Column, Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import User from './User.entity';
import Channel from './Channel.entity';

@Entity({ name: 'messages' })
class Message {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  createdTimestamp: string;

  @Column()
  type: string;

  @Column()
  system: boolean;

  @Column()
  pinned: boolean;

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
