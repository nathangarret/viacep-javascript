let cepText = document.querySelector("#cepText");

let logradouro = document.querySelector("#logradouro");
let localidade = document.querySelector("#localidade");
let complemento = document.querySelector("#complemento");
let bairro = document.querySelector("#bairro");
let unidadeFederal = document.querySelector("#uf");
let btnBuscar = document.getElementById("btnBuscar");
let btnApagar = document.getElementById("btnVoltar");

btnBuscar.addEventListener("click", () => {
    consultar();
})

btnApagar.addEventListener("click", () => {
    window.location.href = "index.html";
})

// Função para formatar o CEP
function formatarCEP(cep) {
    cep = cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    cep = cep.substring(0, 9);   // Limita a 8 dígitos
    // 098 47- 000

    if (cep.length >= 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5, 9); // Adiciona o hífen
    }

    return cep;
}

// Função para aplicar a formatação à medida que o usuário digita
function formatarCEPInput() {
    var cepInput = document.getElementById("cep");
    cepInput.value = formatarCEP(cepInput.value);
}

document.getElementById("cep").addEventListener("input", formatarCEPInput);

function consultar() {

    document.getElementById("resultado").style.display = "flex";
    document.getElementById('btnBuscar').style.display = "none";

    let cep = document.querySelector('#cep').value;
    cep = cep.replace(/\D/g, '');
    
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length === 8 && !isNaN(cep)) {
        fetch(url).then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                cepText.innerHTML += data.cep;
                logradouro.innerHTML += data.logradouro;
                localidade.innerHTML += data.localidade;
                complemento.innerHTML += data.complemento;
                bairro.innerHTML += data.bairro;
                unidadeFederal.innerHTML += data.uf;
            })
        });
    } else {
        cep.innerHTML = `<h3 class="error">Couldn't Find The Word </h3>`;
    }
}