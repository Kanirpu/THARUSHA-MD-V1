const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu2",
    desc: "Main menu with animated loading",
    category: "menu2",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation sequence
        const loadingMessages = [
            "🔄 Initializing THARUSHA... [10%]",
            "⚙️ Loading Core Systems... [30%]",
            "🌐 Connecting to Servers... [60%]",
            "🚀 Finalizing Menu... [90%]",
            "✅ Ready! Displaying Menu... [100%]"
        ];

        let loadingMsg = await reply("🎉 Starting THARUSHA-MD Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        // Enhanced menu design
        let dec = `╭═══════❰ *${config.BOT_NAME}* ❱═══════╮
│
│ ✨ *Welcome, ${pushname}!* ✨
│
├─🖥️ *System Information*
│   ├─ *Owner*: ${config.OWNER_NAME}
│   ├─ *Baileys*: Multi Device
│   ├─ *Type*: NodeJs
│   ├─ *Platform*: Heroku
│   ├─ *Mode*: ${config.MODE}
│   ├─ *Prefix*: [${config.PREFIX}]
│   └─ *Version*: 3.0.0 Bᴇᴛᴀ
│
├─📋 *Available Menus*
│   ├─ Quranmenu
│   ├─ Prayertime
│   ├─ Aimenu
│   ├─ Anmiemenu
│   ├─ Reactions
│   ├─ Convertmenu
│   ├─ Funmenu
│   ├─ Dlmenu
│   ├─ Listcmd
│   ├─ Mainmenu
│   ├─ Groupmenu
│   ├─ Allmenu
│   ├─ Ownermenu
│   ├─ Othermenu
│   ├─ Logo
│   └─ Repo
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        // Send main menu with enhanced styling
        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/7zfdcq.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: `${config.BOT_NAME} Menu`,
                        body: 'Powered by JawadTechX',
                        thumbnailUrl: 'https://files.catbox.moe/7zfdcq.jpg',
                        sourceUrl: 'https://github.com/XdTechPro/KHAN-DATA',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: mek }
        );
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "logo",
    alias: ["logomenu"],
    desc: "Logo menu with enhanced style",
    category: "menu",
    react: "🧃",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "🎨 Preparing Logo Menu... [20%]",
            "🖌️ Loading Logo Styles... [50%]",
            "✨ Finalizing Designs... [80%]",
            "✅ Logo Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("🖼️ Loading Logo Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Logo Menu* ❱═══════╮
│
│ 🎨 *Create Stunning Logos!*
│
├─✨ *Available Logo Styles*
│   ├─ neonlight
│   ├─ blackpink
│   ├─ dragonball
│   ├─ 3dcomic
│   ├─ america
│   ├─ naruto
│   ├─ sadgirl
│   ├─ clouds
│   ├─ futuristic
│   ├─ 3dpaper
│   ├─ eraser
│   ├─ sunset
│   ├─ leaf
│   ├─ galaxy
│   ├─ sans
│   ├─ boom
│   ├─ hacker
│   ├─ devilwings
│   ├─ nigeria
│   ├─ bulb
│   ├─ angelwings
│   ├─ zodiac
│   ├─ luxury
│   ├─ paint
│   ├─ frozen
│   ├─ castle
│   ├─ tatoo
│   ├─ valorant
│   ├─ bear
│   ├─ typography
│   └─ birthday
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/7zfdcq.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: "JawadTechX",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "reactions",
    desc: "Reactions menu with enhanced style",
    category: "menu",
    react: "💫",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "😄 Preparing Reactions... [25%]",
            "🎭 Loading Emotes... [50%]",
            "✨ Finalizing Reactions... [75%]",
            "✅ Reactions Ready! [100%]"
        ];

        let loadingMsg = await reply("🎉 Loading Reactions Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Reactions Menu* ❱═══════╮
│
│ 😄 *Express Yourself!*
│
├─🎭 *Available Reactions*
│   ├─ bully @tag
│   ├─ cuddle @tag
│   ├─ cry @tag
│   ├─ hug @tag
│   ├─ awoo @tag
│   ├─ kiss @tag
│   ├─ lick @tag
│   ├─ pat @tag
│   ├─ smug @tag
│   ├─ bonk @tag
│   ├─ yeet @tag
│   ├─ blush @tag
│   ├─ smile @tag
│   ├─ wave @tag
│   ├─ highfive @tag
│   ├─ handhold @tag
│   ├─ nom @tag
│   ├─ bite @tag
│   ├─ glomp @tag
│   ├─ slap @tag
│   ├─ kill @tag
│   ├─ happy @tag
│   ├─ wink @tag
│   ├─ poke @tag
│   ├─ dance @tag
│   └─ cringe @tag
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/7zfdcq.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "dlmenu",
    desc: "Download menu with enhanced style",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "📥 Initializing Downloads... [20%]",
            "🌐 Connecting to Sources... [50%]",
            "🚀 Preparing Download Menu... [80%]",
            "✅ Download Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("📥 Loading Download Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Download Menu* ❱═══════╮
│
│ 📥 *Download Anything!*
│
├─🌐 *Available Downloads*
│   ├─ facebook
│   ├─ mediafire
│   ├─ tiktok
│   ├─ twitter
│   ├─ Insta
│   ├─ apk
│   ├─ img
│   ├─ tt2
│   ├─ pins
│   ├─ apk2
│   ├─ fb2
│   ├─ pinterest
│   ├─ spotify
│   ├─ play
│   ├─ play2
│   ├─ play3
│   ├─ play4
│   ├─ play5
│   ├─ play6
│   ├─ play7
│   ├─ play8
│   ├─ play9
│   ├─ play10
│   ├─ audio
│   ├─ video
│   ├─ video2
│   ├─ video3
│   ├─ video4
│   ├─ video5
│   ├─ video6
│   ├─ video7
│   ├─ video8
│   ├─ video9
│   ├─ video10
│   ├─ ytmp3
│   ├─ ytmp4
│   ├─ song
│   ├─ darama
│   ├─ gdrive
│   ├─ ssweb
│   └─ tiks
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/qj853s.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "groupmenu",
    desc: "Group menu with enhanced style",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "👥 Initializing Group Tools... [20%]",
            "⚙️ Loading Group Features... [50%]",
            "🔧 Preparing Group Menu... [80%]",
            "✅ Group Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("👥 Loading Group Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Group Menu* ❱═══════╮
│
│ 👥 *Manage Your Group!*
│
├─🔧 *Group Management Tools*
│   ├─ grouplink
│   ├─ kickall
│   ├─ kickall2
│   ├─ kickall3
│   ├─ add
│   ├─ remove
│   ├─ kick
│   ├─ promote
│   ├─ demote
│   ├─ dismiss
│   ├─ revoke
│   ├─ setgoodbye
│   ├─ setwelcome
│   ├─ delete
│   ├─ getpic
│   ├─ ginfo
│   ├─ disappear on
│   ├─ disappear off
│   ├─ disappear 7D,24H
│   ├─ allreq
│   ├─ updategname
│   ├─ updategdesc
│   ├─ joinrequests
│   ├─ senddm
│   ├─ nikal
│   ├─ mute
│   ├─ unmute
│   ├─ lockgc
│   ├─ unlockgc
│   ├─ invite
│   ├─ tag
│   ├─ hidetag
│   ├─ tagall
│   └─ tagadmins
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/pw7ap2.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "funmenu",
    desc: "Fun menu with enhanced style",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "🎉 Preparing Fun Tools... [20%]",
            "😄 Loading Fun Commands... [50%]",
            "✨ Finalizing Fun Menu... [80%]",
            "✅ Fun Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("🎉 Loading Fun Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Fun Menu* ❱═══════╮
│
│ 😄 *Have Some Fun!*
│
├─🎉 *Fun Commands*
│   ├─ shapar
│   ├─ rate
│   ├─ insult
│   ├─ hack
│   ├─ ship
│   ├─ character
│   ├─ pickup
│   ├─ joke
│   ├─ hrt
│   ├─ hpy
│   ├─ syd
│   ├─ anger
│   ├─ shy
│   ├─ kiss
│   ├─ mon
│   ├─ cunfuzed
│   ├─ setpp
│   ├─ hand
│   ├─ nikal
│   ├─ hold
│   ├─ hug
│   ├─ hifi
│   └─ poke
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/l7evmf.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "othermenu",
    desc: "Other menu with enhanced style",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "🛠️ Preparing Tools... [20%]",
            "🔧 Loading Utilities... [50%]",
            "⚙️ Finalizing Other Menu... [80%]",
            "✅ Other Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("🛠️ Loading Other Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Other Menu* ❱═══════╮
│
│ 🛠️ *Useful Utilities*
│
├─🔧 *Available Tools*
│   ├─ timenow
│   ├─ date
│   ├─ count
│   ├─ calculate
│   ├─ countx
│   ├─ flip
│   ├─ coinflip
│   ├─ rcolor
│   ├─ roll
│   ├─ fact
│   ├─ cpp
│   ├─ rw
│   ├─ pair
│   ├─ pair2
│   ├─ pair3
│   ├─ fancy
│   ├─ logo <text>
│   ├─ define
│   ├─ news
│   ├─ movie
│   ├─ weather
│   ├─ srepo
│   ├─ insult
│   ├─ save
│   ├─ wikipedia
│   ├─ gpass
│   ├─ githubstalk
│   ├─ yts
│   └─ ytv
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/1re1b8.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "mainmenu",
    desc: "Main menu with enhanced style",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "⚙️ Initializing Core... [20%]",
            "🔄 Loading Main Features... [50%]",
            "🚀 Preparing Main Menu... [80%]",
            "✅ Main Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("⚙️ Loading Main Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Main Menu* ❱═══════╮
│
│ 🗿 *Core Commands*
│
├─⚙️ *Essential Commands*
│   ├─ ping
│   ├─ live
│   ├─ alive
│   ├─ runtime
│   ├─ uptime
│   ├─ repo
│   ├─ owner
│   ├─ menu
│   ├─ menu2
│   └─ restart
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/ebaiwa.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "ownermenu",
    desc: "Owner menu with enhanced style",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "🔒 Initializing Owner Tools... [20%]",
            "⚙️ Loading Admin Features... [50%]",
            "🔧 Preparing Owner Menu... [80%]",
            "✅ Owner Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("🔒 Loading Owner Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Owner Menu* ❱═══════╮
│
│ 🔰 *Admin Controls*
│
├─🔧 *Owner Commands*
│   ├─ owner
│   ├─ menu
│   ├─ menu2
│   ├─ listcmd
│   ├─ allmenu
│   ├─ repo
│   ├─ block
│   ├─ unblock
│   ├─ fullpp
│   ├─ setpp
│   ├─ restart
│   ├─ shutdown
│   ├─ updatecmd
│   ├─ alive
│   ├─ ping
│   ├─ gjid
│   └─ jid
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/pv2zy7.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "convertmenu",
    desc: "Convert menu with enhanced style",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "🔄 Preparing Converters... [20%]",
            "⚙️ Loading Convert Tools... [50%]",
            "🔧 Finalizing Convert Menu... [80%]",
            "✅ Convert Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("🔄 Loading Convert Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Convert Menu* ❱═══════╮
│
│ 🔄 *Transform Anything!*
│
├─⚙️ *Convert Commands*
│   ├─ sticker
│   ├─ sticker2
│   ├─ emojimix
│   ├─ fancy
│   ├─ take
│   ├─ tomp3
│   ├─ tts
│   ├─ trt
│   ├─ base64
│   ├─ unbase64
│   ├─ binary
│   ├─ dbinary
│   ├─ tinyurl
│   ├─ urldecode
│   ├─ urlencode
│   ├─ url
│   ├─ repeat
│   ├─ ask
│   └─ readmore
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/slc08b.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "animemenu",
    desc: "Anime menu with enhanced style",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "🌸 Preparing Anime Content... [20%]",
            "🎎 Loading Anime Features... [50%]",
            "✨ Finalizing Anime Menu... [80%]",
            "✅ Anime Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("🌸 Loading Anime Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *Anime Menu* ❱═══════╮
│
│ 🌸 *Anime World Awaits!*
│
├─🎎 *Anime Commands*
│   ├─ fack
│   ├─ dog
│   ├─ awoo
│   ├─ garl
│   ├─ waifu
│   ├─ neko
│   ├─ megnumin
│   ├─ maid
│   ├─ loli
│   ├─ animegirl
│   ├─ animegirl1
│   ├─ animegirl2
│   ├─ animegirl3
│   ├─ animegirl4
│   ├─ animegirl5
│   ├─ anime1
│   ├─ anime2
│   ├─ anime3
│   ├─ anime4
│   ├─ anime5
│   ├─ animenews
│   ├─ foxgirl
│   └─ naruto
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/ezhijd.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "aimenu",
    desc: "AI menu with enhanced style",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation
        const loadingMessages = [
            "🧠 Initializing AI Systems... [20%]",
            "🤖 Loading AI Models... [50%]",
            "🚀 Preparing AI Menu... [80%]",
            "✅ AI Menu Ready! [100%]"
        ];

        let loadingMsg = await reply("🧠 Loading AI Menu...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        let dec = `╭═══════❰ *AI Menu* ❱═══════╮
│
│ 🤖 *Smart AI Tools*
│
├─🧠 *AI Commands*
│   ├─ ai
│   ├─ gpt3
│   ├─ gpt2
│   ├─ gptmini
│   ├─ gpt
│   ├─ meta
│   ├─ blackbox
│   ├─ luma
│   ├─ dj
│   ├─ khan
│   ├─ jawad
│   ├─ gpt4
│   ├─ bing
│   ├─ imagine
│   ├─ imagine2
│   └─ copilot
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/90oj1t.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'JawadTechX',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
