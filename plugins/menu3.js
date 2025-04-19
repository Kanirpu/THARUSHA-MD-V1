const {readEnv} = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "menu3",
    desc: "bot's commands",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `*👋 Hello ${pushname}*

*╭─「 ${config.BOT_NAME} 」*
*│◈ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│◈ ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│◈ ᴠᴇʀꜱɪᴏɴ : 3.0.0*
*╰──────────●●►*

*╭╼╼╼╼╼╼╼╼╼╼●●►*
*├ 1 • MAIN*
*├ 2 • SEARCH*
*├ 3 • DOWNLOAD*
*├ 4 • GROUP*
*├ 5 • OWNER*
*├ 6 • FUN*
*╰╼╼╼╼╼╼╼╼╼╼●●►*

_*🌟 Reply with the Number you want to select*_

> *𝙋𝙊𝙒𝙀𝙍𝙀𝘿 𝘽𝙔 your Botname*`;

        const vv = await conn.sendMessage(from, { image: { url: config.MENU_IMG}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                    reply(`
╭─━─〔 ⚡ *𝐌𝐀𝐈𝐍 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒* ⚡ 〕━━╮  
┃ ◈ *alive*
┃ ◈ *menu* 
┃ ◈ *menu2*  
┃ ◈ *system*  
┃ ◈ *ping*  
┃ ◈ *runtime*
┃ ◈ *jid*
╰─━─━─━─━─━─━─━─━─●●► 
 
 > *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*  

`);

                        break;
                    case '2':               
                        reply(`
╭─━〔 🔍 *𝐒𝐄𝐀𝐑𝐂𝐇 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*  〕━──━╮  
┃ ◈ *yts*
┃ ◈ *image* 
╰─━─━─━━─━─━─━─━─━─●●►  

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*
`);
                        break;
                    case '3':               
                        reply(`  
╭─━━〔 📥 *𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒* 📥 〕━─━━╮  
┃ ◈ *apk*
┃ ◈ *twitter* 
┃ ◈ *gdrive**  
┃ ◈ *mediafire*
┃ ◈ *fb*  
┃ ◈ *play*
┃ ◈ *play2* 
┃ ◈ *video*   
┃ ◈ *video2*  
┃ ◈ *yta*  
┃ ◈ *tiktok*
┃ ◈ *ytmp3*
╰─━─━─━─━─━─━─━─━─━─●●►  

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*  

`);
                    
                        break;
                    case '4':               
                        reply(`
╭─━──━〔 ⚡ *𝐆𝐑𝐎𝐔𝐏 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒* ⚡ 〕━─━╮  
┃ ◈ *mute*  
┃ ◈ *unmute*  
┃ ◈ *promote* 
┃ ◈ *demote*
┃ ◈ *del*
┃ ◈ *add* 
┃ ◈ *admins* 
┃ ◈ *groupdesc*  
┃ ◈ *groupinfo*  
┃ ◈ *gname*  
┃ ◈ *setsubject* 
┃ ◈ *tagall*  
┃ ◈ *hidetag*  
┃ ◈ *unlock* 
┃ ◈ *lock*
┃ ◈ *gname*  
┃ ◈ *join* 
┃ ◈ *leave*  
┃ ◈ *invite*  
┃ ◈ *tagadmin* 
╰─━─━─━─━─━─━─━─━─━━─●●► 

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*  
`);
                    break;
                    case '5':               
                        reply(`
╭─━〔 🍿 *𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒* 🍿 〕━──━╮ 
┃ ◈ *shutdown*  
┃ ◈ *alive*  
┃ ◈ *ping*  
┃ ◈ *clearchats*  
┃ ◈ *block*
┃ ◈ *unblock*
┃ ◈ *repo*
┃ ◈ *owner*
┃ ◈ *owner2*
╰─━━─━─━──━─━─━━─━─●●►
 
 > *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*

`);
                    break;
                    case '6':               
                        reply(`
╭─━〔 🍿 *𝐓𝐎𝐎𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒* 🍿 〕━──━╮ 
┃ ◈ *joke*
┃ ◈ *flirt*
┃ ◈ *truth* 
┃ ◈ *dare*
┃ ◈ *fact*
┃ ◈ *pickupline*
┃ ◈ *character*
┃ ◈ *repeat*
┃ ◈ *spam*
┃ ◈ *readmore*
╰─━━─━─━──━─━─━━─━─●●►  

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*  

`);
                       
                        
                    break;
                    default:
                    
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
