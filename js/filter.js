//filters

document.addEventListener('DOMContentLoaded', function(){
  function filters() {

    document.querySelector('#filters').classList.toggle('filters--open');
  }
  document.getElementById('filters-trigger').addEventListener('click', filters);
});