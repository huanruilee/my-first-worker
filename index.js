import { Hono } from 'hono'
const app = new Hono()

app.get('/', async (c) => {
  // 1. 抓取天氣數據 (台北)
  const weatherRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=25.03&longitude=121.56&current_weather=true');
  const weatherData = await weatherRes.json();
  const weather = weatherData.current_weather;

  // 2. 股市模擬數據 (因為 API 通常需要 Key，這裡先以資料格式示範)
  const stocks = [
    { name: '美股 (S&P 500)', price: '4,958.61', change: '+0.8%' },
    { name: '台股 (TWSE)', price: '18,060.21', change: '-0.2%' },
    { name: '日經 (Nikkei 225)', price: '36,158.02', change: '+1.1%' }
  ];

  // 3. 組合 HTML 模板
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Worker 儀表板</title>
      <style>
        body { font-family: sans-serif; background: #1a1a1a; color: white; display: flex; justify-content: center; padding: 40px; }
        .card { background: #2d2d2d; padding: 25px; border-radius: 12px; width: 350px; border: 1px solid #444; }
        h1 { font-size: 20px; border-bottom: 1px solid #444; padding-bottom: 10px; }
        .temp { font-size: 40px; color: #00d1b2; margin: 10px 0; }
        .stock-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #3d3d3d; }
        .up { color: #ff3860; } .down { color: #23d160; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>我的今日情報站</h1>
        <div>
          <h3>台北天氣</h3>
          <div class="temp">${weather.temperature}°C</div>
          <small>風速: ${weather.windspeed} km/h</small>
        </div>
        <hr>
        <div>
          <h3>股市行情</h3>
          ${stocks.map(s => `
            <div class="stock-row">
              <span>${s.name}</span>
              <span class="${s.change.includes('+') ? 'up' : 'down'}">${s.price}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </body>
    </html>
  `;

  return c.html(html)
})

export default app
