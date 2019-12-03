$(document).ready(function() {
  console.log(myVar);
  createData(myVar);
});
// import 'charts.js'


function createData(data, indicator) {
  var tagData = [];
  var obj = data.url_1.tag_analysis

  var other_label = "other";
  var other_val = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
    var val = obj[key];
      if (val[1] > 1) {
        tagData.push(val[indicator]);
      }
      else {
        if (indicator == 1) {
          other_val += val[1]
        }
      }
    }
  }
  if (indicator == 0 && other_val > 0) {
    tagData.push(other_label)
  }
  else {
    tagData.push(other_val)
  }
  return tagData;
}

function buildTagChart(label_array, data_array) {
  var ctx = $('#tagChart');

  var tagLabels = createData(myVar, 0);
  var tagData = createData(myVar, 1);

  var colors = [
"#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
"#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
"#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
"#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977"]

  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: tagLabels,
        datasets: [{
          backgroundColor: colors,
          data: tagData
        }]
      },
      options: {
        layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
          },
         legend: {
           position: "bottom",
           labels: {
             boxWidth: 20,
             padding: 10,
             fontColor: "black"
           }
         }
      }
  });
}

function createTagChart() {
  buildTagChart();
}

function buildPosChart() {
  var ctx = $('#posChart');

  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["div", "a", "li", "p", "h3", "h1", "span", "meta"],
        datasets: [{
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#737373", "#abcdef", "#675abd"],
          data: [2478,5267,734,784,433, 450, 1000, 400]
        }]
      },
      options: {
        layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
          },
         legend: {
           position: "left",
           labels: {
             boxWidth: 20,
             padding: 5,
             fontColor: "black"
           }
         }
      }
  });
}

function createPosChart() {
  buildPosChart();
}
