const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu2",
    desc: "Displays the bot's main menu with interactive reply options",
    category: "menu2",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the message is a reply with a number
        if (quoted && q && !isNaN(q)) {
            const menuNumber = parseInt(q);
            let menuCommand;
            switch (menuNumber) {
                case 1: menuCommand = "quranmenu"; break;
                case 2: menuCommand = "prayertime"; break;
                case 3: menuCommand = "aimenu"; break;
                case 4: menuCommand = "animemenu"; break;
                case 5: menuCommand = "reactions"; break;
                case 6: menuCommand = "convertmenu"; break;
                case 7: menuCommand = "funmenu"; break;
                case 8: menuCommand = "dlmenu"; break;
                case 9: menuCommand = "listcmd"; break;
                case 10: menuCommand = "mainmenu"; break;
                case 11: menuCommand = "groupmenu"; break;
                case 12: menuCommand = "allmenu"; break;
                case 13: menuCommand = "ownermenu"; break;
                case 14: menuCommand = "othermenu"; break;
                case 15: menuCommand = "logo"; break;
                case 16: menuCommand = "repo"; break;
                default: return reply("Invalid menu number! Please reply with a number between 1 and 16.");
            }
            // Trigger the corresponding menu command
            return conn.sendMessage(from, { text: `.${menuCommand}` }, { quoted: mek });
        }

        // Main menu display
        let dec = `╭═════ *${config.BOT_NAME}* ═════⊷
│✨ *Welcome, ${pushname}!* ✨
│➤ *Owner*: ${config.OWNER_NAME}
│➤ *Baileys*: Multi Device
│➤ *Type*: NodeJs
│➤ *Platform*: Heroku
│➤ *Mode*: ${config.MODE}
│➤ *Prefix*: ${config.PREFIX}
│➤ *Version*: 3.0.0 Bᴇᴛᴀ
╰═══════════════════⊷
╭═════ *Menu Options* ═════⊷
│ *Reply with a number to view:*
│ 1. Quran Menu
│ 2. Prayer Time
│ 3. AI Menu
│ 4. Anime Menu
│ 5. Reactions
│ 6. Convert Menu
│ 7. Fun Menu
│ 8. Download Menu
│ 9. List Commands
│ 10. Main Menu
│ 11. Group Menu
│ 12. All Menu
│ 13. Owner Menu
│ 14. Other Menu
│ 15. Logo Menu
│ 16. Repository
╰═══════════════════⊷
> *Powered by 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

cmd({
    pattern: "logo",
    alias: ["logomenu"],
    desc: "Displays the logo menu",
    category: "menu",
    react: "🧃",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Logo Menu* ═════⊷
│✨ *Available Logo Styles* ✨
│➤ neonlight
│➤ blackpink
│➤ dragonball
│➤ 3dcomic
│➤ america
│➤ naruto
│➤ sadgirl
│➤ clouds
│➤ futuristic
│➤ 3dpaper
│➤ eraser
│➤ sunset
│➤ leaf
│➤ galaxy
│➤ sans
│➤ boom
│➤ hacker
│➤ devilwings
│➤ nigeria
│➤ bulb
│➤ angelwings
│➤ zodiac
│➤ luxury
│➤ paint
│➤ frozen
│➤ castle
│➤ tatoo
│➤ valorant
│➤ bear
│➤ typography
│➤ birthday
╰═══════════════════⊷`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

