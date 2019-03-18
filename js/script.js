Array.prototype.skip = function(count)
{
  if(count >= this.length) return [];

  return this.slice(count);
}

Array.prototype.take = function(count)
{
  count = Math.min(count, this.length);

  return this.slice(0, count);
}

function updateQuantityEl(cart) {
  let counterBook = document.querySelector('.page-header__cart-num');
  counterBook.innerHTML = cart.getTotal().totalItems;
}
//plural(13, ['книга', 'книги', 'книг'])
function plural(number, words)
{
  var rest100 = number % 100;
  if(rest100>10 && rest100<20) return words[2];
  
  var rest10 = number%10;
  if(rest10 == 1) return words[0];
  if(rest10 == 0 || (rest10 >= 5 && rest10 <= 9)) return words[2];

  return words[1];
}

var cart = createCart();

cart.onUpdate(function (item, action) {
  var total = this.getTotal();
  if (action == 'clear') {
    console.log('очистка корзины');
  } else {
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
    if (element == document.body || !element) return false;
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



  // var tabArray = books.filter(function (el) {
  //   return el.type ==='business';
  // });
  // console.log(tabArray);



  let tabsItems = document.querySelectorAll(".tabs__item-link");
  tabsItems.forEach(tabItem => tabItem.addEventListener('click', function (evt) {
    evt.preventDefault();
    let tabData = tabItem.getAttribute('data-type');
    var toHideSelector = '.catalog article:not(.j-' + tabData + ')';
    let toHide = document.querySelectorAll(toHideSelector);

    for (let i = 0; toHide.length > i; i++) {
      let el = toHide[i];
      el.style.display = "none";
    }

    var toShowSelector = '.catalog article.j-' + tabData;
    let toShow = document.querySelectorAll(toShowSelector);

    for (let i = 0; toShow.length > i; i++) {
      let el = toShow[i];
      el.style.display = "block";
    }

    console.log(tabData);
    console.log(toHideSelector);
    console.log(toShowSelector);
  }));






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

  

  

});

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};