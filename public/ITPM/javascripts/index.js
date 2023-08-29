function showPassword(){
    var x = $("#password")[0];
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function checkLogin(){
    var username = $("#username").val();
    var password = $("#password").val();
    if(username == "" || password == ""){
        $("#errormsg").text("Please enter a valid username and password");
        return false;
    }
    return true;
}

function darkMode(){
    if ($("body").hasClass("body-dark")) {
        $("body").addClass("body-light")
        .removeClass("body-dark");
        $("#dark-mode").addClass("fa-moon")
        .removeClass("fa-sun")
        .parent().addClass("btn-light")
        .removeClass("btn-dark");
        $("#form-wrapper").addClass("bg-light")
        .addClass("text-dark")
        .removeClass("bg-dark")
        .removeClass("text-light")
        .removeClass("border-dark")
        .addClass("border-light");
        $("#title").addClass("border-light")
        .removeClass("border-dark");
    }
    else {
        $("body").addClass("body-dark")
        .removeClass("body-light");
        $("#dark-mode").addClass("fa-sun")
        .removeClass("fa-moon")
        .parent().addClass("btn-dark")
        .removeClass("btn-light");
        $("#form-wrapper").addClass("bg-dark")
        .addClass("text-light")
        .removeClass("bg-light")
        .removeClass("text-dark")
        .removeClass("border-light")
        .addClass("border-dark");
        $("#title").addClass("border-dark")
        .removeClass("border-light");
    }

}

async function addResults(){
  var radioInputs = $('#individual-form input[type="radio"]');
  var checkedRadios = radioInputs.filter(':checked').map(function() {
      return { name: this.name, value: this.value };
    }).get();
    
  console.log('Number of checked radios:', checkedRadios.length);
  var results = checkedRadios.reduce(function(obj, radio) {
      obj["'" + $('#'+ radio.name).text() + "'"] = radio.value;
      return obj;
  }, {});
    
  console.log(results);
  const response = await fetch('/sendtoGPT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results)
  });
  const data = await response.json();
  const text = data.content;
  const dataFormatted = text.replace(/(\d+)\./g, '$1.\n');
  $("#results-text").text(dataFormatted);
  $("#individual-form").hide();
  $("#results").show();
}


function textCheck(z){
    var selector = "#" + z;
    if($(selector).prop('checked') == true){
        $(selector).prop('checked', false);
    }
    else{
        $(selector).prop('checked', true);
    }
}

function login(){
    if(checkLogin()){
    $("#login-form").hide();
    $("#criteria-form").show();
}
}

function addQuestions() {
    $.getJSON("../data/further-question.json", function(json) {
      json.forEach(line => {
        if ($("#" + line.id).prop("checked") == true) {
          $("#complexity-Xbox-questions").append("<h3>" + line.name + "</h3>");
          line.questions.forEach(question => {
            $("#complexity-Xbox-questions").append(
              "<label for='" + question.id + "' id='" + question.id + "'>" + question.question + "</label><br>" +
              "<input type='radio' id='" + question.id + "rate-1' name='" + question.id + "' value='1'>" +
              "<label class='radio-label' for='rate-1'>1</label>" +
              "<input type='radio' id='" + question.id + "rate-2' name='" + question.id + "' value='2'>" +
              "<label class='radio-label' for='rate-2'>2</label>" +
              "<input type='radio' id='" + question.id + "rate-3' name='" + question.id + "' value='3'>" +
              "<label class='radio-label' for='rate-3'>3</label>" +
              "<input type='radio' id='" + question.id + "rate-4' name='" + question.id + "' value='4'>" +
              "<label class='radio-label' for='rate-4'>4</label>" +
              "<input type='radio' id='" + question.id + "rate-5' name='" + question.id + "' value='5'>" +
              "<label class='radio-label' for='rate-5'>5</label>" +
              "<input type='radio' id='" + question.id + "rate-6' name='" + question.id + "' value='6'>" +
              "<label class='radio-label' for='rate-6'>6</label>" +
              "<input type='radio' id='" + question.id + "rate-7' name='" + question.id + "' value='7'>" +
              "<label class='radio-label' for='rate-7'>7</label><br>"
            );
          });
        }
      });
    });
  }
  

function criteriaSubmit(){
    $("#individual-form").show();
    addQuestions();
    $("#criteria-form").hide();
}

$(document).ready(function(){
    document.getElementById("login-btn").addEventListener("click", function(event) {
        event.preventDefault();
        login();
    });

    document.getElementById("criteria-submit-btn").addEventListener("click", function(event) {
        event.preventDefault();
        criteriaSubmit();
    });

    document.getElementById("individual-submit-btn").addEventListener("click", function(event) {
        event.preventDefault();
        addResults();
        });
});