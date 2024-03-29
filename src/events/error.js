import { client } from "../index.js";
import { WebhookClient, EmbedBuilder } from "discord.js";
import { Logger } from "../services/logger.js";

client.on("error", error => {
	console.error(error);
	new Logger("系統").error(`錯誤訊息：${error.message}`);
	try {
		const defaultUrl = "";
		const webhook = new WebhookClient({
			url: process.env.ERRWEBHOOK || defaultUrl
		});
		webhook.send({
			embeds: [
				new EmbedBuilder()
					.setTimestamp()
					.setDescription(`${error.message}`)
			]
		});
	} catch (e) {}
});

client.on("warn", error => {
	new Logger("系統").warn(`警告訊息：${error.message}`);
});

process.on("unhandledRejection", error => {
	console.log(error);
	if (error instanceof Error) {
		new Logger("系統").error(`錯誤訊息：${error.message}`);
		try {
			const defaultUrl = "";
			const webhook = new WebhookClient({
				url: process.env.ERRWEBHOOK || defaultUrl
			});
			webhook.send({
				embeds: [
					new EmbedBuilder()
						.setTimestamp()
						.setDescription(`${error.message}`)
				]
			});
		} catch (e) {}
	}
});

process.on("uncaughtException", console.error);
