// Seleção de Elementos

const container = document.querySelector(".container");
const qrHeaderTitle = document.querySelector("#qr-header p");

const qrInput = document.querySelector("#qr-form input");
const generatorButton = document.querySelector("#qr-form button");
const cleanButton = document.querySelector("#clean");
const imgQrCode = document.querySelector("#qr-code img");

// Funcões

const generateCode = () => {
  const textQrCodeInput = qrInput.value;
  if (!textQrCodeInput) {
    Swal.fire({
      icon: "info",
      title: "Preenchimento Obrigatório",
      text: "É necessário preencher algum texto para prosseguir!",
    });
    return;
  }

  imgQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${textQrCodeInput}`;
  generatorButton.innerHTML = "Carregando!";

  imgQrCode.addEventListener("load", () => {
    container.classList.add("active");
    generatorButton.innerHTML = "Criado com sucesso!";
    qrHeaderTitle.innerHTML = "Seu código foi criado e está pronto para uso.";
    qrHeaderTitle.style.color = "#ffb108";
    qrHeaderTitle.style.fontWeight = "bold";
  });
};

const restartAll = () => {
  container.classList.remove("active");
  qrHeaderTitle.innerHTML = "Insira uma URL ou texto, para criar um QR Code";
  qrHeaderTitle.style.color = "";
  qrHeaderTitle.style.fontWeight = "";
  generatorButton.innerHTML = "Gerar QR Code";
  qrInput.value = "";
};

// Eventos

generatorButton.addEventListener("click", () => {
  const textQrInput = qrInput.value;

  generateCode();
});

qrInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    generateCode();
  }
});

cleanButton.addEventListener("click", () => {
  restartAll();
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value) {
    restartAll();
  }
});
