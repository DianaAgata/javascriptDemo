//freeCodeCamp update Library challange

function reverseInnerArray(arr){
    var i;
    for (i=0; i<arr.length; i++){
        arr[i].reverse();
    }
    return arr;
}

function toObject(arr){
    var i;
    var obj={};
    var propery='';
    var value=0;
    for(i=0;i<arr.length;i++){
        propery=arr[i][0];
        value=arr[i][1];
        obj[propery]=value;
    }

    return obj;
}

function objecToSortedArray(obj){
    var i;
    var propArr=[];
    var finalArr=[];

    for(var keys in obj){
        propArr.push(keys);
    }
    propArr=propArr.sort();

    for(i=0; i<propArr.length; i++){
        var toPush=[];
        toPush[0]=propArr[i];
        toPush[1]=obj[propArr[i]];
        finalArr.push(toPush);
    }

    return finalArr;
}

function updateInventory(arr1, arr2) {
    var i=0;

    arr1=reverseInnerArray(arr1);
    arr2=reverseInnerArray(arr2);
    var obj1=toObject(arr1);
    var obj2=toObject(arr2);

    console.log(arr1);
    console.log("------------------------");
    console.log(arr2);
    console.log("\n=======================\n");
    console.log(obj1);
    console.log("------------------------");
    console.log(obj2);

    for(var key in obj2){
        if(obj1.hasOwnProperty(key)){
            obj1[key]=obj2[key] + obj1[key];
        }else{
            obj1[key]=obj2[key];
        }

    }
    console.log("\n______________________\n");

    console.log(obj1);

    var result=reverseInnerArray(objecToSortedArray(obj1));

    console.log("----------  "+ result +"    -------------");

    return result;


}

// Example inventory lists
console.log(updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]));
