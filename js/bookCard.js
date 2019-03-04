document.addEventListener('DOMContentLoaded', function(){
  // вывод каталога

    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#card-template');
    


    for (i=0; i < 8; i++) {
      const newCard = template.content.cloneNode(true);
      
      newCard.querySelector('.card__img').src = 'https://books.marinintim.com' + books[i].thumb_url;
      newCard.querySelector('.card__price').textContent = (books[i].price/100) + ' ₽';
      newCard.querySelector('.card__title').textContent = books[i].name;

      newCard.querySelector('article').setAttribute('bookid', books[i].id);
    
      fragment.appendChild(newCard);
    };
    
    document.querySelector('.catalog__books-list').appendChild(fragment);  



    //Popup


  let cardPopup = document.querySelectorAll('.card__inner');
  for (i = 0, len = cardPopup.length; i < len; i++) {
    cardPopup[i].onclick = function() {
      let bookArt = queryParent(this, 'article');
      let bookid = bookArt.getAttribute('bookid');
      let book = books.find(function(b) {
        return b.id == bookid;
      });
      
      document.querySelector('.product__img-wrap>img').src = 'https://books.marinintim.com' + book.thumb_url;
      document.querySelector('.product__title').innerHTML = book.name;
      document.querySelector('.rating__review').innerHTML = ' ';

      let tableInfo = document.querySelector('.product__table-info');
      tableInfo.getElementsByTagName('td').innerHTML = ' ';
      
      document.querySelector('.product__descr>p').innerHTML = book.desc;
      document.querySelector('.btn__sm-price').innerHTML = (book.price/100)+' ₽';

      showPopup(book);
    };
  }

  

  let popupLayer = document.querySelector('.js');
  function showPopup() {  
    let showPopup = document.querySelector('.modal');

    showPopup.classList.add('modal--open');
    popupLayer.classList.add('js-modal-open');
  }; 

  
  function closePopup() {
    let closePopup = document.querySelector('.modal--open');

    closePopup.classList.remove('modal--open');
    popupLayer.classList.remove('js-modal-open');
  };

  let btnClosePopup = document.querySelector('.modal__close');
  btnClosePopup.addEventListener('click', event => { 
    
    closePopup();
  });


  var page = document.querySelector(".js-modal-open");
  page.addEventListener('click', event => {
    // if(page.includes('.modal--open')){
    //   event.preventDefault();
    //   return;
    // }
    closePopup();
    
  });





  

});

