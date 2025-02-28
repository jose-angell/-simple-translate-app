const btnOriginEnglish = document.getElementById("originTextEnglish");
const btnOriginFrech = document.getElementById("originTextFrench");
const btnOriginSelect = document.getElementById("originTextSelect");

const btnResultEnglish = document.getElementById("resultTextEnglish");
const btnResultFrech = document.getElementById("resultTextFrench");
const btnResultSelect = document.getElementById("resultTextSelect");

const btnTranslate = document.getElementById("translatebutton");

let textOrigin = document.getElementById("originText");
let textResult = document.getElementById("textResult");

let origin = "en";
let result = "fr";

// Agrupar los botones de idioma de origen en una lista
const originButtons = [btnOriginEnglish, btnOriginFrech, btnOriginSelect];
const resultButtons = [btnResultEnglish, btnResultFrech, btnResultSelect];

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
    console.log(data);
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