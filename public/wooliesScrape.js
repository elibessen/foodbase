(async () => { //I think this would work, but woolies blocks it
    const response = await fetch('https://www.woolworths.com.au/shop/productdetails/328562/maybelline-colossal-volumizing-mascara-glam-black');
    const text = await response.text();
    console.log(text.match(/(?<=\<span class="price-dollars">).*(?=\<\/span>)/));
  })()
