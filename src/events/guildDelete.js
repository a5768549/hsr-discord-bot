import { client } from "../index.js";
import { Events, WebhookClient, EmbedBuilder } from "discord.js";
import moment from "moment";

client.on(Events.GuildDelete, async guild => {
	try {
		if (process.env.JLWEBHOOK) {
			const webhook = new WebhookClient({ url: process.env.JLWEBHOOK });

			webhook.send({
				embeds: [
					new EmbedBuilder()
						.setColor("#E74C3C")
						.setThumbnail(guild.iconURL())
						.setTitle("已離開伺服器")
						.addFields({
							name: "名稱",
							value: `\`${guild.name}\``,
							inline: false
						})
						.addFields({
							name: "ID",
							value: `\`${guild.id}\``,
							inline: false
						})
						.addFields({
							name: "擁有者",
							value: `<@${guild.ownerId}>`,
							inline: false
						})
						.addFields({
							name: "人數",
							value: `\`${guild.memberCount}\` 個成員`,
							inline: false
						})
						.addFields({
							name: "建立時間",
							value: `<t:${moment(guild.createdAt).unix()}:F>`,
							inline: false
						})
						.addFields({
							name: (client.user) ? `${client.user.username} 的伺服器數量` : "client.user不存在",
							value: `\`${client.guilds.cache.size}\` 個伺服器`,
							inline: false
						})
						.setTimestamp()
				]
			});
		}
	} catch (error) {}
});
