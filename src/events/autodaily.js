import { client } from "../index.js";
import { HonkaiStarRail, LanguageEnum } from "hoyoapi";
import { EmbedBuilder, WebhookClient } from "discord.js";
import { QuickDB } from "quick.db";
import { i18nMixin } from "../services/i18n.js";
const webhook = new WebhookClient({ url: client.config.LOGWEBHOOK });
const db = new QuickDB();

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let total = 0;
let signed = 0;
let fail = 0;
let sus = 0;

export default async function dailyCheck() {
	const daily = await db.get("autoDaily");
	const nowTime = new Date().toLocaleString("en-US", {
		timeZone: "Asia/Taipei",
		hour: "numeric",
		hour12: false
	});

	const start_time = Date.now();
	total = 0;
	signed = 0;
	fail = 0;
	sus = 0;

	const autoDaily = Object.keys(daily);
	const promises = autoDaily.map(async id => {
		const time = daily[id]?.time || "13";
		if (parseInt(time) === nowTime) {
			const uid = await db.get(`${id}.uid`);
			const cookie = await db.get(`${id}.cookie`);
			const locale = (await db.has(`${id}.locale`))
				? await db.get(`${id}.locale`)
				: "tw";

			const tr = i18nMixin(locale);
			const channelId = daily[id].channelId;
			const tag = daily[id].tag === "true" ? `<@${id}>` : "";
			let channel;

			try {
				channel = await client.channels.fetch(channelId);
			} catch (e) {}

			if (await hasValidAccount(id, uid, cookie)) {
				await dailySend(daily, id, uid, cookie, channel, tr);
			} else {
				await dailySend(daily, id, uid, cookie, channel, tr);
			}
		}
	});

	await Promise.all(promises);
	UpdateStatistics(total, start_time, sus, fail, signed, nowTime);
}

async function hasValidAccount(id, uid, cookie) {
	if (await db.has(`${id}.account`)) {
		const accounts = await db.get(`${id}.account`);
		return accounts.every(account => account.uid && account.cookie);
	} else {
		return uid && cookie;
	}
}

async function dailySend(daily, id, uid, cookie) {
	total++;
	const locale = (await db?.has(`${id}.locale`))
		? await db?.get(`${id}.locale`)
		: "tw";
	const tr = i18nMixin(locale);
	const channelId = daily[id].channelId;
	const tag = daily[id].tag == "true" ? `<@${id}>` : "";
	let channel;
	try {
		channel = await client.channels.fetch(channelId);
	} catch (e) {}

	try {
		const hsr = new HonkaiStarRail({
			cookie: cookie,
			lang: (await db?.has(`${id}.locale`))
				? (await db?.get(`${id}.locale`)) == "en"
					? LanguageEnum.ENGLISH
					: LanguageEnum.TRADIIONAL_CHINESE
				: LanguageEnum.TRADIIONAL_CHINESE
		});

		const info = await hsr.daily.info();
		const reward = await hsr.daily.reward();
		const rewards = await hsr.daily.rewards();
		const todaySign =
			rewards.awards[
				info.month_last_day != true
					? info.total_sign_day
					: info.total_sign_day - 1
			];
		const tmrSign =
			rewards.awards[
				info.month_last_day != true
					? info.total_sign_day + 1
					: info.total_sign_day
			];
		const res = await hsr.daily.claim();

		if (res.code == -5003 || res.info.is_sign == true) {
			signed++;
		} else {
			sus++;
			channel?.send({
				content: tag,
				embeds: [
					new EmbedBuilder()
						.setConfig()
						.setTitle(`${tr("auto")}${tr("daily_sign")}`)
						.setThumbnail(todaySign?.icon)
						.setDescription(
							`<@${id}> ${tr("daily_desc", {
								a: `\`${todaySign?.name}x${todaySign?.cnt}\``
							})}${
								info.month_last_day != true
									? `\n\n${tr("daily_desc2", {
											b: `\`${tmrSign?.name}x${tmrSign?.cnt}\``
									  })}`
									: ""
							}`
						)
						.addFields(
							{
								name: `${reward.month} ${tr("daily_month")}`,
								value: "\u200b",
								inline: true
							},
							{
								name: tr("daily_signedDay", {
									z:
										info.month_last_day != true
											? info.total_sign_day + 1
											: info.total_sign_day
								}),
								value: "\u200b",
								inline: true
							},
							{
								name: tr("daily_missedDay", {
									z: info.sign_cnt_missed
								}),
								value: "\u200b",
								inline: true
							}
						)
				]
			});
		}
	} catch (e) {
		fail++;
		channel?.send({
			content: tag,
			embeds: [
				new EmbedBuilder()
					.setConfig("#E76161")
					.setThumbnail(
						"https://cdn.discordapp.com/attachments/1057244827688910850/1149967646884905021/1689079680rzgx5_icon.png"
					)
					.setTitle(`${tr("auto")}${tr("daily_failed")} - ${uid}`)
					.setDescription(
						`<@${id}> ${tr("cookie_failedDesc")}\n\n${tr(
							"err_code"
						)}${e}`
					)
			]
		});
	}

	await delay(500);
}

function UpdateStatistics(total, start_time, sus, fail, signed, nowTime) {
	const end_time = Date.now();
	const average_time = parseFloat(
		((end_time - start_time) / (total > 0 ? total : 1) / 1000).toFixed(3)
	);

	webhook.send({
		embeds: [
			new EmbedBuilder()
				.setConfig("#F2BE22")
				.setTitle(`${nowTime} 點自動簽到`)
				.setTimestamp()
				.addFields(
					{
						name: `簽到總人數 \`${total}\` 人`,
						value: "\u200b",
						inline: false
					},
					{
						name: `簽到成功人數 \`${sus}\` 人`,
						value: "\u200b",
						inline: true
					},
					{
						name: `已簽到導致失敗人數 \`${signed}\` 人`,
						value: "\u200b",
						inline: true
					},
					{
						name: `無效人數 \`${fail}\` 人`,
						value: "\u200b",
						inline: true
					},
					{
						name: `花費時間 \`${parseFloat(
							(end_time - start_time) / 1000
						).toFixed(3)}\` 秒`,
						value: "\u200b",
						inline: true
					},
					{
						name: `平均時間 \`${average_time}\` 秒`,
						value: "\u200b",
						inline: true
					}
				)
		]
	});
}