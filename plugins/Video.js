const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

cmd({
    pattern: "mp4",
    alias: ["video3"],
    react: "🎥",
    desc: "Download YouTube video in specific qualities",
    category: "main",
    use: '.mp4 <Yt url or Name>',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a YouTube URL or video name.");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return await reply("❌ No results found!");

        let yts = yt.results[0];
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.status !== 200 || !data.success) {
            return await reply("❌ Failed to fetch video details. Please try again later.");
        }

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

        // Prepare message with video details and quality options
        let ytmsg = `🎬 *𝚈𝙾𝚄𝚃𝚄𝙱𝙴 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* 🎬\n\n` +
            `📽 *Title:* ${yts.title || "Unknown"}\n` +
            `⏱ *Duration:* ${yts.timestamp || "Unknown"}\n` +
            `👁‍🗨 *Views:* ${yts.views || "Unknown"}\n` +
            `👤 *Author:* ${yts.author?.name || "Unknown"}\n` +
            `🔗 *Link:* ${yts.url || "Unknown"}\n\n` +
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
            `> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️Ｄ*`;

        const sentMsg = await conn.sendMessage(
            from,
            { image: { url: yts.thumbnail }, caption: ytmsg },
            { quoted: mek }
        );
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
                const selectedOption = qualityMap.find(opt => opt.input === userReply);

                if (!selectedOption) {
                    return await reply("❌ Invalid choice! Reply with 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, or 2.4.");
                }

                // Check if API provides quality-specific URLs
                let downloadUrl;
                let qualities = data.result.qualities || [];

                if (qualities.length > 0) {
                    const normalizedQualities = qualities.map(q => ({
                        ...q,
                        quality: q.quality?.toLowerCase().replace(/\s/g, '') || ''
                    }));
                    const targetQuality = selectedOption.quality.toLowerCase().replace(/\s/g, '');
                    const selectedQuality = normalizedQualities.find(q => q.quality.includes(targetQuality));

                    if (!selectedQuality?.url) {
                        return await reply(`❌ ${selectedOption.quality} quality not available for this video! Try another quality.`);
                    }
                    downloadUrl = selectedQuality.url;
                } else {
                    // Fallback to single download URL if qualities are not provided
                    if (!data.result.download_url) {
                        return await reply("❌ No download URL available for this video!");
                    }
                    downloadUrl = data.result.download_url;
                }

                const msg = await conn.sendMessage(
                    from,
                    { text: `⏳ Processing ${selectedOption.quality} ${selectedOption.type}...` },
                    { quoted: mek }
                );

                let type;
                if (selectedOption.type === 'video') {
                    type = {
                        video: { url: downloadUrl },
                        mimetype: "video/mp4",
                        caption: `${yts.title} (${selectedOption.quality})\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️Ｄ*`
                    };
                } else {
                    type = {
                        document: { url: downloadUrl },
                        fileName: `${yts.title}_${selectedOption.quality}.mp4`,
                        mimetype: "video/mp4",
                        caption: `${yts.title} (${selectedOption.quality})\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️Ｄ*`
                    };
                }

                await conn.sendMessage(from, type, { quoted: mek });
                await conn.sendMessage(
                    from,
                    { text: `✅ ${selectedOption.quality} ${selectedOption.type.charAt(0).toUpperCase() + selectedOption.type.slice(1)} Upload Successful ✅`, edit: msg.key }
                );

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
