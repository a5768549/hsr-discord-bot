const langs = {
	info_title: "你好！我是 星鐵小助手，按下下方按鈕以查看更多關於我的資訊",
	info_Uptime: "上線時間",
	info_Servers: "伺服器數量",
	info_MemoryUsage: "記憶體使用率 (Used / Total / Rss)",
	info_Devs: "開發者",

	Ping: "延遲",
	Switch: "切換",
	Refresh: "刷新",
	support_server: "加入支持伺服器！",
	support: "遇到錯誤或想提供建議?\n請點擊下方按鈕加入支持伺服器並建立貼文！",

	profile_Searching: "搜尋中...",
	profile_failed: "搜尋不到ID為 <z> 的玩家",
	profile_nonSign: "尚未設置簽名",
	profile_character: "查看角色",
	profile_tLevel: "開拓等級",
	profile_qLevel: "均衡等級",
	profile_record: "漫遊紀錄",
	profile_friends: "好友數量",
	profile_characters: "邂逅角色",
	profile_lightcone: "獲得光錐",
	profile_achievement: "達成成就",
	profile_forgottenHall: "忘卻之庭",
	profile_memory: "回憶進度",
	profile_memoryOfChaos: "渾沌回憶進度",
	profile_imageLoading: "生成圖片中...",
	profile_main: "主頁",
	leaderboard_character: "查看排行",
	leaderboard_title: "<z> 遺器總分排行",
	leaderboard_footer: "僅會紀錄使用過個人資料的遺器總分",
	leaderboard_score: "**<z>** 分",
	cookie_failed: "請確定已設置正確的 Cookie",
	cookie_failedDesc: "設置 Cookie </account:1160207139151818852>",
	cookie_how: "🔥 如何取得 Cookie ?",
	cookie_set: "設置 Cookie",
	cookie_paste: "複製的 Cookie 放這",
	cookie_sus: "Cookie 已綁定至 <z>！",
	cookie_ltoken: "把你的 ltoken_v2 放這",
	cookie_ltuid: "把你的 ltuid_v2 放這",
	cookie_new:
		"我們將原先的 Cookie 更新至 v2 了！，如果您看到這段話，請使用 </account:1160207139151818852> 重新設置 Cookie",
	cookie_desc:
		"請先使用 **Chrome** 開啟 [Hoyolab](https://www.hoyolab.com/)\n然後您可以嘗試以下兩種方法！\n** **\n**▫️ 第一種**\n1. 在 `養成計算機` 登入帳號，之後在網址位置輸入下方給予的程式碼然後把java旁邊的+刪掉\n2. 複製全部的 Cookie 後填到第一格欄位中\n** **\n**▫️ 第二種**\n1. 在登入帳號後按下 `F12` 或者 `Ctrl + Shift + I` 打開開發者工具\n2. 切換至 `Application` 選擇左邊的 `Cookie`\n3. 複製 `ltoken_v2` 和 `ltuid_v2` 的分別填到第二和第三格欄位中，若拿不到請使用 `無痕`",
	uid_non: "尚未設置 UID，設置後即可快速搜尋自己",
	uid_UserNonSet: "此使用者尚未設置 UID",
	uid_failedDesc: "設置 UID </account:1160207139151818852>",
	daily_signed: "開拓者，你今天已經簽到過了～",
	daily_sign: "簽到成功！",
	daily_desc: "您已獲得今日獎勵 <a>",
	daily_desc2: "明日獎勵為 <b>",
	daily_month: "月份簽到",
	daily_signedDay: "已簽到 <z> 天",
	daily_missedDay: "遺漏簽到 <z> 天",
	daily_failed: "簽到失敗",
	autoDaily_on: "已開啟自動簽到",
	autoDaily_off: "已關閉自動簽到",
	autoDaily_tag: "自動簽到時標註您：<z>",
	autoDaily_time: "自動簽到時間：<z> 點",
	notify_failed: "請確定以下資料已設定正確",
	notify_staminaMax: "體力要爆滿啦！",
	notify_expeditionMax: "可以領取委託啦！",
	notify_title: "生存索引",
	notify_stamina: "當前體力",
	notify_re: "全部恢復：",
	notify_reAll: "已全部恢復",
	notify_staminaBack: "後備體力",
	notify_daily: "每日實訓",
	notify_end: "結束時間：",
	notify_rogue: "模擬宇宙積分",
	notify_cocoon: "歷戰餘響",
	notify_epedition: "委託執行",
	notify_claim: "可領取",
	autoNote_on: "已開啟自動通知",
	autoNote_off: "已關閉自動通知",
	autoNote_tag: "自動通知時標註您：<z>",
	autoNote_title: "自動通知",
	autoNote_expedition: "可領取委託時通知：<z>",
	autoNote_stamina: "體力超過 <z> 時通知",
	auto_Fail: "已失敗 <z> 次，超過 <max> 次會刪除排程",
	redeem_failed: "未搜尋到兌換碼",
	redeem_sus: "點擊下方連結領取兌換碼",
	uid_sus: "UID 已設置為",
	warp_title: "查詢躍遷紀錄",
	warp_input: "在這放入躍遷紀錄網址",
	warp_typeCharacter: "限定角色躍遷",
	warp_typeLightcone: "限定光錐躍遷",
	warp_typeRegular: "常駐躍遷",
	warp_loading: "載入 <a> 中",
	warp_err: "請確認已輸入正確的躍遷紀錄網址",
	warp_errDesc: "如何取得躍遷記錄網址 </warp:1120925141338177543>",
	warp_selectMenuTitle: "點擊選擇遷躍紀錄！",
	warp_0: "這是給你的 👑",
	warp_30: "難得一見的歐皇",
	warp_50: "稍微幸運一點的玩家",
	warp_60: "正常的保底玩家",
	warp_80: "你只能靠大保過活了",
	warp_pity: "已累計 <z> 抽未出五星",
	warp_pityFour: "已累計 <z> 抽未出四星",
	warp_average: "平均 <z> 抽一個五星",
	warp_nonAverage: "還未抽出過五星",
	warp_how: "如何獲取躍遷紀錄",
	warplog_title: "抽卡分析",
	warplog_count: "躍遷總數",
	warplog_cost: "已花費星瓊",
	warplog_5count: "五星數量",
	warplog_5countaverage: "平均五星保底",
	warplog_react: "近期五星抽卡",
	warp_howDesc:
		"**1.** 在 PC 上打開崩壞：星穹鐵道\n**2.** 打開`遷躍`的`歷史紀錄`\n**3.** 打開 Windows PowerShell 並貼上以下指令 <z>\n**4.** 複製網址後使用指令 </warp:1120003658243915847> 查詢遷躍紀錄",
	warp_SimFooter: "請不要移動或切換畫面以獲得更好的躍遷體驗",
	warp_skip: "跳過",
	clear_cache: "已清除帳號上的所有資料！",
	forgottenHall_noninfo: "尚未擁有當期混沌回憶資料",
	forgottenHall_selectFloor: "選擇樓層",
	forgottenHall_desc: "<s>星 • <r>輪 ",
	forgottenHall_title: "回顧",
	forgottenHall_timeFooter: "統計週期",
	forgottenHall_level: "關卡進度",
	forgottenHall_battle: "戰鬥次數",
	forgottenHall_useRound: "使用輪",
	forgottenHall_teamSetup: "編隊<z>",
	feedback_Title: "提供建議或想法",
	feedback_Label: "您可以在這裡提供對於機器人的建議或者想法！",
	feedback_Sus: "您的反饋已提交至開發者，非常感謝！",
	admin_noPer: "你需要擁有 `管理伺服器` 的權限才能使用這個指令",
	admin_removeFail: "刪除失敗",
	admin_removeFailed: "<z> 設置的訊息頻道不在此伺服器中",
	admin_noUserSet: "<z> 尚未設置此功能",
	admin_removeSus: "刪除成功",
	admin_removeSusMsg: "已刪除 <z> 在 <c> 的訊息通知",
	admin_moveFail: "移動失敗",
	admin_moveNoPer: "我在 <z> 缺少了 `發送訊息` 的權限",
	admin_moveSus: "移動成功",
	admin_moveSusMsg: "已將 `<c>` 位使用者的訊息通知移動至 <z>",
	admin_moveFailed: "無法設置訊息通知至 <z>",
	account_nonAcc: "未查詢到已設置的帳號！",
	account_setUID: "請先設置一個 UID",
	account_cookieSelectUID: "請選擇一個 UID 設置 Cookie",
	account_uidTitle: "設置 UID",
	account_uidDesc: "遊戲內的 UID",
	account_listAcc: "已設置的帳號",
	account_linked: "已綁定",
	account_nolink: "未綁定",
	account_editUIDTitle: "請選擇要編輯的 UID",
	account_delUIDTitle: "請選擇要刪除的 UID",
	account_selectEdit: "請選擇要編輯的東西",
	account_del: "已刪除帳號",
	account_alreadySet: "此 UID 已設置至帳戶中",
	account_limit: "無法設置超過 `3` 個帳號",
	guide_character: "查看指南",
	guide_noImage: "目前沒有 `<z>` 的指南圖片",
	vote_Msg: "你需要為我們投票才可以使用這個功能！",
	vote: "投票",
	news_notice: "通知",
	news_events: "活動",
	news_info: "資訊",
	news_seltype: "請選擇一種新聞類別",
	news_selpost: "🐣 請選擇一篇文章",
	draw_fail: "製圖失敗，請稍後再試！",
	draw_wait: "您的製圖請求正在排隊，剩餘 <z> 位使用者",
	draw_NoData: "資料抓取失敗",

	donate_Title:
		"<:love:1068758168877936740> 想要贊助我們嗎？您可以使用以下方式贊助我們！",
	donate_Desc:
		"\n▫️ [藍新 - 支持超商付款](https://core.newebpay.com/EPG/yeci/5jBaaE)\n\n▫️ [Buy Me A Coffee](https://www.buymeacoffee.com/yeci)",
	year: "年",
	month: "月",
	day: "日",
	support: "加入支持伺服器，來獲得更快的協助",
	mainCharacter: "開拓者",
	newLocale: "已設定語言為 `<z>`",
	relic: "遺器評分 <s> • 評級",
	err_code: "錯誤代碼：",
	wait: "請等待 `<time>` 秒後再試一次！",
	wait2: "請等待 `<time>` 後再試一次！",
	auto: "自動",
	warp: "抽",
	total: "總計",
	none: "`暫無`",
	level: "等級",
	level2: "<z>級",
	eidolon: "星魂 <z> 階",
	charInfo: "角色資訊",
	lightcone: "光錐",
	traces: "行跡",
	relics: "儀器",
	lightconeLevel: "疊影 <z> 階",
	character_placeholder: "第 <s> 至 <e> 位",
	lightconeSelect: "選擇行跡",
	back: "返回",
	relicsSelect: "選擇儀器",
	true: "是",
	false: "否"
};

export default langs;
