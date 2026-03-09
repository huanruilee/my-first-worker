import { Hono } from 'hono'

const app = new Hono()

// 這是一個簡單的「動態變數」，會顯示目前伺服器的時間
app.get('/', (c) => {
  const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
  
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f0f2f5;">
        <h1 style="color: #800000;">Hello! 🚀</h1>
        <p>目前台北時間：<strong>${now}</strong></p>
        <p style="color: #666;">這是一個由 Node.js 環境動態生成的網頁。</p>
        <hr style="width: 200px; border: 1px solid #ddd;">
        <a href="https://github.com/huanruilee/my-first-worker" target="_blank" style="text-decoration: none; color: #3498db;">查看我的 GitHub 倉庫</a>
      </body>
    </html>
  `)
})

export default app
