import "./app.css";
import "./global.css";

import App from "./App.svelte";

const app = new App({
  target: document.body,
  isAuth: false
  // props: {
  // 	name: 'world'
  // }
});

export default app;
