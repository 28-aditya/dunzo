console.log("JS connected");

const theme_button = document.getElementById("theme-toggle");
theme_button.addEventListener("click", function(){

    console.log("theme toggled");
    document.body.classList.toggle("light-mode");

});

const state = {
    currentView: "dashboard",
    tasks: []
};

