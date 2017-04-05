//freeCodeCamp Cash register challange

var Cash=function(nameP, valueP){
    this.name=nameP;
    this.valueP=valueP;

    var calcBillVal=function(bill){

      var typeVal=0;

      switch (bill) {
        case 'PENNY' : billValue=0.01; break;
        case 'NICKEL' : billValue=0.05; break;
        case 'DIME' : billValue=0.10; break;
        case 'QUARTER' : billValue=0.25; break;
        case 'ONE' : billValue=1.00; break;
        case 'FIVE' : billValue=5.00; break;
        case 'TEN' : billValue=10.00; break;
        case 'TWENTY' : billValue=20.00; break;
        case 'ONE HUNDRED' : billValue=100.00; break;
        default : billValue=0.00; break;
    }

    return billValue;
  };

  this.billValue=calcBillVal(this.name);

};

function checkCashRegister(price, cash, cid) {
var changeVal = cash-price;
console.log('initial changeVal ammont: '+changeVal);
var i;
var cashArr=[];
var changeArr=new Array();
var billVallsArr=[];



for(i=0;i<cid.length;i++){
   //console.log('loop'+(i+1));
   cashArr.push(new Cash(cid[i][0], cid[i][1]));
   cashArr[i].units=Math.floor(cashArr[i].valueP/cashArr[i].billValue);
}

console.log(cashArr);
console.log('\n=============');
console.log("INITIAL change is "+changeVal+"\n=============\n");

 for(i=cashArr.length-1; i>=0; i--){

   console.log('\n---------------------------\n');

   console.log('currency valueP in ' + cashArr[i].name+ ' bill is ' + cashArr[i].valueP );


  if( changeVal >= cashArr[i].billValue ){

       console.log('NEW currency valueP in ' + cashArr[i].name+ ' bills is ' + cashArr[i].valueP );

      // if(paseInt(cashArr[i].valueP) < change) break;

       console.log('changeVal before substracting is ' + changeVal);

       var toPush=[];

       toPush[0] = cashArr[i].name;
       toPush[1] = Math.min(cashArr[i].valueP, changeVal - (changeVal % cashArr[i].billValue));

       console.log('pushed : ' + toPush);

       changeArr.push(toPush);
       changeVal -= Math.min(cashArr[i].valueP, changeVal - (changeVal % cashArr[i].billValue));

      console.log('changeVal AFTER substracting is ' + changeVal);

    }

 }


console.log(changeArr);

console.log('remaining changeVal ammont: ' + changeVal);

return changeArr;
}



checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);

//should return [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].
