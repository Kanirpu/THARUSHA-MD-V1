const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu2",
    desc: "බොට්ගේ ප්‍රධාන මෙනුව පෙන්වයි",
    category: "menu2",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Reply handling for menu selection
        if (quoted && q && !isNaN(q.trim())) {
            const menuNumber = parseInt(q.trim());
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
                default: return reply("වලංගු නොවන මෙනු අංකයකි! කරුණාකර 1 සිට 16 දක්වා අංකයක් යවන්න.");
            }
            // Trigger the selected menu command
            await conn.sendMessage(from, { text: `.${menuCommand}` }, { quoted: mek });
            return;
        }

        // Main menu display
        let dec = `╭═════ *${config.BOT_NAME}* ═════⊷
│🌟 *Welcome, ${pushname}!* 🌟
│➤ *owner*: ${config.OWNER_NAME}
│➤ *Baileys*: Multi Device
│➤ *type*: NodeJs
│➤ *Platform*: Heroku
│➤ *Mode*: ${config.MODE}
│➤ *Prefix*: ${config.PREFIX}
│➤ *vershion*: 3.0.0 Bᴇᴛᴀ
╰═══════════════════⊷
╭═════ *Menu options* ═════⊷
│ *Reply a number:*
│ 1. Quran menu
│ 2. Convert menu
│ 3. AI menu
│ 4. Anime menu
│ 5. Reactions
│ 6. Convert menu
│ 7. Fun menu
│ 8. Download menu
│ 9. Command list
│ 10. Main menu
│ 11. Group menu
│ 12. All menu
│ 13. Owner menu
│ 14. Other menu
│ 15. Logo menu
│ 16. Repository
╰═══════════════════⊷

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;

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
      /*  await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });*/
        
    } catch (e) {
        console.log(e);
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "logo",
    alias: ["logomenu"],
    desc: "ලෝගෝ මෙනුව පෙන්වයි",
    category: "menu",
    react: "🧃",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Logo menu* ═════⊷
│🌟 *Logo command* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "reactions",
    desc: "Reaction විධාන පෙන්වයි",
    category: "menu",
    react: "💫",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let dec = `╭═════ *Reactions menu* ═════⊷
│🌟 *Reactions command* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "dlmenu",
    desc: "Download මෙනුව පෙන්වයි",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Download menu* ═════⊷
│🌟 *Download command* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "groupmenu",
    desc: "Group මෙනුව පෙන්වයි",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Group menu* ═════⊷
│🌟 *Group command* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "funmenu",
    desc: "Fun මෙනුව පෙන්වයි",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Fun menu* ═════⊷
│🌟 *Fun commands* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "othermenu",
    desc: "වෙනත් මෙනුව පෙන්වයි",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Other menu* ═════⊷
│🌟 *Other commands* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "mainmenu",
    desc: "ප්‍රධාන මෙනුව පෙන්වයි",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Main commands* ═════⊷
│🌟 *Main command* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "ownermenu",
    desc: "Owner මෙනුව පෙන්වයි",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Owner menu* ═════⊷
│🌟 *Owner command* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "convertmenu",
    desc: "Convert මෙනුව පෙන්වයි",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Convert menu* ═════⊷
│🌟 *Convert commands* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});

cmd({
    pattern: "animemenu",
    desc: "Anime මෙනුව පෙන්වයි",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *Anime menu* ═════⊷
│🌟 *Anime commands* 🌟
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
        reply(`❌😭දෝෂයක් ඇතිවුණා eror: ${e.message || e}`);
    }
});

cmd({
    pattern: "aimenu",
    desc: "AI මෙනුව පෙන්වයි",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭═════ *AI menu* ═════⊷
│🌟 *AI commands* 🌟
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
        reply(`දෝෂයක් ඇතිවුණා: ${e.message || e}`);
    }
});
