function plusMinus() {
 var form = FormApp.create('Plus minus');
 
 var sheet = SpreadsheetApp.getActiveSheet();
 var data = sheet.getDataRange().getValues();
 var actualSheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
 
for (var i = 1; i < data.length; i++) {
 
     var url = data[i][18];
     Logger.log(data[i][1] + ' ' +  data[i][2]);
     var id = url.split('id=')[1].split('&')[0];
 
    try{

      var img = DriveApp.getFileById(id); 
      var blob = img.getBlob();
      var headshot = form.addImageItem().setImage(blob);
      headshot.setTitle(data[i][1] + ` ` + data[i][2]);
 
  //plus minus
      form.addMultipleChoiceItem()
      .setTitle('How will you vote for ' + data[i][1] + ` ` + data[i][2])
      .setChoiceValues(['1','0','-1'])
      .setRequired(true)
 
    form.addPageBreakItem();
    }
    catch (e) {
    // Logs an ERROR message.
    console.error('FAILED: ' + data[i][1] + ' ' +  data[i][2]);
  }
    
 }
 
 
 Logger.log(`sheet name` + actualSheetName);
 Logger.log(`Number of entries` + data.length);
 
 Logger.log('Published URL: ' + form.getPublishedUrl());
 Logger.log('Editor URL: ' + form.getEditUrl()); 
}
