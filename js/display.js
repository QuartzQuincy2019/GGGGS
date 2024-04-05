var E_SpecialGachaControl = document.getElementById("SpecialGachaControl");

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
E_AUTHOR_BAR.style.bottom = "calc(var(--universal-font-size) + 2.0vh)";
E_AUTHOR_BAR.style.right = "0.2vw";

function areaControl(elementId) {
    var _E = document.getElementById(elementId);
    if (_E.style.display == "none") {
        _E.style.display = "";
        return;
    }
    if (_E.style.display == "") {
        _E.style.display = "none";
        return;
    }
}

var areWeaponCardsVisible = true;
function weaponCardControl() {
    var weaponCard_matches = document.querySelectorAll(".weaponCard");
    if (areWeaponCardsVisible == true) {
        for (var i = 0; i < weaponCard_matches.length; i++) {
            if (weaponCard_matches[i].parentNode.parentNode.id == inventory.id) {
                weaponCard_matches[i].parentNode.style.display = "";
            }
        }
    } else {
        for (var i = 0; i < weaponCard_matches.length; i++) {
            if (weaponCard_matches[i].parentNode.parentNode.id == inventory.id) {
                weaponCard_matches[i].parentNode.style.display = "none";
            }
        }
    }
}
function switchWeaponCardControl() {
    if (areWeaponCardsVisible) {
        areWeaponCardsVisible = false;
    } else {
        areWeaponCardsVisible = true;
    }
    weaponCardControl();
}

var areStarRCardsVisible = true;
function starRCardControl() {
    var starRCard_matches = document.querySelectorAll(".starR");
    if (areStarRCardsVisible == true) {
        for (var i = 0; i < starRCard_matches.length; i++) {
            if (starRCard_matches[i].parentNode.parentNode.id == inventory.id) {
                starRCard_matches[i].parentNode.style.display = "";
            }
        }
    } else {
        for (var i = 0; i < starRCard_matches.length; i++) {
            if (starRCard_matches[i].parentNode.parentNode.id == inventory.id) {
                starRCard_matches[i].parentNode.style.display = "none";
            }
        }
    }
}
function switchStarRCardControl() {
    if (areStarRCardsVisible) {
        areStarRCardsVisible = false;
    } else {
        areStarRCardsVisible = true;
    }
    starRCardControl();
}

function gachaModeAreaControl() {
    var weaponSpecialized_matches = document.querySelectorAll(".WeaponSpecialized");
    var characterSpecialized_matches = document.querySelectorAll(".CharacterSpecialized");
    if (_GACHA_MODE == "character") {
        for (var i = 0; i < weaponSpecialized_matches.length; ++i) {
            weaponSpecialized_matches[i].style.display = "none";
        }
        for (var i = 0; i < characterSpecialized_matches.length; ++i) {
            characterSpecialized_matches[i].style.display = "";
        }
        document.getElementById("StartSDrop").max = 89;
        document.getElementById("GachaModeSwitch").innerHTML = "前往󰓥武器祈愿";
        return;
    }
    if (_GACHA_MODE == "weapon") {
        for (var i = 0; i < weaponSpecialized_matches.length; ++i) {
            weaponSpecialized_matches[i].style.display = "";
        }
        for (var i = 0; i < characterSpecialized_matches.length; ++i) {
            characterSpecialized_matches[i].style.display = "none";
        }
        document.getElementById("StartSDrop").max = 79;
        document.getElementById("GachaModeSwitch").innerHTML = "前往󰮖角色祈愿";
        return;
    }
}


function chronicledAreaControl() {
    var Chronicled_matches = document.querySelectorAll(".ChronicleSpecialized");
    var Normal_matches = document.querySelectorAll(".ChronicleDisabled");
    var _E_ModeSwitch = document.getElementById("ModeSwitch");
    if (_CHRONICLE_MODE == true) {
        for (var i = 0; i < Chronicled_matches.length; ++i) {
            Chronicled_matches[i].style.display = "";
        }
        for (var i = 0; i < Normal_matches.length; ++i) {
            Normal_matches[i].style.display = "none";
        }
        _E_ModeSwitch.innerHTML = "退出集录祈愿模式";
        return;
    }
    if (_CHRONICLE_MODE == false) {
        for (var i = 0; i < Chronicled_matches.length; ++i) {
            Chronicled_matches[i].style.display = "none";
        }
        for (var i = 0; i < Normal_matches.length; ++i) {
            Normal_matches[i].style.display = "";
        }
        _E_ModeSwitch.innerHTML = "进入集录祈愿模式";
        gachaModeAreaControl();
        return;
    }
}
chronicledAreaControl();
gachaModeAreaControl();

function setBanner(url) {
    var text = 'url(\"' + url + '\")';
    E_header.style.backgroundImage = text;
}

/**
 * 切换条幅
 * @returns 
 */
function updateBanner() {
    var selector;
    if (_GACHA_MODE == "character") {
        selector = document.getElementById("characterPoolSelect");
    }
    if (_GACHA_MODE == "weapon") {
        selector = document.getElementById("weaponPoolSelect");
    }
    var selectedPool = selector.value;
    if (selectedPool == "none") {
        setBanner("./img/transparent.png");
        return;
    }
    var version = selectedPool.slice(5, -2);//"4_2"
    var url = "./img/Banner_" + version + ".png";
    setBanner(url);
}

function randomArtworkBanner() {
    var z = getRandomElement(CHARACTER_NAMES);
    var c = findCharacter(z);
    setBanner(c.wfile);
}