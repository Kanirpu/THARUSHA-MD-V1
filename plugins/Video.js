const config = require('../config');
const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

function replaceYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/래|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

cmd({
    pattern: "video",
    alias: ["ytmp4", "ytmp4dl"],
    react: "🎥",
    desc: "Download YouTube video in specific qualities",
    category: "download",
    use: ".video <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a Query or YouTube URL!");

        let id = q.startsWith("https://") ? replaceYouTubeID(q) : null;

        if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("❌ No results found!");
            id = searchResults.results[0].videoId;
        }

        const data = await dy_scrap.ytsearch(`https://youtube.com/watch?v=${id}`);
        if (!data?.results?.length) return await reply("❌ Failed to fetch video!");

        const { url, title, image, timestamp, ago, views, author } = data.results[0];

        // Fetch video details to get available qualities
        const videoDetails = await dy_scrap.ytmp4(`https://youtube.com/watch?v=${id}`);
        if (!videoDetails?.result?.qualities) return await reply("❌ No video qualities found!");

        // Define quality mappings
        const qualityMap = [
            { input: '1.1', quality: '144p', type: 'video' },
            { input: '1.2', quality: '240p', type: 'video' },
            { input: '1.3', quality: '360p', type: 'video' },
            { input: '1.4', quality: '480p', type: 'video' },
            { input: '2.1', quality: '144p', type: 'document' },
            { input: '2.2', quality: '240p', type: 'document' },
            { input: '2.3', quality: '360p', type: 'document' },
            { input: '2.4', quality: '480p', type: 'document' }
        ];

        let info = `🎬 *𝚈𝙾𝚄𝚃𝚄𝙱𝙴 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* 🎬\n\n` +
            `📽 *Title:* ${title || "Unknown"}\n` +
            `⏱ *Duration:* ${timestamp || "Unknown"}\n` +
            `👁‍🗨 *Views:* ${views || "Unknown"}\n` +
            `📅 *Released:* ${ago || "Unknown"}\n` +
            `👨‍🎤 *Author:* ${author?.name || "Unknown"}\n` +
            `🔗 *URL:* ${url || "Unknown"}\n\n` +
            `🔽 *Choose Download Option:*\n` +
            `🎥 *Video Type*:\n` +
            `1️⃣.1️⃣ - 144p\n` +
            `1️⃣.2️⃣ - 240p\n` +
            `1️⃣.3️⃣ - 360p\n` +
            `1️⃣.4️⃣ - 480p\n\n` +
            `📁 *Document Type*:\n` +
            `2️⃣.1️⃣ - 144p\n` +
            `2️⃣.2️⃣ - 240p\n` +
            `2️⃣.3️⃣ - 360p\n` +
            `2️⃣.4️⃣ - 480p\n\n` +
            `💡 *Reply with your choice (e.g., 1.1 or 2.1)*\n\n` +
            `${config.FOOTER || "POWERED BY YOUR BOT NAME"}`;

        const sentMsg = await conn.sendMessage(from, { image: { url: image }, caption: info }, { quoted: mek });
        const messageID = sentMsg.key.id;
        await conn.sendMessage(from, { react: { text: '🎥', key: sentMsg.key } });

        // Listen for user reply only once
        conn.ev.once('messages.upsert', async (messageUpdate) => {
            try {
                const mekInfo = messageUpdate?.messages[0];
                if (!mekInfo?.message) return;

                const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
                const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (!isReplyToSentMsg) return;

                let userReply = messageType.trim();

                // Find the selected option
                const selectedOption = qualityMap.find(opt => opt.input === userReply);
                if (!selectedOption) {
                    return await reply("❌ Invalid choice! Reply with 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, or 2.4.");
                }

                // Flexible quality matching
                const qualities = videoDetails.result.qualities;
                const normalizedQualities = qualities.map(q => ({
                    ...q,
                    quality: q.quality.toLowerCase().replace(/\s/g, '')
                }));

                const targetQuality = selectedOption.quality.toLowerCase().replace(/\s/g, '');
                const selectedQuality = normalizedQualities.find(q => q.quality.includes(targetQuality));

                if (!selectedQuality?.url) {
                    return await reply(`❌ ${selectedOption.quality} quality not available for this video! Try another quality.`);
                }

                const msg = await conn.sendMessage(from, { text: `⏳ Processing ${selectedOption.quality} ${selectedOption.type}...` }, { quoted: mek });

                let type;
                if (selectedOption.type === 'video') {
                    type = { video: { url: selectedQuality.url }, mimetype: "video/mp4", caption: `${title} (${selectedOption.quality})` };
                } else {
                    type = { document: { url: selectedQuality.url }, fileName: `${title}_${selectedOption.quality}.mp4`, mimetype: "video/mp4", caption: `${title} (${selectedOption.quality})` };
                }

                await conn.sendMessage(from, type, { quoted: mek });
                await conn.sendMessage(from, { text: `✅ ${selectedOption.quality} ${selectedOption.type.charAt(0).toUpperCase() + selectedOption.type.slice(1)} Upload Successful ✅`, edit: msg.key });

            } catch (error) {
                console.error('Reply processing error:', error);
                await reply(`❌ *An error occurred while processing:* ${error.message || "Unknown error!"}`);
            }
        });

    } catch (error) {
        console.error('Main try-catch error:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *An error occurred:* ${error.message || "Failed to process the request!"}`);
    }
});
