/**
 * This script contains the functions to withdraw, deposit, buy or sell in three currencies: 
 * GHS, GBP , USD
 * The script interacts with an HTML doc to allow the user make changes and also view balances
 */



// Initialize Balances
clientBalances = {USD:10,GHS:10,GBP:10};
companyBalances = {USD:1000, GHS:1000, GBP:1000};
exchangeRates = {GSH2USD: 0.17, GHS2GBP:0.12, GBP2USD:1.42};
soldBought = {USD:0,GHS:0,GBP:0}
console.log("Innit");// console output for check


// Access Company Balances HTML
const comBlUSD = document.querySelector('#cmp-usd');
const comBlGHS = document.querySelector('#cmp-ghs');
const comBlGBP = document.querySelector('#cmp-gbp');

// Access Client Balances HTML
const cltBlUSD = document.querySelector('#clt-usd');
const cltBlGHS = document.querySelector('#clt-ghs');
const cltBlGBP = document.querySelector('#clt-gbp');

// Access Sold/Bought Balances HTML
const bsUSD = document.querySelector('#bs-usd');
const bsGHS = document.querySelector('#bs-ghs');
const bsGBP = document.querySelector('#bs-gbp');

// Assign DOM Elements to variables
const amUserCurrency = document.querySelector('#ac_select'); // access currency selector for deposit/withdraw
const amUserAmount = document.querySelector('#ac_amount'); // access amount for deposit/withdraw
const userBaseCurr = document.querySelector('#base_currency'); // access base currency for sell/buy
const userQuoteCurr = document.querySelector('#quote_currency'); // access quote currency for sell/buy
const bsUserAmount = document.querySelector('#bs-amount'); // access sell/buy ammount


// ---------------------------------------------------------------------------------------------------------->
//  SETTERS FOR ON PAGE LOAD
// ---------------------------------------------------------------------------------------------------------->

window.onload = (event) => {
    console.log('Page is fully loaded');

    // Load company balances
    comBlUSD.textContent =  companyBalances['USD'];
    comBlGHS.textContent =  companyBalances['GHS'];
    comBlGBP.textContent =  companyBalances['GBP'];

    // Load client balances
    cltBlUSD.textContent =  clientBalances['USD'];
    cltBlGHS.textContent =  clientBalances['GHS'];
    cltBlGBP.textContent =  clientBalances['GBP'];
    console.log('Loaded both company and client balances');// console output for check

    // Load Sell/Buy balances
    bsUSD.textContent =  soldBought['USD'];
    bsGHS.textContent =  soldBought['GHS'];
    bsGBP.textContent =  soldBought['GBP']; 
    console.log('Loaded buy/sell balances');// console output for check
};




// ---------------------------------------------------------------------------------------------------------->
//  EVENT LISTENERS FOR TRADE FUNCTION BUTTONS
// ---------------------------------------------------------------------------------------------------------->

const selectDeposit = document.querySelector('#btnDeposit'); // access deposit button
selectDeposit.addEventListener('click',depositListener); // create an event listener for clicking button

// Deposit Listener called when deposit button is clicked to perform validation and then  allow user deposit
function depositListener(){

    console.log("Deposit Amount Inputted: "+ amUserAmount.value);
    console.log("Deposit currency selected: "+ amUserCurrency.value);

    // Perform validation Checks
    if(amUserCurrency.value === ''){ // Make sure amount is not empty
        alert("No Currency Selected! ")
        return amUserAmount.value = ''; 
    }
    if (amUserAmount.value <  0.01 || amUserAmount.value > 10000) { // make sure extremely small or large numbers are not deposited
        alert("Enter an amount greater than 0.01 and lesser than 10000");
        return amUserAmount.value = '';
    }
    else if (amUserAmount.value == 0 || amUserAmount.value < 0) { // make sure negative numbers are not deposited
        alert("You are are trying to withdraw nothing or a negative number");
        return amUserAmount.value = '';
    }
    else{// Run Deposit function if all checks are completely fine
        console.log("Deposit Function is Valid");
        deposit(amUserCurrency.value, amUserAmount.value);// call to deposit function
    }
}
// ---------------------------------------------------------------------------------------------------------->


