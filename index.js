import { Hono } from 'hono'

const app = new Hono()

// 這是一個簡單的「動態變數」，會顯示目前伺服器的時間
app.get('/api/time', (c) => {
  const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
  return c.json({ time: now });
})

export default app
