function countVotes(percent_pass, genDiscuss=false) {
// percent_pass = top percent_pass go on to next round (decimal. 60% = 0.6)

//get spreadsheet stuff
 var sheet = SpreadsheetApp.getActiveSheet();
 var data = sheet.getDataRange().getValues();
 
 // grab rows and columns
 var numCol = sheet.getLastColumn()
 var numRow = data.length
 
//grab header row and split so its just names
 var names = data[0]
 names.splice(0,2) // remove first two columns
 for(var n = 0; n < names.length; n++){
   var currentName = names[n].toString()
   names[n] = currentName.slice(currentName.indexOf("considering")+11, currentName.indexOf("for"))
 }
 
 // track yes vote count for each PNM
 var columnTotals = []
 var countYes = 0
 
 for (var i = 2; i < numCol; i++) {   // for each column (PNM)
   countYes = 0 //reset Yes count
   for (var j = 1; j < numRow; j++){
     if(data[j][i] == "Yes"){ //if they get a yes, add it to yes count
       countYes = countYes + 1
     }
   }
   columnTotals.push(countYes) //running list of each column total yes
 }
 
 var countVotes = numRow - 1 //number of votes possible
 var votesNeeded = countVotes * percent_pass //top XX% pass for this round
 
 var current_min = countVotes
 for (var i = 0; i < columnTotals.length; i++){
   if (columnTotals[i] < votesNeeded) { //if they dont have 60% print their name to cut
     Logger.log(names[i])
   }
   else if (columnTotals[i] < current_min) {
        current_min = columnTotals[i]
     }
    
 }
 if (genDiscuss){
   Logger.log('Min votes needed for contention (Gen discussion only): ' + current_min)
 }
}
 
function interviewCount(){
 countVotes(0.6)
}
 
function generalDiscussion(){
 countVotes(0.75, true)
}