const selectWithdraw = document.querySelector('#btnWithdraw'); // access to withdraw button
selectWithdraw.addEventListener('click',withdrawListener); // create event listener for withdraw button

// Withdraw Listener called when withdraw button is clicked to perform validation and then allow user withdraw
function withdrawListener(){

    console.log("Withdraw Amount Inputted: "+ amUserAmount.value);// console output for check
    console.log("Withdraw currency selected: "+ amUserCurrency.value); // console output for check

      // Perform validation Checks
    if(amUserCurrency.value === ''){// Make sure amount is not empty
        alert("No Currency Selected! ")
        return amUserAmount.value = ''; 
    }
    else if (amUserAmount.value == 0 || amUserAmount.value < 0) {
        alert("You are are trying to withdraw nothing or a negative number"); // make sure negative numbers are not withdrawn
        return amUserAmount.value = '';

    } else { // Run Withdraw function if all checks are completely fine
        console.log("Withdraw function is Valid");
        withdraw(amUserCurrency.value, amUserAmount.value); // call to withdraw function
    }
}
// ---------------------------------------------------------------------------------------------------------->


const selectBuy = document.querySelector('#btnBuy'); // access buy button 
selectBuy.addEventListener('click',buyListener); // create event listener for buy button

// Buy Listener called when buy button is clicked to perform validation and then allow user buy
function buyListener(){

    console.log("Base currency selected: "+ userBaseCurr.value);// console output for check
    console.log("Quote currency selected: "+ userQuoteCurr.value); // console output for check

    if(userQuoteCurr.value === '' || userBaseCurr === '' || bsUserAmount.value == 0){ // make sure values are not empty
        alert("No Currency or Amount Selected! ");
        return bsUserAmount .value = ''; 
    }
    else{ // Run buy function if all checks are completely fine
        buy(userBaseCurr.value,userQuoteCurr.value,bsUserAmount.value);

    }
}
// ---------------------------------------------------------------------------------------------------------->


const selectSell = document.querySelector('#btnSell');  // access sell button 
selectSell.addEventListener('click',sellListener); // create event listener for sell button

// Sell Listener called when sell button is clicked to perform validation and then allow user sell
function sellListener(){
    console.log("Base currency selected: "+ userBaseCurr.value);// console output for check 
    console.log("Quote currency selected: "+ userQuoteCurr.value);// console output for check

    if(userQuoteCurr.value === '' || userBaseCurr === '' || bsUserAmount.value == 0){ // make sure values are not empty
        alert("No Currency or Amount Selected! ");
        return bsUserAmount .value = ''; 
    }
    else{ // Run sell function if all checks are completely fine
        sell(userBaseCurr.value,userQuoteCurr.value,bsUserAmount.value);
    } 
}
// ---------------------------------------------------------------------------------------------------------->


const selectReset = document.querySelector('#btnReset'); // access reset button
selectReset.addEventListener('click',resetListener); // create event listener for reset button

// Function to reset all balances to the default
function resetListener(){

    console.log("Resetting balances");// console output for check
    clientBalances = {USD:10,GHS:10,GBP:10}; // reset client balances
    companyBalances = {USD:1000, GHS:1000, GBP:1000};  // reset company balances
    exchangeRates = {GSH2USD: 0.17, GHS2GBP:0.12, GBP2USD:1.42};  // reset rates balances
    soldBought = {USD:0,GHS:0,GBP:0};  // reset sold/bought balances
    updateViewBalances();  // update balance views on page after resetting

}



// ---------------------------------------------------------------------------------------------------------->
//  DEFINED TRADE FUNCTIONS
// ---------------------------------------------------------------------------------------------------------->


