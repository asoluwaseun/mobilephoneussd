let credit = 0.0;
let voucher = [];
let usedVoucher = [];
let usedCreditStore = "";
let voucherStore = "";
let tarriffPlan = "Pulse";
let recharge = "";
let sec = 0;
let countmin = 0;
let countsec = 0;

let voucherSection = "";
callingNow = new Audio();



function loadd() {
    retrieved1 = JSON.parse(localStorage.getItem("vouchers"));
    retrieved2 = JSON.parse(localStorage.getItem("tarriff"));
    retrieved3 = JSON.parse(localStorage.getItem("creditbalance"));
    retrieved4 = JSON.parse(localStorage.getItem("vouchersused"));

    if (retrieved1 != undefined) {
        voucher = retrieved1;
        voucherStore = JSON.stringify(voucher);
        for(i = 0; i < voucher.length; i++){
            voucher2 = "<p>" + voucher[i] + "<br /></p>";
            voucherDisplay.innerHTML += voucher2;
        }
    }


    if (retrieved2 != undefined) {
        tarriffPlan = retrieved2;
    }


    if (retrieved3 != undefined) {
        credit = parseFloat(retrieved3);
    }

    if(retrieved4 != undefined){
        usedVoucher = retrieved4;
        usedCreditStore = JSON.stringify(usedVoucher);
    }

}


function timeLoad(){
    timeOne = setInterval(time,1000);
}

function time() {
    datee = new Date;
    if(datee.getHours() < 10 && datee.getMinutes() < 10){
        timeDisplay.innerHTML = "0" + datee.getHours() + " : 0" + datee.getMinutes();
    }
    if(datee.getHours() < 10 && datee.getMinutes() > 10){
        timeDisplay.innerHTML =  "0" + datee.getHours() + " : " + datee.getMinutes();
    }

    if(datee.getMinutes() < 10 && datee.getHours() > 10){
        timeDisplay.innerHTML =   datee.getHours() + " : 0" + datee.getMinutes();
    }
    else{
        timeDisplay.innerHTML =   datee.getHours() + " : " + datee.getMinutes();
    }
}

function keyPress(key) {
    displayMain.style.backgroundImage = "none";

    if (displayMain.innerText.length == 22) {
    }
    else if (displayMain.innerHTML.search("1.Account Information") > -1) {
        if (key == 1) {
            setTimeout(ussdScreen1(), 4000);
        }
        else if (key == 2) {
            setTimeout(ussdScreen2(), 4000);
        }
        else if (key == 3) {
            setTimeout(ussdScreen3(), 4000);
        }
        else if (key == 4) {
            setTimeout(ussdScreen4(), 4000);
        }
        else if (key == 5) {
            setTimeout(ussdScreen5(), 4000);
        }
        else if (key == 6) {
            setTimeout(ussdScreen6(), 4000);
        }
    }

    else if (displayMain.innerHTML.search("My Tools") > -1) {
        if (key == 1) {
            setTimeout(ussdScreen1a, 4000);
        }
        else if (key == 2) {
            setTimeout(ussdScreen2, 4000);
        }
        else if (key == 3) {
            setTimeout(ussdScreen1b, 4000);
        }
        else if (key == 4) {
            setTimeout(ussdScreen1c, 4000);
        }
        else if (key == 5) {
            setTimeout(ussdScreen1d, 4000);
        }
        else if (key == 0) {
            setTimeout(ussd123, 4000);
        }

    }

    else if (displayMain.innerHTML.search("1.BetaTalk") > -1) {
        if (key == 1) {
            setTimeout(ussdScreen2a, 4000);
        }
        else if (key == 2) {
            setTimeout(ussdScreen2b, 4000);
        }
        else if (key == 3) {
            setTimeout(ussdScreen2c, 4000);

        }
        else if (key == 0) {
            setTimeout(ussd123(), 4000);
        }

    }

    else if (displayMain.innerHTML.search("Migrate to BetaTalk") > -1 || displayMain.innerHTML.search("Migrate to Pulse") > -1 || displayMain.innerHTML.search("Migrate to MTN XtraSpecial") > -1) {
        if (key == 1) {
            setTimeout(tarriffMigration, 4000);
        }

        else if (key == 0) {
            setTimeout(ussdScreen2(), 4000);
        }

    }

    else if (displayMain.innerHTML.search("9.Main Menu") > -1) {
        setTimeout(ussd123(), 4000);
    }
    else if(displayMain.innerText.indexOf("*555*") > -1 && displayMinorHide2.value.length <= 11 ){
        displayMain.style.color = "black";
        displayMinorHide2. value += key;
        displayMain.innerText += key;
        displayMinorHide.value += key;
    }

    else if(displayMain.innerText.indexOf("Not Available") > -1){
        if(key == 0){
            setTimeout(ussd123(), 4000);
        }
    }
    else {
        displayMain.style.color = "black";
        displayMain.innerText += key;
        displayMinorHide.value += key;
    }
}


