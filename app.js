navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
  if (result.state === "granted" || result.state === "prompt") {
    /* write to the clipboard now */
  }
});

function copiarTexto() {
  let textoCopiado = document.querySelector("#textoResultado");
  textoCopiado.select();
  document.execCommand("copy");
}

document.querySelector("inserirTexto").addEventListener("click", copy);

function mostrarResultado() {
  var textoInserido = document.getElementById("inserirTexto").value;
  if (textoInserido.length > 0) {
    mostrarSemMensagem.style.display = "none";
    mostrarComMensagem.style.display = "block";
  } else {
    mostrarSemMensagem.style.display = "block";
    mostrarComMensagem.style.display = "none";
  }
  document.getElementById("textoResultado").innerHTML = textoInserido;
}

/* Funcoes para conferencia de texto e cripto ou descripto */

let saida;

function possuiMaiusculaOuAcentuacao(texto) {
  const regexMaiuscula = /[A-Z]/;
  const regexAcentuacao = /[áàãâéèêíïóôõöúüç]/i;
  return regexMaiuscula.test(texto) || regexAcentuacao.test(texto);
}

function confereTexto(texto) {
  if (possuiMaiusculaOuAcentuacao(texto)) {
    alert("O texto não pode conter letras maiúsculas ou acentuação!");
    limparInput();
    document.getElementById("mostrarSemMensagem").style.display = "flex";
    document.getElementById("mostrarComMensagem").style.display = "none";
    return false;
  }
  if (texto === "") {
    document.getElementById("mostrarSemMensagem").style.display = "flex";
    document.getElementById("mostrarComMensagem").style.display = "none";
    return false;
  } else {
    document.getElementById("mostrarSemMensagem").style.display = "none";
    document.getElementById("mostrarComMensagem").style.display = "flex";
    return true;
  }
}

// Adicionando o ouvinte de evento para chamar a função criptografar() quando o texto for inserido no textarea

function criptografar() {
  let texto = document.querySelector("#inserirTexto").value;
  if (confereTexto(texto)) {
    texto = texto
      .replace(/e/g, "enter")
      .replace(/i/g, "imes")
      .replace(/a/g, "ai")
      .replace(/o/g, "ober")
      .replace(/u/g, "ufat");
    document.getElementById("textoResultado").innerHTML = texto;
    limparInput();
    saida = texto;
  }
}

function descriptografar() {
  let texto = document.querySelector("#inserirTexto").value;
  if (confereTexto(texto)) {
    texto = texto
      .replace(/enter/g, "e")
      .replace(/imes/g, "i")
      .replace(/ai/g, "a")
      .replace(/ober/g, "o")
      .replace(/ufat/g, "u");
    document.getElementById("textoResultado").innerHTML = texto;
    limparInput();
    saida = texto;
  }
}

function limparInput() {
  texto = document.querySelector("textarea");
  texto.value = "";
}
