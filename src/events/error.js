import { client } from "../index.js";
import { WebhookClient, EmbedBuilder } from "discord.js";
import { Logger } from "../services/logger.js";



client.on("error", error => {
	new Logger("系統").error(`錯誤訊息：${error.message}`);
	try {
		const webhook = new WebhookClient({ url: process.env.ERRWEBHOO });
		webhook.send({
			embeds: [
				new EmbedBuilder().setTimestamp().setDescription(`${error.message}`)
			]
		});
	} catch (error) {
		
	}
	
});

client.on("warn", error => {
	new Logger("系統").warn(`警告訊息：${error.message}`);
});

process.on("unhandledRejection", error => {
	new Logger("系統").error(`錯誤訊息：${error.message}`);
	try {
		const webhook = new WebhookClient({ url: process.env.ERRWEBHOO });
		webhook.send({
			embeds: [
				new EmbedBuilder().setTimestamp().setDescription(`${error.message}`)
			]
		});
	} catch (error) {
		
	}
	
});

process.on("uncaughtException", console.error);
