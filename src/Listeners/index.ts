import { Client } from "discord.js";
import { memberLeftServerEvent, handleMemberLeft } from "./MemberLeftServer";

export const registerListeners = (client: Client) => {
  client.on(memberLeftServerEvent, handleMemberLeft);
};
