//фильтр
function getFilter()
{
  regEx = /\s+/i;

  let authorEl = document.querySelector('[name=author]');
  var author = authorEl.nodeValue;
  if(author == '' || author.match(regEx))
  {
    author = null;
  }

  let nameEl = document.querySelector('[name=book-name]');
  var name = nameEl.nodeValue;
  if(name == '' || name.match(regEx))
  {
    name = null;
  }
  
  let publishEl = document.querySelector('[name=publisher]');
  var publish = publishEl.nodeValue;
  if(publish == '' || publish.match(regEx))
  {
    publish = null;
  }

  sortByEl = document.querySelector('[name=sort]');
  sortBy = sortByEl.options[select.selectedIndex].value;

  yearFromEl = document.querySelector('[name=year-from]');
  yearFrom = yearFromEl.options[select.selectedIndex].value;

  yearToEl = document.querySelector('[name=year-to]');
  yearTo = yearToEl.options[select.selectedIndex].value;

  bindEl = document.querySelector('[name=binding]');
  bind = bindEl.options[select.selectedIndex].value;

  langEl = document.querySelector('[name=language]');
  lang = langEl.options[select.selectedIndex].value;

  priceFromEl = document.querySelector('#price-from');
  priceFrom = priceFromEl.value;
  if(priceFrom == '' || priceFrom.match(regEx))
  {
    priceFrom = null;
  }

  priceToEl = document.querySelector('#price-to');
  priceTo = priceToEl.value;
  if(priceTo == '' || priceFrom.match(regEx))
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
toShow.addEventListener('click', function(){
  var filter = getFilter();
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