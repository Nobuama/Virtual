newCardForm = document.forms.newCard;
modalWrapper = document.querySelector('.overlay');

getValuesFromCard = (form) => {   
   let newMap = new Map();
   for (let element of form.elements) {
      newMap.set(element.name, element.value);
   };
   newMap.delete('');
   
   Obj = Object.fromEntries(newMap);
   Obj.createdAt = Date.now();
   Obj.id = Date.now().toString(36);
   Obj.userName = VirtualUser.userName;
   Obj.userPhoto = VirtualUser.userPhoto;
   return Obj;
};


if(newCardForm) { 
   getValuesFromCard(newCardForm);
};


handleSubmitAddCardForm = (event) => {
   event.preventDefault();
   const formValues = getValuesFromCard(newCardForm);
   console.log("formValues = ", formValues);

   CARDS.push(Obj);
   writeVirtualUserLocal(CARDS, 'Games');
   popUpCreate();
   getCards();
   
   document.querySelector('.overlay').remove();
   scriptJs.remove();
};


newCardForm.addEventListener('submit', handleSubmitAddCardForm);
modalWrapper.addEventListener('click', (event) =>{
   if(!event.target.closest('.new-card')){
      modalWrapper.remove();
      scriptJs.remove();
      };
   });
