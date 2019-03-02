//validate form

function checkFirstname (firstname){
  const regEx = /([A-Za-zА-Яа-яЁё]{5,})/gim;

  return regEx.test(firstname);
};

function validateFirstname(form, event, element, forceValidation) {

  var shouldValidate = false;
  if(element.classList.contains('j-edited')  && element.value){
    shouldValidate = true;
  }

  const firstname = form.elements.firstname;
  if(forceValidation || shouldValidate && firstname == element){
    
    if(checkFirstname (firstname.value)){
        document.querySelector('#firstname__error').style.display = "none";
        
        

        return true;
    } else {
      document.querySelector('#firstname__error').style.display = "block";
      document.querySelector('.field-text__input').style.borderColor = "red";
      
      return false;
    };
  }
};

function validateLastname(form, event, element, forceValidation) {
  var shouldValidate = false;
  if(element.classList.contains('j-edited')  && element.value){
    shouldValidate = true;
  }

  const lastname = form.elements.lastname;
  if(forceValidation || shouldValidate && lastname == element){   
    let isValid = true; 

    if(lastname.value) {
      if(!checkFirstname (lastname.value)) {
        isValid = false;
      }     
    }

    if(isValid){
      document.querySelector('#lastname__error').style.display = "none";
      lastname.classList.remove("input--error");
    }else{
      document.querySelector('#lastname__error').style.display = "block";
      lastname.classList.add("input--error");
    }

    return isValid;
  }
};

function checkPhone (phone){
  const regEx = /^(\+7)([0-9]{10})$/gim;

  return regEx.test(phone);
};

function validatePhone(form, event, element, forceValidation) {
  
  var shouldValidate = false;
  if(element.classList.contains('j-edited')  && element.value){
    shouldValidate = true;
  }

  const phone = form.elements.phone;
  if(forceValidation || shouldValidate && phone == element){
    if(checkPhone (phone.value)){
        document.querySelector('#phone__error').style.display = "none";
        phone.classList.remove("input--error");

        return true;
    } else {
      document.querySelector('#phone__error').style.display = "block";
      phone.classList.add("input--error");
      
      return false;
    };
  }
};


function checkEmail (email){
  const regEx = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

  return regEx.test(email);
};

function validateEmail(form, event, element, forceValidation) {
  var shouldValidate = false;
  if(element.classList.contains('j-edited')  && element.value){
    shouldValidate = true;
  }
 
  const email = form.elements.email;
  if(forceValidation || shouldValidate && email == element){
    
    let isValid = true;

    if(email.value) {
      if(!checkEmail (email.value)) {
        isValid = false;
      }     
    }

    if(isValid){
      document.querySelector('#email__error').style.display = "none";
      email.classList.remove("input--error");
    }else{
      document.querySelector('#email__error').style.display = "block";
      email.classList.add("input--error");
    }

    return isValid;
    }  
  };

function validateForm(form, event, element, forceValidation) {
  if(event == 'blur' && element.value && element.type != 'checkbox') {
    element.classList.add('j-edited');
  }
  validateFirstname(form, event, element, forceValidation);
  validateLastname(form, event, element, forceValidation);
  validatePhone(form, event, element, forceValidation);
  validateEmail(form, event, element, forceValidation);

  return false;
};





function initCart(){
  let orderForm = document.forms.orderForm;

orderForm.addEventListener('submit',  function(e){
  e.preventDefault();

  return validateForm(this, 'submit', this, true);
});

orderForm.querySelectorAll('input')
  .forEach(function(input) {
    if(input.type != 'checkbox') {
      input.addEventListener('input', function(){validateForm(orderForm, 'input', this, false);});
      input.addEventListener('blur', function(){validateForm(orderForm, 'blur', this, false);});
    }
  });
};


