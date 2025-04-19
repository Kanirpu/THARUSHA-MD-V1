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





const config = require('../config');
const { cmd } = require('../command');
const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

// YouTube Data API key (Get from Google Cloud Console)
const searchOptions = {
    maxResults: 1,
    key: 'YOUR_YOUTUBE_API_KEY' // Replace with your API key
};

// Function to extract YouTube video ID from URL
function replaceYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to download and merge video and audio streams
async function downloadAndMerge(videoId, itagVideo, itagAudio, quality) {
    const videoPath = path.resolve(__dirname, `../temp/video-${videoId}-${quality}.mp4`);
    const audioPath = path.resolve(__dirname, `../temp/audio-${videoId}-${quality}.m4a`);
    const outputPath = path.resolve(__dirname, `../temp/output-${videoId}-${quality}.mp4`);

    // Create temp directory if it doesn't exist
    if (!fs.existsSync(path.resolve(__dirname, '../temp'))) {
        fs.mkdirSync(path.resolve(__dirname, '../temp'));
    }

    try {
        // Download video stream
        await new Promise((resolve, reject) => {
            const videoStream = ytdl(`https://youtube.com/watch?v=${videoId}`, { quality: itagVideo });
            videoStream.pipe(fs.createWriteStream(videoPath));
            videoStream.on('end', resolve);
            videoStream.on('error', reject);
        });

        // Download audio stream (if needed)
        if (itagAudio) {
            await new Promise((resolve, reject) => {
                const audioStream = ytdl(`https://youtube.com/watch?v=${videoId}`, { quality: itagAudio });
                audioStream.pipe(fs.createWriteStream(audioPath));
                audioStream.on('end', resolve);
                audioStream.on('error', reject);
            });

            // Merge video and audio using FFmpeg
            await new Promise((resolve, reject) => {
                ffmpeg()
                    .input(videoPath)
                    .input(audioPath)
                    .outputOptions('-c:v copy')
                    .outputOptions('-c:a aac')
                    .save(outputPath)
                    .on('end', resolve)
                    .on('error', reject);
            });

            // Clean up temporary files
            fs.unlinkSync(videoPath);
            fs.unlinkSync(audioPath);

            return outputPath;
        } else {
            // If no audio merging is needed (e.g., itag 18), return the video file directly
            return videoPath;
        }
    } catch (error) {
        // Clean up temporary files in case of error
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        throw error;
    }
}

