let currentImgId = null;
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
            onfocusin="focusInId('${prefixID + (index + 1)}')"
            onclick="clickOnImage('${prefixID + (index + 1)}',event)"
          />`;
}

function onHtmlClick(event) {
  if (dialogRef.open && !event.composedPath().includes(dialogRef)) {
    closeDialog();
  }
}

function useArrowKeys(event) {
  if (dialogRef.open && event.key == "ArrowRight") {
    nextImage();
  } else if (dialogRef.open && event.key == "ArrowLeft") {
    previousImage();
  }
}

function enterFullDialog(event) {
  if (event.key == "Enter" && !dialogRef.open) {
    showFullDialog(currentImgId);
  }
}

function closeDialogBtn(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    return false;
  }
}

function closeBtnStop(event) {
  if (event.key == "Enter" && dialogRef.open) {
    event.stopPropagation();
    closeDialog();
  }
}

function focusInId(imgId) {
  currentImgId = imgId;
}

function clickOnImage(imgId, event) {
  showFullDialog(imgId);
  event.stopPropagation();
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
