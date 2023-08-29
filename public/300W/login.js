function validateUsername(){
  const username = $('#usernameInput')[0].value;
  console.log(username);
  if (username == ""){
    alert("Please enter a valid username: \n    Example: abc1234");
    return false;
  }
  else{
    sendUsername(username);
  }
}

function sendUsername(username){
  window.location.replace("http://kchar.us/portfolio/mainpage.html?usr=" + username);
}
