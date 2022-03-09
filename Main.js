/**
 * To build Home Loan EMI Calculator
 */

/**
 *  takes the value from html element using document.getElementById
 * @returns loanAmount
 */
var getLoanAmount=()=>{return document.getElementById("loanAmount").value;}

/**
 * takes the value from html element using document.getElementById
 * @returns TenureInMonths
 */
var getTenureInMonths=()=>{return (document.getElementById("tenure").value)*12;}

/**
 *   takes the value from html element using document.getElementById
 * @returns MonthlyInterestRate
 */
var getMonthlyInterestRate=()=>{return (document.getElementById("interestRate").value)/12/100;}

//To load the html page with default values and produce output
function start(){
    calculateHomeLoan();
}

/**
 * calculate EMI using formula EMI=P*R*((1+R)^N/((1+R)^N-1))
 * @returns EMI
 */
function getEMI(){
    const monthlyInterest=getMonthlyInterestRate();
    const x=Math.pow(1+monthlyInterest,getTenureInMonths());
    return getLoanAmount()*monthlyInterest*(x/(x-1));
    
}
//Calculates totalamount to be paid for all over the tenure 
function TotalAmountPayable(){
    return (getEMI()*getTenureInMonths());
}
/**
 * Gives EMI,principal,interestAmount.amountPayable to html page
 */
function calculateHomeLoan(){
    const emi=getEMI().toFixed();
    const loanAmount=getLoanAmount();
    const totalAmountPayable=TotalAmountPayable();
    document.getElementById("EMI").innerHTML=emi;
    document.getElementById("principal").innerHTML=loanAmount;
    document.getElementById("interestAmount").innerHTML=(totalAmountPayable-loanAmount).toFixed();
    document.getElementById("amountPayable").innerHTML=totalAmountPayable.toFixed();
    getarray();
}
/**
 * Stores objects having month,openingBalance,EMI,monthlyInterestPaid,principalPaid,closingBalance as keys with their values
 * @returns array of objects 
 */
function getarray(){
let array=[];
let openAmount=TotalAmountPayable().toFixed();
let emi=getEMI().toFixed();
const tenureInMonths=getTenureInMonths();
const monthlyInterestRate=getMonthlyInterestRate();
for(i=1;i<=tenureInMonths;i++){
    let monthlyinterestPaid=(openAmount*(monthlyInterestRate)).toFixed();
    closingBalance=openAmount-emi;
    if(i==tenureInMonths){
    if(closingBalance<0){
        emi=emi-Math.abs(closingBalance);
        closingBalance=0;
    }
    else{
        emi=parseFloat(emi)+parseFloat(closingBalance);
        closingBalance=0;
    }
}
    
    array[i]={month:i,openingBalance:openAmount,EMI:emi,interestPaid:monthlyinterestPaid,principalPaid:emi-monthlyinterestPaid,closingBalance:closingBalance}
    openAmount=openAmount-emi;
    
}
printTable(array);
}
/**
 *  @param {*} a 
 * To display table on html page using parameter a
 */
function printTable(a){
var table="<table>";
table+="<tr>";
table+="<th>"+"Month"+"</th>";
table+="<th>"+"Opening Balance"+"</th>";
table+="<th>"+"EMI"+"</th>";
table+="<th>"+"Monthly Interest Paid"+"</th>";
table+="<th>"+"Monthly Principal Paid"+"</th>";
table+="<th>"+"Closing Balance"+"</th>";
table+="</tr>";
table+="<tr>";
for(var i=0;i<a.length;i++){
    table+="<tr>";
for(j in a[i]){
    table+="<td>"+a[i][j]+"</td>";
}
table+="</tr>";
}
table+="</table>";
document.getElementById("fetch").innerHTML=table;
}