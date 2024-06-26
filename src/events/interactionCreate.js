import { client } from "../index.js";
import { ApplicationCommandOptionType } from "discord.js";
import { i18nMixin, toI18nLang } from "../services/i18n.js";
import { calXP } from "../services/utils.js";
import {
	Events,
	EmbedBuilder,
	WebhookClient,
	ChannelType,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} from "discord.js";
import emoji from "../assets/emoji.js";
import { Logger } from "../services/logger.js";

const db = client.db;

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.channel.type == ChannelType.DM) return;

	const i18n = i18nMixin(
		(await db?.has(`${interaction.user.id}.locale`))
			? await db?.get(`${interaction.user.id}.locale`)
			: toI18nLang(interaction.locale) || "en"
	);

	if (interaction.isModalSubmit()) {
		if (interaction.customId == "feedback") {
			const feedback = interaction.fields.getTextInputValue("suggest");

			try {
				const defaultUrl = "";
				const FBwebhook = new WebhookClient({
					url: process.env.FBWEBHOOK || defaultUrl
				});
				await FBwebhook.send({
					embeds: [
						new EmbedBuilder()
							.setColor("#FFFFFF")
							.setAuthor({
								name: `${interaction.user.username}`,
								iconURL: interaction.user.displayAvatarURL({
									size: 4096,
									dynamic: true
								}),
								url: interaction.user.displayAvatarURL({
									size: 4096,
									dynamic: true
								})
							})
							.setTimestamp()
							.setDescription(`\`\`\`\n${feedback}\`\`\``)
					]
				});
			} catch (e) {}

			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor("#FF9B9B")
						.setTitle(i18n("feedback_Sus"))
						.setThumbnail(
							"https://media.discordapp.net/attachments/1057244827688910850/1126797186844348426/310737454_186864900516151_6902700007088914183_n.png"
						)
				],
				components: [
					new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setStyle(ButtonStyle.Link)
							.setURL("https://discord.gg/mPCEATJDve")
							.setLabel(`${i18n("support")}`)
							.setEmoji(emoji.s900001)
					)
				],
				ephemeral: true
			});
		}
	}

	if (interaction.isButton()) {
		await interaction.deferUpdate().catch(() => {});
	}

	if (interaction.isCommand()) {
		const command = client.commands.slash.get(interaction.commandName);
		if (!command)
			return interaction.followUp({
				content: "An error has occured",
				ephemeral: true
			});

		if (command.data.name != "account" || command.data.name != "warp") {
		} else
			await interaction
				.deferReply({
					/*ephemeral: false*/
				})
				.catch(() => {});

		const args = [];

		for (let option of interaction.options.data) {
			if (option.type === ApplicationCommandOptionType.Subcommand) {
				if (option.name) args.push(option.name);
				option.options?.forEach(x => {
					if (x.value) args.push(x.value);
				});
			} else if (option.value) args.push(option.value);
		}

		try {
			command.execute(client, interaction, args, i18n, db, emoji);

			if (
				interaction.member.roles.cache.has("1012968415964704768") &&
				!(await db.has(`${interaction.user.id}.premium`))
			)
				await db.set(`${interaction.user.id}.premium`, true);

			const time = `花費 ${(
				(Date.now() - interaction.createdTimestamp) /
				1000
			).toFixed(2)} 秒`;

			calXP(interaction.user.id).catch(() => {});

			new Logger("指令").command(
				`${interaction.user.displayName}(${interaction.user.id}) 執行 ${command.data.name} - ${time}`
			);
			try {
				const defaultUrl = "";
				const webhook = new WebhookClient({
					url: process.env.CMDWEBHOOK || defaultUrl
				});
				webhook.send({
					embeds: [
						new EmbedBuilder()
							.setTimestamp()
							.setAuthor({
								iconURL: interaction.user.displayAvatarURL({
									size: 4096,
									dynamic: true
								}),
								name: `${interaction.user.username} - ${interaction.user.id}`
							})
							.setThumbnail(
								interaction.guild.iconURL({
									size: 4096,
									dynamic: true
								})
							)
							.setDescription(
								`\`\`\`${interaction.guild.name} - ${interaction.guild.id}\`\`\``
							)
							.addFields(
								command.data.name,
								`${
									interaction.options._subcommand
										? `> ${interaction.options._subcommand}`
										: "\u200b"
								}`,
								true
							)
					]
				});
			} catch (e) {}
		} catch (e) {
			new Logger("指令").error(`錯誤訊息：${e.message}`);
			await interaction.reply({
				content: "哦喲，好像出了一點小問題，請重試",
				ephemeral: true
			});
		}
	} else if (interaction.isContextMenuCommand()) {
		const command = client.commands.slash.get(interaction.commandName);
		if (!command) return;
		try {
			command.execute(client, interaction);
		} catch (e) {
			new Logger("指令").error(`錯誤訊息：${e.message}`);
			await interaction.reply({
				content: "哦喲，好像出了一點小問題，請重試",
				ephemeral: true
			});
		}
	}
});
