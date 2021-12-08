// ==UserScript==
// @name         BSC/ADDRESS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Address page tools
// @author       guckt
// @match        https://bscscan.com/address/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var address = jQuery.trim(window.location.href).substring(28,70)
    .trim(this);
console.log("ADDRESS /////: " + address);
    var chart = document.createElement("iframe");
        chart.setAttribute("src", "https://debank.com/profile/" + address);
        chart.style.width = "100%";
        chart.style.height = "800px";
        document.querySelector("#analytics > div.table-responsive").before(chart);

    //var sidebar = document.querySelector("#root > div > div.Flex_flex__2sTHk.Flex_flexColumn__2DXbU.Sidebar_container__1p_nd.Sidebar_mini__22HwA");
   // sidebar.parentNode.removeChild( sidebar );

    //$("#analytics > iframe").contents().find("#root > div > div.Flex_flex__2sTHk.Flex_flexColumn__2DXbU.Sidebar_container__1p_nd.Sidebar_mini__22HwA").remove();
});



