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

  function _notifyListeners(cart, item, action) {
    updateListeners.forEach(function (listener) {
      listener.call(cart, item, action);
    });
  }

  function recalculateItem(item) {
    if (item.quantity > 10) {
      item.quantity = 10;
    }
    item.totalPrice = item.item.price * item.quantity / 100;
  }

  function Cart() {}

  function doCart(operation) {
    var cart = _getCart();
    var result = operation(cart, function () {
      _setCart(cart)
    });

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
        recalculateItem(sameItem);
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, sameItem, 'update');
      } else {
        var addedItem = {
          item: item,
          quantity: quantity
        };
        recalculateItem(addedItem);
        cart.items.push(addedItem);
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, addedItem, 'add');
      }
    })
  };

  Cart.prototype.remove = function (itemid) {
    var self = this;
    doCart(function (cart, commitChanges) {

      let sameItem = cart.items.find(storageItem => storageItem.item.id == itemid);
      if (sameItem) {
        var itemIndex = cart.items.indexOf(sameItem);
        cart.items.splice(itemIndex, 1);
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, sameItem, 'remove');
      }
    });
  };

  Cart.prototype.getItems = function () {
    return doCart(function (cart) {
      return cart.items;
    });
  };

  Cart.prototype.getTotal = function () {
    return doCart(function (cart) {
      const reducerTotal = (accumulator, currentItem) => accumulator + currentItem.totalPrice;
      const reducerItemsCount = (accumulator, currentItem) => accumulator + currentItem.quantity;

      var shipping = 0;
      var total = cart.items.reduce(reducerTotal, 0);
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


  Cart.prototype.incQuantity = function (itemid) {
    var self = this;
    doCart(function (cart, commitChanges) {

      let sameItem = cart.items.find(storageItem => storageItem.item.id == itemid);
      if (sameItem) {
        sameItem.quantity += 1;
        recalculateItem(sameItem);
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, sameItem, 'inc');
      }
    });
  };

  Cart.prototype.decQuantity = function (itemid) {
    var self = this;
    doCart(function (cart, commitChanges) {

      let sameItem = cart.items.find(storageItem => storageItem.item.id == itemid);
      if (sameItem && sameItem.quantity > 1) {
        sameItem.quantity -= 1;
        recalculateItem(sameItem);
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, sameItem, 'dec');
      }
    });
  };

  Cart.prototype.setQuantity = function (itemid, quantity) {
    var self = this;
    doCart(function (cart, commitChanges) {

      let sameItem = cart.items.find(storageItem => storageItem.item.id == itemid);
  
      //debugger

      if (sameItem && quantity) {
        
        sameItem.quantity = quantity;
        recalculateItem(sameItem);
        commitChanges();
        // уведомляет всех подписчиков о добавленом элементе
        _notifyListeners(self, sameItem, 'set');
      }
    });
  };


  Cart.prototype.clear = function () {
    var self = this;
    doCart(function (cart, commitChanges) {

      cart.items = [];
      commitChanges();
      // уведомляет всех подписчиков о добавленом элементе
      _notifyListeners(self, null, 'clear');

    });
  };

  return new Cart();

}