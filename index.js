const btnOriginEnglish = document.getElementById("originTextEnglish");
const btnOriginFrech = document.getElementById("originTextFrench");
const btnOriginSelect = document.getElementById("originTextSelect");

const btnResultEnglish = document.getElementById("resultTextEnglish");
const btnResultFrech = document.getElementById("resultTextFrench");
const btnResultSelect = document.getElementById("resultTextSelect");

const btnTranslate = document.getElementById("translatebutton");

const btnSwap = document.getElementById("swapLanguage");

const charCount = document.getElementById("charCount");


let textOrigin = document.getElementById("originText");
let textResult = document.getElementById("textResult");

const maxLength = textOrigin.getAttribute("maxlength")


let origin = "en";
let result = "fr";

// Agrupar los botones de idioma de origen en una lista
const originButtons = [btnOriginEnglish, btnOriginFrech, btnOriginSelect];
const resultButtons = [btnResultEnglish, btnResultFrech, btnResultSelect];

function swapLanguages() {
    // Intercambiar valores
    [origin, result] = [result, origin];

    // Encontrar los botones que corresponden a los nuevos valores
    const newOriginButton = originButtons.find(btn => btn.value === origin);
    const newResultButton = resultButtons.find(btn => btn.value === result);

    // Aplicar selección a los botones correctos
    selectLanguage(originButtons, newOriginButton, "origin");
    selectLanguage(resultButtons, newResultButton, "result");
}

// Función para cambiar el idioma seleccionado
function selectLanguage(buttons, selectedButton, type ) {
    // Remover la clase "language-selected" de todos los botones
    buttons.forEach(btn => {
        btn.classList.remove("language-selected");
        btn.classList.add("language");
    });

    // Agregar la clase solo al botón seleccionado
    selectedButton.classList.add("language-selected");
    selectedButton.classList.remove("language");

    // Actualizar el idioma seleccionado
    if(type == 'origin'){
        origin = selectedButton.value;
    }else{
        result = selectedButton.value;
    }
}


// Agregar evento a cada botón
originButtons.forEach(button => {
    button.addEventListener("click", function () {
        selectLanguage(originButtons, button, 'origin');
    });
});

resultButtons.forEach(button => {
    button.addEventListener('click', function () {
        selectLanguage(resultButtons, button, 'result');
    });
});

function translate(){
    fetch(`https://api.mymemory.translated.net/get?q=${textOrigin.value}&langpair=${origin}|${result}`)
  .then((response) => response.json())
  .then((data) => {
    textResult.textContent  = data.responseData.translatedText;
    
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

btnTranslate.addEventListener('click', function () {
    if(textOrigin.value.length == 0) return ;
    translate();
});

btnSwap.addEventListener("click", swapLanguages);

textOrigin.addEventListener("input", function () {
    let currentLength = textOrigin.value.length;
    
    // Evitar que escriban más caracteres si superan el límite (opcional)
    if (currentLength > maxLength) {
        textOrigin.value = textOrigin.value.substring(0, maxLength);
        currentLength = maxLength;
    }

    charCount.textContent = `${currentLength} / ${maxLength}`;

    // Cambiar color cuando se alcance el límite
    charCount.style.color = currentLength === parseInt(maxLength) ? "red" : "#D2D5DA";
});