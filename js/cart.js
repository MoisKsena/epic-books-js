//validate form

function checkFirstname(firstname) {
  const regEx = /([A-Za-zА-Яа-яЁё]{1,})/gim;

  return regEx.test(firstname);
};

function validateFirstname(form, event, element, forceValidation) {

  var shouldValidate = element.classList.contains('j-edited');

  const firstname = form.elements.firstname;
  if (forceValidation || shouldValidate && firstname == element) {
    var label = queryParent(firstname, 'label.field-text');

    if (checkFirstname(firstname.value)) {
      label.classList.remove('field-text--error');

      return true;
    } else {
      label.classList.add('field-text--error');

      return false;
    };
  }
};

function validateLastname(form, event, element, forceValidation) {

  var shouldValidate = element.classList.contains('j-edited');

  const lastname = form.elements.lastname;
  if (forceValidation || shouldValidate && lastname == element) {
    var label = queryParent(lastname, 'label.field-text');

    if (checkFirstname(lastname.value)) {
      label.classList.remove('field-text--error');

      return true;
    } else {
      label.classList.add('field-text--error');

      return false;
    };
  }
};

function checkPhone(phone) {
  const regEx = /^(\+7\s*)([0-9]{3}\s*)([0-9]{3}\s*)([0-9]{2}\s*)([0-9]{2})$/gim;

  return regEx.test(phone);
};

function validatePhone(form, event, element, forceValidation) {

  var shouldValidate = element.classList.contains('j-edited');

  const phone = form.elements.phone;
  if (forceValidation || shouldValidate && phone == element) {
    var label = queryParent(phone, 'label.field-text');

    if (checkPhone(phone.value)) {
      label.classList.remove('field-text--error');

      return true;
    } else {
      label.classList.add('field-text--error');

      return false;
    };
  }
};


function checkEmail(email) {
  const regEx = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

  return regEx.test(email);
};

function validateEmail(form, event, element, forceValidation) {

  var shouldValidate = element.classList.contains('j-edited');

  const email = form.elements.email;
  if (forceValidation || shouldValidate && email == element) {
    var label = queryParent(email, 'label.field-text');

    if (checkEmail(email.value)) {
      label.classList.remove('field-text--error');

      return true;
    } else {
      label.classList.add('field-text--error');

      return false;
    };
  }
};

function validateDeliveryFromStore(form, event, element, forceValidation) {};

function validateDeliveryCourier(form, event, element, forceValidation) {

  var shouldValidate = element.classList.contains('j-edited');
  var deliveryAddress = deliverySection.querySelector('[name=delivery-address]');
  if (forceValidation || shouldValidate && delivery - address == element) {
    var label = queryParent(deliveryAddress, 'label.field-text');

    if (deliveryAddress.value) {
      return true;
    } else {
      label.classList.add('field-text--error');

      return false;
    }
  }
};

function validateDeliveryPost(form, event, element, forceValidation) {
  var shouldValidate = element.classList.contains('j-edited');
  var deliveryAddress = deliverySection.querySelector('[name=post-address]');
  if (forceValidation || shouldValidate && post - address == element) {
    var label = queryParent(deliveryAddress, 'label.field-text');

    if (deliveryAddress.value) {
      return true;
    } else {
      label.classList.add('field-text--error');

      return false;
    }
  }
};




function validateForm(form, event, element, forceValidation) {
  if (event == 'blur' && element.value && element.type != 'checkbox' && element.type != 'radio') {
    element.classList.add('j-edited');
  }
  validateFirstname(form, event, element, forceValidation);
  validateLastname(form, event, element, forceValidation);
  validatePhone(form, event, element, forceValidation);
  validateEmail(form, event, element, forceValidation);
  validateDeliveryFromStore(form, event, element, forceValidation);
  validateDeliveryCourier(form, event, element, forceValidation);
  validateDeliveryPost(form, event, element, forceValidation);

  return false;
};

function initDelivery() {
  deliverySection.querySelectorAll('input[type=radio][name=delivery]').forEach(function (radioDelivery) {
    radioDelivery.addEventListener('change', function () {

      deliverySection.querySelectorAll('.cart__delivery').forEach(function (deliveryHide) {
        deliveryHide.classList.add('cart__delivery--hidden');
      })


      var deliveryShow = deliverySection.querySelector('#cart-delivery-' + this.value);
      deliveryShow.classList.remove('cart__delivery--hidden');
    });
  });
};


//пересчет общей стоимости корзины

function updateCartTotal(cart) {
  var total = cart.getTotal();

  let counterBookString = document.querySelector('.cart__title');
  counterBookString.innerHTML = 'В корзине ' + total.totalItems + ' ' + plural(total.totalItems, ['товар', 'товара', 'товаров']);

  let counterGrandTotal = document.querySelectorAll('.j-grandTotal');
  for (var i = 0; i < counterGrandTotal.length; i++) {
    counterGrandTotal[i].innerHTML = total.grandTotal + ' ₽';
  };

}

