// ==UserScript==
// @name         ETH/TX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Transaction page tools
// @author       guckt
// @match        https://etherscan.io/tx/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

var addresses = [];

var links =['https://etherscan.io/token/',
            'https://dexscreener.com/ethereum/',
            'https://app.uniswap.org/#/swap?outputCurrency='];

var ignore =['0xdac17f958d2ee523a2206206994597c13d831ec7', //TETHER
             '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', //USDC
             '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', //WBTC
             '0x4fabb145d64652a948d72533023f6e7a623c7c53', //BUSD
             '0x6b175474e89094c44da98b954eedeac495271d0f', //DAI
             '0xa47c8bf37f92abed4a126bda807a7b7498661acd', //UST
             '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2']; //WETH

    for (let i = 1; i < 20; i++) {
        let totalSelector = document.querySelectorAll("#wrapperContent > li:nth-child("+i+") > div > a")

        for (let k = 0; k < totalSelector.length; k++) {
            if (k == totalSelector.length- 1) {

                var href = $(totalSelector[k]).attr('href');
                var address = jQuery.trim(href).substring(7)
                .trim(this);

                if (ignore.indexOf(address) == -1)
                {
                    addresses[i] = address;
                    $(totalSelector[k]).append('<input type="button" value="X" id="BT'+i+'" >')

                    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
                    $("#BT"+i).css("margin-left", "5px");
                    $("#BT"+i).css("border-radius", "16px");
                    $("#BT"+i).css("color", "DodgerBlue");
                    $("#BT"+i).css("background", "white");
                    $("#BT"+i).css("border-color", "DodgerBlue");
                    $("#BT"+i).click(function(){
                        for(let j=1; links.length > j; j++){
                            window.open(links[j]+addresses[i]);
                        }
                        //window.location = current;
                    });
                }
            }
        }
    }

    var itemNumber = 0;

    const ids = addresses.map(o => o.id)
    const filteredAddresses = addresses.filter(({id}, index) => !ids.includes(id, index + 1))

    Chart(filteredAddresses, itemNumber);

    if (filteredAddresses.length > 1) {
        $("#ContentPlaceHolder1_maintable > div:nth-child(11) > div.col-md-3.font-weight-bold.font-weight-md-normal.mb-1.mb-md-0").append('<input type="button" value="NEXT" id="NB" >')
        //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
        $("#NB").css("position", "absolute").css("bottom", 0).css("left", 5);
        //$("#NB").css("border-radius", "15px")
        $("#NB").css("width", "100px");
        $("#NB").css("color", "DodgerBlue");
        $("#NB").css("background", "white");
        $("#NB").css("border-color", "DodgerBlue");
        $("#NB").click(function(){
            itemNumber = itemNumber + 1;
            itemNumber = itemNumber % filteredAddresses.length;
            Chart(addresses, itemNumber);
        });
    }

    function Chart(addresses, itemNumber){

        if (filteredAddresses.length != 0) {
            var chart = document.createElement("iframe");
            chart.setAttribute("src", "https://dexscreener.com/ethereum/" + filteredAddresses[itemNumber]);
            chart.style.width = "100%";
            chart.style.height = "800px";

            if (document.querySelector("#ContentPlaceHolder1_maintable > iframe")){
                document.querySelector("#ContentPlaceHolder1_maintable > iframe").replaceWith(chart);
            }
            else {
                if (document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(6) > div.col-md-3.font-weight-bold.font-weight-md-normal.mb-1.mb-md-0 > div > i")) {
                    document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(12)").before(chart);
                }
                else{
                    document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(10)").before(chart);
                }
            }
        }
    }
    //$('#ContentPlaceHolder1_maintable > iframe').on('load', function() {
    //        let iframe = $('#ContentPlaceHolder1_maintable > iframe');
    //});
});

















