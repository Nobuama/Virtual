hideModal = (event) => {
   if(!event.target.closest('.sign-in__block')){
      scriptJs.remove();
   };
};

signForm = document.forms.singIn;


handleSubmitSignInForm = (event) => {
   event.preventDefault();
  
   let uName = signForm.elements["userName"].value;
   let uPass = signForm.elements["userPassword"].value;        
   VirtualUser.userAuth=false;
   userData.forEach(e=>{
       if((uName===e.userLogin)&&(uPass===e.userPsw)){
         VirtualUser.userAuth=true;
         VirtualUser.userName=e.userLogin;
         VirtualUser.userPassword=e.userPsw;
         VirtualUser.userPhoto=e.userPhoto;
         writeVirtualUserLocal(VirtualUser,"virtualUser");
      }
   });
      if(VirtualUser.userAuth){
         loggedPerson();
         if (document.title == "Games"){
            getCards();
            newCardBtn.addEventListener('click', callAddCardModal);
            newCardBtnMenu.addEventListener('click', callAddCardModal);
            newCardBtn.style.cursor = 'pointer';
         };
      };

      if (!VirtualUser.userAuth) alert(`invalid username or password`);

      document.querySelector('.overlay').remove();

};

signForm.addEventListener('submit', handleSubmitSignInForm);
document.querySelector('.overlay').addEventListener('click', hideModal);

