import { Column, Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Message as DiscordMessage } from 'discord.js';
import User from './User.entity';
import Channel from './Channel.entity';

@Entity({ name: 'messages' })
class Message {
  public constructor(message: DiscordMessage) {
    if (message) {
      this.id = message.id;
      this.content = message.content;
      this.createdTimestamp = message.createdTimestamp.toString();
      this.type = message.type;
      this.system = message.system;
      this.pinned = message.pinned;
    }
  }

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
