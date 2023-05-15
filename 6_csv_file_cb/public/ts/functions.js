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
            imageElement.style.visibility = 'hidden';
            imageElement.style.position = 'absolute';
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

// Attach event listeners to all image-div elements
const divs = document.getElementsByClassName('.product');
for (let i = 0; i < divs.length; i++) {
  const div = divs[i];
  div.addEventListener('mouseover', function() {
    changeBackgroundImage(this);
    chan
  });
  div.addEventListener('mouseout', function() {
    restoreBackgroundImage(this);
  });
}

// Function to change the background image of a div
function changeBackgroundImage(div) {
  // Store the original background image in a data attribute
  div.dataset.originalBackground = div.style.backgroundImage;
  // Change the background image to the desired image
  div.style.backgroundImage = 'url(img/wavinghand.jpeg)';
}

// Function to restore the original background image of a div
function restoreBackgroundImage(div) {
  // Restore the original background image from the data attribute
  div.style.backgroundImage = div.dataset.originalBackground;
}

function main() {
  addHoverEffect();
  convertcsvstyle();
  sendSelectedData();
}

function sendSelectedData() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectedColors = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
 

    
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/data?colors=' + encodeURIComponent(selectedColors.join(',')), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const productsContainer = document.getElementById('productsContainer');
      productsContainer.innerHTML = ''; // Clear existing content
      productsContainer.innerHTML = xhr.responseText; // Set new HTML response
      addHoverEffect();
      convertcsvstyle();
    }
  };
  xhr.send();
}