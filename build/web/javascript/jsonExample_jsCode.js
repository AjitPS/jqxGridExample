/*
 * Generates a table displaying JSON data using jqxGrid table.
 * @author: Ajit Singh.
 */
 var jsonData= {};

 function generateTable() {
  // Load JSON data into an object via an Ajax request.
  loadJSONdata();
 }

 // Load JSON data into an object via an Ajax request.
 function loadJSONdata() {
  // Ajax to read the example JSON file.
  $.getJSON('jsonData/exampleData.json', function(data) { 
    jsonData= data;

    for(var i = 0; i < jsonData.length; i++) {
        console.log("jsonData (text, x, y): "+ jsonData[i].text +", "+ 
                jsonData[i].xval +", "+ jsonData[i].yval);
       }

    // Display the JSON data using jqxGrid.
    displayInGrid(jsonData);
  });
 }
 
 // Display the JSON data using jqxGrid.
 function displayInGrid(jsonData) {
  try {

/*  var dataAdapter= new $.jqx.dataAdapter(jsonData, {
                downloadComplete: function (data, status, xhr) { },
                loadComplete: function (data) { },
                loadError: function (xhr, status, error) { }
            });*/
  var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'text', type: 'string' },
                    { name: 'xval', type: 'int' },
                    { name: 'yval', type: 'float' } ],
                localdata: jsonData
            };
  var dataAdapter= new $.jqx.dataAdapter(source);
  var theme= 'energyblue';

  // initialize jqxGrid
  $("#jqxgrid").jqxGrid({
     width: 400,
     height: 400,
     source: dataAdapter,
     pageable: true, autoheight: true, sortable: true, altrows: true, enabletooltips: true,
     editable: false, scrollmode: "default",
     selectionmode: 'multiplecellsadvanced',
     theme: 'energyblue', // the Theme
     columns: [
               { text: 'Text', columngroup: 'Details', datafield: 'text', width: 200 },
               { text: 'X-value', columngroup: 'Details', datafield: 'xval', width: 100 },
               { text: 'Y-value', columngroup: 'Details', datafield: 'yval', /*cellsformat: 'c2',*/ width: 100 }
              ],
     columngroups: [
                    { text: 'Information', align: 'center', name: 'Info' }
                   ]
    });
  }
  catch(err) { console.log("jqxGrid initialization Error: "+ err); }

    try {
            // initialize the various buttons and checkboxes.
            $("#selectrowbutton").jqxButton({ theme: theme });
            $("#scrolltobutton").jqxButton({ theme: theme });
            $("#clearselectionbutton").jqxButton({ theme: theme });
            $("#enableselection").jqxDropDownList({
                 autoDropDownHeight: true, dropDownWidth: 230, width: 120, height: 25, selectedIndex: 1, source: ['none', 'single row', 'multiple rows',
                 'multiple rows extended', 'multiple rows advanced']
            });
            $("#enablehover").jqxCheckBox({  checked: true });
            // select a row.
            $("#selectrowbutton").click(function () {
                var index = parseInt($("#rowindexinput").val());
                if (!isNaN(index)) {
                    $("#jqxgrid").jqxGrid('selectrow', index);
                }
            });
            // clears the selection.
            $("#clearselectionbutton").click(function () {
                $("#jqxgrid").jqxGrid('clearselection');
            });
            // scroll to a row.
            $("#scrolltobutton").click(function () {
                var index = parseInt($("#rowindexinput2").val());
                if (!isNaN(index)) {
                    $("#jqxgrid").jqxGrid('ensurerowvisible', index);
                }
            });
            // enable or disable the selection.
            $("#enableselection").on('select', function (event) {
                var index = event.args.index;
                $("#selectrowbutton").jqxButton({ disabled: false });
                switch (index) {
                    case 0:
                        $("#jqxgrid").jqxGrid('selectionmode', 'none');
                        $("#selectrowbutton").jqxButton({ disabled: true });
                        break;
                    case 1:
                        $("#jqxgrid").jqxGrid('selectionmode', 'singlerow');
                        break;
                    case 2:
                        $("#jqxgrid").jqxGrid('selectionmode', 'multiplerows');
                        break;
                    case 3:
                        $("#jqxgrid").jqxGrid('selectionmode', 'multiplerowsextended');
                        break;
                    case 4:
                        $("#jqxgrid").jqxGrid('selectionmode', 'multiplerowsadvanced');
                        break;
                }
            });
            // enable or disable the hover state.
            $("#enablehover").on('change', function (event) {
                $("#jqxgrid").jqxGrid('enablehover', event.args.checked);
            });
            // display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                $("#selectrowindex").text(event.args.rowindex);
            });
            // display unselected row index.
            $("#jqxgrid").on('rowunselect', function (event) {
                $("#unselectrowindex").text(event.args.rowindex);
            });
            // select the second row.
            $("#jqxgrid").jqxGrid('selectrow', 2);
        }
  catch(err) { console.log("jqxGrid functionality Error: "+ err); }
 }
