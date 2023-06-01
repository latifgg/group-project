const imageList = [
  {
    img: "images2/img-1.jpg"
  },
  {
    img: "images2/img-2.jpg"
  },
  {
    img: "images2/img-3.jpg"
  },
  {
    img: "images2/img-4.jpg"
  },
  {
    img: "./images2/img-5.jpg"
  },
  {
    img: "./images2/img-6.jpg"
  },
  {
    img: "./images2/img-7.jpg"
  },
  {
    img: "./images2/img-8.jpg"
  },
  {
    img: "./images2/img-9.jpg"
  },
  {
    img: "./images2/img-10.jpg"
  },
  {
    img: "./images2/img-11.jpg"
  },
  {
    img: "./images2/img-12.jpg"
  },
  {
    img: "./images2/img-13.jpg"
  },
  {
    img: "./images2/img-14.jpg"
  },
  {
    img: "./images2/img-15.jpg"
  },
  {
    img: "./images2/img-16.jpg"
  },
  {
    img: "./images2/img-17.jpg"
  },
  {
    img: "./images2/img-18.jpg"
  },
  {
    img: "./images2/img-19.jpg"
  },
  {
    img: "./images2/img-20.jpg"
  },
  {
    img: "./images2/img-21.jpg"
  },
  {
    img: "./images2/img-22.jpg"
  },
  {
    img: "./images2/img-23.jpg"
  },
  {
    img: "./images2/img-24.jpg"
  },
  {
    img: "./images2/img-25.jpg"
  },
  {
    img: "./images2/img-26.jpg"
  },
  {
    img: "./images2/img-27.jpg"
  },
  {
    img: "./images2/img-28.jpg"
  },
  {
    img: "./images2/img-29.jpg"
  },
  {
    img: "./images2/img-30.jpg"
  },
  {
    img: "./images2/img-31.jpg"
  }
]

let cardContainer= document.querySelector(".card-container");
imageList.map((item) =>{
  const cardDiv= document.createElement("div");
  cardDiv.className="card2"
  const img = document.createElement('img');
  img.src = item.img;
  cardDiv.appendChild(img);
  return cardContainer.appendChild(cardDiv);
})

//call all the buttons which is in the first tab and add eventlistener
const firstOpenTabsButtons = document.querySelectorAll(".tablinks");
firstOpenTabsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let targetId = button.dataset.target;
    openTab(e, targetId);
  });
});

//openTab function for the contain
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
let score = 0;
let timer = 120; // 120 seconds

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

for (let i = 1; i <= 31; i++) {
  let fileName = `images2/img-${i}.jpg`;
  images.push(fileName);
}

function getRandomImages() {
    let selectedImages = [];
    while (selectedImages.length < 16) {
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
    let arr = images.concat(images); // We create an array of 16 elements by adding each image 2 times
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

const timerElement = document.getElementById("timer");
let countdown;

function startTimer(duration) {
  let timer = duration;
  let minutes, seconds;

  countdown = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerElement.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(countdown);
  calculateScore();
  showScoreMessage(score);
}

function calculateScore() {
  // Skor hesaplama mantığını buraya ekleyin
  // Örnek olarak, her eşleştirme için +10 puan ekleyelim:
  score = matched * 10;
}

function showScoreMessage(score) {
  let message = "";
  if (score >= 120) {
    message = "Excellent score! You have an amazing memory!";
  } else if (score >= 80) {
    message = "Congratulations! You achieved a good score. Keep improving!";
  } else if (score >= 60) {
    message = "Well done! Your score is average, you can do even better!";
  } else {
    message = "Your score is not very high. You can improve by practicing more!";
  }
  alert(message);
}

function startGame() {
  let selectedImages = getRandomImages();
  shuffleCard(selectedImages);
  startTimer(120); // 2 minutes (120 seconds)
}