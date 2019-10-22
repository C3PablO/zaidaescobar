const React = require("react");
const scrollToElement = require('scroll-to-element');
const Layout = require("./src/components/Layout").default;

exports.wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

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