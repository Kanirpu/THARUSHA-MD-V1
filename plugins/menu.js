const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu2",
    desc: "menu the bot",
    category: "menu2",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃★
┃★ Owner : *${config.OWNER_NAME}*
┃★ Baileys : *Multi Device*
┃★ Type : *NodeJs*
┃★ Platform : *Heroku*
┃★ Mode : *[${config.MODE}]*
┃★ Prifix : *[${config.PREFIX}]*
┃★ Version : *3.0.0 Bᴇᴛᴀ*
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 *Menu List* 〕━━┈⊷
┃◈
┃◈ Quranmenu
┃◈ Prayertime
┃◈ Aimenu
┃◈ Anmiemenu
┃◈ Reactions
┃◈ Convertmenu
┃◈ Funmenu
┃◈ Dlmenu
┃◈ Listcmd
┃◈ Mainmenu
┃◈ Groupmenu
┃◈ Allmenu
┃◈ Ownermenu
┃◈ Othermenu
┃◈ Logo 
┃◈ Repo
╰──────────────┈⊷
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        /*await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });*/
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "logo",
    alias: ["logomenu"],
    desc: "menu the bot",
    category: "menu",
    react: "🧃",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Logo List* 〕━━┈⊷
┃◈
┃◈ neonlight
┃◈ blackpink
┃◈ dragonball
┃◈ 3dcomic
┃◈ america
┃◈ naruto
┃◈ sadgirl
┃◈ clouds
┃◈ futuristic
┃◈ 3dpaper
┃◈ eraser
┃◈ sunset
┃◈ leaf
┃◈ galaxy
┃◈ sans
┃◈ boom
┃◈ hacker
┃◈ devilwings
┃◈ nigeria
┃◈ bulb
┃◈ angelwings
┃◈ zodiac
┃◈ luxury
┃◈ paint
┃◈ frozen
┃◈ castle
┃◈ tatoohg
┃◈ valorant
┃◈ bear
┃◈ typography
┃◈ birthday
╰──────────────┈⊷`;

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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
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
        let dec = `╭───────────●●►
│ *⬇️ DOWNLOAD COMMANDS*
│   ───────
│► .downurl
│► .movie
│► .soundcloud
│► .download
│► .threads
│► .twitter
│► .pinterest
│► .sisub
│► .fb2
│► .capcut
│► .gitclone
│► .tiktok
│► .fb
│► .ig
│► .apk
│► .fmmod
│► .gdrive
│► .mediafire
│► .ss
│► .video
│► .song
│► .spotify
│► .img
│► .xvdl
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// dlmenu

cmd({
    pattern: "dlmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *⬇️ DOWNLOAD COMMANDS*
│   ───────
│► .downurl
│► .movie
│► .soundcloud
│► .download
│► .threads
│► .twitter
│► .pinterest
│► .sisub
│► .fb2
│► .capcut
│► .gitclone
│► .tiktok
│► .fb
│► .ig
│► .apk
│► .fmmod
│► .gdrive
│► .mediafire
│► .ss
│► .video
│► .song
│► .spotify
│► .img
│► .xvdl
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// group menu

cmd({
    pattern: "groupmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *🔱 GROUP COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu

cmd({
    pattern: "funmenu",
    desc: "menu the bot",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭╭───────────●●►
│ *🔱 FUN COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// other menu

cmd({
    pattern: "othermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *🔱 OTHER COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// main menu

cmd({
    pattern: "mainmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *🔱 MAIN COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// owner menu

cmd({
    pattern: "ownermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *🔱 OWNER COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// convert menu

cmd({
    pattern: "convertmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *🔱 CONVERT COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// anime menu 

cmd({
    pattern: "animemenu",
    desc: "menu the bot",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *🔱 ANIMA COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// ai menu 

cmd({
    pattern: "aimenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭───────────●●►
│ *🔱 AI COMMANDS*
│   ───────
│► .gdp
│► .automute
│► .autounmute
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
╰───────────●●►
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
                        newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
