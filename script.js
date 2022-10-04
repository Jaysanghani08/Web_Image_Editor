const filter = document.querySelectorAll(".filters button");
const rotareoption = document.querySelectorAll(".rotates button");
const slider = document.querySelector(".slider input");
const valueoffilter = document.querySelector(".filter-info .value");
const filtername = document.querySelector(".filter-info .name");
const previewImage = document.querySelector(".preview_img img");
const FileToBeInputed = document.querySelector(".file-input");
const OpenImageButton = document.querySelector(".openImg");
const resetFilterBtn = document.querySelector(".reset");
const saveImgBtn = document.querySelector(".saveImg");

let brightness = "100", saturation = "100", greyscale = "0", inversion = "0";
let rotate = 0, fliphorizontal = 1, flipvertical = 1;

const loadImage = () => {
    let file = FileToBeInputed.files[0];
    if(!file)
        return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".main_container").classList.remove("disable");
    });
}

const saveImageOnClick = () => {
    // alert("YEs");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(fliphorizontal, flipvertical);
    ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}



const applyfilter = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal}, ${flipvertical})`;
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)`;
}

filter.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filtername.innerText = option.innerText;
        
        if(option.id === "brightness") {
            slider.max = "200";
            // alert("button");
            slider.value = brightness;
            valueoffilter.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            slider.max = "200";
            slider.value = saturation;
            valueoffilter.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            slider.max = "100";
            slider.value = inversion;
            valueoffilter.innerText = `${inversion}%`;
        } else {
            slider.max = "100";
            slider.value = greyscale;
            valueoffilter.innerText = `${greyscale}%`;
        }
    });
});

rotareoption.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate = rotate - 90;
        }
        else if(option.id === "right"){
            rotate = rotate + 90;
        }
        else if(option.id === "horizontalflip"){
            fliphorizontal = (fliphorizontal === 1) ? -1 : 1;
        }
        else{
            flipvertical = (flipvertical === 1) ? -1 : 1;
        }
        applyfilter();
    });
});


function updatefilter() {
    valueoffilter.innerText = `${slider.value}%`;
    const selectedfilter = document.querySelector(".filters .options .active");

    if (selectedfilter.id === "brightness") {
        brightness = slider.value;
    }
    else if (selectedfilter.id === "saturation") {
        saturation = slider.value;
    } else if (selectedfilter.id === "inversion") {
        inversion = slider.value;
    }
    else {
        greyscale = slider.value;
    }
    applyfilter();
}   

const resetImageOnClick = () => {
    brightness = "100", saturation = "100", greyscale = "0", inversion = "0";
    rotate = 0, fliphorizontal = 1, flipvertical = 1;
    filter[0].click();
    applyfilter();
}


slider.addEventListener("input", updatefilter);
resetFilterBtn.addEventListener("click", resetImageOnClick);
saveImgBtn.addEventListener("click", saveImageOnClick);
FileToBeInputed.addEventListener("change", loadImage);
OpenImageButton.addEventListener("click", () => FileToBeInputed.click());



