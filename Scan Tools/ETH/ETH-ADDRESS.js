// ==UserScript==
// @name         ETH/ADDRESS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Address page tools
// @author       guckt
// @match        https://etherscan.io/address/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var address = jQuery.trim(window.location.href).substring(29,71)
    .trim(this);
console.log("ADDRESS /////: " + address);
    var chart = document.createElement("iframe");
        chart.setAttribute("src", "https://debank.com/profile/" + address);
        chart.style.width = "100%";
        chart.style.height = "800px";
        document.querySelector("#analytics > div.table-responsive").before(chart);

});