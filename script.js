const dialogRef = document.getElementById("dialogPopUp");
const prefixID = "image";
const images = document.getElementsByClassName("photoPreview");
let currentImgId = null;

document.addEventListener("click", (e) => {
  console.log('"closeDialog"');
  if (dialogRef.open && !e.composedPath().includes(dialogRef)) {
    closeDialog();
    console.log('"closed"');
  }
});

function openDialog() {
  dialogRef.showModal();
  dialogRef.querySelector(".navButton.arrowFor").focus();
}

function closeDialog() {
  dialogRef.close();
}

window.addEventListener("keydown", function (event) {
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
  if (event.key == "Enter") {
    console.log("hier");
    showFullDialog(currentImgId);
    // event.stopPropagation();
  }
});

// function openWhenFocus(imgID) {
//   let currentImg = document.getElementById(imgID);
//   if (currentImg.hasFocus) {
//     showFullDialog(imgID);
//   }
// }

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
