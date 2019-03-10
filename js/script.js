function updateQuantityEl(cart) {
  let counterBook = document.querySelector('.page-header__cart-num');
  counterBook.innerHTML = cart.getTotal().totalItems;
}




var cart = createCart();

cart.onUpdate(function (item, action) {
  var total = this.getTotal();
  if(action=='clear'){console.log('очистка корзины');}
  else{
    console.log('Товар: ' + item.item.name + ' был ' + action + ' в кол-ве ' + item.quantity + '. Всего: ' + total.total + '; Скидки: ' + total.discount + '; Итого: ' + total.grandTotal);
  }
  
  updateQuantityEl(this);


});


function queryParent(element, parentSelector) {
  var parents = document.querySelectorAll(parentSelector);

  for (var i = 0; i < parents.length; i++) {
    var parent = parents[i];

    if (parent.contains(element)) {
      return parent;
    }
  }

  return null;
}


function findParentByCssClass(element, cssClass) {
  while (true) {
    if (element == document.body) return false;
    if (element.classList.contains(cssClass)) return element;

    element = element.parentNode;
  }
}



ready(function () {

  // В этом месте должен быть написан ваш код

  // cart

  updateQuantityEl(cart);



  //burger

  function burgerToggle() {
    let burgerClose = document.querySelector('.burger');
    burgerClose.classList.toggle('burger--close');
    this.classList.toggle('main-nav--open');
  }
  document.getElementById('nav').addEventListener('click', burgerToggle);


  //разделы меню
  function tabsActive() {
    this.classList.toggle('tabs__item--active');
  };

  document.querySelectorAll('.tabs__item-link').forEach(lnk => lnk.addEventListener('click', tabsActive));



  // btn "в корзину"

  
  document.querySelector('.page__content').addEventListener('click', function (evt) {
    let btn = findParentByCssClass(evt.srcElement, 'j-buy');
    if (btn) {
      evt.preventDefault();
      let article = queryParent(btn, 'article') || queryParent(btn, 'div.product'); //добавить карточку в корзину

      let bookid = article.dataset.bookid;
      let book = books.find(function (b) {
        return b.id == bookid;
      });

      cart.add(book);
    }
  })


  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  /* new Choices('.field-select:not(#lang) select.field-select__select', {
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
   });*/

  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  /*var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });*/

});

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};