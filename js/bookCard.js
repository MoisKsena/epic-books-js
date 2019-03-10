document.addEventListener('DOMContentLoaded', function(){
  // вывод каталога

    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#card-template');
    


    for (i=0; i < 8; i++) {
      const newCard = template.content.cloneNode(true);
      
      newCard.querySelector('.card__img').src = 'https://books.marinintim.com' + books[i].thumb_url;
      newCard.querySelector('.card__price').textContent = (books[i].price/100) + ' ₽';
      newCard.querySelector('.card__title').textContent = books[i].name;

      newCard.querySelector('article').dataset.bookid = books[i].id;
    
      fragment.appendChild(newCard);
    };
    
    document.querySelector('.catalog__books-list').appendChild(fragment);  



    //Popup


  let cardPopup = document.querySelectorAll('.card__inner');
  for (i = 0, len = cardPopup.length; i < len; i++) {
    cardPopup[i].onclick = function() {
      let bookArt = queryParent(this, 'article');
      let bookid = bookArt.dataset.bookid;
      let book = books.find(function(b) {
        return b.id == bookid;
      });
      
      var productDiv = document.querySelector('div.product');
      productDiv.dataset.bookid = bookid;

      productDiv.querySelector('.product__img-wrap>img').src = 'https://books.marinintim.com' + book.thumb_url;
      productDiv.querySelector('.product__title').innerHTML = book.name;
      productDiv.querySelector('.rating__review').innerHTML = ' ';

      let tableInfo = productDiv.querySelector('.product__table-info');
      var tds = tableInfo.getElementsByTagName('td');
      for (let tdindex = 0; tdindex < tds.length; tdindex++) {
        const td = tds[tdindex];
        td.innerHTML = ' ';
      }
  
      productDiv.querySelector('.product__descr>p').innerHTML = book.desc;
      productDiv.querySelector('.btn__sm-price').innerHTML = (book.price/100)+' ₽';

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
    var popUp = document.querySelector(".modal__dialog");
    var isInPopUp = popUp.contains(event.srcElement) || popUp == event.srcElement;
    if(!isInPopUp){
      event.preventDefault(); 
        
      closePopup();
    }; 
  });





  

});

