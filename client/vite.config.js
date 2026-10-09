import {defineConfig, loadEnv} from 'vite';
import {fileURLToPath} from 'node:url';

export default defineConfig(({mode}) => {
  const serverDir = fileURLToPath(new URL('../server/', import.meta.url));
  const {PORT = '5000'} = loadEnv(mode, serverDir, 'PORT');
  const proxy = {'/api': {target: `http://127.0.0.1:${PORT}`, changeOrigin: true}};
  return {server: {proxy}, preview: {proxy}};
});
