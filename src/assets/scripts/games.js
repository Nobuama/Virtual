const gameCardsBlock = document.querySelector('.content__items');
const gameCards = document.querySelectorAll('.content__items');
const newCardBtn = document.querySelector('.content__new-card');
const newCardBtnMenu = document.querySelector('.person__menu-addCard');
const pagination = document.querySelectorAll('.content__nav');
const popUpHTML = `
   <select class="content__popup">
   <option value="1" name="newFirst" class="content__opt">New First</option>
   <option value="2" name="newLast" class="content__opt">New Last</option>
   </select>`;


const popUpCreate = () => {
   if(document.querySelector('.content__popup')) return;
   if(document.querySelector('.content__btn-block')) {
       document.querySelector('.content__btn-block').insertAdjacentHTML('beforeend', popUpHTML);

       const popUp = document.querySelector('.content__popup');
       popUp.onchange = filterGames;
   };
};


const newCardModal = `
<div class="new-card">
<div class="new-card__header">
<h2>Realities cards</h2>
</div>
<form class="new-card__form" name="newCard">
<legend class="new-card__legend">Add new card</legend>
<input class="new-card__inp" name="gameName" type="text" placeholder="Game name" required>
<input class="new-card__inp" name="gameDescription" type="text" placeholder="Game description" required>
<input class="new-card__inp" name="img" type="text" placeholder="Card image URL" required>
<input class="new-card__inp" name="userReview" type="text" placeholder="Game review" required>
<button class="new-card__btn">Add</button>
</form>
</div>`;

let scriptJs;
let newCardForm;
let Obj;
let getValuesFromCard;
let handleSubmitAddCardForm;
let arrayList = [];
let size;
window.onresize = screen.width < 450 ?  size = 3 : size = 9;

const paginationBtn = (arr) => {
   let btn = '';
   pagination.forEach((elem) => {
      for(let i = 0; i < arr.length/size;i++){
         btn += `<li><button class="content__btn">${i + 1}</button></li>`;
      }
      elem.innerHTML = btn;
   });
};

const findOneById = (array, e) => {
   return array.find((item) => item.id === e.currentTarget.id);
};

const truncate = (str, maxlength) => {
   return (str.length > maxlength) ? str.slice(0, maxlength - 1) + '…' : str;
 };

const callAddCardModal = () => {
   createOverlay(newCardModal);
   
   scriptJs = document.createElement('script');
   scriptJs.src = `src/assets/scripts/add-a-new-card.js`;
   document.querySelector('.wrapper').append(scriptJs);
};


const createCards = (page) => {
   arrayList = CARDS.slice().splice(page*size,size);
   gameCards.forEach((elem) => {
      let item = ``;

      for(let i = 0; i < arrayList.length; i++){
         item += `
         <li id="${arrayList[i].id}" class="content__item">
            <img src="${arrayList[i].img}" alt="card-img" class="content__img">
            <div class="content__decsription">
               <div class="content__name">
                  <h3 class="content__card-name title">${arrayList[i].gameName}</h3>
                  <p class="content__properties text">${truncate(arrayList[i].gameDescription, 50)}</p>
               </div>
               <div class="content__review">
                  <h3 class="content__card-name title">${arrayList[i].userName}</h3>
                  <p class="content__properties text">${truncate(arrayList[i].userReview, 50)}</p>
               </div>
            </div>
         </li>`;
      }
      elem.innerHTML = item;
   })
   return arrayList;
};
const addBtnClass = (btnElem, prevBtn) => {
	prevBtn.forEach(elem => elem.classList.remove('content__btn--active'));
	btnElem.classList.add('content__btn--active');
};

const getCards = () => {

   if (!readVirtualUserLocal('Games')){
      gameCardsBlock.innerHTML = `<p class = "noCards">Empty Cards</p>`;
      return;
   };

   CARDS = (readVirtualUserLocal('Games'));
   createCards();
   paginationBtn(CARDS);
   btnPag = document.querySelectorAll('.content__btn');
   btnPag.forEach((elem,i) => {
      elem.addEventListener('click', () => {createCards([i]); addBtnClass(elem,btnPag); showGame();});
   });
   btnPag[0].classList.add('content__btn--active');
   showGame();
};


const filterGames = (e) =>{
   switch (e.target.value){
      case "2":
         CARDS.sort((a,b) => b.createdAt-a.createdAt);
         break;
       case "1":
          CARDS.sort((a,b) => a.createdAt-b.createdAt);
          break;
      }
   createCards();
};
      

if (readVirtualUserLocal('Games')) {
   popUpCreate();
   getCards();
};


if(VirtualUser.userAuth){
   newCardBtn.addEventListener('click', callAddCardModal);
   newCardBtnMenu.addEventListener('click', callAddCardModal);
   getCards();
} else {newCardBtn.style.cursor = 'not-allowed';};
      
getCards();

function handleWatch (id){
   const game = findOneById(CARDS, id);
   const modalGameHTML = `
   <div class="modal-wrapper">
         <div class="item">
            <img src="${game.img}" alt="grid-item" class="item-img">
            <h3 class="item-header">${game.gameName}</h3>
            <p class="item-text">${game.gameDescription}</p>
            <div class="item__user">
               <img class="item__userPhoto" src="${game.userPhoto}" alt="userPhoto">
               <span class="item__userName">${game.userName}</span>
            </div>
            <p class="item-text">${game.userReview}</p>
         </div>
      </div>`;
      createOverlay(modalGameHTML);
   console.log(game);
};

function showGame() {
   const arrCards = document.querySelectorAll('.content__item');
   for (let card of arrCards) {
      card.addEventListener('click', handleWatch);
   };
};