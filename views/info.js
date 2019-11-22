
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

    document.getElementById("header_info").innerHTML = "Your results from " + num_sites + " query(s)";
    //tell the user how many sites' they've created


    //NOTE - I'll need to update this in a more succinct way that isn't making a big-string and populating everything
    //this is a nightmare and a half for creating new elements

    var box_str = ''; //initialize empty box string to fill the div with

      for(var i=0; i < num_sites; i++){ //populate all of the boxes based on number of sites
        console.log("Loading box" + i);

          box_str +=
          '<div id="toggle_buttons_page_' + i + '" class="container" style="padding-top: 20px;">' +
                '<nav>' +
                    '<ul>' +
                        '<li>' +
                          '<button type="button" id="metadatabutton" class="btn btn-outline-info btn-lg"  data-toggle="button">Metadata</button>' +
                        '</li>' +
                        '<li>' +
                          '<button type="button" id="textbutton" class="btn btn-outline-info btn-lg"  data-toggle="button">Text Analysis</button>' +
                        '</li>' +
                    '</ul>' +
                '</nav>' +
          '</div>' +


          '<div id="container_page_' + i + '" class="container" style="margin-top: -15px">' +
            '<article  id="article_page_' + i + '" >' +
                  '<h3>' + 'https://nytimes.com (brief page title goes here)' + '</h3>' + //NOTE - this doesn't need an ID, and can be populated directly with the text from the API (specifically, the basic URL/title)

                  '<section class="fullwidth" style="align-content: center">' +
                            'This is where a basic description about the website will go....' + //NOTE - this doesn't need an ID, and can be populated directly with the description text from the API
                  '</section>' +
                  '<section id="metadata_section_page_' + i + '"  class="halfwidth">' +
                  //NOTE - these li elements shouldn't need unique ID's, and can be populated using the JSON from the API
                    '<h5>Number of tags (metadata)</h5>' +
                    '<ul id="ul_tag_list">' +
                      '<li>div: 4</li>' +
                      '<li>html: 7</li>' +
                      '<li>ul: 9</li>' +
                      '<li>li: 12</li>' +
                      '<li>ol: 3</li>' +
                      '<li>p: 77</li>' +
                      '<li>header: 2</li>' +
                      '<li>footer: 1</li>' +
                      '<li>h1: 9</li>' +
                      '<li>h2: 14</li>' +
                    '</ul>' +
                  '</section>' +

                  '<section id="piechart_section_page_' + i + '"  class="halfwidth">' +
                    '<h5>Pie Chart Breakdown</h5>' +
                        '[pi-chart goes here]' + //NOTE- this is where we'll need to put the PieChart from the JSON...note sure *how* or where we retreive it from (ask Andrew?)
                  '</section>' +
            '</article>' +
          '</div>' +
          '<br>'
          ;
      }

      $('#bigbox').html(box_str); //append to the string in the "bigbox", which is a big ol' div tag to store all this stuff
      //note - there's probably a *way* better way of doing this, but I'm not super familiar with javascript and editing HTML with it
  }
