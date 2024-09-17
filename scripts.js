// Seleção de Elementos

const container = document.querySelector(".container");
const qrHeaderTitle = document.querySelector("#qr-header p");
const qrInput = document.querySelector("#qr-form input");
const generatorButton = document.querySelector("#qr-form button");
const cleanButton = document.querySelector("#clean");
const imgQrCode = document.querySelector("#qr-code img");
const descriptionImg = document.querySelector("#description-img");
const footer = document.querySelector(".to-hide");

// Funções

const generateCode = () => {
  const textQrInput = qrInput.value;

  imgQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${textQrInput}`;
  generatorButton.innerHTML = "Carregando...";

  if (!textQrInput) {
    Swal.fire({
      icon: "info",
      title: "Preenchimento Obrigatório",
      text: "É necessário preencher algum texto para prosseguir!",
    });

    return;
  }

  imgQrCode.addEventListener("load", () => {
    container.classList.add("active");
    generatorButton.innerHTML = "Criado com Sucesso!";
    descriptionImg.innerHTML = textQrInput;
    qrHeaderTitle.innerHTML = "Seu código foi gerado e está pronto para uso.";
    qrHeaderTitle.style.color = "#ffb108";
    qrHeaderTitle.style.fontWeight = "bold";
    footer.classList.remove("to-hide");
    footer.classList.add("show");
  });
};

const restartAll = () => {
  container.classList.remove("active");
  generatorButton.innerHTML = "Gerar Qr Code";
  descriptionImg.innerHTML = "";
  qrHeaderTitle.innerHTML = "Insira uma URL ou texto, para criar um QR Code";
  qrInput.value = "";
  qrHeaderTitle.style.color = "";
  qrHeaderTitle.style.fontWeight = "";
  footer.classList.remove("show");
  footer.classList.add("to-hide");
};

// Eventos

generatorButton.addEventListener("click", () => {
  generateCode();
});

cleanButton.addEventListener("click", () => {
  restartAll();
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value) {
    restartAll();
  }
});

qrInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    generateCode();
  }
});
