const dialogRef = document.getElementById("dialogPopUp");
const prefixID = "image";
const images = [
  "Boot_im_Wasser",
  "Dorfkiche_Seeburg_bei_Nacht",
  "Daemmerung_in_Seeburg",
  "Heuballen",
  "Kuerbisse",
  "Morgengrauen",
  "Nebel_im_Wald",
  "Pilze_im_Wald",
  "Seeburg",
  "Sonnenaufgang",
  "Sonnenuntergang",
  "Winter_in_Seeburg",
];
let currentImgId = null;

window.onload = (event) => {
  render();
  addEventHandler();
};

function render() {
  let imagePreview = document.getElementById("imageGallery");
  for (let i = 0; i < images.length; i++) {
    imagePreview.innerHTML += getNoteTemplate(i);
  }
}

function getNoteTemplate(index) {
  return ` <img tabindex="0"
            id="${prefixID + (index + 1)}"
            src="./img-to-upload/${images[index]}.jpg"
            alt="${images[index]}"
            class="photoPreview"
            role="tab"
          />`;
}

function addEventHandler() {
  document.addEventListener("click", (e) => {
    if (dialogRef.open && !e.composedPath().includes(dialogRef)) {
      closeDialog();
    }
  });
  dialogRef.addEventListener("keyup", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    } else if (dialogRef.open) {
      switch (event.key) {
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          previousImage();
          break;
      }
    }
  });
  document.querySelector(".gallery").addEventListener("keyup", (event) => {
    if (event.key == "Enter" && !dialogRef.open) {
      showFullDialog(currentImgId);
    }
  });
  document
    .querySelector(".closeButton")
    .addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        return false;
      }
    });
  document.querySelector(".closeButton").addEventListener("keyup", (event) => {
    if (event.key == "Enter" && dialogRef.open) {
      event.stopPropagation();
      closeDialog();
    }
  });
  document.querySelectorAll("img.photoPreview").forEach((img) => {
    img.addEventListener("focusin", (e) => {
      currentImgId = img.id;
    });
  });
  document.querySelectorAll("img.photoPreview").forEach((img) => {
    img.addEventListener("click", (e) => {
      showFullDialog(img.id);
      e.stopPropagation();
    });
  });
}

function openDialog() {
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}

function showFullDialog(imageID) {
  const source = readImageSource(imageID);
  loadDialogImage(source);
  const imageName = getImageName(source);
  printDialogTitle(imageName);
  const imageIndex = readImageIndex(imageID);
  printIndexOfImage(imageIndex);
  openDialog();
}

function readImageSource(imageID) {
  return document.getElementById(imageID).src;
}

function loadDialogImage(source) {
  document.getElementById("dialogImage").style.backgroundImage =
    `url("${source}")`;
}

function readImageIndex(imageID) {
  return imageID.slice(prefixID.length);
}

function printIndexOfImage(index) {
  document.getElementById("imageIndex").innerHTML = `${index}/${images.length}`;
}

function printDialogTitle(imageName) {
  document.getElementById("dialogTitle").innerHTML = imageName;
}

function getImageName(source) {
  let imageName = source.substring(
    source.lastIndexOf("/") + 1,
    source.lastIndexOf("."),
  );
  return imageName;
}

function readCurrentImageIndex() {
  let currentName = document.getElementById("imageIndex").innerHTML;
  let currentIndex = currentName.substring(0, currentName.indexOf("/"));
  return currentIndex;
}

function nextImage() {
  let currentIndex = readCurrentImageIndex();
  if (currentIndex == images.length) {
    showFullDialog("image1");
  } else {
    let nextImageID = `image${Number(currentIndex) + 1}`;
    showFullDialog(nextImageID);
  }
}

function previousImage() {
  let currentIndex = readCurrentImageIndex();
  if (currentIndex == 1) {
    let previousImageID = `image${images.length}`;
    showFullDialog(previousImageID);
  } else {
    let previousImageID = `image${Number(currentIndex) - 1}`;
    showFullDialog(previousImageID);
  }
}
