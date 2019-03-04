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
  if (forceValidation || shouldValidate && delivery-address == element) {
    var label = queryParent(deliveryAddress, 'label.field-text');
    
    if(deliveryAddress.value){
      return true;
    }else{
      label.classList.add('field-text--error');

      return false;
    }
  }
};

function validateDeliveryPost(form, event, element, forceValidation) {
  var shouldValidate = element.classList.contains('j-edited');
  var deliveryAddress = deliverySection.querySelector('[name=post-address]');
  if (forceValidation || shouldValidate && post-address == element) {
    var label = queryParent(deliveryAddress, 'label.field-text');
    
    if(deliveryAddress.value){
      return true;
    }else{
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
  deliverySection.querySelectorAll('input[type=radio][name=delivery]').forEach(function(radioDelivery) {
    radioDelivery.addEventListener('change', function(){

      deliverySection.querySelectorAll('.cart__delivery').forEach(function(deliveryHide) {
        deliveryHide.classList.add('cart__delivery--hidden');
      })


      var deliveryShow = deliverySection.querySelector('#cart-delivery-'+this.value);
      deliveryShow.classList.remove('cart__delivery--hidden');
    });
  });
};


function initCart() {
  let orderForm = document.forms.orderForm;

  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    return validateForm(this, 'submit', this, true);
  });

  orderForm.querySelectorAll('input')
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

};