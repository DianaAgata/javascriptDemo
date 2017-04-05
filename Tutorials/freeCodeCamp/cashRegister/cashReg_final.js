//freeCodeCamp exactChange challenge

var Cash=function(nameP, valueP){
    this.name=nameP;
    this.value=valueP;
    this.billValue;
    this.units;

    this.calcBillVal=function(bill){
    var typeVal=0;
      switch (bill) {
        case 'PENNY' : typeVal=0.01; break;
        case 'NICKEL' : typeVal=0.05; break;
        case 'DIME' : typeVal=0.10; break;
        case 'QUARTER' : typeVal=0.25; break;
        case 'ONE' : typeVal=1.00; break;
        case 'FIVE' : typeVal=5.00; break;
        case 'TEN' : typeVal=10.00; break;
        case 'TWENTY' : typeVal=20.00; break;
        case 'ONE HUNDRED' : typeVal=100.00; break;
        default : billValue=0.00; break;
    }

    return typeVal;
  };


};


function roundNumber(number, digits) {
            var multiple = Math.pow(10, digits);
            var rndedNum = Math.round(number * multiple) / multiple;
            return rndedNum;
        };

function checkCashRegister(price, cash, cid) {

var change=cash-price;
console.log("Change is: " + change);
var unitaryChange=Math.floor(change);
console.log("Unitary Change: " + unitaryChange);

var subUnitaryChange=(change-unitaryChange);
subUnitaryChange=roundNumber(subUnitaryChange,2); ///this is necessary because of the way JS handels floading points
console.log("Subunitary Change: " + subUnitaryChange);

var totalCashinDrawer=0;

var i;
var cashArr=[];
var unitaryChangeArr=[];
var subUnitaryChangeArr=[];
var changeArr=[];

for(i=0;i<cid.length;i++){
   cashArr.push(new Cash(cid[i][0], cid[i][1]));
   cashArr[i].billValue=cashArr[i].calcBillVal(cid[i][0]);
   cashArr[i].units=Math.floor(cashArr[i].value/ cashArr[i].billValue);
   totalCashinDrawer+=cid[i][1];
}

if (change===totalCashinDrawer){
  return "Closed";
}

console.log(cashArr);


if (unitaryChange>1){ //we have to treat subunitary values differentry;
  for(i=cashArr.length-1; i>=4; i--){

        if(unitaryChange >= cashArr[i].billValue){
          var unitartyToPush=[];
            unitartyToPush[0]=cashArr[i].name;
            unitartyToPush[1]=Math.min((Math.floor(unitaryChange/cashArr[i].billValue) * cashArr[i].billValue) , cashArr[i].value);
            console.log("Pushed: " + unitartyToPush);
            unitaryChangeArr.push(unitartyToPush);
            unitaryChange-=unitartyToPush[1];
          console.log("unitaryChange is now :"+unitaryChangeArr);
        }
  }
}

console.log("Remaining Unitary unitaryChange: " + unitaryChangeArr + "\n------------");

if (subUnitaryChange==0){
  return "Closed";
}else{
  for(i=3; i>=0; i--){
      if(subUnitaryChange >= cashArr[i].billValue){
        var subUnitaryToPush=[];
          subUnitaryChange=roundNumber(subUnitaryChange,2);
          subUnitaryToPush[0]=cashArr[i].name;
          subUnitaryToPush[1]=Math.min((Math.floor(subUnitaryChange/cashArr[i].billValue) * cashArr[i].billValue) , cashArr[i].value);
          console.log("Pushed: " + subUnitaryToPush);
          subUnitaryChangeArr.push(subUnitaryToPush);
          subUnitaryChange-=subUnitaryToPush[1];
      }
  }
}

console.log("Remaining Subunitary change: "+subUnitaryChangeArr + "\n------------");



if(subUnitaryChange!==0 || unitaryChange!==0){
  return "Insufficient Funds";
}



changeArr=unitaryChangeArr.concat(subUnitaryChangeArr);

console.log("FINAL change arr is : " + changeArr);

return changeArr;
}


// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
