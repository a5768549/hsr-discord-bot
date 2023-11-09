import { client } from "../index.js";
import { Events } from "discord.js";

client.on(Events.MessageCreate, async message => {
	const prefix = `<@${client.user.id}>`;
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith(prefix) ||
		message.author.id !== "283946584461410305"
	)
		return;

	const [cmd, ...args] = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);

	const command =
		client.commands.message.get(cmd.toLowerCase()) ||
		client.commands.message.find(c => c.alias?.includes(cmd.toLowerCase()));

	if (!command) return;
	await command.execute(client, message, args);
});
