
//TODO: make it so num_sites gets called with an API instead of just hard-coded here

//window.onload = load_boxes(3);

function delete_spinner(){
  //delete  the spinner
  var node = document.getElementById("loading_box"); //get the loading box
  node.querySelectorAll('*').forEach(n => n.remove()); //retrieve all children wihtin this object so it removes all loading elements...
  node.remove(); //gudbai!
}

//the main function to populate our results
function load_boxes(num_sites)
{
    delete_spinner(); //remove the spinner from the page

    populate_headers(num_sites); //Populate the header with number of sites

    var box_str = ''; //initialize empty box string to fill the div with

      for(var i=0; i < num_sites; i++){ //populate all of the boxes based on number of sites
        console.log("Loading box" + i);

          box_str +=
          '<div id="toggle_buttons_page_' + i + '" class="container" style="padding-top: 20px;">' +
                '<nav>' +
                    '<ul>' +
                        '<li>' +
                          '<button type="button" id="metadatabutton_page_' + i + '" class="btn btn-outline-info btn-lg" data-toggle="collapse" data-target="#metadata_collapse_page_' + i + '" >Metadata</button>' +
                        '</li>' +
                        '<li>' +
                          '<button type="button" id="textbuttonpage_' + i + '"  class="btn btn-outline-info btn-lg" data-toggle="collapse" data-target="#text_collapse_page_' + i + '">Text Analysis</button>' +
                        '</li>' +
                    '</ul>' +
                '</nav>' +
          '</div>' +

          '<div id="container_page_' + i + '" class="container" style="margin-top: -15px">' +
            '<article  id="article_page_' + i + '" >' +
                  '<h3>https://nytimes.com (brief page title goes here)</h3>' + //data[i] for url goes here

                  '<section class="fullwidth" style="align-content: center">' +
                            'This is where a basic description about the website will go....' + //data[i] for description/Page title goes here
                  '</section>' +

                  '<div class="collapse" id="metadata_collapse_page_' + i + '">' +
                        '<section id="metadata_section_page_' + i + '" class="halfwidth">' +
                          '<h5><b>Number of tags (metadata)</b></h5>' +
                          '<ul id="ul_tag_list">' +
                            displayMetadataList() +
                          '</ul>' +
                        '</section>' +
                        '<section id="piechart_section_page_' + i + '" class="halfwidth">' +
                          '<h5><b>Pie Chart Breakdown</b></h5>' +
                            displayMetadataPieChart() +
                        '</section>' +
                  '</div>' +

                  '<div class = "collapse" id="text_collapse_page_' + i + '">' +
                      '<section id="piechart_section_page_' + i + '" class="fullwidth" style="align-items: left;">' +
                        '<h5><b>Text Analysis</b></h5>' +
                          '<ul id="ul_tag_list">' +
                            displayTextAnalysisList() +
                          '</ul>' +
                      '<section>' +
                  '</div>' +
                '</article>' +
        '</div>' +
        '<br>'
        ;
      }

      $('#bigbox').html(box_str); //append to the string in the "bigbox", which is a big ol' div tag to store all this stuff
      //note - there's probably a *way* better way of doing this, but I'm not super familiar with javascript and editing HTML with it
  }

//tells the user how many sites' they've queried
//(shouldn't need updating)
function populate_headers(num_sites){
  if(num_sites == 1){
    document.getElementById("header_info").innerHTML = "Here are your results from your query: ";
  }
  else{
    document.getElementById("header_info").innerHTML = "Here are your results from all of your " + num_sites + " queries:";
  }

  document.getElementById("subheader_info").innerHTML = "<i>(To check out your data, click on the Metadata or Text Analysis buttons)</i>";
}


//displays an unordered list of metadata elements for a SINGLE page
//gonna need to update this so that it'll populate with the API
//
//note - we should populate this ONLY with the data from 1 website, so that the data will get appended in the right order
// maybe something like this:
// function displayMetadataList(data[i]){
function displayMetadataList(){
  var metadata_str = '';

  metadata_str = //API call for the given page goes here  (probably best to use a for loop)
  '<li>div: 4</li>' +
  '<li>html: 7</li>' +
  '<li>ul: 9</li>' +
  '<li>li: 12</li>' +
  '<li>ol: 3</li>' +
  '<li>p: 77</li>' +
  '<li>header: 2</li>' +
  '<li>footer: 1</li>' +
  '<li>h1: 9</li>' +
  '<li>h2: 14</li>'; //make sure to put data in between two <li></li> tags!

  return metadata_str; //should always be returned as big string
}

//displays the pie chart of the metadta for the given element
function displayMetadataPieChart(){
    var html_pie_string = '';

    html_pie_string = "[pie chart goes here]"; //populate the pie chart here, ideally as a string so we can return it
    //i'm not sure what type of object the pie chart is, (image, css class? html?)
    //but we can account for this later

    return html_pie_string; //should always be returned as a string
}

//displays an unordered list of text elements for a SINGLE page
//gonna need to update this so that it'll populate with the API
function displayTextAnalysisList(){
  var text_list_str = '';

  text_list_str =
  '<li>nouns: 44</li>' + //API call for the given page goes here
  '<li>adjectives: 42</li>' +
  '<li>names: 69</li>' +
  '<li>whatever else: 420</li>'; //make sure to put data in between two <li></li> tags!

  return text_list_str; //should always be returned as big string
}




///buttonState will allow the buttons to be toggled using the EventListener
// don't touch!
function buttonState(event){
  //if it's actually a button, THEN we append active to it

  //if it's ALREADY checked, then make it blue, otherwise, don't
  if( event.target.classList.contains('btn')) {
    if (event.target.classList.contains("active")) {
      event.target.classList.remove("active");
    }
    else event.target.classList.add("active");
  }

}

//add an event listenr to the document
document.addEventListener("click", buttonState);
