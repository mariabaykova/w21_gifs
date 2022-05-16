const searchLineElem = document.getElementById("search-line");
const buttonElem = document.getElementById("search-button");

const galleryElem = document.querySelector(".gallery");

const apiKey = `LsfIQf5gCeT2UOfGTvkVT8qhxtmS3bif`;
const limit = 5;

buttonElem.addEventListener( "click", (event) => {
    let searchLineVal = searchLineElem.value;

    clearBlock(galleryElem);

    if( !searchLineVal ) {
        //
    } else {

            let urlApi = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchLineVal}&limit=${limit}&offset=0&rating=g&lang=fr`;

            fetch(urlApi)
            .then(response => response.json())
            .then(result => {
                for ( let i = 0; i < result['data'].length; i++ ) {
                    let gifUrl = result['data'][i]['images']['original']['url'];
                    let newGalleryItem = addBlock( "div", {"class": "gallery__item"}, galleryElem );
                    addBlock( "img", {"class": "gallery__img", "src": gifUrl}, newGalleryItem );
                }

        });
    }
});

// очистка блока
function clearBlock( block ) {
    let blockLength = block.children.length;
    for ( let ii = 0; ii < blockLength; ii++ ) {
        block.removeChild(block.lastElementChild);
    }
}

// добавить блок childBlock с параметрами paramList в parentBlock
function addBlock( childBlock, paramList, parentBlock ) {
    let newElem = document.createElement(childBlock);
    for ( let ii in paramList ) {
        newElem.setAttribute(ii, paramList[ii]);
    }
    parentBlock.appendChild(newElem);
    return newElem;

}