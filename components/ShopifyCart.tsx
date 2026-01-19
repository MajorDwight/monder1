import React, { useEffect } from 'react';

const ShopifyCart: React.FC = () => {
  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    const initCart = () => {
      // @ts-ignore
      if (!window.ShopifyBuy) return;
      
      // @ts-ignore
      const client = window.ShopifyBuy.buildClient({
        domain: 'zgdi4d-0x.myshopify.com',
        storefrontAccessToken: '9aa9c55c770f114d86220819df65e2ac',
      });
      
      // @ts-ignore
      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        // Store globally for Navbar access
        // @ts-ignore
        window.shopifyUI = ui;

        ui.createComponent('cart', {
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "cart": {
              "styles": {
                "button": {
                  "font-family": '"Montserrat", sans-serif',
                  "background-color": "#1a1a1a",
                  ":hover": {
                    "background-color": "#d4af37"
                  },
                  "border-radius": "4px"
                }
              },
              "text": {
                "total": "Subtotal",
                "button": "Checkout"
              },
              "popup": false
            },
            "toggle": {
              "styles": {
                "toggle": {
                  "background-color": "#1a1a1a",
                  "transition": "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  ":hover": {
                    "background-color": "#8a1700",
                    "box-shadow": "0 0 30px 6px rgba(138, 23, 0, 0.85)"
                  },
                  ":focus": {
                    "background-color": "#8a1700",
                    "box-shadow": "0 0 30px 6px rgba(138, 23, 0, 0.85)"
                  }
                }
              }
            }
          }
        });
      });
    };

    // @ts-ignore
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initCart();
    } else {
      if (!document.querySelector(`script[src="${scriptURL}"]`)) {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = initCart;
      } else {
         const interval = setInterval(() => {
             // @ts-ignore
             if (window.ShopifyBuy && window.ShopifyBuy.UI) {
                 clearInterval(interval);
                 initCart();
             }
         }, 100);
      }
    }
  }, []);

  return null;
};

export default ShopifyCart;