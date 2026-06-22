async function translateText() {

    const text =
        document.getElementById("inputText").value;

    const source =
        document.getElementById("sourceLang").value;

    const target =
        document.getElementById("targetLang").value;

    if(text.trim()===""){
        alert("Please enter text");
        return;
    }

    try{

        const response = await fetch(
            "https://translate.argosopentech.com/translate",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    q:text,
                    source:source,
                    target:target,
                    format:"text"
                })
            }
        );

        const data = await response.json();

        document.getElementById("outputText").value =
            data.translatedText;

    }
    catch(error){

        alert(
            "Translation service unavailable. Try again later."
        );

        console.error(error);
    }
}

function copyText(){

    const output =
        document.getElementById("outputText");

    navigator.clipboard.writeText(output.value);

    alert("Copied Successfully");
}

function speakText(){

    const text =
        document.getElementById("outputText").value;

    if(text==="") return;

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang =
        document.getElementById("targetLang").value;

    speechSynthesis.speak(speech);
}

document
.getElementById("swapBtn")
.addEventListener("click",()=>{

    const source =
        document.getElementById("sourceLang");

    const target =
        document.getElementById("targetLang");

    let temp = source.value;

    source.value = target.value;
    target.value = temp;
});