//статика
function initCartView() {
  updateCartTotal(cart);
  initProducts();
  btnInc();
  btnDec();
  btnRemove();
  btnClear();
  btnSet();
}



function btnInc() {
  document.querySelector('.cart__table').addEventListener('click', function (evt) {
    let btn = findParentByCssClass(evt.srcElement, 'field-num__btn-plus');

    if (btn) {
      evt.preventDefault();
      let tr = queryParent(btn, 'tr.cart__product');
      let bookid = tr.dataset.bookid;

      cart.incQuantity(bookid);
    }
  });
}

function btnDec() {
  document.querySelector('.cart__table').addEventListener('click', function (evt) {
    let btn = findParentByCssClass(evt.srcElement, 'field-num__btn-minus');

    if (btn) {
      evt.preventDefault();
      let tr = queryParent(btn, 'tr.cart__product');
      let bookid = tr.dataset.bookid;

      cart.decQuantity(bookid);
    }
  });
}

function btnSet() {
  document.querySelector('.cart__table').addEventListener('input', function (evt) {
    let input = findParentByCssClass(evt.srcElement, 'field-num__input');

    if (input) {
      evt.preventDefault();
      let tr = queryParent(input, 'tr.cart__product');
      let bookid = tr.dataset.bookid;

      cart.setQuantity(bookid, parseInt(input.value));
    }
  });
}

function btnRemove() {
  document.querySelector('.cart__table').addEventListener('click', function (evt) {
    let btn = findParentByCssClass(evt.srcElement, 'cart__product-del-btn');

    if (btn) {
      evt.preventDefault();
      let tr = queryParent(btn, 'tr.cart__product');
      let bookid = tr.dataset.bookid;

      cart.remove(bookid);
    }
  });
}

function btnClear() {
  document.querySelector('.cart__header').addEventListener('click', function (evt) {
    let btn = findParentByCssClass(evt.srcElement, 'cart__clear-btn');

    if (btn) {
      evt.preventDefault();
    
      cart.clear();
    }
  });
}

function updateProtuctView(cart, item) {
  var tr = document.querySelector('tr[data-bookid="' + item.item.id + '"]');
  let plusItem = tr.querySelector('.field-num__input');
  plusItem.value = item.quantity;

  let priceItem = tr.querySelector('.cart__item-price');
  priceItem.textContent = item.totalPrice + ' ₽';
}

//рендер выбраного товара в корзине
function initProducts() {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#shopping-template');
  let cartItems = cart.getItems();
  for (i = 0; i < cartItems.length; i++) {
    var cartItem = cartItems[i];
    const newCartTemplate = template.content.cloneNode(true);
    newCartTemplate.querySelector('.cart__item-img').src = 'https://books.marinintim.com' + cartItem.item.thumb_url;
    newCartTemplate.querySelector('.cart__item-name').textContent = cartItem.item.name;
    newCartTemplate.querySelector('.cart__item-price').textContent = cartItem.totalPrice + ' ₽';
    newCartTemplate.querySelector('.field-num__input').value = cartItem.quantity;
    newCartTemplate.querySelector('tr').dataset.bookid = cartItem.item.id;
    fragment.appendChild(newCartTemplate);
  };
  document.querySelector('.cart__table').appendChild(fragment);
}

//динамика
function handleCartUpdate(item, action) {
  if(action == 'clear')
  {
    clearCartView(this);
  } else  if (action == 'remove') {
    removeProductView(item);
  } else{
    updateProtuctView(this, item);
  }
  updateCartTotal(this);
}

function clearCartView(cart){
  let trAll = document.querySelectorAll('.cart__product');
  for(let i=0; i < trAll.length; i++){
    let tr = trAll[i];
    tr.parentNode.removeChild(tr);
  }
}

function removeProductView(item) {
  var tr = document.querySelector('tr[data-bookid="' + item.item.id + '"]');
  tr.parentNode.removeChild(tr);
}

function initCart() {
  let orderForm = document.forms.orderForm;
  orderForm.onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
      e.preventDefault();
    }
  }
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    return validateForm(this, 'submit', this, true);
  });

  let checkout = document.querySelector('.cart__checkout');

  checkout.querySelectorAll('input')
    .forEach(function (input) {
      if (input.type != 'checkbox') {
        input.addEventListener('input', function () {
          validateForm(orderForm, 'input', this, false);
        });
        input.addEventListener('blur', function () {
          validateForm(orderForm, 'blur', this, false);
        });
      }
    });

  initDelivery();

  initCartView();

  cart.onUpdate(handleCartUpdate);


};