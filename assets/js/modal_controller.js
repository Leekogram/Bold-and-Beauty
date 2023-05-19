
const btnSectionDescription = document.getElementById("sectionDescription");
btnSectionDescription.onclick = function () {
  if (targetDiv.style.display !== "none") {
      console.log("here");
    targetDiv.style.display = "none";
  } else {
      console.log("nah here");
    targetDiv.style.display = "block";
    btnSectionDescription.style.display ="none";
  }
};
const targetDiv = document.getElementById("bookanAppointment");

const processing = document.getElementById("processing");
const success = document.getElementById("success");
const error = document.getElementById("error");

    targetDiv.style.display = "none";
    processing.style.display = "none";
    success.style.display = "none";
    error.style.display = "none";



