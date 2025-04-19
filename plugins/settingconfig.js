const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

// config.env file path
const configEnvPath = path.resolve(__dirname, '../config.env');

// config.env file එක update කරන function
function updateConfigEnv(key, value) {
    let envContent = fs.existsSync(configEnvPath) ? fs.readFileSync(configEnvPath, 'utf-8') : '';
    let lines = envContent.split('\n');
    let keyExists = false;

    // Key-value pair එක update කරන්න
    lines = lines.map(line => {
        if (line.startsWith(`${key}=`)) {
            keyExists = true;
            return `${key}=${value}`;
        }
        return line;
    });

    if (!keyExists) {
        lines.push(`${key}=${value}`);
    }

    fs.writeFileSync(configEnvPath, lines.join('\n').trim() + '\n');
    // Environment variables reload කරන්න
    require('dotenv').config({ path: configEnvPath });
}

// Current config values ගන්න function
function getCurrentConfig() {
    return {
        SESSION_ID: process.env.SESSION_ID || 'Not set',
        AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || 'true',
        AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'false',
        AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || 'true',
        AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || '*YOUR STATUS SEEN BY THARUSHA-MD 💪*',
        PREFIX: process.env.PREFIX || '.',
        BOT_NAME: process.env.BOT_NAME || 'THARUSHA-MD',
        STICKER_NAME: process.env.STICKER_NAME || 'THARUSHA-MD',
        CUSTOM_REACT: process.env.CUSTOM_REACT || 'false',
        CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || '💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍',
        DELETE_LINKS: process.env.DELETE_LINKS || 'false',
        OWNER_NUMBER: process.env.OWNER_NUMBER || '94723038787',
        OWNER_NAME: process.env.OWNER_NAME || 'Tharusha Sandipa',
        DESCRIPTION: process.env.DESCRIPTION || '*㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*',
        ALIVE_IMG: process.env.ALIVE_IMG || 'https://i.ibb.co/nMC42B30/497.jpg',
        MENU_IMG: process.env.MENU_IMG || 'https://i.ibb.co/2xmrZRG/4920.jpg',
        ALIVE_MSG: process.env.ALIVE_MSG || 'Default live message',
        READ_MESSAGE: process.env.READ_MESSAGE || 'false',
        AUTO_REACT: process.env.AUTO_REACT || 'false',
        ANTI_BAD: process.env.ANTI_BAD || 'false',
        MODE: process.env.MODE || 'public',
        ANTI_LINK: process.env.ANTI_LINK || 'true',
        AUTO_VOICE: process.env.AUTO_VOICE || 'false',
        AUTO_STICKER: process.env.AUTO_STICKER || 'false',
        AUTO_REPLY: process.env.AUTO_REPLY || 'false',
        ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || 'false',
        PUBLIC_MODE: process.env.PUBLIC_MODE || 'true',
        AUTO_TYPING: process.env.AUTO_TYPING || 'false',
        READ_CMD: process.env.READ_CMD || 'false',
        DEV: process.env.DEV || '94740326138',
        ANTI_VV: process.env.ANTI_VV || 'true',
        ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || 'log',
        AUTO_RECORDING: process.env.AUTO_RECORDING || 'false'
    };
}