cmd({
    pattern: "reactions",
    desc: "Shows the reaction commands",
    category: "menu",
    react: "💫",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let dec = `╭═════ *Reactions Menu* ═════⊷
│✨ *Available Reactions* ✨
│➤ bully @tag
│➤ cuddle @tag
│➤ cry @tag
│➤ hug @tag
│➤ awoo @tag
│➤ kiss @tag
│➤ lick @tag
│➤ pat @tag
│➤ smug @tag
│➤ bonk @tag
│➤ yeet @tag
│➤ blush @tag
│➤ smile @tag
│➤ wave @tag
│➤ highfive @tag
│➤ handhold @tag
│➤ nom @tag
│➤ bite @tag
│➤ glomp @tag
│➤ slap @tag
│➤ kill @tag
│➤ happy @tag
│➤ wink @tag
│➤ poke @tag
│➤ dance @tag
│➤ cringe @tag
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// dlmenu
cmd({
    pattern: "dlmenu",
    desc: "Displays the download menu",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Download Menu* ═════⊷
│✨ *Available Download Commands* ✨
│➤ facebook
│➤ mediafire
│➤ tiktok
│➤ twitter
│➤ Insta
│➤ apk
│➤ img
│➤ tt2
│➤ pins
│➤ apk2
│➤ fb2
│➤ pinterest 
│➤ spotify
│➤ play
│➤ play2
│➤ play3
│➤ play4
│➤ play5
│➤ play6
│➤ play7
│➤ play8
│➤ play9
│➤ play10
│➤ audio
│➤ video
│➤ video2
│➤ video3
│➤ video4
│➤ video5
│➤ video6
│➤ video7
│➤ video8
│➤ video9
│➤ video10
│➤ ytmp3
│➤ ytmp4
│➤ song
│➤ darama
│➤ gdrive
│➤ ssweb
│➤ tiks
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// group menu
cmd({
    pattern: "groupmenu",
    desc: "Displays the group menu",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Group Menu* ═════⊷
│✨ *Available Group Commands* ✨
│➤ grouplink
│➤ kickall
│➤ kickall2
│➤ kickall3
│➤ add
│➤ remove
│➤ kick
│➤ promote 
│➤ demote
│➤ dismiss 
│➤ revoke
│➤ setgoodbye
│➤ setwelcome
│➤ delete 
│➤ getpic
│➤ ginfo
│➤ delete 
│➤ disappear on
│➤ disappear off
│➤ disappear 7D,24H
│➤ allreq
│➤ updategname
│➤ updategdesc
│➤ joinrequests
│➤ senddm
│➤ nikal
│➤ mute
│➤ unmute
│➤ lockgc
│➤ unlockgc
│➤ invite
│➤ tag
│➤ hidetag
│➤ tagall
│➤ tagadmins
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// fun menu
cmd({
    pattern: "funmenu",
    desc: "Displays the fun menu",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Fun Menu* ═════⊷
│✨ *Available Fun Commands* ✨
│➤ shapar
│➤ rate
│➤ insult
│➤ hack
│➤ ship
│➤ character
│➤ pickup 
│➤ joke
│➤ hrt
│➤ hpy
│➤ syd
│➤ anger
│➤ shy
│➤ kiss
│➤ mon
│➤ cunfuzed
│➤ setpp
│➤ hand
│➤ nikal
│➤ hold
│➤ hug
│➤ nikal
│➤ hifi
│➤ poke
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// other menu
cmd({
    pattern: "othermenu",
    desc: "Displays the other menu",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Other Menu* ═════⊷
│✨ *Available Other Commands* ✨
│➤ timenow
│➤ date
│➤ count
│➤ calculate
│➤ countx
│➤ flip
│➤ coinflip
│➤ rcolor
│➤ roll
│➤ fact
│➤ cpp
│➤ rw
│➤ pair
│➤ pair2
│➤ pair3
│➤ fancy
│➤ logo <text>
│➤ define
│➤ news
│➤ movie
│➤ weather
│➤ srepo
│➤ insult
│➤ save
│➤ wikipedia
│➤ gpass
│➤ githubstalk
│➤ yts
│➤ ytv
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// main menu
cmd({
    pattern: "mainmenu",
    desc: "Displays the main menu",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Main Menu* ═════⊷
│✨ *Available Main Commands* ✨
│➤ ping
│➤ live 
│➤ alive
│➤ runtime
│➤ uptime 
│➤ repo
│➤ owner
│➤ menu
│➤ menu2
│➤ restart
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// owner menu
cmd({
    pattern: "ownermenu",
    desc: "Displays the owner menu",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Owner Menu* ═════⊷
│✨ *Available Owner Commands* ✨
│➤ owner
│➤ menu
│➤ menu2
│➤ listcmd
│➤ allmenu
│➤ repo
│➤ block
│➤ unblock
│➤ fullpp
│➤ setpp
│➤ restart
│➤ shutdown
│➤ updatecmd
│➤ alive
│➤ ping 
│➤ gjid
│➤ jid
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// convert menu
cmd({
    pattern: "convertmenu",
    desc: "Displays the convert menu",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Convert Menu* ═════⊷
│✨ *Available Convert Commands* ✨
│➤ sticker
│➤ sticker2
│➤ emojimix
│➤ fancy
│➤ take
│➤ tomp3
│➤ tts
│➤ trt
│➤ base64
│➤ unbase64
│➤ binary
│➤ dbinary
│➤ tinyurl
│➤ urldecode
│➤ urlencode
│➤ url
│➤ repeat 
│➤ ask
│➤ readmore
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// anime menu 
cmd({
    pattern: "animemenu",
    desc: "Displays the anime menu",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Anime Menu* ═════⊷
│✨ *Available Anime Commands* ✨
│➤ fack
│➤ dog
│➤ awoo
│➤ garl
│➤ waifu
│➤ neko
│➤ megnumin
│➤ neko
│➤ maid
│➤ loli
│➤ animegirl
│➤ animegirl
│➤ animegirl1
│➤ animegirl2
│➤ animegirl3
│➤ animegirl4
│➤ animegirl5
│➤ anime1
│➤ anime1
│➤ anime2
│➤ anime3
│➤ anime4
│➤ anime5
│➤ animenews
│➤ foxgirl
│➤ naruto
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// ai menu 
cmd({
    pattern: "aimenu",
    desc: "Displays the AI menu",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *AI Menu* ═════⊷
│✨ *Available AI Commands* ✨
│➤ ai
│➤ gpt3
│➤ gpt2
│➤ gptmini
│➤ gpt
│➤ meta
│➤ blackbox
│➤ luma
│➤ dj 
│➤ khan
│➤ jawad
│➤ gpt4
│➤ bing
│➤ imagine 
│➤ imagine2
│➤ copilot
╰═══════════════════⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/2xmrZRG/4920.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
