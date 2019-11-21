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
  $(".input-container").children().each(function () {
      arg_str += ($(this).val() + " ");
  });
  console.log(arg_str);

}

$(document).ready(function() {
  var num_inputs = $(".input-container").children().length;
  if (num_inputs == 1) {
    $("#minus").prop("disabled", true);
  }

  $("#submit").click(function(){ submitButton(); return false; });

  const { spawn } = require('child_process');

})
