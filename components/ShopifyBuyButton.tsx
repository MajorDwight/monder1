import React, { useEffect } from 'react';

interface Props {
  productId: string;
}

const ShopifyBuyButton: React.FC<Props> = ({ productId }) => {
  const containerId = `product-component-${productId}`;

  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    const initShopify = () => {
      // @ts-ignore
      if (!window.ShopifyBuy) return;
      
      // @ts-ignore
      const client = window.ShopifyBuy.buildClient({
        domain: 'zgdi4d-0x.myshopify.com',
        storefrontAccessToken: '9aa9c55c770f114d86220819df65e2ac',
      });
      
      const blackIcon = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22black%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%202%203%206v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6l-3-4Z%22%2F%3E%3Cpath%20d%3D%22M3%206h18%22%2F%3E%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%2F%3E%3C%2Fsvg%3E";
      const whiteIcon = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%202%203%206v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6l-3-4Z%22%2F%3E%3Cpath%20d%3D%22M3%206h18%22%2F%3E%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%2F%3E%3C%2Fsvg%3E";

      // @ts-ignore
      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: productId,
          node: document.getElementById(containerId),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "product": {
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "0"
                  }
                },
                "button": {
                  "font-family": '"Montserrat", sans-serif',
                  "font-weight": "bold",
                  "font-size": "10px",
                  "padding": "8px 38px 8px 16px", // Increased right padding for icon
                  "color": "black",
                  "background-color": "white",
                  "background-image": `url('${blackIcon}')`,
                  "background-repeat": "no-repeat",
                  "background-position": "calc(100% - 16px) center",
                  "border-radius": "9999px",
                  "letter-spacing": "0.1em",
                  "text-transform": "uppercase",
                  "transition": "all 0.3s ease",
                  "border": "none",
                  ":hover": {
                    "background-color": "#d4af37",
                    "color": "white",
                    "background-image": `url('${whiteIcon}')`
                  },
                  ":focus": {
                    "background-color": "#d4af37",
                    "outline": "none"
                  }
                }
              },
              "contents": {
                "img": false,
                "title": false,
                "price": false
              },
              "text": {
                "button": "Add to Bag"
              }
            },
            "modalProduct": {
              "contents": {
                "img": false,
                "imgWithCarousel": true,
                "button": false,
                "buttonWithQuantity": true
              },
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px"
                  }
                },
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
                "button": "Add to cart"
              }
            },
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
          },
        });
      });
    }

    // @ts-ignore
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initShopify();
    } else {
      // Check if script is already present
      if (!document.querySelector(`script[src="${scriptURL}"]`)) {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = initShopify;
      } else {
         // Script exists but might not be ready, poll for it
         const interval = setInterval(() => {
             // @ts-ignore
             if (window.ShopifyBuy && window.ShopifyBuy.UI) {
                 clearInterval(interval);
                 initShopify();
             }
         }, 100);
      }
    }
  }, [productId, containerId]);

  return <div id={containerId}></div>;
};

export default ShopifyBuyButton;