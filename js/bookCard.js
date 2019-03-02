document.addEventListener('DOMContentLoaded', function(){
  // вывод каталога

    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#card-template');
    


    for (i=0; i < 8; i++) {
      const newCard = template.content.cloneNode(true);
      
      newCard.querySelector('.card__img').src = 'img/books/' + books[i].uri + '.jpg';
      newCard.querySelector('.card__price').textContent = books[i].price + ' ₽';
      newCard.querySelector('.card__title').textContent = books[i].name;
    
      fragment.appendChild(newCard);
    };
    
    document.querySelector('.catalog__books-list').appendChild(fragment);  
});

