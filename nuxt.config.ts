// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from 'vite-plugin-eslint';
export default defineNuxtConfig({
   app: {
     head: {
       charset: 'utf-8',
       viewport: 'width=device-width,, initial-scale=1',
       title: 'Form Auth Shtab',
       meta: [
         { name: 'description', content: 'Form Auth Shtab' }
       ],
       link: [{
         rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
       }]
     }
   },
   css: ["@/asset/index.css"],
   vite: {
      plugins: [
         eslintPlugin()
      ]
    },
 })
 