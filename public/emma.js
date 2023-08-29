function validateNumber(){
    const num = document.getElementById("numberInput").value;
    console.log(num);
    $("#newimg").empty();
    const img = $("<img src=\"./images/emma/"+ num + ".JPG\" style=\"width:400px;\">")
    $("#newimg").append(img);
}

function randomNumber(){
    const num = Math.floor(Math.random() * 62);    
    console.log(num);
    $("#newimg").empty();
    const img = $("<img src=\"./images/emma/"+ num + ".JPG\" style=\"width:400px;\">")
    $("#newimg").append(img);
}