let dataManager = new DataManager();

window.onload =  function() {
  addHandlers();
  cargarReceta();
}


function guardarReceta() {

  let listaTodos = document.querySelectorAll('.celda .input input.cantidad');

  let cantidadIn = document.getElementById('principalIn');

  let cantidadOut = document.getElementById('principalOut');

  let multiplicador = cantidadOut.value / cantidadIn.value;

  let ingredientes = [];


  for(let el of listaTodos) {
    let nombreIngrediente = el.parentNode.querySelector('.ingrediente');



    // console.log({'cant': el.value, 'ingrediente' : nombreIngrediente.value});


    let ingrediente = { cantidad: el.value, nombre: nombreIngrediente.value };

    ingredientes.push(ingrediente);
  }


  let receta = { multiplicador: multiplicador, ingredientes: ingredientes }
  console.log(receta);

  dataManager.setData('receta', receta);
}

function cargarReceta() {
  let receta = dataManager.getData('receta');


  let principales = 2;

  for(let ingrediente of receta.ingredientes) {
    if(principales < 1) {
      addRowValores(ingrediente.cantidad, receta.multiplicador, ingrediente.nombre);
    } else if(principales == 2) {
      let principalIn = document.getElementById('principalIn');
      principalIn.value = ingrediente.cantidad;

      let nombreIn = principalIn.parentNode.querySelector('.ingrediente');
      nombreIn.value = ingrediente.nombre;

      let principalOut = document.getElementById('principalOut');
      principalOut.value = ingrediente.cantidad * receta.multiplicador;

      let nombreOut = principalOut.parentNode.querySelector('.ingrediente');
      nombreOut.innerHTML = ingrediente.nombre;
    } else if(principales == 1) {
      let principalIn = document.getElementById('in1');
      principalIn.value = ingrediente.cantidad;

      let nombreIn = principalIn.parentNode.querySelector('.ingrediente');
      nombreIn.value = ingrediente.nombre;

      let principalOut = document.getElementById('out1');
      principalOut.value = ingrediente.cantidad * receta.multiplicador;

      let nombreOut = principalOut.parentNode.querySelector('.ingrediente');
      nombreOut.innerHTML = ingrediente.nombre;

    }
    principales--;
  }
}


function addRowValores(cantidad, multiplicador, nombre) {
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
  inputEl.classList.add('cantidad');
  inputEl.value = cantidad;

  let ingredienteInEl = document.createElement('input');
  ingredienteInEl.addEventListener('keyup', keyupIngrediente);
  ingredienteInEl.setAttribute('placeholder', 'Ingrediente...');
  ingredienteInEl.value = nombre;

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
  ingredienteLblEl.innerHTML = nombre;

  let outputDivEl = document.createElement('div');
  outputDivEl.classList.add('output');
  celdaEl.appendChild(outputDivEl);

  let outputEl = document.createElement('input');
  outputEl.setAttribute('disabled', 'disabled');
  outputEl.classList.add('cantidad');
  outputEl.value = cantidad * multiplicador;
  outputDivEl.appendChild(outputEl);
  outputDivEl.appendChild(ingredienteLblEl);

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

function visibilidad() {
  let mainEL = document.querySelector('#main');

  mainEL.classList.toggle('sin-original')
}

function keyupIngrediente(e) {
  let ingredienteEl = e.target;

  let ingredienteLblEl = ingredienteEl.closest('div.celda').querySelector('.output label.ingrediente')

  ingredienteLblEl.innerHTML = ingredienteEl.value;

  guardarReceta();
}

function deleteSelf(e) {
  let celdaEl = e.target.closest('div.celda');
  celdaEl.remove();
  guardarReceta()
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
  let listaTodos = document.querySelectorAll('.celda .input input.cantidad:not(#principalIn)');

  for(var inEl of listaTodos) {
      manipulador(inEl, entrada, entrada2);
  }
  guardarReceta()
}