// ==UserScript==
// @name         MOBILE/BSC/TX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       guckt
// @match        https://bscscan.com/tx/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

$(document).ready(function() {

    var tickers = [];
    var tokens = [];
    var addresses = [];

    /*
    var links =['',
                '',
                ''];
    */

    var ignore =['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', //WBNB
                 '0xe9e7cea3dedca5984780bafc599bd69add087d56', //BUSD
                 '0x2170ed0880ac9a755fd29b2688956bd959f933f8', //B-ETH
                 '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', //B-USDC
                 '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', //B-DAI
                 '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47', //B-ADA
                 '0x55d398326f99059ff775485246999027b3197955']; //B-BUSD

    // FILTERING
    const topFilter = document.querySelector("#content > div.container.py-3.mn-b3 > div").remove();
    const bannerFilter = document.querySelector("#content > div:nth-child(10)").remove();
    const sponsorFilter = document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(8) > div.col-md-9").remove();
    const sponsorFilter2 = document.querySelector("#ContentPlaceHolder1_maintable > div:nth-child(8) > div").remove();
    const commentsFilter = document.querySelector("#ContentPlaceHolder1_li_disqus").remove();


    for (let i = 1; i < 20; i++) {
        let totalSelector = document.querySelectorAll("#wrapperContent > li:nth-child("+i+") > div > a")

        for (let k = 0; k < totalSelector.length; k++) {
            if (k == totalSelector.length- 1) {

                var href = $(totalSelector[k]).attr('href');
                var address = jQuery.trim(href).substring(7)
                .trim(this);

                if (ignore.indexOf(address) == -1)
                {
                    var ticker
                    var token
                    var element = totalSelector[k].outerHTML;

                    //console.info("round " + i + ": " + totalSelector[k].childNodes.length);
                    if ((totalSelector[k].childNodes.length) == 1) {
                        token = element.substring(
                            element.indexOf(">") + 1,
                            element.lastIndexOf("(")
                        );
                        ticker = element.substring(
                            element.indexOf("(") + 1,
                            element.lastIndexOf(")")
                        );
                    }
                    else if ((totalSelector[k].childNodes.length) == 2){
                        token = totalSelector[k].childNodes[0].getAttribute("data-original-title");
                        ticker = element.substring(
                            element.indexOf("(") + 1,
                            element.lastIndexOf(")")
                        );
                    }
                    else if ((totalSelector[k].childNodes.length) == 3){
                        token = element.substring(
                            element.indexOf(">") + 1,
                            element.lastIndexOf("(")
                        );
                        ticker = totalSelector[k].childNodes[1].getAttribute("data-original-title");
                    }
                    else if ((totalSelector[k].childNodes.length) == 4){
                        token = totalSelector[k].childNodes[0].getAttribute("data-original-title");
                        ticker = totalSelector[k].childNodes[2].getAttribute("data-original-title")
                    }

                    tickers[i] = ticker;
                    tokens[i] = token;
                    addresses[i] = address;

                    $(totalSelector[k].parentNode).append('<input type="button" value="X" id="BT'+i+'" >')
                    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
                    $("#BT"+i).css("margin-left", "5px");
                    $("#BT"+i).css("border-radius", "16px");
                    $("#BT"+i).css("color", "DodgerBlue");
                    $("#BT"+i).css("background", "white");
                    $("#BT"+i).css("border-color", "DodgerBlue");
                    $("#BT"+i).click(function(){
                        window.open('https://metamask.app.link/dapp/pancakeswap.finance/swap?chain=bsc&outputCurrency=' + addresses[i]);

                        //}
                        //window.location = current;
                    });
                }
            }
        }
    }

    var itemNumber = 0;

    var removeUndefined = addresses.filter(item => { return item !== undefined });
    var removeDuplicates = [...new Set(removeUndefined)]
    let filteredAddresses = removeDuplicates.filter(function (item) {
        return item.indexOf("s") !== 0;
    });

    Chart(filteredAddresses, itemNumber);
    Purchase(filteredAddresses, itemNumber);

    if (filteredAddresses.length > 1) {
        $("#ContentPlaceHolder1_maintable > div:nth-child(14) > div.col-md-9").append('<input type="button" value="NEXT" id="NB" >')
        //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
        $("#NB").css("position", "absolute").css("bottom", 5).css("left", 10);
        //$("#NB").css("border-radius", "15px")
        $("#NB").css("margin", "5px");
        $("#NB").css("width", "100px");
        $("#NB").css("color", "DodgerBlue");
        $("#NB").css("background", "white");
        $("#NB").css("border-color", "DodgerBlue");
        $("#NB").click(function(){
            itemNumber = itemNumber + 1;
            itemNumber = itemNumber % filteredAddresses.length;
            Chart(filteredAddresses, itemNumber);
            Purchase(filteredAddresses, itemNumber);
        });
    }
function Chart(addresses, itemNumber){

        if (filteredAddresses.length != 0) {
            var chart = document.createElement("iframe");
            chart.setAttribute("src", "https://dexscreener.com/bsc/" + filteredAddresses[itemNumber]);
            chart.style.width = "100%";
            chart.style.height = "800px";

            if (document.querySelector("#ContentPlaceHolder1_maintable > iframe")){
                document.querySelector("#ContentPlaceHolder1_maintable > iframe").replaceWith(chart);
            }
            else {
                document.querySelector("#ContentPlaceHolder1_maintable > hr:nth-child(15)").before(chart);
            }
        }
    }
});

function Purchase(addresses, itemNumber){

    $("#logoAndNav > nav > div.w-lg-auto").append('<input type="button" value="PURCHASE" id="BB" >')
    //$("#BT").css("position", "fixed").css("top", 1).css("left", 100);
    $("#BB").css("position", "fixed").css("top", 1).css("right", 60);
    //$("#NB").css("border-radius", "15px")
    $("#BB").css("margin", "5px");
    $("#BB").css("width", "100px");
      $("#BB").css("height", "30px");

    $("#BB").css("color", "DodgerBlue");
    $("#BB").css("background", "white");
    $("#BB").css("border-color", "DodgerBlue");
    $("#BB").click(function(){
        window.open('https://metamask.app.link/dapp/pancakeswap.finance/swap?chain=bsc&outputCurrency=' + addresses[itemNumber]);
    });
};