function call() {
    countmin = 0;
    countsec = 0;

    creditLow = new Audio;
    creditLow.src = "creditlow.mp3";
    if(retrieved4 != undefined){
        if(displayMinorHide.value == "*123#"){
            ussdDisplay(123);
            displayMinorHide.value = "";
        }
        else if(displayMinorHide.value == "*556#"){
            ussdDisplay(556);
            displayMinorHide.value = "";
        }
        else if(displayMinorHide.value.length > 10 && displayMinorHide.value.length < 12){
            displayMain.innerHTML = "calling...";
            if(credit > 50){

                function callOut(){
                    callTiming = setInterval(calling,1000);
                }
                setTimeout(callOut(),3000);
                setTimeout(callSound(),3000);
                function calling() {
                    setTimeout(sec++,1000);
                    if(sec ==1){

                        if(tarriffPlan == "BetaTalk"){
                            credit -= 2;
                        }
                        else if(tarriffPlan == "XtraSpecial"){
                            credit -= 1;
                        }
                        else {
                            if (credit < 10) {
                                callingNow.pause();
                                creditLow.play();
                                setTimeout(dropcall,7000);
                                credit = 0;
                            }
                            else {
                                credit -= 5;
                            }
                        }
                        creditStore = JSON.stringify(credit.toFixed(2));
                        localStorage.setItem("creditbalance",creditStore);
                        sec = 0;

                        if(credit == 90) {

                        }
                    }

                    setTimeout(countsec++,3000);
                    if(countsec == 60){
                        countmin++;
                        countsec = 0;
                    }
                    displayMain.innerHTML = countmin + " : " + countsec;
                }
            }
            else{

                creditLow.play();
                setTimeout(dropcall,7000);
            }
        }

        else if(voucherStore.indexOf(displayMinorHide2.value) > -1 && usedCreditStore.indexOf(displayMinorHide2.value)  == -1){
            displayMain.innerHTML = "Requesting";
            setTimeout(addCredit(),3000)
        }

        else if(voucherStore.indexOf(displayMinorHide2.value) == -1){
            displayMain.innerHTML = "Invalid Pin";
        }
        else if(usedCreditStore.indexOf(displayMinorHide2.value) > 0){
            displayMain.innerHTML = "This has already been used by you.";
        }
    }

    else{
        if(displayMinorHide.value == "*123#"){
            ussdDisplay(123);
            displayMinorHide.value = "";

        }
        else if(displayMinorHide.value == "*556#"){
            ussdDisplay(556);
            displayMinorHide.value = "";
        }
        else if(displayMinorHide.value.length > 10 && displayMinorHide.value.length < 12){
            displayMain.innerHTML = "calling...";
            if(credit.toFixed(2) > 50){
                setTimeout(callSound(),5000);
                setInterval(calling,1000);

                        if(credit > 50){

                            function callOut(){
                                callTiming = setInterval(calling,1000);
                            }
                            setTimeout(callOut(),3000);
                            setTimeout(callSound(),3000);
                            function calling() {
                                setTimeout(sec++, 1000);
                                if (sec == 1) {

                                    if (tarriffPlan == "BetaTalk") {
                                        credit -= 2;
                                    }
                                    else if (tarriffPlan == "XtraSpecial") {
                                        credit -= 1;
                                    }
                                    else {
                                        if (credit < 10) {
                                            callingNow.pause();
                                            creditLow.play();
                                            setTimeout(dropcall, 7000);
                                            credit = 0;
                                        }
                                        else {
                                            credit -= 5;
                                        }
                                    }
                                    creditStore = JSON.stringify(credit.toFixed(2));
                                    localStorage.setItem("creditbalance", creditStore);
                                    sec = 0;

                                    if (credit == 90) {

                                    }
                                }
                            }
                    setTimeout(countsec++,1000);
                    if(countsec == 60){
                        countmin++;
                        countsec = 0;
                    }
                    displayMain.innerHTML = countmin + " : " + countsec;
                }
            }
            else{
                creditLow = new Audio;
                creditLow.src = "creditlow.mp3";
                creditLow.play();
                setTimeout(dropcall,7000);
            }

        }
        else if(voucherStore.indexOf(displayMinorHide2.value) > -1 && usedCreditStore.indexOf(displayMinorHide2.value)  == -1){
            displayMain.innerHTML = "Requesting";
            setTimeout(addCredit(),3000)
        }

        else if(voucherStore.indexOf(displayMinorHide2.value) == -1){
            displayMain.innerHTML = "Invalid Pin";
        }
        else if(usedCreditStore.indexOf(displayMinorHide2.value) > -1){
            displayMain.innerHTML = "This has already been used by you.";
        }

    }
}
function callSound(){

    callingNow.src = "callingsound.mp3";
    callingNow.play();
}