cmd({
    pattern: "settings",
    alias: ["config", "setconfig"],
    react: "⚙️",
    desc: "WhatsApp හරහා බොට් settings වෙනස් කරන්න",
    category: "owner",
    use: ".settings",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        // Bot owner විතරයි access කරන්න ඕන
        const ownerNumber = process.env.OWNER_NUMBER || '94723038787';
        if (sender !== ownerNumber + '@s.whatsapp.net') {
            return await reply("❌ මේ command එක bot ownerට විතරයි!");
        }

        const config = getCurrentConfig();

        // Settings options define කරන්න (screenshot එකේ style එකට)
        const settingsOptions = [
            { key: 'MODE', label: '[1] MODE', type: 'string', options: { '1.1': 'public', '1.2': 'private', '1.3': 'group', '1.4': 'inbox' }, value: config.MODE },
            { key: 'AUTO_STATUS_SEEN', label: '[2] AUTO READ STATUS', type: 'boolean', options: { '2.1': 'true', '2.2': 'false' }, value: config.AUTO_STATUS_SEEN },
            { key: 'AUTO_STATUS_REPLY', label: '[3] AUTO REPLY', type: 'boolean', options: { '3.1': 'true', '3.2': 'false' }, value: config.AUTO_STATUS_REPLY },
            { key: 'AUTO_VOICE', label: '[4] AUTO VOICE', type: 'boolean', options: { '4.1': 'true', '4.2': 'false' }, value: config.AUTO_VOICE },
            { key: 'AUTO_STICKER', label: '[5] AUTO STICKER', type: 'boolean', options: { '5.1': 'true', '5.2': 'false' }, value: config.AUTO_STICKER },
            { key: 'ANTI_BAD', label: '[6] ANTI BAD', type: 'boolean', options: { '6.1': 'true', '6.2': 'false' }, value: config.ANTI_BAD },
            { key: 'ANTI_LINK', label: '[7] ANTI LINK', type: 'boolean', options: { '7.1': 'true', '7.2': 'false' }, value: config.ANTI_LINK },
            { key: 'ANTI_VV', label: '[8] ANTI BOT', type: 'boolean', options: { '8.1': 'true', '8.2': 'false' }, value: config.ANTI_VV }, // ANTI_VV as ANTI BOT
            { key: 'ALWAYS_ONLINE', label: '[9] ALWAYS OFFLINE & ONLINE', type: 'boolean', options: { '9.1': 'true', '9.2': 'false' }, value: config.ALWAYS_ONLINE },
            { key: 'AUTO_STATUS_REACT', label: '[10] AUTO STATUS REACT', type: 'boolean', options: { '10.1': 'true', '10.2': 'false' }, value: config.AUTO_STATUS_REACT },
            { key: 'AUTO_STATUS_MSG', label: '[11] AUTO STATUS MSG', type: 'string', options: { '11.1': 'Custom' }, value: config.AUTO_STATUS_MSG },
            { key: 'PREFIX', label: '[12] PREFIX', type: 'string', options: { '12.1': 'Custom' }, value: config.PREFIX },
            { key: 'BOT_NAME', label: '[13] BOT NAME', type: 'string', options: { '13.1': 'Custom' }, value: config.BOT_NAME },
            { key: 'STICKER_NAME', label: '[14] STICKER NAME', type: 'string', options: { '14.1': 'Custom' }, value: config.STICKER_NAME },
            { key: 'CUSTOM_REACT', label: '[15] CUSTOM REACT', type: 'boolean', options: { '15.1': 'true', '15.2': 'false' }, value: config.CUSTOM_REACT },
            { key: 'CUSTOM_REACT_EMOJIS', label: '[16] CUSTOM REACT EMOJIS', type: 'string', options: { '16.1': 'Custom' }, value: config.CUSTOM_REACT_EMOJIS },
            { key: 'DELETE_LINKS', label: '[17] DELETE LINKS', type: 'boolean', options: { '17.1': 'true', '17.2': 'false' }, value: config.DELETE_LINKS },
            { key: 'OWNER_NUMBER', label: '[18] OWNER NUMBER', type: 'string', options: { '18.1': 'Custom' }, value: config.OWNER_NUMBER },
            { key: 'OWNER_NAME', label: '[19] OWNER NAME', type: 'string', options: { '19.1': 'Custom' }, value: config.OWNER_NAME },
            { key: 'DESCRIPTION', label: '[20] DESCRIPTION', type: 'string', options: { '20.1': 'Custom' }, value: config.DESCRIPTION },
            { key: 'ALIVE_IMG', label: '[21] ALIVE IMG', type: 'string', options: { '21.1': 'Custom' }, value: config.ALIVE_IMG },
            { key: 'MENU_IMG', label: '[22] MENU IMG', type: 'string', options: { '22.1': 'Custom' }, value: config.MENU_IMG },
            { key: 'ALIVE_MSG', label: '[23] ALIVE MSG', type: 'string', options: { '23.1': 'Custom' }, value: config.ALIVE_MSG },
            { key: 'READ_MESSAGE', label: '[24] READ MESSAGE', type: 'boolean', options: { '24.1': 'true', '24.2': 'false' }, value: config.READ_MESSAGE },
            { key: 'AUTO_REACT', label: '[25] AUTO REACT', type: 'boolean', options: { '25.1': 'true', '25.2': 'false' }, value: config.AUTO_REACT },
            { key: 'AUTO_REPLY', label: '[26] AUTO REPLY', type: 'boolean', options: { '26.1': 'true', '26.2': 'false' }, value: config.AUTO_REPLY },
            { key: 'PUBLIC_MODE', label: '[27] PUBLIC MODE', type: 'boolean', options: { '27.1': 'true', '27.2': 'false' }, value: config.PUBLIC_MODE },
            { key: 'AUTO_TYPING', label: '[28] AUTO TYPING', type: 'boolean', options: { '28.1': 'true', '28.2': 'false' }, value: config.AUTO_TYPING },
            { key: 'READ_CMD', label: '[29] READ CMD', type: 'boolean', options: { '29.1': 'true', '29.2': 'false' }, value: config.READ_CMD },
            { key: 'DEV', label: '[30] DEV NUMBER', type: 'string', options: { '30.1': 'Custom' }, value: config.DEV },
            { key: 'ANTI_DEL_PATH', label: '[31] ANTI DEL PATH', type: 'string', options: { '31.1': 'log', '31.2': 'same' }, value: config.ANTI_DEL_PATH },
            { key: 'AUTO_RECORDING', label: '[32] AUTO RECORDING', type: 'boolean', options: { '32.1': 'true', '32.2': 'false' }, value: config.AUTO_RECORDING },
            { key: 'SESSION_ID', label: '[33] SESSION ID', type: 'string', options: { '33.1': 'Custom' }, value: config.SESSION_ID }
        ];

        // Settings menu හදන්න (screenshot එකේ style එකට)
        let menu = `『 SETTING PANEL 』\n\n` +
                  `Reply below number\n\n`;

        settingsOptions.forEach((opt, index) => {
            menu += `${opt.label}\n`;
            for (const [number, value] of Object.entries(opt.options)) {
                const emoji = value === 'true' ? '🔓' : value === 'false' ? '🔒' : '➡️';
                menu += `${number} 〙➡️  ${value} ${emoji}\n`;
            }
            menu += `\n`;
        });

        const sentMsg = await conn.sendMessage(from, { text: menu }, { quoted: mek });
        const messageID = sentMsg.key.id;
        await conn.sendMessage(from, { react: { text: '⚙️', key: sentMsg.key } });

        // Custom text input එක බලාගන්න
        let awaitingTextInput = null;
        let hasProcessed = false; // Flag to ensure one-time processing

        // User reply එක බලන්න
        const handler = async (messageUpdate) => {
            try {
                const mekInfo = messageUpdate?.messages[0];
                if (!mekInfo?.message) return;

                const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
                const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (!isReplyToSentMsg || hasProcessed) return;

                hasProcessed = true; // Mark as processed
                const userReply = messageType.trim();

                // Custom text input එකක් බලාපොරොත්තු වෙනවද බලන්න
                if (awaitingTextInput) {
                    const { key } = awaitingTextInput;
                    updateConfigEnv(key, userReply);
                    await conn.sendMessage(from, { text: `✅ *${key}* updated to: ${userReply}` }, { quoted: mek });
                    awaitingTextInput = null;
                    // Cleanup listener after processing
                    conn.ev.off('messages.upsert', handler);
                    return;
                }

                // User reply එක valid option එකක්ද බලන්න
                const selectedOption = settingsOptions.find(opt =>
                    Object.keys(opt.options).includes(userReply)
                );

                if (!selectedOption) {
                    await reply("❌ වැරදි number එකක්! Valid number එකක් එවන්න (උදා: 1.1, 2.1).");
                    conn.ev.off('messages.upsert', handler);
                    return;
                }

                const newValue = selectedOption.options[userReply];

                // String setting නම් custom text ඉල්ලන්න
                if (selectedOption.type === 'string' && newValue === 'Custom') {
                    awaitingTextInput = { key: selectedOption.key };
                    await conn.sendMessage(from, { text: `📝 *${selectedOption.label}* සඳහා new value එක එවන්න.` }, { quoted: mek });
                    hasProcessed = false; // Allow further processing for text input
                    return;
                }

                // Config update කරන්න
                updateConfigEnv(selectedOption.key, newValue);
                await conn.sendMessage(from, { text: `✅ *${selectedOption.label}* updated to: ${newValue}` }, { quoted: mek });

                // Cleanup listener after processing
                conn.ev.off('messages.upsert', handler);

            } catch (error) {
                console.error('Settings update error:', error);
                await reply(`❌ *Error එකක් ආවා:* ${error.message || "Settings update කරන්න බැරි වුණා!"}`);
                conn.ev.off('messages.upsert', handler);
            }
        };

        // Event listener එක register කරන්න
        conn.ev.on('messages.upsert', handler);

    } catch (error) {
        console.error('Main settings error:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *Error එකක් ආවා:* ${error.message || "Settings load කරන්න බැරි වුණා!"}`);
    }
});
