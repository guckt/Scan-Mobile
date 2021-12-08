// ==UserScript==
// @name         AVA/ADDRESS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       guckt
// @match        https://snowtrace.io/address/*
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
        document.querySelector("#ContentPlaceHolder1_divSummary > div.card > div.card-body").before(chart);

    //var sidebar = document.querySelector("#root > div > div.Flex_flex__2sTHk.Flex_flexColumn__2DXbU.Sidebar_container__1p_nd.Sidebar_mini__22HwA");
   // sidebar.parentNode.removeChild( sidebar );

    //$("#analytics > iframe").contents().find("#root > div > div.Flex_flex__2sTHk.Flex_flexColumn__2DXbU.Sidebar_container__1p_nd.Sidebar_mini__22HwA").remove();
});



