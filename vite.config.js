import { defineConfig, loadEnv } from 'vite';
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react({
				compiler: true
			}),
			svgr()],
		define: {
			'process.env': {
				API_URL: env.API_URL,
			},
			
		},
		build: {
            outDir: 'build',
            target: 'es2020',
            minify: 'esbuild',
            sourcemap: true,

            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            if (id.includes('react-hook-form')) {
                                return 'react-hook-form';
                            }
                            if (id.includes('@mui')) {
                                return 'mui';
                            }
                        }
                    },
                },
            },
        },
		resolve: {
			alias: {
				'@shared': '/src/shared',
				'@entities': '/src/entities',
				'@features': '/src/features',
				'@widgets': '/src/widgets',
				'@pages': '/src/pages',
				'@app': '/src/app',
			},
		},
		server: {
			port: 3000,
		},
	};
});
