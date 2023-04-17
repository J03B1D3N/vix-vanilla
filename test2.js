async function spreadsheetProcessor() {


  const StringifyObject = (arg) => {
      return (
          JSON.stringify(arg, null, 2)
      )
  }

  const sheetBundle = await fetchSheets()

  let dummy = sheetBundle[2]

  var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');


  //initialise queue
  let queue = []

 

      //clean the queue with each iteration 
      queue = []

      //loop through numbers (123456...)
      for(let data = 0; data < dummy.data.length; data++){
      queue[data] = []

          //loop through letters (ABCDFG...)
          for(let element = 0; element < dummy.data[data].length; element++) {

              const variable = alphabet[element] + (data + 1)

              //create a variable with corresponding A1 notation and solve it immediatelly if possible.
              eval('var ' + variable + '= ' + 'scrapeTheArguments(dummy.data[data][element])' + ";")

              //push the value of solved/unsolved variable unto a queue
              queue[data].push(eval(alphabet[element] + (data + 1)))

              console.log(variable + `=` + eval(alphabet[element] + (data + 1)))
          }
      }
      queue = handleProcessing(queue)
      
      returnArguments(dummy, queue)
      
    }
    console.log(A1, B1, C1, D1)
  // console.log(StringifyObject(sheetBundle))


function returnArguments(sheetBundle, queue) {

  //return all the results to their corresponding places.
  for( let data = 0; data < queue.length; data++ ) {

     // console.log('returning results')
    

     for( let element = 0; element < queue[data].length; element++) {
         sheetBundle.data[data][element] = queue[data][element]
     }
     // console.log('results returned')
 }
}




function handleProcessing(queue) {


  // process the queue, now that all variables are available
  for(let queueCount = 0; queueCount < queue.length; queueCount++) {

      console.log('processing')

      queue[queueCount] = queue[queueCount].map(element => {
          return processTheArguments(element)
      })
     
      
      console.log('processed')
      console.log(queue)
  }

  return queue

}   

//function which solves the variable if it can.
function scrapeTheArguments(argument) {

  try{

      let processedArgument = argument

 
      if(typeof argument == 'string') {

          if(argument.includes('=')){
              if(argument.includes("MULTIPLY") || argument.includes("SUM") || argument.includes("DIVIDE") || argument.includes("GT") || argument.includes("EQ") || argument.includes("NOT") || argument.includes("AND") || argument.includes("OR") || argument.includes("IF") || argument.includes("CONCAT")) {
                  return argument
              } else {

                  processedArgument = argument.replace('=', '')

                  processedArgument = eval(processedArgument)

              }

          } 

      }
      
  return processedArgument

  }

  catch(error) {
      console.log("error in scraping", error)
      return argument 

  }

}

function processTheArguments(argument) {

  try{

      let processedArgument = argument

 
      if(typeof argument == 'string') {

          if(argument.includes('=')){

              processedArgument = argument.replace('=', '')

              processedArgument = eval(processedArgument)

          } 

      }
      
  return processedArgument

  }

  catch {
      console.log("error in processing")
      return argument 

  }

}



async function fetchSheets() {

  const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')

  let processedData = await apiCall.json()


  const StringifyObject = (arg) => {
      return (
          JSON.stringify(arg, null, 2)
      )
  }
  // console.log(StringifyObject(processedData))
  let information  = processedData.sheets

  // console.log(StringifyObject(processedData))


  // let queue = []

  // let submission  = {
  //     "email": "justas.lapinas.98@gmail.com",
  //     "results": null
  // }
  return information
}


spreadsheetProcessor()
