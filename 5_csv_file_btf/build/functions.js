"use strict";
function convertcsvstyle() {
    // Get all the div elements with class "product"
    const productDivs = document.querySelectorAll('div.product');
    // Loop through each div element
    productDivs.forEach((div) => {
        // Check if the div contains an image element
        const imageElement = div.querySelector('img');
        if (imageElement) {
            // Get the image source
            const imageUrl = imageElement.src;
            // Remove the image element
            div.removeChild(imageElement);
            // Set the background image and make it fit the div
            div.style.backgroundImage = `url(${imageUrl})`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = 'center';
        }
    });
    // Add additional logic here to convert CSV style
}
