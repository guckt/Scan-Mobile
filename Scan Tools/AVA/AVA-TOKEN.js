// ==UserScript==
// @name         AVA/TOKEN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       guckt
// @match        https://snowtrace.io/token/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var address = jQuery.trim(window.location.href).substring(27,69)
    .trim(this);
//console.log("ADDRESS /////: " + address);
    var chart = document.createElement("iframe");
        chart.setAttribute("src", "https://dexscreener.com/avalanche/" + address);
        chart.style.width = "100%";
        chart.style.height = "800px";
        document.querySelector("#tokenInfo > div").before(chart);

});



