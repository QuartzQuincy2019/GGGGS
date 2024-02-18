function generateBar(_background_color, _innerHTML, _id) {
    var _p = document.createElement("div");
    _p.classList.add("bar");
    document.documentElement.style.setProperty("--color-A", _background_color);
    _p.style.fontFamily = "Tinos Nerd Propo";
    _p.innerHTML =
        "<div class='bar_side bar_side_a' style='color: " + _background_color + "'></div>"
        + "<div class='bar_inner' style='background-color: " + _background_color + "'>"
        + _innerHTML
        + "</div><div class='bar_side bar_side_b' style='color: " + _background_color + "'><div>";
    _p.id = _id;
    return _p;
}

function addBar(_background_color, _innerHTML, _id, _destination) {
    _destination.appendChild(generateBar(_background_color, _innerHTML, _id));
}

addBar("#15b0ee", __VERSION, "version_bar", document.getElementById("section_1"));
var E_VERSION_BAR = document.getElementById("version_bar");
E_VERSION_BAR.style.position = "fixed";
E_VERSION_BAR.style.bottom = "0.5vh";
E_VERSION_BAR.style.right = "0.2vw";

addBar("#ff8b14", "Quincy K.", "author_bar", document.getElementById("section_1"));
var E_AUTHOR_BAR = document.getElementById("author_bar");
E_AUTHOR_BAR.style.position = "fixed";
E_AUTHOR_BAR.style.bottom = "4.5vh";
E_AUTHOR_BAR.style.right = "0.2vw";