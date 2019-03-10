function createCart() {
  var updateListeners = []; // массив подписчиков  

  function _getCart() {
    let cartItem = localStorage.getItem('cart');

    var cart = JSON.parse(cartItem) || {
      items: [],
      promo: []
    };

    return cart;
  }

  function _setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function _notifyListeners(cart, item, action)
  {
    updateListeners.forEach(function (listener) {
      listener.call(cart, item, action);
    });
  }

  function Cart() {}

  function doCart(operation) {
    var cart = _getCart();
    var result = operation(cart, function() {_setCart(cart)});

    return result;
  }

  Cart.prototype.add = function (item, quantity) {
    var self = this;
    doCart(function (cart, commitChanges) {
      if (!quantity) quantity = 1;
      if (quantity <= 0) quantity = 1;

      let sameItem = cart.items.find(storageItem => storageItem.item.id == item.id);
      if (sameItem) {
        sameItem.quantity += quantity;
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, sameItem, 'update');
      } else {
        var addedItem = {
          item: item,
          quantity: quantity
        };
        cart.items.push(addedItem);
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, addedItem, 'add');
      }
    })

  };

  Cart.prototype.getItems = function () {
    return this.items;
  };

  Cart.prototype.getTotal = function () {
    return doCart(function (cart) {
      const reducerTotal = (accumulator, currentItem) => accumulator + currentItem.item.price * currentItem.quantity;
      const reducerItemsCount = (accumulator, currentItem) => accumulator + currentItem.quantity;
      
      var shipping = 0;
      var total = cart.items.reduce(reducerTotal, 0) / 100;
      var discount = 0;
      var grandTotal = total - discount + shipping;
      var totalItems = cart.items.reduce(reducerItemsCount, 0);

      return {
        totalItems: totalItems,
        shipping: shipping,
        discount: discount,
        total: total,
        grandTotal: grandTotal,
      }
    });
  };


  Cart.prototype.onUpdate = function (updateListener) {
    updateListeners.push(updateListener);
  }; // добавляем подписчиков в массив подписчиков


  return new Cart();

}