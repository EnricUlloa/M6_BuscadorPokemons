const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/pikachu";
const imgObj = document.querySelector(".imatge");
let srcImg = "";
function getImg(){

    console.log("Linia 11");

    fetch(URL_POKEMON)
    .then(function(resposta){
        if(!resposta.ok){
            throw Error("La petició no ha anat bé");
        }
        return resposta.json();
    })
    .then(function(dada){
        console.log(dada.sprites.front_shiny);
        srcImg = dada.sprites.front_shiny;
         imgObj.src = srcImg;
    })
    .catch(function(error){
        console.log("Hi hagut un error");
    })
    .finally(function(){
        console.log("Sempre s'executa");
    });

    console.log("Linia 44");
    console.log(srcImg);
}
getImg();