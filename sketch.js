var inputResultado = "";

var calculo = {
    valorSalvo: null,
    funcaoParaCalular: null
  
}

function onTeclando(e){
    let regEx =  new RegExp(/[0-9+-/*//]/);   
      if(regEx.test(e.key))
        return true;
      else
        return false;
}

function insertNum(a) {     
    var inputResultado = document.getElementById("resultado");   
    inputResultado.value += event.target.textContent;
      
    //var duplicidade=document.getElementById("resultado").value;
    //document.getElementById ('resultado').value= duplicidade.substring(resultado.length !== '+' )
}

function limpaTudo(){
    inputResultado = document.querySelector('#resultado').value = "";
}

function limpaUltimo(){
    inputResultado = document.querySelector('#resultado').value = inputResultado.substr(0, inputResultado.length-1);
}

function pegaValorClick(valor){
    if(valor=="+" || valor=="-" || valor=="*" || valor=="/"){
        let ultimo = inputResultado.substr(-1, 1);
        if(ultimo=="+" || ultimo=="-" || ultimo=="*" || ultimo=="/"){
            if(valor==ultimo){
                return;
            }
            else {
                inputResultado = inputResultado.substr(0, inputResultado.length-1);
            }
        }
    }
    inputResultado = document.querySelector('#resultado').value = inputResultado + valor;
}

function calculoClick(){

    inputResultado = document.querySelector('#resultado').value;
    

    let ultimo = inputResultado.substr(-1, 1);
    if(ultimo=="+" || ultimo=="-" || ultimo=="*" || ultimo=="/"){
        return;
    }

    let valores = [];
    let operadores = [];
        
    valores = inputResultado.split(/[+-/*//]/);
    operadores = inputResultado.split(/[\d]/).filter(i => i!=='');

    while(operadores.indexOf('*')>=0 || operadores.indexOf('/')>=0){
        for (let i=0; i<operadores.length; i++) {
            if(operadores[i]=='*'){
                valores[i] = valores[i] * valores[i+1];
                operadores.splice(i, 1);
                valores.splice(i+1, 1);
                break;
            }

            if(operadores[i]=='/'){
                if(valores[i+1]==0){
                    return;
                }
                valores[i] = valores[i] / valores[i+1];
                operadores.splice(i, 1);
                valores.splice(i+1, 1);
                break;
            }
        }
    }


    while(operadores.indexOf('+')>=0 || operadores.indexOf('-')>=0){
        for (let i=0; i<operadores.length; i++) {
            if(operadores[i]=='+'){
                valores[i] = parseFloat(valores[i]) + parseFloat(valores[i+1]);
                operadores.splice(i, 1);
                valores.splice(i+1, 1);
                break;
            }
            
            if(operadores[i]=='-'){
                if(valores[i+1]==0){
                    return;
                }
                valores[i] = valores[i] - valores[i+1];
                operadores.splice(i, 1);
                valores.splice(i+1, 1);
                break;
            }
        }
    }

    inputResultado = document.querySelector('#resultado').value = valores[0];

}

//inicializar os métodos e as variveis
window.addEventListener("load", function () {
    adicionaevento();
})

//Se não for um número, substitui pelo nº do botão,
/*function insertNum(){
   if (isNaN(inputResultado.value)) {
        inputResultado.value = event.target.textContent;
        
    } else {
        
        if (inputResultado.value == 0) {
            inputResultado.value = event.target.textContent;
        
        } else {
            inputResultado.value += event.target.textContent;
        }
    }
  
}*/




function adicionaevento(){
// document.getElementById("btn0").addEventListener("click", insertNum);
    // document.getElementById("btn1").addEventListener("click", insertNum(1));
    // document.getElementById("btn2").addEventListener("click", insertNum);
    // document.getElementById("btn3").addEventListener("click", insertNum);
    // document.getElementById("btn4").addEventListener("click", insertNum);
    // document.getElementById("btn5").addEventListener("click", insertNum);
    // document.getElementById("btn6").addEventListener("click", insertNum);
    // document.getElementById("btn7").addEventListener("click", insertNum);
    // document.getElementById("btn8").addEventListener("click", insertNum);
    // document.getElementById("btn9").addEventListener("click", insertNum);
//    document.getElementById("btnlimpar").addEventListener("click",limpar);

//   document.getElementById("btnponto").addEventListener("click",incluiponto);
//    document.getElementById("btndividir").addEventListener("click",clicarOperador);
//   document.getElementById("btnmultiplicar").addEventListener("click",clicarOperador);
//   document.getElementById("btnsoma").addEventListener("click",clicarOperador);
//   document.getElementById("btnsubtracao").addEventListener("click",clicarOperador);
//   document.getElementById("btncalcular").addEventListener("click",clicarResultado);
//   document.getElementById("btndel").addEventListener("click",back);
  
  
};

//volta aos dados iniciais
function limpar(){
  
    resultado.value = "";
    calculo.valorSalvo = null;    
    calculo.funcaoParaCalcular = null;
  
}

//apaga um dígito
function back(){
  var resultado=document.getElementById("resultado").value;
  document.getElementById("resultado").value= resultado.substring(0,resultado.length -1)
}

//Se o resultado estiver vazio ou não for um número acrescenta 0.
//Se não já não tiver ponto dentro de "resultado", inclui.
function incluiponto(){
  
  if(resultado.value === "" || isNaN (resultado.value)){
    resultado.value = "0.";
  }else
  if(!resultado.value.includes(".")){
        resultado.value = resultado.value + ".";
    }
}



function somar(valor1, valor2){
    return valor1 + valor2;
}

function subtrair(valor1, valor2){
    return valor1 - valor2;
}

function multiplicar(valor1, valor2){
    return valor1 * valor2;
}

function dividir(valor1, valor2){
    if(valor2 == 0){
        return "Erro!";
    }else{
        return valor1 / valor2;
    }
}



//define a operação
function calcular(operador){
    if(operador == "+"){
        calculo.funcaoParaCalcular = somar;
    } else if(operador == "-"){
        calculo.funcaoParaCalcular = subtrair;
    } else if(operador == "x"){
        calculo.funcaoParaCalcular = multiplicar;
    } else {
        calculo.funcaoParaCalcular = dividir;
    }
}

function clicarOperador() {
    if(!isNaN(resultado.value)){
        if(calculo.valorSalvo == null){
            calculo.valorSalvo = Number(inputResultado.value);
        }else if(calculo.funcaoParaCalcular != null){
            calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));
        }
    }
    var operador = event.target.textContent;
    calcular(operador);
    inputResultado.value = inputResultado.value + operador  ;
}

function clicarResultado() {
    if(!isNaN(inputResultado.value) && calculo.funcaoParaCalcular != null){
        var resultado = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));
        inputResultado.value = resultado;
        calculo.valorSalvo = resultado;
        calculo.funcaoParaCalcular = null;
      
    }
  
}
