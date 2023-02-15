module.exports = {
  content: [
    './src/components/**/*.jsx',
    './src/pages/**/*.jsx',
    './src/**/*.jsx',
    './src/index.html'
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    },
    fontSize: {
      base: '1.6rem'
    },
    extend: {
      colors: {

        //MAIN
       

        //TEXT colors
     
       
        'gray-dark': '#484848',
        'green-main': '#2B564C',
        'green-main-hover': '#2e7a68',
        'green-main-darker': '#375A52',
        'gold-dark': '#B7A160',
        'red-alert': '#FF0101',
      
        
      },
      fontFamily: {
        Poppins: [ 'Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
};
