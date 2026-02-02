export default {
  async fetch(request, env, ctx) {
    const country = request.cf.country || "TW";
    const city = request.cf.city || "Taipei";
    
    // 1. 抓取隨機名言 API (由 API Ninjas 提供)
    let quote = "學而時習之，不亦說乎？";
    let author = "孔子";
    
    try {
      const quoteRes = await fetch("https://api.quotable.io/random?tags=technology,famous-quotes");
      const quoteData = await quoteRes.json();
      quote = quoteData.content;
      author = quoteData.author;
    } catch (e) {
      // 如果 API 沒回應，就用預設的名言
    }

    const hour = (new Date().getUTCHours() + 8) % 24;
    let greeting = "你好";
    if (hour < 12) greeting = "早安，開啟美好的一天 ☕";
    else if (hour < 18) greeting = "午安，工作辛苦了 ☀️";
    else greeting = "晚安，好好放鬆休息 🌙";

    const html = `
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Huanrui 的數位名片</title>
        <style>
          :root {
            --primary-color: #f38020;
            --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          body { 
            margin: 0; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            background: var(--bg-gradient);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
          }
          .card { 
            background: rgba(255, 255, 255, 0.95); 
            padding: 2rem; 
            border-radius: 20px; 
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            max-width: 400px;
            width: 90%;
            text-align: center;
            backdrop-filter: blur(10px);
          }
          .profile-img {
            width: 100px; height: 100px;
            background: var(--primary-color);
            border-radius: 50%;
            margin: 0 auto 1rem;
            display: flex; align-items: center; justify-content: center;
            font-size: 3rem; color: white;
          }
          h1 { color: #2d3436; margin: 0.5rem 0; font-size: 1.5rem; }
          .location { color: #636e72; font-size: 0.9rem; margin-bottom: 1.5rem; }
          .quote-box {
            background: #f1f2f6;
            padding: 1rem;
            border-left: 5px solid var(--primary-color);
            margin: 1.5rem 0;
            text-align: left;
            font-style: italic;
          }
          .author { display: block; text-align: right; font-weight: bold; margin-top: 0.5rem; color: var(--primary-color); }
          .flag { width: 30px; vertical-align: middle; margin-left: 5px; border-radius: 3px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="profile-img">H</div>
          <h1>${greeting}</h1>
          <div class="location">
            📍 伺服器偵測地點：<strong>${city}, ${country}</strong>
            <img class="flag" src="https://flagcdn.com/w40/${country.toLowerCase()}.png">
          </div>
          
          <div class="quote-box">
            “${quote}”
            <span class="author">— ${author}</span>
          </div>
          
          <p style="font-size: 0.8rem; color: #b2bec3;">Powered by Cloudflare Workers & GitHub</p>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
