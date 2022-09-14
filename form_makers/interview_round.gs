function interviewRound() {
  
var form = FormApp.create('Interview Round');
var sheet = SpreadsheetApp.getActiveSheet();
var data = sheet.getDataRange().getValues();
var actualSheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();

for (var i = 1; i < data.length; i++) {
  // yes no
    form.addMultipleChoiceItem()
   .setTitle('Do you want to continue considering ' + data[i][1] + ` ` + data[i][2] + ' for Xi class?')
   .setChoiceValues(['Yes','No'])
   .setRequired(true)
  form.addPageBreakItem();
}

Logger.log(`sheet name` + actualSheetName);
Logger.log(`Number of entries` + data.length);
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());

}