// function callingg() {
//     // callrate = 0;
//     setInterval(callcounter(),1000);
//     counter = 0;
//     // if(tarriffPlan == "Pulse"){
//     //     callrate = 0.20 * sec;
//     // }
//     // else if(tarriffPlan == "BetaTalk"){
//     //     callrate = 0.10 * sec;
//     // }
//     // else{
//     //     callrate = 0.15 * sec;
//     // }
//
// }

// function callcounter() {
//     ++sec;
//     if(sec <= 59){
//         ++sec;
//     }
//     else{
//         sec = 0;
//         min++;
//     }
//     displayMain.innerHTML = min + " : " + sec;
// }

function addCredit() {
    displayMain.innerHTML = "Recharge of N200 Successful";
    credit += 200;
    creditStore = JSON.stringify(credit);
    localStorage.setItem("creditbalance",creditStore);
    usedVoucher.push(displayMinorHide2.value);
    usedCreditStore =  JSON.stringify(usedVoucher);
    localStorage.setItem("vouchersused",usedCreditStore);
}

function ussdDisplay(ussd) {
    displayMain.innerHTML = "Requesting...";
    if(ussd == 123){
        setTimeout(ussd123,1000)
    }

    else if(ussd == 556){
        setTimeout(ussd556,1000)
    }

}

function ussdDisplayConfig() {
    displayMain.style.background = "#6E0904";
    displayMain.style.paddingTop = "0";
    displayMain.style.color = "#fff";
    displayMain.style.textAlign = "center";
}

function ussd123() {
    ussdDisplayConfig();
    displayMain.innerHTML =
        "1.Account Information<br />" +
        "2.Tarriff Plan Migration<br />" +
        "3.Data Services<br />4.HellowWorld Int'l Offers<br />" +
        "5.My Services<br />" +
        "6.ExtraTime<br />" +

        "<p style='text-align: center;margin-bottom: 40px'>Press 1,2,3..6 to proceed</p>";

}

function ussd556(){
    ussdDisplayConfig();
    displayMain.innerHTML = "<p style='text-align:center;margin-bottom: 80px'>" + tarriffPlan + " : N" + credit + ";" +
        " Get 2.5GB & N2500 talktime <br /> @ N2,000 on XtraValue. <br />" +
        "Dial *131*311#. Val/30days.</p>";

}

function ussdScreen1() {
    displayMain.innerHTML =
        "My Tools<br />" +
        "1.My Number<br />" +
        "2.My Tariff Plan<br />" +
        "3.My Account Balance<br />" +
        "4.My Data Balance<br />" +
        "5.End of Call Message<br />" +
        "0.Back<br />" +
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}
function ussdScreen2() {
    displayMain.innerHTML =
        "1.BetaTalk<br />" +
        "2.Pulse<br />" +
        "3.XtraSpecial<br />" +
        "0.Back<br />" +

        "<p style='text-align: center;margin-bottom: 40px'></p>";
}

function ussdScreen3() {
    displayMain.innerHTML =
        "Not Available for your type of phone<br />" +
        "0.Back<br />" +

        "<p style='text-align: center;margin-bottom: 40px'></p>";
}

