function changeText(a, b) {
    document.getElementById("artist-one-follows").innerHTML = a;
    document.getElementById("artist-two-follows").innerHTML = b;
}

const a = "DRAKE";
const b = "KENDRICK";
window.onload = changeText(a, b);