export default {
  async fetch(request, env, ctx) {
    // 1. 取得 Cloudflare 提供的位置資訊
    const country = request.cf.country || "TW";
    const city = request.cf.city || "Taipei";
    const lat = request.cf.latitude || "25.03";
    const lon = request.cf.longitude || "121.56";
    
    // 2. 抓取即時天氣 API (Open-Meteo)
    let weatherInfo = "取得天氣中...";
    let temp = "--";
    try {
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const weatherData = await weatherRes.json();
      temp = Math.round(weatherData.current_weather.temperature);
      const code = weatherData.current_weather.weathercode;
      // 簡單的天氣代碼轉換
      weatherInfo = code < 3 ? "晴朗 ☀️" : code < 60 ? "多雲 ☁️" : "下雨 🌧️";
    } catch (e) {
      weatherInfo = "天氣服務暫不穩定";
    }

    // 3. 抓取隨機名言 API
    let quote = "學而時習之，不亦說乎？";
    let author = "孔子";
    try {
      const quoteRes = await fetch("https://api.quotable.io/random?tags=famous-quotes");
      const quoteData = await quoteRes.json();
      quote = quoteData.content;
      author = quoteData.author;
    } catch (e) {}

    const hour = (new Date().getUTCHours() + 8) % 24;
    let greeting = hour < 12 ? "早安 ☕" : hour < 18 ? "午安 ☀️" : "晚安 🌙";

    // 4. 根據溫度動態改變卡片邊框顏色（低於20度藍色，高於25度橘色）
    const themeColor = temp < 20 ? "#3498db" : temp > 25 ? "#e67e22" : "#2ecc71";

    const html = `
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Huanrui 的智慧名片</title>
        <style>
          body { 
            margin: 0; display: flex; justify-content: center; align-items: center; 
            min-height: 100vh; background: #f0f2f5; 
            font-family: sans-serif;
          }
          .card { 
            background: white; padding: 30px; border-radius: 20px; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 85%; max-width: 400px;
            text-align: center; border-top: 8px solid ${themeColor};
          }
          .weather-badge {
            background: ${themeColor}22; color: ${themeColor};
            padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 0.9rem;
          }
          .quote-box { font-style: italic; color: #555; margin: 20px 0; border-top: 1px solid #eee; padding-top: 20px; }
          .author { display: block; margin-top: 10px; font-weight: bold; color: ${themeColor}; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="weather-badge">${city} · ${temp}°C · ${weatherInfo}</div>
          <h1 style="color: #333;">${greeting}</h1>
          <p>您來自 <strong>${country}</strong> <img src="https://flagcdn.com/w20/${country.toLowerCase()}.png"></p>
          
          <div class="quote-box">
            “${quote}”
            <span class="author">— ${author}</span>
          </div>
          <small style="color: #ccc;">自動更新時間：${new Date().toLocaleTimeString('zh-TW', {timeZone: 'Asia/Taipei'})}</small>
        </div>
      </body>
      </html>
    `;

    return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
  },
};
