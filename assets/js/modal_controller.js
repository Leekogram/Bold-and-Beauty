const targetDiv = document.getElementById("bookanAppointment");
const btnSectionDescription = document.getElementById("sectionDescription");
window.onload = function() {
    targetDiv.style.display = "none";
};
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


