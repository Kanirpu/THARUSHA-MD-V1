const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos as animation",
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

    // Fetch video URL from the API
    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!data.status || !data.data || !data.data.url) {
      return reply("❌ Failed to fetch the video. Please try another link.");
    }

    // Send the video as an animation (GIF-like effect)
    const mediaUrl = data.data.url;
    await conn.sendMessage(from, {
      document: { url: mediaUrl, mimetype: 'video/mp4' }, // Using document to mimic animation
      fileName: 'fb_animation.mp4',
      caption: "🎞️ *THARUSHA-MD Facebook Downloader*\n\n- Powered By JawadTechX ✅",
      gifPlayback: true, // Enables GIF-like playback if supported
    }, { quoted: m });

    // Success react
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    reply("❌ Error fetching the animation. Please try again.");
  }
});
