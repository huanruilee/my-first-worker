export default {
  async fetch(request) {
    const html = `
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Henry 我的個人展示頁面</title>
        <style>
          body { 
            margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #fdfdfd; color: #333; display: flex; justify-content: center; align-items: center; min-height: 100vh;
          }
          .container { text-align: center; padding: 20px; max-width: 600px; }
          .profile-circle {
            width: 120px; height: 120px; background: #eee; border-radius: 50%; margin: 0 auto 20px;
            display: flex; align-items: center; justify-content: center; font-size: 40px;
            border: 4px solid #f38020;
          }
          h1 { margin: 10px 0; font-weight: 700; }
          p { line-height: 1.6; color: #666; }
          .links { margin-top: 25px; }
          .btn {
            display: inline-block; padding: 10px 20px; background: #333; color: white;
            text-decoration: none; border-radius: 5px; transition: 0.3s;
          }
          .btn:hover { background: #f38020; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="profile-circle">👤</div>
          <h1>你好，我是 Huanrui</h1>
          <p>這是一個跑在 Cloudflare 上的標準 HTML 頁面。<br> 
          它不使用任何特定平台的 API，純粹透過標準的 Web 規範運作。</p>
          <div class="links">
            <a href="https://github.com/huanruilee" class="btn">造訪我的 GitHub</a>
          </div>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
