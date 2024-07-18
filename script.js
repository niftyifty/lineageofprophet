const namesEn = [
    "Muhammad (SAW)",
    "Abdullah",
    "Abdul-Muttalib",
    "Hashim",
    "Abd Manaf",
    "Qusai",
    "Kilab",
    "Murrah",
    "Ka'b",
    "Lu'ayy",
    "Ghalib",
    "Fihr",
    "Malik",
    "An-Nazr",
    "Kinana",
    "Khuzaymah",
    "Mudrikah",
    "Ilyas",
    "Mudar",
    "Nizar",
    "Ma'ad",
    "Adnan"
];

const namesAr = [
    "محمد (صلى الله عليه وسلم)",
    "عبد الله",
    "عبد المطلب",
    "هاشم",
    "عبد مناف",
    "قصي",
    "كلاب",
    "مرة",
    "كعب",
    "لؤي",
    "غالب",
    "فهر",
    "مالك",
    "النضر",
    "كنانة",
    "خزيمة",
    "مدركة",
    "الياس",
    "مضر",
    "نزار",
    "معد",
    "عدنان"
];

let names = [...namesEn];
let correctOrder = [...namesEn].reverse();
let currentDraggedElement = null;
let isArabic = false;

document.addEventListener("DOMContentLoaded", () => {
    const nameContainer = document.getElementById("names");
    const dropzone = document.getElementById("dropzone");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    const toggleLanguageButton = document.getElementById("toggle-language");

    function populateNames() {
        nameContainer.innerHTML = '';
        names.sort(() => Math.random() - 0.5); // Shuffle the names array

        names.forEach(name => {
            const nameElement = document.createElement("div");
            nameElement.classList.add("name");
            if (name.includes("Muhammad") || name.includes("محمد")) {
                nameElement.classList.add("prophet");
            }
            nameElement.textContent = name;
            nameElement.setAttribute("draggable", true);

            nameElement.addEventListener("dragstart", () => {
                nameElement.classList.add("dragging");
                currentDraggedElement = nameElement;
            });

            nameElement.addEventListener("dragend", () => {
                nameElement.classList.remove("dragging");
                currentDraggedElement = null;
            });

            nameContainer.appendChild(nameElement);
        });

        dropzone.innerHTML = '';
        message.textContent = '';
    }

    function checkOrder() {
        const droppedNames = Array.from(dropzone.children).map(el => el.textContent);
        droppedNames.forEach((name, index) => {
            if (name === correctOrder[index]) {
                dropzone.children[index].classList.add("correct");
            } else {
                dropzone.children[index].classList.remove("correct");
            }
        });
        if (droppedNames.length === correctOrder.length && droppedNames.every((name, index) => name === correctOrder[index])) {
            message.textContent = "Congratulations! You've placed all names in the correct order.";
            message.style.color = "green";
        } else {
            message.textContent = "Keep trying!";
            message.style.color = "red";
        }
    }

    dropzone.addEventListener("dragover", event => {
        event.preventDefault();
    });

    dropzone.addEventListener("drop", event => {
        event.preventDefault();
        if (currentDraggedElement) {
            dropzone.appendChild(currentDraggedElement);
            checkOrder();
        }
    });

    resetButton.addEventListener("click", populateNames);

    toggleLanguageButton.addEventListener("click", () => {
        isArabic = !isArabic;
        names = isArabic ? [...namesAr] : [...namesEn];
        correctOrder = [...names].reverse();
        toggleLanguageButton.textContent = isArabic ? "Switch to English" : "Switch to Arabic";
        populateNames();
    });

    populateNames();
});