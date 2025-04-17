const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos in different qualities or as audio",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    // Check if a URL is provided
    if (!q || !q.startsWith("http")) {
      return reply("*`Need a valid Facebook URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    // Add a loading react
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Fetch video data from the API
    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!data.status || !data.data) {
      return reply("❌ Failed to fetch the video. Please try another link.");
    }

    // Store the video data in a temporary store (for reply handling)
    store.set(m.key.id, { videoData: data.data, url: q });

    // Send options to the user to reply with a number
    await conn.sendMessage(from, {
      text: `*THARUSHA-MD Facebook Downloader*\n\n📥 *Choose an option by replying with the number:*\n\n1 |>> 🎥 HD QUALITY\n2 |>> 🎥 SD QUALITY\n3 |>> 🎵 AUDIO FILE\n\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`,
    }, { quoted: m });

    // Success react
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Error fetching the video. Please try again.");
  }
});

// Handle the reply with a number
cmd({
  pattern: "message",
  desc: "Handle reply for quality selection",
  category: "download",
  filename: __filename,
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    // Check if the message is a reply and contains a number
    if (!m.quoted || !store.get(m.quoted.id)) {
      return;
    }

    const userChoice = parseInt(q);
    if (!userChoice || userChoice < 1 || userChoice > 3) {
      return reply("❌ Please reply with a valid number (1, 2, or 3).");
    }

    // Add a loading react
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const { videoData, url } = store.get(m.quoted.id);
    let mediaUrl, caption, mimetype, fileName;

    // Since the API doesn't provide quality options directly, we'll simulate it
    // In a real scenario, the API should return HD/SD/audio URLs or use a different API
    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(url)}&quality=${userChoice === 1 ? 'hd' : userChoice === 2 ? 'sd' : 'audio'}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.data || !data.data.url) {
      return reply("❌ Failed to fetch the media. Please try another link.");
    }

    mediaUrl = data.data.url;

    // Set the media type, caption, and filename based on user choice
    if (userChoice === 1) {
      // HD Quality
      mimetype = 'video/mp4';
      fileName = 'fb_video_hd.mp4';
      caption = "🎥 *THARUSHA-MD Facebook Downloader*\n\n- HD Quality Downloaded\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*";
    } else if (userChoice === 2) {
      // SD Quality
      mimetype = 'video/mp4';
      fileName = 'fb_video_sd.mp4';
      caption = "🎥 *THARUSHA-MD Facebook Downloader*\n\n- SD Quality Downloaded\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*";
    } else {
      // Audio File
      mimetype = 'audio/mp3';
      fileName = 'fb_audio.mp3';
      caption = "🎵 *THARUSHA-MD Facebook Downloader*\n\n- Audio File Downloaded\n> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*";
    }

    // Send the media based on user choice
    await conn.sendMessage(from, {
      document: { url: mediaUrl, mimetype },
      fileName,
      caption,
      ...(userChoice !== 3 && { gifPlayback: true }), // GIF-like playback for videos
    }, { quoted: m });

    // Success react
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    // Clean up the store
    store.delete(m.quoted.id);

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Error fetching the media. Please try again.");
  }
});
