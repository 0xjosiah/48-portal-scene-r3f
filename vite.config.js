import react from '@vitejs/plugin-react'

// required for custom shaders
import glsl from 'vite-plugin-glsl'

const isCodeSandbox = !!process.env.SANDBOX_URL

export default {
    plugins:
    [
        react(),
        
        // required for custom shaders
        glsl()
    ],
    root: "src/",
    publicDir: "../public/",
    base: "./",
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true
    }
}