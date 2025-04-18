const axios = require("axios");
const { cmd } = require("../command");

// Initialize store as a Map to avoid set/get errors
const videoStore = new Map();

// Download command
cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos in different qualities or as audio",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("*`Need a valid Facebook URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.data) {
      return reply("❌ Failed to fetch the video. Please try another link.");
    }

    // Save videoData temporarily
    videoStore.set(m.key.id, { videoData: data.data, url: q });

    await conn.sendMessage(from, {
      text: `*THARUSHA-MD Facebook Downloader*\n\n📥 *Choose an option by replying with the number:*\n\n1 |>> 🎥 HD QUALITY\n2 |>> 🎥 SD QUALITY\n3 |>> 🎵 AUDIO FILE\n\n> *㋛ POWERED BY THARUSHA 〽️Ｄ*`,
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("Download Error:", error);
    reply("❌ Error fetching the video. Please try again.");
  }
});

// Handle user reply
cmd({
  pattern: "message",
  desc: "Handle reply for quality selection",
  category: "download",
  filename: __filename,
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!m.quoted || !videoStore.has(m.quoted.id)) return;

    const userChoice = parseInt(q);
    if (![1, 2, 3].includes(userChoice)) {
      return reply("❌ Please reply with a valid number (1, 2, or 3).");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const { url } = videoStore.get(m.quoted.id);

    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(url)}&quality=${userChoice === 1 ? 'hd' : userChoice === 2 ? 'sd' : 'audio'}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.data || !data.data.url) {
      return reply("❌ Failed to fetch the media. Please try another link.");
    }

    let mimetype, fileName, caption;
    if (userChoice === 1) {
      mimetype = 'video/mp4';
      fileName = 'fb_video_hd.mp4';
      caption = "🎥 *HD Quality Downloaded*\n> *㋛ POWERED BY THARUSHA 〽️Ｄ*";
    } else if (userChoice === 2) {
      mimetype = 'video/mp4';
      fileName = 'fb_video_sd.mp4';
      caption = "🎥 *SD Quality Downloaded*\n> *㋛ POWERED BY THARUSHA 〽️Ｄ*";
    } else {
      mimetype = 'audio/mpeg';
      fileName = 'fb_audio.mp3';
      caption = "🎵 *Audio File Downloaded*\n> *㋛ POWERED BY THARUSHA 〽️Ｄ*";
    }

    await conn.sendMessage(from, {
      document: { url: data.data.url, mimetype },
      fileName,
      caption,
      ...(userChoice !== 3 && { gifPlayback: true }),
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    videoStore.delete(m.quoted.id);

  } catch (error) {
    console.error("Reply Handler Error:", error);
    reply("❌ Error processing your request. Please try again.");
  }
});
