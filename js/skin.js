var E_SkinLink = document.getElementById('SkinLink');
var MIN_SKIN_ID = 1;
var MAX_SKIN_ID = 3;

var skinId = [null];
var skinPath = [null];
var skinNames = [null, "aloft", "eve", "lantern"];
var FILE_HEADER = "skin";

var _FK_CHANGE_SKIN = 'p';

for (var i = MIN_SKIN_ID; i <= MAX_SKIN_ID; i++) {
    skinId.push(i);
}

for (var i = MIN_SKIN_ID; i <= MAX_SKIN_ID; i++) {
    skinPath.push(".\\css\\" + FILE_HEADER + "_" + skinNames[i] + ".css");
}

/**
 * 
 * @param {Number} id 皮肤ID
 * @returns -1:皮肤切换失败；0:皮肤切换成功
 */
function changeSkin(id) {
    //console.log("Changing skin:" + id);
    if (id < MIN_SKIN_ID || id > MAX_SKIN_ID) {
        return -1;
    }
    E_SkinLink.setAttribute("href", skinPath[id]);
    return 0;
}

function getCurrentSkinPath() {
    return E_SkinLink.getAttribute("href");
}

function getSkinId(path) {
    var name = path.slice(7 + FILE_HEADER.length, -4);
    var id = extractValue(name, skinNames, skinId);
    for (var i = MIN_SKIN_ID; i <= MAX_SKIN_ID; i++) {
        if ("" + skinId[i] == id) {
            return i;
        }
    }
    return -1;
}

function getCurrentSkinId() {
    return getSkinId(getCurrentSkinPath());
}

document.addEventListener("keydown", function (e) {
    if (e.key != _FK_CHANGE_SKIN) return false;
    e.preventDefault();
    if (getCurrentSkinId() == MAX_SKIN_ID) {
        changeSkin(MIN_SKIN_ID);
    } else {
        changeSkin(getCurrentSkinId() + 1);
    }
    return true;
})