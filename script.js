//call all the buttons which is in the first tab and add eventlistener
const firstOpenTabsButtons = document.querySelectorAll(".tablinks");
firstOpenTabsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let targetId = button.dataset.target;
    openTab(e, targetId);
  });
});

//opanTab function for the contain
function openTab(evt, infoTabs) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(infoTabs).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  document.getElementById("defaultOpen").click();

  const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

let images = [];

for (let i = 1; i <= 30; i++) {
  let fileName = `images2/img-${i}.jpg`;
  images.push(fileName);
}

function getRandomImages() {
    let selectedImages = [];
    while (selectedImages.length < 8) {
      let randomIndex = Math.floor(Math.random() * images.length);
      let randomImage = images[randomIndex];
      if (!selectedImages.includes(randomImage)) {
        selectedImages.push(randomImage);
      }
    }
    return selectedImages;
  }


  function shuffleCard(images) {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = images.concat(images); // Her resmi 2 kez ekleyerek 16 elemanlı bir dizi oluşturuyoruz
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
      card.classList.remove("flip");
      let imgTag = card.querySelector(".back-view img");
      let fileName = arr[i].substring(7); // 
      imgTag.src = "images2/" + fileName; 
      card.addEventListener("click", flipCard);
    });
  }
  

  let selectedImages = getRandomImages(); 
  shuffleCard(selectedImages);
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});