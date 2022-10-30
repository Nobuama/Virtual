const newCard = document.querySelector('.hero__btn');
const exploreDevice = document.querySelector('.hero__btn--disable');
const getItNow = document.querySelector('.hero__bot-btn');
const signInBtn = document.getElementById('button');
const modalSignInBtn = document.querySelector('.sign-in__btn');
const menu = document.querySelector('.menu__items');
const menuBurg = document.querySelector('.menu__burger');
const menuBurgBtn = document.querySelector(".sign-in__btn-mob");

const createOverlay = (modalName) => {
   const overlayHTML = `<div class="overlay"></div>`;
   document.querySelector('.wrapper').insertAdjacentHTML('beforebegin', overlayHTML);
   const overlay = document.querySelector('.overlay');
   overlay.innerHTML = modalName;

   overlay.addEventListener('click', (event) => {
      if(event.target == document.querySelector('.overlay')){
         (document.querySelector('.overlay').remove());
      };
   });
};

const signInModal = `
<div class="sign-in__block">
<div class="sign-in__header">
<h2>Authorization</h2>
</div>
<form class="sign-in" name="singIn">
<legend class="sign-in__legend">Sign in</legend>
<input class="sign-in__email" name="userName" type="text"  placeholder="Email or username" required>
<input class="sign-in__password" name="userPassword" type="password"  placeholder="Password" required>
<button class="sign-in__btn">Sign in</button>
</form>
</div>`;

const loggedPerson = () => {
   const loggedPersonHTML = `
   <li class="menu__item logged-person">
   <button class="logged__btn">
   <img class="menu__person" src="${VirtualUser.userPhoto}" alt="person.img">
   </button>
   </li>`;
   menu.insertAdjacentHTML("beforeend", loggedPersonHTML);
   signInBtn.hidden = true;

   const loggedPersonMobile = `<li class="menu__burger-person">
   <span class="menu__burger-name">${VirtualUser.userName}</span>
   <img src="${VirtualUser.userPhoto}" alt="userPhoto">
   </li>`;
   menuBurg.insertAdjacentHTML("afterbegin", loggedPersonMobile);
   menuBurgBtn.firstElementChild.hidden = true;
   menuBurgBtn.lastElementChild.hidden = false;
};

const personLogOut = () => {
   document.querySelector('.logged-person').remove();
   signInBtn.hidden = false;
   document.querySelector('.person__menu').classList.remove('_active');
   delVirtualUserLocal("virtualUser");

   document.querySelector('.menu__burger-person').remove();
   menuBurgBtn.firstElementChild.hidden = false;
   menuBurgBtn.lastElementChild.hidden = true;

   if (document.title == "Games"){
      newCardBtn.removeEventListener('click', callAddCardModal);
      newCardBtnMenu.removeEventListener('click', callAddCardModal);
      newCardBtn.style.cursor = 'not-allowed';
   };
};

const iconBurg = document.querySelector('.menu__burger-icon');
const logOut = document.querySelector('.person__menu > li:last-child');
const submit = document.querySelector('.footer__end-btn');
let modalWrapper;
let getValuesFromForm;
let handleSubmitSignInForm;


if(newCard){
   newCard.onclick = function() {
      console.log('Ви натисли на "Add new card"');
   };
};

if(exploreDevice){
   exploreDevice.onclick = function() {
      console.log('Ви натисли на "Explore device"');
   };
};

if(getItNow){
   getItNow.onclick = function() {
      console.log('Ви натисли на "Get it now"');
   };
};


// Підсвітка активної вкладки меню
function activeMenu(event) {
   if(event.target.closest('.menu__item')){
      
      if(event.target.closest('.button') || event.target.closest('.menu__items > li:last-child')){
         return;
      };
      
      for (every of document.querySelectorAll('.menu__link')) {
         if (every.classList.contains('menu__item--active')){
            every.classList.remove('menu__item--active');
         };
      };
      
      event.target.closest('.menu__link').classList.add('menu__item--active');
   };
};

if(menu){
   menu.addEventListener('click', activeMenu);
};


//Sign-in
const callModalSignIn = () => {
   createOverlay(signInModal);
   scriptJs = document.createElement('script');
   scriptJs.src = `src/assets/scripts/sign-in.js`;
   document.querySelector('.wrapper').append(scriptJs);
};

if(signInBtn){
   signInBtn.addEventListener('click', callModalSignIn);
};

if (VirtualUser.userAuth) {
   loggedPerson();
};

//Log-out
if(logOut){
   logOut.addEventListener('click', personLogOut);
};


//Відкритти/закрити юзер-меню
document.addEventListener('click', function(event) {
   if(event.target.closest('.logged__btn')) {
      document.querySelector('.person__menu').classList.toggle('_active');
   };
   
   if (!event.target.closest('.menu__items > li:last-child') &&  !event.target.closest('.person__menu')) {
      document.querySelector('.person__menu').classList.remove('_active');
   };
});


// Відкрити / закрити бургер
document.addEventListener('click', hideMenu);

function hideMenu (event) {
   if (event.target.closest('.menu__burger-icon')){
      iconBurg.classList.toggle('_active');
      menuBurg.classList.toggle('_active');
   };
   if (!event.target.closest('.menu__burger') && !event.target.closest('.menu__burger-icon')) {
      iconBurg.classList.remove('_active');
      menuBurg.classList.remove('_active');
   };
};


menuBurgBtn.firstElementChild.addEventListener('click', callModalSignIn);
menuBurgBtn.lastElementChild.addEventListener('click', personLogOut);



//  GET FEEDBACKS
if (document.querySelector('.feedback__people')) {
   const feedbacks = document.querySelector('.feedback__people');
   const getFeedback = () => {
   
      FEEDBACK.forEach((person) => {
         const review = `<li class="feedback__person">
         <div class="feedback__logo">
            <span class="gold text">starstar</span>
            <span class="clear text">star</span></div>
         <p class="feedback__comment text">${person.comment}</p>
         <div class="feedback__nickname">
            <img class="feedback__avatar" src="${person.img}" alt="">
            <div class="nickname__text-wrapper">
               <p class="feedback__name text">${person.name}</p>
               <p class="feedback__nick text">${person.nickName}</p>
            </div>
         </div>
      </li>`;
   
         feedbacks.innerHTML += review;
      });
   };
   getFeedback();
};


// Footer form submit
if(submit){
   submit.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('На вказаний e-mail відправлено листа');
   });
};
