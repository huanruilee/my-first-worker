export default {
  async fetch(request, env, ctx) {
    // 取得訪客的地點資訊（由 Cloudflare 邊緣節點自動提供）
    const country = request.cf.country;
    const city = request.cf.city;
    const flag = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${country.toLowerCase()}.svg`;

// 取得當前小時 (UTC+8 台灣時間)
const hour = (new Date().getUTCHours() + 8) % 24;
let greeting = "這是我從 GitHub 自動更新的網頁！";

if (hour < 12) {
  greeting = "早安！該喝杯咖啡了 ☕";
} else if (hour < 18) {
  greeting = "午安！今天過得好嗎？☀️";
} else {
  greeting = "晚安！早點休息喔 🌙";
}

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>我的第一個 Cloudflare Worker</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding-top: 50px; background: #f4f7f6; }
          .card { background: white; padding: 20px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          h1 { color: #f38020; }
        </style>
      </head>
      <body>
        <div class="card">
        <h1>${greeting}</h1>
          <p>我現在是從 Cloudflare 的邊緣節點為你服務的。</p>
          <p>偵測到你來自：<strong>${city}, ${country}</strong></p>
          <img src="${flag}" width="100" style="border: 1px solid #ddd">
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
