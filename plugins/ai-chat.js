const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ai",
    alias: ["bot", "dj", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, pushname }) => {
    try {
        if (!q) return reply("කරුණාකර AI එකට මැසේජ් එකක් දෙන්න.(Please give  AI a messenger.)\nExample: `.ai Hello`");

        // Loading animation
        const loadingMessages = [
            "🤖 Connecting to AI... [20%]",
            "⚙️ Processing Request... [50%]",
            "🚀 Generating Response... [80%]",
            "✅ AI Ready! [100%]"
        ];

        let loadingMsg = await reply("🤖 Initializing AI...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("> ❌ AI එකෙන් පිළිතුරක් ආවේ නැහැ. කරුණාකර පසුව උත්සාහ කරන්න.");
        }

        // Modified reply message
        const response = `╭═══════❰ *AI Response* ❱═══════╮
│
│ ✨ *Hello, ${pushname}!*
│ 🤖 *KHAN-MD AI says:*
│
├─📜 *Response*
│   └─ ${data.message}
│
╰═══════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("> ❌ AI එකත් එක්ක communicate කරද්දි එරර් එකක් ආවා.");
    }
});

cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, pushname }) => {
    try {
        if (!q) return reply("කරුණාකර OpenAI එකට මැසේජ් එකක් දෙන්න.(Please give Open AI a messenger.)\nExample: `.openai Hello`");

        // Loading animation
        const loadingMessages = [
            "🧠 Connecting to OpenAI... [20%]",
            "⚙️ Processing Request... [50%]",
            "🚀 Generating Response... [80%]",
            "✅ OpenAI Ready! [100%]"
        ];

        let loadingMsg = await reply("🧠 Initializing OpenAI...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("> ❌ OpenAI එකෙන් පිළිතුරක් ආවේ නැහැ. කරුණාකර පසුව උත්සාහ කරන්න.");
        }

        // Modified reply message
        const response = `╭═══════❰ *OpenAI Response* ❱═══════╮
│
│ ✨ *Hello, ${pushname}!*
│ 🧠 *OpenAI says:*
│
├─📜 *Response*
│   └─ ${data.result}
│
╰══════════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("> ❌ OpenAI එකත් එක්ක communicate කරද්දි එරර් එකක් ආවා.");
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, pushname }) => {
    try {
        if (!q) return reply("කරුණාකර DeepSeek AI එකට මැසේජ් එකක් දෙන්න.(Please give DeepSeek AI a messenger.)\nEXAMPLE: `.deepseek Hello`");

        // Loading animation
        const loadingMessages = [
            "🧠 Connecting to DeepSeek AI... [20%]",
            "⚙️ Processing Request... [50%]",
            "🚀 Generating Response... [80%]",
            "✅ DeepSeek Ready! [100%]"
        ];

        let loadingMsg = await reply("🧠 Initializing DeepSeek AI...");
        for (let i = 0; i < loadingMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));
            await conn.sendMessage(from, { 
                text: loadingMessages[i], 
                edit: loadingMsg.key 
            }, { quoted: mek });
        }

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("> ❌ DeepSeek AI එකෙන් පිළිතුරක් ආවේ නැහැ. කරුණාකර පසුව උත්සාහ කරන්න.");
        }

        // Modified reply message
        const response = `╭═══════❰ *DeepSeek AI Response* ❱═══════╮
│
│ ✨ *Hello, ${pushname}!*
│ 🧠 *DeepSeek AI says:*
│
├─📜 *Response*
│   └─ ${data.answer}
│
╰══════════════════════════╯

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;

        await reply(response);
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("> ❌ DeepSeek AI එකත් එක්ක communicate කරද්දි එරර් එකක් ආවා.");
    }
});
