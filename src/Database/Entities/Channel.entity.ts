import { Column, Entity, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import Message from './Message.entity';

@Entity({ name: 'channels' })
class Channel {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public lastMessageId: string;

  @Column({ nullable: true })
  public topic: string | null;

  @Column()
  public nsfw: boolean;

  @OneToMany(() => Message, (message) => message.channel)
  @JoinColumn()
  messages: Message[];
}

export default Channel;
