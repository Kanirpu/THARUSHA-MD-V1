const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

// Main menu with button selection
cmd({
    pattern: "menu2",
    desc: "Main menu with button selection",
    category: "menu2",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Loading animation for initial menu
        const loadingMessages = [
            "🔄 Initializing THARUSHA-MD... [10%]",
            "⚙️ Loading Core Systems... [30%]",
            "🌐 Connecting to Servers... [60%]",
            "🚀 Preparing Button Menu... [90%]",
            "✅ Ready! Showing Buttons... [100%]"
        ];

        // Send initial loading message
        let loadingMsg = await conn.sendMessage(from, { text: loadingMessages[0] }, { quoted: mek });

        // Update loading messages
        for (let i = 1; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
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

        // Button menu
        const buttons = [
            { buttonId: 'menu_quran', buttonText: { displayText: '📖 Quran Menu' }, type: 1 },
            { buttonId: 'menu_prayer', buttonText: { displayText: '🕌 Prayer Time' }, type: 1 },
            { buttonId: 'menu_ai', buttonText: { displayText: '🤖 AI Menu' }, type: 1 },
            { buttonId: 'menu_anime', buttonText: { displayText: '🌸 Anime Menu' }, type: 1 },
            { buttonId: 'menu_reactions', buttonText: { displayText: '😄 Reactions' }, type: 1 },
            { buttonId: 'menu_convert', buttonText: { displayText: '🔄 Convert Menu' }, type: 1 },
            { buttonId: 'menu_fun', buttonText: { displayText: '🎉 Fun Menu' }, type: 1 },
            { buttonId: 'menu_dl', buttonText: { displayText: '📥 Download Menu' }, type: 1 },
            { buttonId: 'menu_listcmd', buttonText: { displayText: '📋 List CMD' }, type: 1 },
            { buttonId: 'menu_main', buttonText: { displayText: '🗿 Main Menu' }, type: 1 },
            { buttonId: 'menu_group', buttonText: { displayText: '👥 Group Menu' }, type: 1 },
            { buttonId: 'menu_all', buttonText: { displayText: '🌐 All Menu' }, type: 1 },
            { buttonId: 'menu_owner', buttonText: { displayText: '🔰 Owner Menu' }, type: 1 },
            { buttonId: 'menu_other', buttonText: { displayText: '🛠️ Other Menu' }, type: 1 },
            { buttonId: 'menu_logo', buttonText: { displayText: '🎨 Logo Menu' }, type: 1 },
            { buttonId: 'menu_repo', buttonText: { displayText: '📦 Repo' }, type: 1 }
        ];

        const buttonMessage = {
            text: `╭═══════❰ *${config.BOT_NAME} Menu* ❱═══════╮
│
│ ✨ *Welcome, ${pushname}!*
│ 📋 *Select a Menu Category Below*
│
╰══════════════════════════╯`,
            footer: '> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*',
            buttons: buttons,
            headerType: 1,
            image: { url: 'https://i.ibb.co/2xmrZRG/4920.jpg' }
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });

        // Send audio
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in menu2 command:", e);
        await reply(`❌ Menu එක ලෝඩ් කරද්දි එරර් එකක් ආවා: ${e.message}`);
    }
});

