function delibSlides() {
 
 // Google Slides presentation ID
 let masterDeckID = "1vMSy9E9p7TI6Eag7KdOlLqsw_PM0nB3euEog5Erxldo";
 
 // Open the presentation and get the slides in it
 let deck = SlidesApp.openById(masterDeckID);
 let slides = deck.getSlides();
 
 // The 2nd slide is the template that will be duplicated
 // once per row in the spreadsheet.
 let masterSlide = slides[1];
 
 // Load data from the spreadsheet.
 let dataRange = SpreadsheetApp.getActive().getDataRange();
 let sheetContents = dataRange.getValues();
 
 // Save the header in a variable called header
 let header = sheetContents.shift();
 
 // Create an array to save the data to be written back to the sheet.
 // We'll use this array to save links to the slides that are created.
 let updatedContents = [];
 
 // Reverse the order of rows because new slides will
 // be inserted at the top. Without this, the order of slides
 // will be the inverse of the ordering of rows in the sheet.
 sheetContents.reverse();
 
 // For every row, create a new slide by duplicating the master slide
 // and replace the template variables with data from that row.
 sheetContents.forEach(function (row) {
 
   // Insert a new slide by duplicating the master slide.
   let slide = masterSlide.duplicate();
 
   // Populate data in the slide that was created
   slide.replaceAllText("{{firstName}}", row[1]);
   slide.replaceAllText("{{lastName}}", row[2]);
   slide.replaceAllText("{{year}}", row[7]);
   slide.replaceAllText("{{major}}", row[9]);
   slide.replaceAllText("{{minor}}", row[11]);
  
   //add headshot
   var url = row[18];
   var id = url.split('id=')[1].split('&')[0];
   Logger.log(id)
 
   var img = DriveApp.getFileById(id); 
  
   var position = {left: 300, top: 40};
   var size = {width: 600, height: 300};
   slide.insertImage(img, position.left, position.top, size.width, size.height);
 
   // Create the URL for the slide using the deck's ID and the ID
   // of the slide.
   let slideUrl = `https://docs.google.com/presentation/d/${deck.getId()}/edit#slide=id.${slide.getObjectId()}`;
 
 });
 
 // Add the header back (remember it was removed using
 // sheetContents.shift())
 updatedContents.push(header);
 
 // Reverse the array to preserve the original ordering of
 // rows in the sheet.
 updatedContents.reverse();
 
}
 