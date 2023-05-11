function convertcsvstyle() {
    // Get all the div elements with class "product"
    var productDivs = document.querySelectorAll('div.product');

    // Loop through each div element
    productDivs.forEach(function (div) {
        // Check if the div contains an image element
        var imageElement = div.querySelector('img');

        if (imageElement) {
            // Get the image source
            var imageUrl = imageElement.src;
            // Remove the image element
            div.removeChild(imageElement);
            // Set the background image and make it fit the div
            div.style.backgroundImage = "url(" + imageUrl + ")";
            div.style.backgroundSize = 'cover';
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = 'center';
        }

        // Check if the div has class "fcol"
        var fcolElement = div.querySelector('.fcol');
        if (fcolElement) {
            // Get the font color input
            var fontColor = fcolElement.innerText;
            div.removeChild(fcolElement);
            // Set the font color of the div
            div.style.color = fontColor;
        }
    });
}

function addHoverEffect() {
  // Get all elements with the class 'product'
  const products = document.getElementsByClassName('product');

  // Loop through each product element
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Add event listeners for mouseenter and mouseleave events
    product.addEventListener('mouseenter', function () {
      // Set the background image opacity to 0.7 when hovering
      product.style.opacity = 0.9;
    });

    product.addEventListener('mouseleave', function () {
      // Reset the background image opacity when the mouse leaves
      product.style.opacity = 1;
    });
  }
}