const arrCards = document.querySelectorAll('.content__item');
console.log(arrCards);


const findOneById = (data, id) => {
   return data.find((item) => item.id === id.toString());
};

const handleWatch = (id) => {
   const game = findOneById(arrayList, id);
   console.log(game);
};

// const previewCard = (card) => {
//    const name = `
//    <div class="modal-wrapper">
//    <img src="${card.img}" alt="">
//    <h2>${card.gameName}</h2>
//    <p>${card.gameDescription}</p>
//    <img src="src/assets/images/person3.png" alt=""><span>${card.userName}</span>
//    <p>${card.userReview}</p>
//    </div>`;
   
//    console.log(name);
// };



// for (let card of arrCards) {
//    card.addEventListener('click', handleWatch);
// };