cmd({
    pattern: "video4",
    react: "🎬",
    desc: "Download YouTube videos in different qualities with audio",
    category: "download",
    use: ".song <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        // Check if query is provided
        if (!q) return await reply("❌ Please provide a YouTube URL or search query!");

        // Check if the input is a valid YouTube URL
        let id = q.startsWith("https://") ? replaceYouTubeID(q) : null;

        // If not a URL, search for the video using youtube-search
        if (!id) {
            const searchResults = await youtubeSearch(q, searchOptions);
            if (!searchResults.results.length) return await reply("❌ No results found!");
            id = replaceYouTubeID(searchResults.results[0].link);
            if (!id) return await reply("❌ Could not extract a valid YouTube ID from the search results!");
        }

        // Fetch video details
        const info = await ytdl.getInfo(`https://youtube.com/watch?v=${id}`);
        const { title, lengthSeconds, viewCount, thumbnails, uploadDate, author } = info.videoDetails;
        const thumbnail = thumbnails[0].url;

        // Calculate release ago
        const upload = new Date(uploadDate);
        const now = new Date();
        const ago = Math.round((now - upload) / (1000 * 60 * 60 * 24)) + " days ago";

        // Send info message to the user
        let infoMsg = `🎬 *YOUTUBE DOWNLOADER* 🎬\n\n` +
            `📝 *Title:* ${title || "Unknown"}\n` +
            `⏳ *Duration:* ${Math.floor(lengthSeconds / 60)}:${lengthSeconds % 60}\n` +
            `👀 *Views:* ${viewCount || "Unknown"}\n` +
            `📅 *Uploaded:* ${ago || "Unknown"}\n` +
            `👤 *Author:* ${author?.name || "Unknown"}\n` +
            `🔗 *Link:* https://youtube.com/watch?v=${id}\n\n` +
            `🔽 *Choose Quality:*\n` +
            `🎥 *Video Type*\n` +
            `1️⃣.1️⃣ *140p Quality* 📼\n` +
            `1️⃣.2️⃣ *240p Quality* 📹\n` +
            `1️⃣.3️⃣ *360p Quality* 📺\n` +
            `1️⃣.4️⃣ *480p Quality* 🎬\n\n` +
            `📁 *Document Type*\n` +
            `2️⃣.1️⃣ *140p Quality* 📄\n` +
            `2️⃣.2️⃣ *240p Quality* 📜\n` +
            `2️⃣.3️⃣ *360p Quality* 📋\n` +
            `2️⃣.4️⃣ *480p Quality* 📂\n\n` +
            `${config.FOOTER || "POWERED BY THARUSHA-MD"}`;

        // Send info message and get message ID
        const sentMsg = await conn.sendMessage(from, { image: { url: thumbnail }, caption: infoMsg }, { quoted: mek });
        const messageID = sentMsg.key.id;
        await conn.sendMessage(from, { react: { text: '🎶', key: sentMsg.key } });

        // State management
        let hasProcessed = false;

        // Listen for user reply
        const handler = async (messageUpdate) => {
            try {
                const mekInfo = messageUpdate?.messages[0];
                if (!mekInfo?.message) return;

                const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
                const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (!isReplyToSentMsg || hasProcessed) return;

                hasProcessed = true; // Mark reply as processed
                let userReply = messageType.trim();
                let msg;
                let type;
                let itagVideo;
                let itagAudio;
                let quality;

                // Select quality and itag values
                switch (userReply) {
                    case "1.1":
                    case "2.1":
                        itagVideo = 160; // 140p video
                        itagAudio = 140; // Audio
                        quality = "140p";
                        break;
                    case "1.2":
                    case "2.2":
                        itagVideo = 133; // 240p video
                        itagAudio = 140; // Audio
                        quality = "240p";
                        break;
                    case "1.3":
                    case "2.3":
                        itagVideo = 18; // 360p (video + audio)
                        itagAudio = null; // No separate audio stream needed
                        quality = "360p";
                        break;
                    case "1.4":
                    case "2.4":
                        itagVideo = 135; // 480p video
                        itagAudio = 140; // Audio
                        quality = "480p";
                        break;
                    default:
                        await reply("❌ Invalid choice! Reply with 1️⃣.1️⃣, 1️⃣.2️⃣, 1️⃣.3️⃣, 1️⃣.4️⃣, 2️⃣.1️⃣, 2️⃣.2️⃣, 2️⃣.3️⃣, or 2️⃣.4️⃣.");
                        conn.ev.off('messages.upsert', handler);
                        return;
                }

                // Send processing message
                msg = await conn.sendMessage(from, { text: `⏳ Downloading in ${quality} Quality...` }, { quoted: mek });

                // Download and merge video and audio
                const outputPath = await downloadAndMerge(id, itagVideo, itagAudio, quality);

                // Choose type (Video or Document)
                if (userReply.startsWith("1.")) {
                    // Video Type
                    type = { video: { url: outputPath }, caption: `🎥 *${title}* (${quality})` };
                } else {
                    // Document Type
                    type = { document: { url: outputPath }, fileName: `${title}_${quality}.mp4`, mimetype: "video/mp4", caption: `📁 *${title}* (${quality})` };
                }

                // Send the file
                await conn.sendMessage(from, type, { quoted: mek });
                await conn.sendMessage(from, { text: '✅ Media Upload Successful ✅', edit: msg.key });

                // Clean up the output file
                if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

                // Clean up event listener
                conn.ev.off('messages.upsert', handler);

            } catch (error) {
                console.error(error);
                await reply(`❌ *Error occurred while processing:* ${error.message || "Error!"}`);
                conn.ev.off('messages.upsert', handler);
            }
        };

        // Register event listener
        conn.ev.on('messages.upsert', handler);

        // Clean up listener after 5 minutes to prevent memory leaks
        setTimeout(() => {
            conn.ev.off('messages.upsert', handler);
            if (!hasProcessed) {
                conn.sendMessage(from, { text: "⏰ Download session timed out." }, { quoted: mek });
            }
        }, 5 * 60 * 1000);

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *An error occurred:* ${error.message || "Error!"}`);
    }
});
