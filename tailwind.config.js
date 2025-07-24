   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           border: "hsl(var(--border))",
           background: "#1E1E1E", // Menambahkan warna background
           foreground: "#FFFFFF", // Menambahkan warna foreground jika diperlukan
           background: '#1A1A1A', // atau warna gelap lainnya
           // Tambahkan warna lain sesuai kebutuhan
         },
       },
     },
     plugins: [],
   };
   