import { Column, Entity, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Guild, User as DiscordUser } from 'discord.js';
import Message from './Message.entity';

@Entity({ name: 'users' })
class User {
  public constructor(user: DiscordUser, guild: Guild) {
    if (user && guild) {
      this.id = user.id + guild.id;
      this.userId = user.id;
      this.username = user.username;
      this.guildId = guild.id;
      this.guildName = guild.name;
      this.createdTimestamp = user.createdTimestamp.toString();
      this.bot = user.bot;
      this.system = user.system;
      this.avatarURL = user.avatarURL();
      this.defaultAvatarURL = user.defaultAvatarURL;
      this.discriminator = user.discriminator;
      this.banner = user.banner;
      this.accentColor = user.accentColor?.toString();
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  username: string;

  @Column()
  guildId: string;

  @Column()
  guildName: string;

  @Column()
  createdTimestamp: string;

  @Column()
  bot: boolean;

  @Column()
  system: boolean;

  @Column({
    nullable: true,
  })
  avatarURL?: string;

  @Column()
  defaultAvatarURL: string;

  @Column()
  discriminator: string;

  @Column({
    nullable: true,
  })
  banner?: string;

  @Column({
    nullable: true,
  })
  accentColor?: string;

  @OneToMany(() => Message, (message) => message.user, { eager: true })
  @JoinColumn()
  messages: Message[];
}

export default User;
