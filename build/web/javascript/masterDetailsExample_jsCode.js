/*
 * Generates a table displaying JSON data using jqxGrid table.
 * @author: Ajit Singh.
 */
 var jsonData= {};

 $(document).ready(function () {  // Load JSON data into an object via an Ajax request.
  loadJSONdata();
 });

 // Load JSON data into an object via an Ajax request.
 function loadJSONdata() {
  // Ajax to read the example JSON file.
  $.getJSON('jsonData/exampleData.json', function(data) { 
    jsonData= data;

    // Display the JSON data using jqxGrid.
    displayInGrid(jsonData);
  });
 }
 
 // Display the JSON data using jqxGrid.
 function displayInGrid(jsonData) {
  try {
  // Source Data and DataAdapter for main grid.
  var source= {
                datatype: "json",
                datafields: [
                    { name: 'text', type: 'string' },
                    { name: 'xval', type: 'int' } ],
                localdata: jsonData
              };
  var dataAdapter= new $.jqx.dataAdapter(source);

  // initialize main jqxGrid.
  $("#mainGrid").jqxGrid({
     width: 300,
     height: 400,
     source: dataAdapter,
     keyboardnavigation: false,
     columns: [
               { text: 'Text', datafield: 'text', width: 200 },
               { text: 'X-value', datafield: 'xval', width: 100 }
              ]
    });

  // Data fields, source Data and DataAdapter for sub-grid.
  var dataFields= [ { name: 'text', type: 'string' },
                    { name: 'xval', type: 'int' },
                    { name: 'yval', type: 'float' } ];
  var source= {
                datatype: "json",
                datafields: dataFields,
                localdata: jsonData
              };
  var dataAdapter= new $.jqx.dataAdapter(source);
  dataAdapter.dataBind();
  
  // Add a Row Select event handler to the main jqxGrid.
  $("#mainGrid").on('rowselect', function (event) {
    var selectedText= event.args.row.text;
    // Selected entry from the main grid.
    console.log("selectedText= "+ selectedText);
    var records= new Array(); // to contain updated data for the sub-grid.
    var length= dataAdapter.records.length;
    for(var i=0; i<length; i++) {
        var record= dataAdapter.records[i];
        if(record.text === selectedText) {
           // Selected record found in the sub grid's data Array.
           console.log("record.text= "+ record.text);
           records[records.length]= record;
          }
       }
    var dataSource= {
                    datafields: dataFields,
                    localdata: records
                };
    var adapter= new $.jqx.dataAdapter(dataSource);
    // update data source.
    $("#subGrid").jqxGrid({ source: adapter });
   });

  // initialize sub-grid.
  $("#subGrid").jqxGrid({
     width: 200,
     height: 100,
     keyboardnavigation: false,
     columns: [
               { text: 'X-value', datafield: 'xval', width: 100 },
               { text: 'Y-value', datafield: 'yval', width: 100 }
              ]
    });

   $("#mainGrid").jqxGrid('selectrow', 0);
  }
  catch(err) { console.log("jqxGrid(s) initialization Error: "+ err); }
 }
