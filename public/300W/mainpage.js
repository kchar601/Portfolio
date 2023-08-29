function alertTest(alert){
    if(alert == "null"){
        document.getElementById("alert").style.display = "none";
        document.getElementById("content").style.height = "";
    }
    else{
    $('#alert').append(alert)
    }
}

function closeAlert(){
    document.getElementById("alert").style.display = "none";
}

function testPrefName(fName, pName){
    if(pName == "null"){
        return fName;
    }
    else{
        return pName;
    }
}

function loadClass(oneUser){
    for(i=0; i<oneUser.class.length; i++){
        const oneClass = oneUser.class[i];
        const newBtn = $("<button id=\"classList" + i + "\" class=\"d-flex m-0 p-0 btn-group-vertical flex-column ms-2 me-2 rounded\" role=\"group\"></button>");
        $('#content').append(newBtn);
        const classTitle = $("<button id=\"classTitle" + i +"\"class=\"btn btn-light d-flex justify-content-center mb-1 rounded-1 classTitle\"><h5>" + oneClass.name + " <h4 class=\"position-static top-0 end-0 pe-2\">" + oneClass.grade + "</h4></h5></button>");
        const classInfo = $("<button id=\"classInfo" + i + "\" class=\"btn btn-white d-flex justify-content-center rounded-1 classList\"><div class=\"fs-6 text-wrap flex-column fw-normal\">" + "Section: " + oneClass.section + "<br/>" + oneClass.prof + "<br/>" + oneClass.time + "<br/>" + oneClass.bldg +"</button>")
        $('#classList' + i).append(classTitle);
        $('#classList' + i).append(classInfo);
    }  
}

function checkForAlerts(oneUser){
    if(oneUser.lionCash < 5.00 && oneUser.alerts == "null"){
        oneUser.alerts = ("Your Lioncash balance is low.")
    }
    else if(oneUser.mealPlan < 5.00 && oneUser.alerts == "null"){
        oneUser.alerts = ("Your Meal Plan balance is low.")
    }
    if(oneUser.lionCash < 5.00 && oneUser.alerts !== "Your Lioncash balance is low."){
        oneUser.alerts = oneUser.alerts + ("&nbsp;Your Lioncash balance is low.")
    }
    else if (oneUser.mealPlan < 5.00 && oneUser.alerts !== "Your Meal Plan balance is low."){
        oneUser.alerts = oneUser.alerts + ("&nbsp;Your Meal Plan balance is low.")
    }
}

function loadUser(oneUser){
    console.log(oneUser);
    checkForAlerts(oneUser);
    alertTest(oneUser.alerts);
    $('#constUser').append(oneUser._id);
    $('#welcome').append(testPrefName(oneUser.studentFName, oneUser.studentPName) + "!");
    popOverthing(oneUser);
    loadClass(oneUser);
}

function sortUser(userList){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('usr')
    for (let i = 0; i<userList.length; i++){
        if(userList[i]._id == username){
            loadUser(userList[i]);
        }
    }
}


$(document).ready(function(){
    const userList = $.get('/getList', sortUser);
}
)

function popOverthing(oneUser){
    console.log (oneUser._id + " " + oneUser.studentFName);
    var lionCash = (oneUser.lionCash).toFixed(2);
    var mealPlan = (oneUser.mealPlan).toFixed(2);
    if(oneUser.studentPName!=="null"){
        var pName = " \"" + oneUser.studentPName + "\""; 
    }
    else{
        var pName = " ";
    }
    $( '[data-bs-toggle="popover"]').popover({
    html: true,
    placement: 'bottom',
    offset:"10,20",
    trigger: 'click',
    title: "<h3>" + oneUser._id + "</h3>",
    content: "<h6>" + oneUser.studentNumber + "<br/>" + oneUser.studentFName + pName + oneUser.studentLName 
    + "<br/>" + oneUser.studentEmail + "<br/>LionCash: $" + lionCash + "<br/>Meal Plan: $" + mealPlan
    })
}
