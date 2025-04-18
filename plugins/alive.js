const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status with loading animation",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation 
        const loadingMessages = [
            "🔄 Checking System... [20%]",
            "⚙️ Gathering Stats... [50%]",
            "🚀 Preparing Status... [80%]",
            "✅ System Ready! [100%]"
        ];

        // Send initial loading message
        let loadingMsg = await conn.sendMessage(from, { text: loadingMessages[0] }, { quoted: mek });

        // Update loading messages
        for (let i = 1; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            if (loadingMsg && loadingMsg.key) {
                await conn.sendMessage(from, { 
                    text: loadingMessages[i], 
                    edit: loadingMsg.key 
                }, { quoted: mek });
            } else {
                // Fallback if loadingMsg is undefined
                loadingMsg = await conn.sendMessage(from, { text: loadingMessages[i] }, { quoted: mek });
            }
        }

        // Modified alive message
        const status = `╭═══════❰ *𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳 𝚂𝚝𝚊𝚝𝚞𝚜* ❱═══════╮
│
│ ✨ *Hello, ${pushname}! I'm Alive now.*
│ 📟 *System is Fully Operational*
│
├─🖥️ *System Information*
│   ├─ ⏳ *Uptime*: ${runtime(process.uptime())}
│   ├─ 📊 *RAM Usage*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│   ├─ 🌐 *Host*: ${os.hostname()}
│   ├─ 👨‍💻 *Owner*: 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 𝚂𝙰𝙽𝙳𝙸𝙿𝙰
│   ├─ 🧬 *Version*: 1.0.0 BETA
│
╰═════════════════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/nMC42B30/497.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363411607943828@newsletter',
                    newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: `THARUSHA-MD System Status`,
                    body: '> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*',
                    thumbnailUrl: 'https://i.ibb.co/2xmrZRG/4920.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029Vb9LTRHInlqISdCfln45',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        await reply(`❌ Eror එකක් එනවා පැන්චො 😭: ${e.message}`);
    }
});

// Created By Mr. Tharusha Sandipa
