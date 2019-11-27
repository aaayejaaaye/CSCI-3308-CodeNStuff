// const { spawn } = require('child_process');
// var spawn = require('child_process').spawn;


function plusButton() {
  // placeholder urls
  var placeholders = ["https://www.apple.com/", "https://www.amazon.com/"];
  // currently we only take 3 urls
  var limit = 3;

  // this is the number of inputs we have on the page
  var num_inputs = $(".input-container").children().length;
  var placeholder;
  if (num_inputs < limit) {
    if (num_inputs == 1) {
      placeholder = placeholders[0]
    }
    if (num_inputs == limit-1) {
      $("#plus").prop("disabled", true)
      placeholder = placeholders[1]
    }
    var id_name = "url_" + num_inputs;
    var input = [
      "<input type='text' class='form-control mb-2' id='",
      id_name,
      "' placeholder='",
      placeholder,
      "'>"

    ].join('');
    $(".input-container").append(input);
    $("#minus").prop("disabled", false)
  }
}

function minusButton() {
  var limit = 3;
  var num_inputs = $(".input-container").children().length;
  if (num_inputs > 1) {
    $(".input-container").children().last().remove();
    if (num_inputs == 2) {
      $("#minus").prop("disabled", true);
    }
    if (num_inputs == limit) {
      $("#plus").prop("disabled", false);
    }
  }
  else {
  }
}

function submitButton() {
  var num_inputs = $(".input-container").children().length;
  var arg_str = "";
  var all_valid = true;

  $(".input-container").children().each(function () {
      var tmp_url = ($(this).val() + " ");
      if(valid_url(tmp_url)){ //check the url is valid
          arg_str += ($(this).val() + " "); //append to string if so
      }
      else{
        alert("One or more of your URL inputs is/are invalid. Make sure you're using proper syntax (http, https, with .com, .edu, etc.) and that none of your inputs are empty"); //alert the user this URL isn't valid...
        all_valid = false;
      }
  });
  console.log(arg_str);

  if(all_valid == true){
    //you should run the API here after we've validated the URLs
  }
}

//disables the myAccount button if the user hasn't loggin sin
function checkIfSignedIn(){
  var is_logged_on = false;   //TODO: find a way to determine whether the user has logged in or not

  if(is_logged_on == false){
    $("#myaccount").prop("disabled", true);
  }
  else{
    $("#myaccount").prop("disabled", false);
  }

}

//checks if all URL's are actually valid, returns true if they are, otherwise, returns false!
function valid_url(arg_str){
  var url_regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/ ?#[\]@!\$&'\(\)\*\+,;=.]+$/g;   //found this really nice URL regex from: https://www.regextester.com/94502

  if(!arg_str.match(url_regex)){
    return false;
  }

  return true;
}

$(document).ready(function() {
  var num_inputs = $(".input-container").children().length;
  if (num_inputs == 1) {
    $("#minus").prop("disabled", true);
  }

  checkIfSignedIn(); //run the my account button

  $("#submit").click(function(){ submitButton(); return false; });

  const { spawn } = require('child_process');

})
