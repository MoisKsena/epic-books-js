document.addEventListener('DOMContentLoaded', function(){
  // вывод каталога

    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#card-template');
    


    for (i=0; i < 8; i++) {
      const newCard = template.content.cloneNode(true);
      
      newCard.querySelector('.card__img').src = 'https://books.marinintim.com' + books[i].thumb_url;
      newCard.querySelector('.card__price').textContent = (books[i].price/100) + ' ₽';
      newCard.querySelector('.card__title').textContent = books[i].name;

      newCard.querySelector('.card__buy').setAttribute('bookid', books[i].id);
    
      fragment.appendChild(newCard);
    };
    
    document.querySelector('.catalog__books-list').appendChild(fragment);  



    //Popup


  let cardPopup = document.querySelectorAll('.card__inner');
  for (i = 0, len = cardPopup.length; i < len; i++) {
    cardPopup[i].onclick = function() {
      showPopup();
    };
  }

  let popupLayer = document.querySelector('.js');
  function showPopup() {  
    let showPopup = document.querySelector('.modal');
    showPopup.classList.add('modal--open');
    popupLayer.classList.add('js-modal-open');
    return;
  }; 

  let closePopup = document.querySelector('.modal__close');
  closePopup.addEventListener('click', event => {
    
    let close = document.querySelector('.modal--open');
    close.classList.remove('modal--open');
    popupLayer.classList.remove('js-modal-open');
  });



});

