// ==UserScript==
// @name         BSC/TOKEN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Token page tools
// @author       guckt
// @match        https://bscscan.com/token/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var address = jQuery.trim(window.location.href).substring(26,68)
    .trim(this);
//console.log("ADDRESS /////: " + address);
    var chart = document.createElement("iframe");
        chart.setAttribute("src", "https://dexscreener.com/bsc/" + address);
        chart.style.width = "100%";
        chart.style.height = "800px";
        document.querySelector("#tokenInfo > div").before(chart);

});