/**
 * 
 * @function withdraws specific amount from balances based on currency
 * @param {*} currency currency to withdraw amount in
 * @param {*} amount  amount to be withdrawn
 * @returns true / false on success or failure of withdraw
 */

 function withdraw(currency, amount){
    
    amount = parseFloat(amount); // convert amount to float
    
    if(currency in clientBalances){ // check if currency exists
        if(currency === "GHS") { // When currency is GHS
            if(amount >  clientBalances['GHS']) { // Can't withdraw amounts larger than balance
                alert("You are trying to withdraw more than you have");
                console.log("ERROR IN WITHDRAW - GHS>");// console output for check
                return false;
            }
            else{ //allow GHS withdrawal if amount is smaller than balance
                clientBalances['GHS'] = clientBalances['GHS'] - amount;
                companyBalances['GHS'] = companyBalances['GHS'] - amount;
                console.log("WITHDRAW SUCCESSFUL");// console output for check
            }
        }

        else if(currency === "USD"){ // When currency is USD
            if(amount >  clientBalances['USD']){// Can't withdraw amounts larger than balance
                alert("You are trying to withdraw more than you have");
                console.log("ERROR IN WITHDRAW - USD>");// console output for check
                return false;
            }
            else{//allow USD withdrawal if amount is smaller than balance
                clientBalances['USD'] = clientBalances['USD'] - amount;
                companyBalances['USD'] = companyBalances['USD'] - amount;
                console.log("WITHDRAW SUCCESSFUL");// console output for check
            }
        }
    
        else if(currency === "GBP"){ // When Currency is GBP
            if(amount >  clientBalances['GBP']){// Can't withdraw amounts larger than balance
                alert("You are trying to withdraw more than you have");
                console.log("ERROR IN WITHDRAW - GBP>");// console output for check
                return false;
            }
            else{//allow GBP withdrawal if amount is smaller than balance
                clientBalances['GBP'] = clientBalances['GBP'] - amount;
                companyBalances['GBP'] = companyBalances['GBP'] - amount;
                console.log("WITHDRAW SUCCESSFUL");// console output for check
            }
        }

        updateViewBalances(); // Update view balances after withdrawal 
        console.log("Updated View Balances");// console output for check
        console.log(clientBalances); // console output for check
        console.log(companyBalances); // console output for check;
        return true;
    }

    else { // return false when there's a wrong currency input
        console.log("There's no such currency");// console output for check
        return false;
    }
}
// ---------------------------------------------------------------------------------------------------------->


/**
 * 
 * @function deposits specific amount into balances based on currency
 * @param {*} currency  currency to deposit in
 * @param {*} amount   amount to deposit
 * @returns true/ false on success or failure of deposit
 */
 function deposit(currency, amount){
    
    amount = parseFloat(amount); // convert amount to float

    if(currency in clientBalances){ //check if currency exists
        if(currency === "GHS") { // When currency is GHS
            clientBalances['GHS'] = clientBalances['GHS'] + amount;     // add amount to clientBalances
            companyBalances['GHS'] = companyBalances['GHS'] + amount;     // add amount to companyBalances
        }

        else if(currency === "USD"){ // When currency is USD
            clientBalances['USD'] = clientBalances['USD'] + amount;
            companyBalances['USD'] = companyBalances['USD'] + amount;
        }

        else if(currency === "GBP"){ // When currency is GBP
            clientBalances['GBP'] = clientBalances['GBP'] + amount;
            companyBalances['GBP'] = companyBalances['GBP'] + amount;
        }

        updateViewBalances(); // Update view of balances after deposit
        console.log("Updated View Balances");
        console.log(clientBalances);// console output for check
        console.log(companyBalances);// console output for check
        return true;
    }
    else { // return false when currency does not exist
        console.log("There's no such currency"); // console output for check
        return false;
    }
}
// ---------------------------------------------------------------------------------------------------------->

