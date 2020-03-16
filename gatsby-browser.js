require('./node_modules/react-image-lightbox/style.css');
const scrollToElement = require('scroll-to-element');

exports.onClientEntry = (a, b) => {
  if (typeof window !== undefined) {
    setTimeout(function(){
      if (window.location.pathname === '/' && window.location.hash) { 
        const anchor = window.location.hash.split('#')[1];
        scrollToElement(document.getElementById(anchor), {
          offset: -100,
          duration: 0,
        });
      }    
    }, 300);
  }
}