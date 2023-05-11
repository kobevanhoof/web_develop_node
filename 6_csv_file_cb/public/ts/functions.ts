function convertcsvstyle(): void {
  // Get all the div elements with class "product"
  const productDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.product');

  // Loop through each div element
  productDivs.forEach((div: HTMLDivElement) => {
    // Check if the div contains an image element
    const imageElement: HTMLImageElement | null = div.querySelector('img');
    if (imageElement) {
      // Get the image source
      const imageUrl: string = imageElement.src;

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