/**
 * 
 * @param {*} base  base currency to sell in 
 * @param {*} quote  quote amount to sell 
 * @param {*} baseAmount  base amount to sell
 * @returns  amount to buy
 */
 function buy(base,quote,quoteAmount){
    
    var amount = 0; // store calculated buy amount in quote currency
    quoteAmount = parseFloat(quoteAmount); // convert amount to float

    if(base === "USD" && quote ==="GHS"){  // USD to GHS
        amount = quoteAmount / exchangeRates['GSH2USD'];
    }
    else if(base === "USD" && quote ==="GBP" ){ // USD to GBP
        amount = quoteAmount / exchangeRates['GBP2USD']; 
    }
    else if(base === "GHS" && quote === "USD"){//GHS to USD
        amount = quoteAmount * exchangeRates['GSH2USD'];
    }
    else if(base === "GHS" && quote === "GBP"){// GHS to GBP
        amount = quoteAmount * exchangeRates['GHS2GBP'];
    }
    else if(base === "GBP" && quote === "USD"){// GBP to USD
        amount = quoteAmount * exchangeRates['GBP2USD'];
    }
    else if(base === "GBP" && quote === "GHS"){// GBPto GHS
        amount = quoteAmount / exchangeRates['GHS2GBP'];
    }
    else if(base === "USD" && quote === "USD"){// USD to USD
        amount = quoteAmount; // same amount 
    }
    else if(base === "GHS" && quote === "GHS"){// GHS to GHS
        amount = quoteAmount;// same amount
    }
    else if(base === "GBP" && quote === "GBP"){// GBP to GBP
        amount = quoteAmount; // same amount
    }

    console.log("Buy Successful!");// console output for check
    soldBought[quote] = amount.toFixed(2);
    console.log(soldBought[quote]);// console output for check

    alert("You are buying: "+soldBought[quote]+quote);
    updateViewBalances(); // Update balance views after buying
    return amount;
}
// ---------------------------------------------------------------------------------------------------------->


/**
 * 
 * @param {*} base  base currency to sell in 
 * @param {*} quote  quote amount to sell 
 * @param {*} baseAmount  base amount to sell
 * @returns  returns amount to sell
 */
 function sell(base,quote,baseAmount){
    var amount = 0;
    if(base === "USD" && quote ==="GHS"){
        amount = baseAmount / exchangeRates['GSH2USD'];
    }
    else if(base === "USD" && quote ==="GBP" ){
        amount = baseAmount / exchangeRates['GBP2USD']; 
    }
    else if(base === "GHS" && quote === "USD"){
        amount = baseAmount * exchangeRates['GSH2USD'];
    }
    else if(base === "GHS" && quote === "GBP"){
        amount = baseAmount * exchangeRates['GHS2GBP'];
    }
    else if(base === "GBP" && quote === "USD"){
        amount = baseAmount * exchangeRates['GBP2USD'];
    }
    else if(base === "GBP" && quote === "GHS"){
        amount = baseAmount / exchangeRates['GHS2GBP'];
    }
    else if(base === "USD" && quote === "USD"){
        amount = baseAmount;
    }
    else if(base === "GHS" && quote === "GHS"){
        amount = baseAmount;
    }
    else if(base === "GBP" && quote === "GBP"){
        amount = baseAmount;
    }

    console.log("Sell Successful!")// console output for check
    soldBought[quote] = amount.toFixed(2);
    console.log(soldBought[quote]);// console output for check
  
    alert("You are selling: "+soldBought[quote]+" "+quote);
    updateViewBalances();
    return amount;

}
// ---------------------------------------------------------------------------------------------------------->


/**
 * @function updates views of balances on page
 */
 function updateViewBalances(){
    // Update company Balances
    comBlUSD.textContent =  companyBalances['USD'];
    comBlGHS.textContent =  companyBalances['GHS'];
    comBlGBP.textContent =  companyBalances['GBP'];

    // Update client balances
    cltBlUSD.textContent =  clientBalances['USD'];
    cltBlGHS.textContent =  clientBalances['GHS'];
    cltBlGBP.textContent =  clientBalances['GBP']; 

    // Update balances
    bsUSD.textContent =  soldBought['USD'];
    bsGHS.textContent =  soldBought['GHS'];
    bsGBP.textContent =  soldBought['GBP']; 

}
// ---------------------------------------------------------------------------------------------------------->
