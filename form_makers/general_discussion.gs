function genDiscussion() {

var form = FormApp.create('General Discussion');
var sheet = SpreadsheetApp.getActiveSheet();
var data = sheet.getDataRange().getValues();
var actualSheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
for (var i = 1; i < data.length; i++) {
   // General discussion
   form.addMultipleChoiceItem()
  .setTitle('Do you want ' + data[i][1] + ` ` + data[i][2] + ` in Theta Tau?`)
  .setChoiceValues(['Yes','No'])
  .setRequired(true)
  form.addPageBreakItem();
}

Logger.log(`sheet name` + actualSheetName);
Logger.log(`Number of entries` + data.length);
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());

}