const { cmd } = require('../command');
const axios = require('axios');

// Temporary store to manage session-based replies
const tiktokStore = new Map();

cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "TikTok වීඩියෝ විවිධ විදිහට ඩවුන්ලෝඩ් කරන්න",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q || !q.includes("tiktok.com")) {
            return reply("කරුණාකර වලංගු TikTok වීඩියෝ ලින්ක් එකක් දෙන්න.");
        }

        reply("වීඩියෝ එක ඩවුන්ලෝඩ් වෙනවා, ටිකක් ඉන්න...");

        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) return reply("TikTok වීඩියෝ එක ගන්න බැරි වුණා.");

        const { title, like, comment, share, author, meta } = data.data;

        // Save the video data temporarily
        tiktokStore.set(mek.key.id, { videoData: data.data, url: q });

        const caption = `🎵 *TikTok Video* 🎵\n\n` +
                       `👤 *User:* ${author.nickname} (@${author.username})\n` +
                       `📖 *Title:* ${title}\n` +
                       `👍 *Like:* ${like}\n💬 *Comment:* ${comment}\n🔁 *Share:* ${share}\n\n` +
                       `*නම්බර් එකකින් රිප්ලයි කරලා ඔප්ෂන් එක තෝරන්න😌:*\n\n` +
                       `1 |>> 📹 No-Watermark\n` +
                       `2 |>> 📹 With-Watermark\n` +
                       `3 |>> 📹 No-Watermark-HD\n` +
                       `4 |>> 🎵 Audio File\n\n` +
                       `> *㋛ POWERED BY THARUSHA 〽️Ｄ*`;

        await conn.sendMessage(from, {
            text: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

    } catch (e) {
        console.error("TikTok Downloader Error:", e);
        reply(`එරර් එකක් ආවා: ${e.message}`);
    }
});

cmd({
    pattern: "message",
    desc: "TikTok ඔප්ෂන් තෝරන රිප්ලයි එක හැන්ඩ්ල් කරන්න",
    category: "downloader",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!mek.quoted || !tiktokStore.has(mek.quoted.id)) return;

        const userChoice = parseInt(q);
        if (![1, 2, 3, 4].includes(userChoice)) {
            return reply("කරුණාකර වලංගු නම්බර් එකක් (1-4) රිප්ලයි කරන්න.(Please valid number reply)");
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const { videoData, url } = tiktokStore.get(mek.quoted.id);
        const { author, title } = videoData;

        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${url}`;
        const { data } = await axios.get(apiUrl);
        const meta = data.data.meta;

        let mediaUrl, caption, mimetype, fileName;

        switch (userChoice) {
            case 1:
                mediaUrl = meta.media.find(v => v.type === "video")?.org;
                fileName = "tiktok_no_watermark.mp4";
                caption = `📥 *No-Watermark Downloaded*`;
                mimetype = 'video/mp4';
                break;
            case 2:
                mediaUrl = meta.media.find(v => v.type === "video")?.wm;
                fileName = "tiktok_with_watermark.mp4";
                caption = `📥 *With-Watermark Downloaded*`;
                mimetype = 'video/mp4';
                break;
            case 3:
                mediaUrl = meta.media.find(v => v.type === "video" && v.quality === "hd")?.org;
                fileName = "tiktok_hd_video.mp4";
                caption = `📥 *HD No-Watermark Downloaded*`;
                mimetype = 'video/mp4';
                break;
            case 4:
                mediaUrl = meta.media.find(v => v.type === "audio")?.org;
                fileName = "tiktok_audio.mp3";
                caption = `📥 *Audio File Downloaded*`;
                mimetype = 'audio/mp3';
                break;
        }

        if (!mediaUrl) return reply("මීඩියා ලින්ක් එක ගන්න බැරි වුණා.");

        await conn.sendMessage(from, {
            document: { url: mediaUrl, mimetype },
            fileName,
            caption: `🎵 *TikTok Video* 🎵\n\n👤 *User:* ${author.nickname} (@${author.username})\n📖 *Title:* ${title}\n\n${caption}\n\n> *㋛ POWERED BY THARUSHA 〽️Ｄ*`,
            ...(userChoice !== 4 && { gifPlayback: true }),
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
        tiktokStore.delete(mek.quoted.id);

    } catch (e) {
        console.error("TikTok Reply Error:", e);
        reply(`එරර් එකක් ආවා: ${e.message}`);
    }
});
