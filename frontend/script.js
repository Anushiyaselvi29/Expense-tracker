let total = 0;

function addExpense(){

let title=document.getElementById("title").value;

let amount=parseInt(document.getElementById("amount").value);

let category=document.getElementById("category").value;

if(title=="" || isNaN(amount))
{
alert("Enter Details");
return;
}

let li=document.createElement("li");

li.innerHTML=title+" - "+category+" - ₹"+amount;

document.getElementById("list").appendChild(li);

total+=amount;

document.getElementById("total").innerHTML=total;

}