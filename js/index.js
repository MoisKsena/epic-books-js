//фильтр
function getFilter()
{
  let regEx = /^\s+$/i;

  let authorEl = document.querySelector('[name=author]');
  var author = authorEl.value;
  if(!author || author.match(regEx))
  {
    author = null;
  }

  let nameEl = document.querySelector('[name=book-name]');
  var name = nameEl.value;
  if(!name || name.match(regEx))
  {
    name = null;
  }
  
  let publishEl = document.querySelector('[name=publisher]');
  var publish = publishEl.value;
  if(!publish || publish.match(regEx))
  {
    publish = null;
  }

  let sortByEl = document.querySelector('[name=sort]');
  let sortBy = sortByEl.options[sortByEl.selectedIndex].value;

  let yearFromEl = document.querySelector('[name=year-from]');
  let yearFrom = yearFromEl.options[yearFromEl.selectedIndex].value;
 
  let yearToEl = document.querySelector('[name=year-to]');
  let yearTo = yearToEl.options[yearToEl.selectedIndex].value;

  let bindEl = document.querySelector('[name=binding]');
  let bind = bindEl.options[bindEl.selectedIndex].value;

  let langEl = document.querySelector('[name=language]');
  let lang = langEl.options[langEl.selectedIndex].value;

  let priceFromEl = document.querySelector('#price-from');
  let priceFrom = priceFromEl.value;
    if(!priceFrom || priceFrom.match(regEx))
    {
      priceFrom = null;
    }

  let priceToEl = document.querySelector('#price-to');
  let priceTo = priceToEl.value;
  if(!priceTo || priceFrom.match(regEx))
  {
    priceTo = null;
  }

  
  var result = {
    author: author,
    name: name,
    publish: publish,
    sortBy: sortBy,
    yearFrom: yearFrom,
    yearTo: yearTo,
    bind: bind,
    lang: lang,
    priceFrom: priceFrom,
    priceTo: priceTo
  };

  return result;
}

let toShow = document.querySelector('#books-show-btn');
toShow.addEventListener('click', function(evt){
  evt.preventDefault();
  var filter = getFilter();

  var filteredBooks = books.filter(function(book){
    var accepted = true;
    if(filter.author)
    {
      accepted = accepted && (book.author || '').toLowerCase().indexOf(filter.author.toLowerCase()) >= 0;
    }

    if(filter.name)
    {
      accepted = accepted && (book.name || '').toLowerCase().indexOf(filter.name.toLowerCase()) >= 0;
    }

    if(filter.publish)
    {
      accepted = accepted && (book.publish || '').indexOf(filter.publish) >= 0;
    }
    
    if(filter.yearFrom)
    {
      accepted = accepted && (book.year >= filter.yearFrom);
    }

    if(filter.yearTo)
    {
      accepted = accepted && (book.year <= filter.yearTo);
    }

    if(filter.bind)
    {
      accepted = accepted && (book.bind == filter.bind);
    }
    
    if(filter.lang)
    {
      accepted = accepted && (book.lng == filter.lang);
    }









    return accepted;
  });

  filteredBooks = filteredBooks.take(8);
  document.querySelector('.catalog__books-list').innerHTML = "";
  renderBooks(filteredBooks);  

});


//сортировка по возрастанию

books.sort(function(a, b){
  var keyA = new Date(a.price),
      keyB = new Date(b.price);
  // Compare the 2 dates
  if(keyA < keyB) return -1;
  if(keyA > keyB) return 1;
  return 0;
});








document.addEventListener('DOMContentLoaded', function () {
  //swiper
  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,

    // Navigation arrows
    navigation: {
      nextEl: '.popular__slider-btn--right',
      prevEl: '.popular__slider-btn--left',
    },
  });
});