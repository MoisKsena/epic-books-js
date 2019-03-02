//filters

document.addEventListener('DOMContentLoaded', function(){
  function filters() {
    this.classList.toggle('filters--open');
  }
  document.getElementById('filters').addEventListener('click', filters);
});