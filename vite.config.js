import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
    plugins: [react()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: {
        port: 5173,
        open: true,
        // OneDrive/Dropbox-synced folders can lock files (EBUSY); polling avoids it.
        watch: {
            usePolling: true,
            interval: 300,
            ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
        },
    },
});