// Button response handler
cmd({
    on: "button",
    desc: "Handle button responses",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const buttonId = m.buttonId;
        let dec = '';
        let imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
        const loadingMessages = [
            "🔄 Loading Menu... [20%]",
            "⚙️ Preparing Commands... [50%]",
            "🚀 Finalizing Display... [80%]",
            "✅ Menu Ready! [100%]"
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

        switch (buttonId) {
            case 'menu_quran':
                dec = `╭═══════❰ *Quran Menu* ❱═══════╮
│
│ 📖 *Explore Holy Quran*
│
├─🕌 *Quran Commands*
│   ├─ surah
│   ├─ ayah
│   ├─ tafsir
│   └─ audioquran
│
╰═══════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                break;
            case 'menu_prayer':
                dec = `╭═══════❰ *Prayer Time Menu* ❱═══════╮
│
│ 🕌 *Prayer Schedule*
│
├─⏰ *Prayer Commands*
│   ├─ prayertime
│   ├─ salah
│   └─ adhan
│
╰══════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                break;
            case 'menu_ai':
                dec = `╭═══════❰ *AI Menu* ❱═══════╮
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
╰═══════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_anime':
                dec = `╭═══════❰ *Anime Menu* ❱═══════╮
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
╰════════════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_reactions':
                dec = `╭═══════❰ *Reactions Menu* ❱═══════╮
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
╰════════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                break;
            case 'menu_convert':
                dec = `╭═══════❰ *Convert Menu* ❱═══════╮
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
╰══════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_fun':
                dec = `╭═══════❰ *Fun Menu* ❱═══════╮
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
╰═════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_dl':
                dec = `╭═══════❰ *Download Menu* ❱═══════╮
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
╰═══════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_listcmd':
                dec = `╭═══════❰ *List CMD Menu* ❱═══════╮
│
│ 📋 *Command List*
│
├─📜 *List Commands*
│   ├─ cmdlist
│   ├─ commands
│   └─ help
│
╰═══════❰ *${config.DESCRIPTION}* ❱═══════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                break;
            case 'menu_main':
                dec = `╭═══════❰ *Main Menu* ❱═══════╮
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
╰═══════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_group':
                dec = `╭═══════❰ *Group Menu* ❱═══════╮
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
╰═════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_all':
                dec = `╭═══════❰ *All Menu* ❱═══════╮
│
│ 🌐 *Complete Command List*
│
├─📚 *All Commands*
│   ├─ (All available commands)
│   └─ Use .listcmd for details
│
╰════════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                break;
            case 'menu_owner':
                dec = `╭═══════❰ *Owner Menu* ❱═══════╮
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
╰══════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_other':
                dec = `╭═══════❰ *Other Menu* ❱═══════╮
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
╰════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                imageUrl = 'https://i.ibb.co/2xmrZRG/4920.jpg';
                break;
            case 'menu_logo':
                dec = `╭═══════❰ *Logo Menu* ❱═══════╮
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
╰═════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                break;
            case 'menu_repo':
                dec = `╭═══════❰ *Repo Menu* ❱═══════╮
│
│ 📦 *Repository Info*
│
├─🔗 *Repo Commands*
│   ├─ repo
│   ├─ source
│   └─ github
│
╰═══════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
                break;
            default:
                dec = `╭═══════❰ *Error* ❱═══════╮
│
│ ❌ *Invalid Selection*
│
╰══════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
        }

        await conn.sendMessage(
            from,
            {
                image: { url: imageUrl },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: `${config.BOT_NAME} Menu`,
                        body: 'Powered by JawadTechX',
                        thumbnailUrl: imageUrl,
                        sourceUrl: 'https://github.com/Kanirpu/THARUSHA-DATA',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error in button handler:", e);
        await reply(`❌ Button response handle කරද්දි එරර් එකක් ආවා: ${e.message}`);
    }
});

// Existing menu commands (preserved with enhanced styling)
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
        const loadingMessages = [
            "🎨 Preparing Logo Menu... [20%]",
            "🖌️ Loading Logo Styles... [50%]",
            "✨ Finalizing Designs... [80%]",
            "✅ Logo Menu Ready! [100%]"
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
╰═════════════════════╯

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
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: "𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error in logo command:", e);
        await reply(`❌ Logo menu එක ලෝඩ් කරද්දි එරර් එකක් ආවා: ${e.message}`);
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
        const loadingMessages = [
            "😄 Preparing Reactions... [25%]",
            "🎭 Loading Emotes... [50%]",
            "✨ Finalizing Reactions... [75%]",
            "✅ Reactions Ready! [100%]"
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
╰════════════════════╯

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
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error in reactions command:", e);
        await reply(`❌ Reactions menu එක ලෝඩ් කරද්දි එරර් එකක් ආවා: ${e.message}`);
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
        const loadingMessages = [
            "📥 Initializing Downloads... [20%]",
            "🌐 Connecting to Sources... [50%]",
            "🚀 Preparing Download Menu... [80%]",
            "✅ Download Menu Ready! [100%]"
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
╰════════════════════╯

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
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error in dlmenu command:", e);
        await reply(`❌ Download menu එක ලෝඩ් කරද්දි එරර් එකක් ආවා: ${e.message}`);
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
        const loadingMessages = [
            "👥 Initializing Group Tools... [20%]",
            "⚙️ Loading Group Features... [50%]",
            "🔧 Preparing Group Menu... [80%]",
            "✅ Group Menu Ready! [100%]"
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
╰═══════════════════════╯

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
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error in groupmenu command:", e);
        await reply(`❌ Group menu එක ලෝඩ් කරද්දි එරර් එකක් ආවා: ${e.message}`);
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
        const loadingMessages = [
            "🎉 Preparing Fun Tools... [20%]",
            "😄 Loading Fun Commands... [50%]",
            "✨ Finalizing Fun Menu... [80%]",
            "✅ Fun Menu Ready! [100%]"
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
╰════════════════════╯

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
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error in funmenu command:", e);
        await reply(`❌ Fun menu එක ලෝඩ් කරද්දි එරර් එකක් ආවා: ${e.message}`);
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
        const loadingMessages = [
            "🛠️ Preparing Tools... [20%]",
            "🔧 Loading Utilities... [50%]",
            "⚙️ Finalizing Other Menu... [80%]",
            "✅ Other Menu Ready! [100%]"
        ];

        // Send initial loading message
        let loadingMsg = await conn.sendMessage(from, { text: loadingMessages[0] }, { quoted: mek });

        // Update loading messages
        for (let i = 1; i < loadingMessages
