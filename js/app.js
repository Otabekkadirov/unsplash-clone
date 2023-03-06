// HTML elements
const form = document.getElementById("form");
const formInput = document.getElementById("form-input");
const gallery = document.querySelector("#gallery");
const galleryColumns = document.querySelectorAll(".gallery-column");

console.log(galleryColumns);

const accessKey = "EN5cUaY0nxFxeJWWbdRGzCAGwjkUnZwAvh6TvGlVTfQ";
const unsplashUrl = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&per_page=25&query=`;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getImages(appendImages);
});
async function getImages(callback) {
    const inputValue = formInput.value;

    const response = await fetch(`${unsplashUrl}${inputValue}`);
    const data = await response.json();
    callback(data.results);

    form.reset();
}
function appendImages(images) {
    const imgBoxes = images.map((image) => {
        console.log(image);
        const imgDiv = document.createElement("div");
        imgDiv.className = "img-box";
        imgDiv.innerHTML = `
                    <a href="${image.links.download}" target="_blank">
                        <img 
                            src="${image.urls.small}" 
                            alt="${image.alt_description}"
                            title="${image.alt_description}"/>
                    </a>
                    `;
        return imgDiv;
    });

    galleryColumns.forEach((column) => {
        column.innerHTML = "";
    });

    shuffle(galleryColumns, imgBoxes, 0);
    shuffle(galleryColumns, imgBoxes, 1);
    shuffle(galleryColumns, imgBoxes, 2);
}

function shuffle(columns, images, index) {
    for (let i = index; i < images.length; i += 3) {
        columns[index].append(images[i]);
    }
}