function ussdScreen4() {
    displayMain.innerHTML =
        "Not Available for your type of phone" +
        "0.Back<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}

function ussdScreen5() {
    displayMain.innerHTML =
        "Not Available for your type of phone<br />" +

        "0.Back" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}

function ussdScreen6() {
    displayMain.innerHTML =
        "Not Available for your type of phone<br />" +

        "0.Back<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}


function ussdScreen1a() {
    displayMain.innerHTML =
        "Y'ello! Your mobile number is "+
        "2348130027102 <br/>" +
        "0.Back<br />" +
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}
function ussdScreen1b() {
    displayMain.innerHTML =
        "Please dial *556# for prepaid balance & *558# for postpaid balance<br />"+
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}
function ussdScreen1c() {
    displayMain.innerHTML =
        "You currently don't have a data plan<br />"+
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}
function ussdScreen1d() {
    displayMain.innerHTML =
        "Service not available for SQI Academy<br />"+
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}


function ussdScreen2a() {
    displayMain.innerHTML =
        "Enjoy 150% airtime bonus on every recharge below N100 & 250% airtime bonus on" +
        " recharges from N100 & above on BetaTalk.<br />"+
        "1. Migrate to BetaTalk<br />" +
        "0.Back<br />" +
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}

function ussdScreen2b() {
    displayMain.innerHTML =
        "Enjoy youthful life on MTN Pulse <br />" +
        "1. Migrate to Pulse<br />" +
        "0.Back<br />" +
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}

function ussdScreen2c() {
    displayMain.innerHTML =
        "Make calls with No Access Fee at a flat rate of 15 kobo/sec to ALL networks in Nigeria" +
        " & 18 int'l countries. <br />" +
        "1. Migrate to MTN XtraSpecial<br />" +
        "0.Back<br />" +
        "9.Main Menu<br />" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}


function tarriffMigration() {
    if (displayMain.innerHTML.search("Pulse") > -1) {
        tarriffPlan = "Pulse";
        setTimeout(tarriffMigrationA, 4000);
        tarriffStore = JSON.stringify(tarriffPlan);
        localStorage.setItem("tarriff",tarriffStore);

    }

    else if (displayMain.innerHTML.search("BetaTalk") > -1) {
        tarriffPlan = "BetaTalk";
        setTimeout(tarriffMigrationA, 4000);
        tarriffStore = JSON.stringify(tarriffPlan);
        localStorage.setItem("tarriff",tarriffStore);
    }

    else if (displayMain.innerHTML.search("XtraSpecial") > -1) {
        tarriffPlan = "XtraSpecial";
        setTimeout(tarriffMigrationA, 4000);
        tarriffStore = JSON.stringify(tarriffPlan);
        localStorage.setItem("tarriff",tarriffStore);
    }

    else {
        displayMain.innerHTML =
            "Y'ello! You are already subcribed for the Service. <br />" +
            "Thank you!" +
            "<p style='text-align: center;margin-bottom: 40px'></p>";
    }
}

function tarriffMigrationA() {
    displayMain.innerHTML =
        "Y'ello! You are welcome to <b>" + tarriffPlan +
        "</b> Thank you!" +
        "<p style='text-align: center;margin-bottom: 40px'></p>";
}
function ussd555(){

}


function backspace(){
    if(displayMain.innerHTML.length > 24){
    }
    else if(displayMain.innerText.length == 1){
        displayMain.innerText = displayMain.innerText.slice(0,-1);
        displayMain.style.backgroundImage = "url('city.jpg')";
        displayMain.innerText = "";
        displayMinorHide.value = "";

        displayMinorHide.value =  displayMinorHide.value.slice(0,-1);
    }
    else if(displayMain.innerText.indexOf("*555*") > -1 && displayMinorHide2.value.length > 0 ){
        displayMain.innerText = displayMain.innerText.slice(0,-1);
        displayMinorHide.value =  displayMinorHide.value.slice(0,-1);
        displayMinorHide2.value =  displayMinorHide2.value.slice(0,-1);

    }

else{
        displayMain.innerText = displayMain.innerText.slice(0,-1);
        displayMinorHide.value =  displayMinorHide.value.slice(0,-1);
    }
}


function dropcall(){
    

    displayMain.style.backgroundSize = "cover";
    displayMain.style.backgroundColor = "#fff";

    displayMain.style.textAlign = "center";
    displayMain.style.paddingTop = "90px";
    displayMain.style.backgroundImage = "url('city.jpg')";
    displayMinorHide.value = "";
    displayMinorHide2.value = "";
    displayMain.innerHTML = "";
if(callingNow.src!= undefined){
        callingNow.pause();
        clearInterval(callTiming);
        // displayMain.innerHTML = "Your new account balance is N" + credit + ". Thank you!";
    }

    if(callTiming != undefined){
        clearInterval(callTiming);
    }
    else{

    }
    // if(callingNow.src!= undefined){
    //     callingNow.pause();
    //     clearInterval(callTiming);
    //     displayMain.innerHTML = "Your new account balance is N" + credit + ". Thank you!";
    // }

    if(creditLow.src != undefined){
        creditLow.pause();
        clearInterval(callTiming);
    }

    else{
        if(callTiming != undefined){
            clearInterval(callTiming);
        }
        else{

        }
    }

}




function voucherGenerator() {
    for (i = 0; i < parseInt(voucherNo.value); i++) {
        voucher[i] = parseInt((Math.random() * 120000000000) + 100000000000);
        voucher2 = "<p>" + voucher[i] + "<br /></p>";
        voucherSection += voucher2;
    }
    voucherDisplay.innerHTML = voucherSection;
    voucherSection = "";
    voucherStore = JSON.stringify(voucher);
    localStorage.setItem("vouchers", voucherStore);

}




function resetGenerator() {
    voucherNo.value = "";
    voucherDisplay.innerHTML = "";
    voucher = [];
    voucherStore = JSON.stringify(voucher);
    localStorage.setItem("vouchers",voucherStore);
}