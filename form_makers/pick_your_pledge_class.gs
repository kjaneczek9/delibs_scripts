function pickClass() {

var form = FormApp.create('Pick Your Pledge Class');
var sheet = SpreadsheetApp.getActiveSheet();
var data = sheet.getDataRange().getValues();
var actualSheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
var item = form.addCheckboxItem();
form.deleteItem;
item.setTitle('Pick Your Pledge Class:')
 
var choices = [];                          
for (var i = 1; i<data.length; i++){
   choices.push( item.createChoice(data[i][1] + ` ` + data[i][2]) ); 
}
item.setChoices(choices)

Logger.log(`sheet name` + actualSheetName);
Logger.log(`Number of entries` + data.length);
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());
 
}
