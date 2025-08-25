import { createApp } from './app';
const port = Number(process.env.PORT ?? 8000);
const app = createApp();
app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
