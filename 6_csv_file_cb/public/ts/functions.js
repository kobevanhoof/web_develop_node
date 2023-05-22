function convertcsvstyle() {
    var productDivs = document.querySelectorAll('div.productborder');

    productDivs.forEach(function (div) {
        var imageElement = div.querySelector('img');
        if (imageElement) {
          if(flatoff()){
            div.querySelector('div').style.backgroundImage = "url(" + imageElement.src + ")";
          }
        }
        var fcolElements = div.querySelector('.fcol');
        var randElements = div.querySelector('.rand');
        var fcolContent = fcolElements.innerHTML;
        randElements.style.webkitTextStroke = "2px "+fcolContent;
    });

}
function changeBackgroundImage(div) {
  if(flatoff()){
    div.style.backgroundImage = 'url(img/wavinghand.jpeg)';
  }
  else{
    div.style.backgroundImage = 'none'
  }
  div.querySelector('div').style.opacity = 0.9;
}
function restoreBackgroundImage(div) {
  if(flatoff()){
    div.style.backgroundImage = "url(" + div.querySelector('img').src + ")";
  }
  else{
    div.style.backgroundImage = 'none'
  }
  div.querySelector('div').style.opacity = 1;
}
function main() {
  convertcsvstyle();
  sendSelectedData();
}
function sendSelectedData() {
  const colorch = document.querySelectorAll('#colorForm input[type="checkbox"]');
  const selectedColors = Array.from(colorch)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const numberch = document.querySelectorAll('#numberForm input[type="checkbox"]');
  const selectedNumbers = Array.from(numberch)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/data?colors=' + encodeURIComponent(selectedColors.join(',')) + '&RandomN=' + encodeURIComponent(selectedNumbers.join(',')), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const productsContainer = document.getElementById('productsContainer');
      productsContainer.innerHTML = ''; // Clear existing content
      productsContainer.innerHTML = xhr.responseText; // Set new HTML response
      convertcsvstyle();
    }
  };
  xhr.send();
}
let deg = 210;
let intervalId;

function startrota(int, div) {
  intervalId = setInterval(function() {
    rota(div,true);
  }, int);
}

function stoprota(div) {
  clearInterval(intervalId);
  rota(div,false);
}

function rota(div,set) {
  if(set)
  {
    deg += 10;
    if (deg >= 360) {
      deg = 0;
    }
  }
  else
  {
    deg = 210;
  }
  div.style.background = `linear-gradient(${deg}deg, rgb(200, 0, 0) 0%, rgba(25, 75, 100, 1) 25%, rgb(255, 255, 255) 100%)`;
}

function makeflat() {

  if (flatoff()) 
  {
    var productElements = document.getElementsByClassName('product');
    var productArray = Array.from(productElements);
    productArray.forEach(function(element) {
      element.classList.remove('product');
      element.classList.add('productflat');
      element.style.backgroundImage = 'none'
    });
    setCookie('hasData',false,1);
  }
  else
  {
    var productElements = document.getElementsByClassName('productflat');
    var productArray = Array.from(productElements);
    productArray.forEach(function(element) {
      element.classList.remove('productflat');
      element.classList.add('product');
      restoreBackgroundImage(element);
    });
    setCookie('hasData',true,1);
  }
  
}

function flatoff(){
  var productElements = document.getElementsByClassName('product');
  if (productElements.length <1) 
  {
    return false;
  }
  else
  {
    return true;
  }   
} 

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

