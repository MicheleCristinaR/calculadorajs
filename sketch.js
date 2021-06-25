var inputResultado = "";

function limpaTudo(){
    inputResultado = document.querySelector('#resultado').value = "";
}

function limpaUltimo(){
    inputResultado = document.querySelector('#resultado').value = inputResultado.substr(0, inputResultado.length-1);
}

function pegaValorClick(valor){
    if(valor=="+" || valor=="-" || valor=="*" || valor=="/" || valor=="."){
        let ultimo = inputResultado.substr(-1, 1);
        if( valor=="." && valor==ultimo){
            return;
        }
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
    console.log(pegaValorClick)
}

function calculoClick(){

    inputResultado = document.querySelector('#resultado').value;
    

    let ultimo = inputResultado.substr(-1, 1);
    if(ultimo=="+" || ultimo=="-" || ultimo=="*" || ultimo=="/"){
        return;
    }

    let valores = [];
    let operadores = [];
        
    valores = inputResultado.split(/[\+|-|\*|\/]/);
    operadores = inputResultado.split(/[0-9.]*/).filter(i => i!=='');

    while(operadores.indexOf('*')>=0 || operadores.indexOf('/')>=0){
        for (let i=0; i<operadores.length; i++) {
            if(operadores[i]=='*'){
                valores[i] = parseFloat(valores[i]) * parseFloat(valores[i+1]);
                operadores.splice(i, 1);
                valores.splice(i+1, 1);
                break;
            }

            if(operadores[i]=='/'){
                if(valores[i+1]==0){
                    return;
                }
                valores[i] = parseFloat(valores[i]) / parseFloat(valores[i+1]);
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
                valores[i] = parseFloat(valores[i]) - parseFloat(valores[i+1]);
                operadores.splice(i, 1);
                valores.splice(i+1, 1);
                break;
            }
        }
    }

    inputResultado = document.querySelector('#resultado').value = parseFloat(valores[0]);
    console.log(calculoClick)
}




