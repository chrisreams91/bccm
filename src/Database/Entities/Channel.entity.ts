import { TextChannel, Guild } from 'discord.js';
import { Column, Entity, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import Message from './Message.entity';

@Entity({ name: 'channels' })
class Channel {
  public constructor(channel: TextChannel, guild: Guild) {
    if (channel && guild) {
      this.id = channel.id;
      this.name = channel.name;
      this.guildId = guild.id;
      this.guildName = guild.name;
      this.lastMessageId = channel.lastMessageId;
      this.topic = channel.topic;
      this.nsfw = channel.nsfw;
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  guildId: string;

  @Column()
  guildName: string;

  @Column()
  lastMessageId: string;

  @Column({ nullable: true })
  topic: string | null;

  @Column()
  nsfw: boolean;

  @OneToMany(() => Message, (message) => message.channel)
  @JoinColumn()
  messages: Message[];
}

export default Channel;
