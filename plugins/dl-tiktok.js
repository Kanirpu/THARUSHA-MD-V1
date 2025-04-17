const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "TikTok වීඩියෝ විවිධ විදිහට ඩවුන්ලෝඩ් කරන්න",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, store }) => {
    try {
        if (!q) return reply("කරුණාකර TikTok වීඩියෝ ලින්ක් එකක් දෙන්න.");
        if (!q.includes("tiktok.com")) return reply("වලංගු TikTok ලින්ක් එකක් නෙමෙයි.");

        // ලෝඩින් මැසේජ් එකක් යවන්න
        reply("වීඩියෝ එක ඩවුන්ලෝඩ් වෙනවා, ටිකක් ඉන්න...");

        // API එකෙන් ඩේටා ගන්නවා
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) return reply("TikTok වීඩියෝ එක ගන්න බැරි වුණා.");

        // ඩේටා විස්තර ගන්නවා
        const { title, like, comment, share, author, meta } = data.data;

        // ඩේටා ටෙම්පරි ස්ටෝ එකක සේව් කරන්න
        store.set(mek.key.id, { videoData: data.data, url: q });

        // යූසර්ට ඔප්ෂන් යවන්න
        const caption = `🎵 *TikTok Video* 🎵\n\n` +
                       `👤 *User:* ${author.nickname} (@${author.username})\n` +
                       `📖 *Title:* ${title}\n` +
                       `👍 *Like:* ${like}\n💬 *Comment:* ${comment}\n🔁 *Share:* ${share}\n\n` +
                       `*නම්බර් එකකින් රිප්ලයි කරලා ඔප්ෂන් එක තෝරන්න😌:*\n\n` +
                       `1 |>> 📹 No-Watermark\n` +
                       `2 |>> 📹 With-Watermark\n` +
                       `3 |>> 📹 No-Watermark-HD\n` +
                       `4 |>> 🎵 Audio File\n\n` +
                       `> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ**`;

        await conn.sendMessage(from, {
            text: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

    } catch (e) {
        console.error("TikTok ඩවුන්ලෝඩර් කමාන්ඩ් එකේ එරර් එකක්:", e);
        reply(`එරර් එකක් ආවා: ${e.message}`);
    }
});

// රිප්ලයි එක හැන්ඩ්ල් කරන කෝඩ් එක
cmd({
    pattern: "message",
    desc: "TikTok ඔප්ෂන් තෝරන රිප්ලයි එක හැන්ඩ්ල් කරන්න",
    category: "downloader",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply, store }) => {
    try {
        // මෙසේජ් එක රිප්ලයි එකක්ද බලන්න
        if (!mek.quoted || !store.get(mek.quoted.id)) {
            return;
        }

        const userChoice = parseInt(q);
        if (!userChoice || userChoice < 1 || userChoice > 4) {
            return reply("කරුණාකර වලංගු නම්බර් එකක් රිප්ලයි කරන්න (1, 2, 3, හෝ 4).");
        }

        // ලෝඩින් රියැක්ට් එකක් දාන්න
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const { videoData, url } = store.get(mek.quoted.id);
        const { author, title } = videoData;
        let mediaUrl, caption, mimetype, fileName;

        // API එකෙන් ඩේටා ගන්නවා
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${url}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) return reply("TikTok වීඩියෝ එක ගන්න බැරි වුණා.");

        const meta = data.data.meta;

        // යූසර් තෝරපු ඔප්ෂන් එක අනුව මීඩියා තෝරන්න
        if (userChoice === 1) {
            // No-Watermark
            mediaUrl = meta.media.find(v => v.type === "video")?.org || meta.media[0]?.org;
            mimetype = 'video/mp4';
            fileName = 'tiktok_no_watermark.mp4';
            caption = `🎵 *TikTok Video* 🎵\n\n👤 *Uset:* ${author.nickname} (@${author.username})\n📖 *Title:* ${title}\n\n- No-Watermark downloaded ✅\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
        } else if (userChoice === 2) {
            // With-Watermark
            mediaUrl = meta.media.find(v => v.type === "video")?.wm || meta.media[0]?.wm;
            mimetype = 'video/mp4';
            fileName = 'tiktok_with_watermark.mp4';
            caption = `🎵 *TikTok Video* 🎵\n\n👤 *User:* ${author.nickname} (@${author.username})\n📖 *Title:* ${title}\n\n- With-Watermark downloaded ✅\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
        } else if (userChoice === 3) {
            // No-Watermark-HD
            mediaUrl = meta.media.find(v => v.type === "video" && v.quality === "hd")?.org || meta.media[0]?.org;
            mimetype = 'video/mp4';
            fileName = 'tiktok_no_watermark_hd.mp4';
            caption = `🎵 *TikTok Video* 🎵\n\n👤 *User:* ${author.nickname} (@${author.username})\n📖 *Title:* ${title}\n\n- No-Watermark-HD downloaded ✅\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
        } else {
            // Audio File
            mediaUrl = meta.media.find(v => v.type === "audio")?.org || meta.media[0]?.org;
            mimetype = 'audio/mp3';
            fileName = 'tiktok_audio.mp3';
            caption = `🎵 *TikTok Audio* 🎵\n\n👤 *User:* ${author.nickname} (@${author.username})\n📖 *Title:* ${title}\n\n- Audio File downloaded ✅\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
        }

        // midea send
        await conn.sendMessage(from, {
            document: { url: mediaUrl, mimetype },
            fileName,
            caption,
            ...(userChoice !== 4 && { gifPlayback: true }), // වීඩියෝ වලට GIF වගේ ප්ලේබැක් එකක්
        }, { quoted: mek });

        // success react send
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        // store clear
        store.delete(mek.quoted.id);

    } catch (e) {
        console.error("TikTok රිප්ලයි හැන්ඩ්ලර් එකේ එරර් එකක්:", e);
        reply(`එරර් එකක් ආවා: ${e.message}`);
    }
});
