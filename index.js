const colorPicker = document.querySelector("#colorPicker");

let currentMode = "monochrome";

colorPicker.addEventListener("input", (e) => {
  colorChange(colorPicker.value, currentMode.toLowerCase());
});

let modes = [
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "analogic",
  "complement",
  "analogic-complement",
  "triad",
];

document.addEventListener("click", (e) => {
  const id = e.target.id;
  if (id === "dropdownbutton" || id === "chevron-icon") {
    document.querySelector(".dropdown-menu").classList.toggle("show");
  }
  if (modes.includes(id)) {
    removeSelection();
    currentMode = document.querySelector(`#${id}`).innerText;
    document.querySelector("#dropdownbutton").innerHTML = `
          ${currentMode}
            <span>
              <img
                id="chevron-icon"
                src="./assets/icons/chevron-down.svg"
                alt="chevron-down"
                />
            </span>`;
    colorChange(colorPicker.value, currentMode.toLowerCase());
    selectDropdown(id);
  }
});

const colorChange = (hex, mode) => {
  let realHex = hex.substring(1);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${realHex}&mode=${mode}&count=4`,

    {
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setColor(data);
    });
};

const setColor = ({ colors }) => {
  document.querySelector("#main-color").style.backgroundColor =
    colorPicker.value;
  document.querySelector("#main-color-text").textContent =
    colorPicker.value.toUpperCase();
  for (i = 0; i < colors.length; i++) {
    document.querySelector(`#color${i}`).style.backgroundColor =
      colors[i].hex.value;
    document.querySelector(`#color${i}-text`).textContent =
      colors[i].hex.value.toUpperCase();
  }
};

const selectDropdown = (id) => {
  document.querySelector(`#${id} span img`).classList.add("show");
  document.querySelector(`#${id}`).classList.add("fw600");
};

const removeSelection = () => {
  const checkmarkClass = document.querySelectorAll(".checkmark");
  const fw600Class = document.querySelectorAll(".fw600");
  checkmarkClass.forEach((element) => {
    element.classList.remove("show");
  });
  fw600Class.forEach((element) => {
    element.classList.remove("fw600");
  });
};

colorChange(colorPicker.value, currentMode);
