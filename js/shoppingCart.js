document.addEventListener('DOMContentLoaded', function(){

function Cart() {
  this.items = [];
  this.updateListeners = []; // массив подписчиков
}

Cart.prototype.add = function(item) {
  this.items.push(item);
  
  // уведомляет всех подписчиков о добавленом элементе
  this.updateListeners.forEach(function (listener){
    listener(item, 'added');
  });  
};

Cart.prototype.getItems = function() {
  return this.items;
};

Cart.prototype.getTotal = function() {
  const reducer = (accumulator, currentItem) => accumulator + currentItem.price;
  return this.items.reduce(reducer, 0);
};
/*
let sum = 0;
for (var i = 0; i < this.items.lenght; i++){
  sum = sum + this.items[i].price;
}
*/

Cart.prototype.onUpdate = function(updateListener) {
  this.updateListeners.push(updateListener);
}; // добавляем подписчиков в массив подписчиков


});