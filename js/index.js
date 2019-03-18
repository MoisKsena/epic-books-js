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


// books.sort(function(a, b){
//   var keyA = new Date(a.price),
//       keyB = new Date(b.price);
//   // Compare the 2 dates
//   if(keyA < keyB) return -1;
//   if(keyA > keyB) return 1;
//   return 0;
// });

// //по убыванию
// books.sort(function(a, b){
//   var keyA = new Date(a.price),
//       keyB = new Date(b.price);

//   return keyB - keyA;
  
// });

// //по возрастанию
// books.sort(function(a, b){
//   var keyA = new Date(a.price),
//       keyB = new Date(b.price);

//   return keyA - keyB;
  
// });




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











// Кастомные селекты (кроме выбора языка)
new Choices('.field-select:not(#lang) select.field-select__select', {
  searchEnabled: false,
  shouldSort: false,
});
// Кастомный селект выбора языка отдельно
new Choices('#lang select.field-select__select', {
  searchEnabled: false,
  shouldSort: false,
  callbackOnCreateTemplates: function (template) {
    return {
      item: (classNames, data) => {
        return template(`
          <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
            ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
          </div>
        `);
      },
      choice: (classNames, data) => {
        return template(`
          <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
            ${getLangInSelectIcon(data.value)} ${data.label}
          </div>
        `);
      },
    };
  }
});

function getLangInSelectIcon(value) {
 if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
 else if (value == 'en') return '<span class="field-select__lang-en"></span>';
 return '<span class="field-select__lang-null"></span>';
}



// Выбор диапазона цен
var slider = document.getElementById('price-range');
noUiSlider.create(slider, {
  start: [400, 1000],
  connect: true,
  step: 100,
  range: {
    'min': 200,
    'max': 2000
  }
});