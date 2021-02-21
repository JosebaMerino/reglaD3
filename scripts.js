window.onload =  function() {
  addHandlers();
  
}

function addHandlers() {
  let inEl = document.querySelector('#in1');

  inEl.addEventListener('keyup', main);
  
  let ingredienteListEl = document.querySelectorAll("input.ingrediente");

  for(let ingredienteEl of ingredienteListEl) {
    ingredienteEl.addEventListener('keyup', keyupIngrediente);
  }


  let prinInEl = document.querySelector('#principalIn');
  let prinOutEl = document.querySelector('#principalOut');

  prinInEl.addEventListener('keyup', actualizarTodas);
  prinOutEl.addEventListener('keyup', actualizarTodas);


}

function keyupIngrediente(e) {
  let ingredienteEl = e.target;

  let ingredienteLblEl = ingredienteEl.closest('div.celda').querySelector('.output label.ingrediente')

  ingredienteLblEl.innerHTML = ingredienteEl.value;
}

function deleteSelf(e) {
  let celdaEl = e.target.closest('div.celda');
  celdaEl.remove();
}

function main(e) {

  let prinInEl = document.querySelector('#principalIn');
  let prinOutEl = document.querySelector('#principalOut');

  let in1El = e.target;

  let entrada = prinInEl.value;
  let entrada2 = prinOutEl.value;

  manipulador(in1El, entrada, entrada2)
}

function manipulador(inputEl, entrada1, entrada2) {
  let outputEl = inputEl.closest('div.celda').querySelector('.output input');

  let x = inputEl.value;

  outputEl.value = reglaD3(x, entrada1, entrada2);

}


function reglaD3(x, entrada, salida) {
  return ((salida * x) / entrada);
}

function addRow() {
  let mainEl = document.querySelector('div#main');

  let celdaEl = document.createElement('div');
  celdaEl.classList.add("celda-añadida");
  celdaEl.classList.add("celda");
  mainEl.appendChild(celdaEl);

  let deleteBtnEl = document.createElement('button');
  deleteBtnEl.addEventListener('click', deleteSelf);
  deleteBtnEl.classList.add('delete');
  /*celdaEl.appendChild(deleteBtnEl);*/

  let deleteTxt = document.createTextNode('-');
  deleteBtnEl.appendChild(deleteTxt);

  let inputDivEl = document.createElement('div');
  inputDivEl.classList.add('input');
  celdaEl.appendChild(inputDivEl);
  
  let inputEl = document.createElement('input');
  inputEl.addEventListener('keyup', main);
  inputEl.classList.add('cantidad')

  let ingredienteInEl = document.createElement('input');
  ingredienteInEl.addEventListener('keyup', keyupIngrediente);
  ingredienteInEl.setAttribute('placeholder', 'Ingrediente...');

  ingredienteInEl.classList.add('ingrediente');

  inputDivEl.appendChild(deleteBtnEl);
  inputDivEl.appendChild(inputEl);
  inputDivEl.appendChild(ingredienteInEl);

  let labelEl = document.createElement('label');
  labelEl.classList.add('label');
  celdaEl.appendChild(labelEl);

  let labelTxt = document.createTextNode("=");
  labelEl.appendChild(labelTxt);

  let ingredienteLblEl = document.createElement('label');
  ingredienteLblEl.classList.add('ingrediente');

  let outputDivEl = document.createElement('div');
  outputDivEl.classList.add('output');
  celdaEl.appendChild(outputDivEl);

  let outputEl = document.createElement('input');
  outputEl.setAttribute('disabled', 'disabled');
  outputEl.classList.add('cantidad');
  outputDivEl.appendChild(outputEl);
  outputDivEl.appendChild(ingredienteLblEl);


}

function actualizarTodas() {
  let prinInEl = document.querySelector('#principalIn');
  let prinOutEl = document.querySelector('#principalOut');

  let entrada = prinInEl.value;
  let entrada2 = prinOutEl.value;
  let listaTodos = document.querySelectorAll('.celda .input input');

  for(var inEl of listaTodos) {
    manipulador(inEl, entrada, entrada2);
  }
}