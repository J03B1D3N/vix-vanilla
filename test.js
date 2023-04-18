async function spreadsheetProcessor() {

    const sheetBundle = await fetchSheets()

    const StringifyObject = (arg) => {
        return (
            JSON.stringify(arg, null, 2)
        )
    }
    
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    //initialise queue
    let queue = []

    for(let sheet = 0;sheet < sheetBundle.length; sheet++) {

        //clean the queue with each iteration 
        queue = []
  
        //loop through numbers (123456...)
        for(let data = 0; data < sheetBundle[sheet].data.length; data++){
        queue[data] = []
  
            //loop through letters (ABCDFG...)
            for(let element = 0; element < sheetBundle[sheet].data[data].length; element++) {
  
                //create a variable with corresponding A1 notation and solve it immediatelly if possible.
                eval('var ' + alphabet[element] + (data + 1) + '= ' + 'scrapeTheArguments(sheetBundle[sheet].data[data][element])' + ";")
  
                //push the value of solved/unsolved variable unto a queue
                queue[data].push(eval(alphabet[element] + (data + 1)))

                // console.log(eval(alphabet[element] + (data + 1)))
            }
        }

        if(checkForNull(queue)){
            console.log('contains null')
            queue = []
                
            //loop through numbers (12345...)
            for(let data = 0; data < sheetBundle[sheet].data.length; data++){
                queue[data] = []
        
                //loop through the letters back to front (ZYXWV...)
                for(let element = sheetBundle[sheet].data[data].length - 1; element > -1; element--){
        
                    const variable = 'var ' + alphabet[element] + (data + 1)
        
                    eval(variable + '= ' + 'scrapeTheArguments(sheetBundle[sheet].data[data][element])' + ";")
        
                    queue[data].push(eval(alphabet[element] + (data + 1)))
                }

                queue[data].reverse()

            }
        }
        
        queue = handleProcessing(queue)

        returnArguments(sheetBundle[sheet], queue)

        //reset the variables to avoid errors
        for(let sheet = 0;sheet < sheetBundle.length; sheet++) {
    
            for(let data = 0; data < sheetBundle[sheet].data.length; data++){
    
                for(let element = 0; element < sheetBundle[sheet].data[data].length; element++) {
    
                    eval('var ' + alphabet[element] + (data + 1) + '= ' + 'null' +";")
    
                }
            }
        }
    }   
    returnProcessedInfoToTheApi()

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
    return information
}
   

  


function handleProcessing(queue) {


        // process the queue, now that all variables are available
        for(let queueCount = 0; queueCount < queue.length; queueCount++) {

            queue[queueCount] = queue[queueCount].map(element => {
                return processTheArguments(element)
            })

        }

        return queue

}   
       

function checkForNull(queue) {

    for( let data = 0; data < queue.length; data++ ) {

        if(queue[data].includes(null)) {

            return true
        } else return false
    }
}

function resetVariables(sheetBundle) {

    for(let data = 0; data < sheetBundle.data.length; data++){
    
        for(let element = 0; element < sheetBundle.data[data].length; element++) {

            let variable = alphabet[element] + (data + 1)

            eval('var ' + alphabet[element] + (data + 1) + '= ' + 'null' +";")

            return eval(variable)

        }
    }
}





async function returnProcessedInfoToTheApi() {


    let submission  = {
        "email": "justas.lapinas.98@gmail.com",
        "results": sheetBundle

    }
    console.log(StringifyObject(sheetBundle))

  const response = await fetch("https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/verify/eyJ0YWdzIjpbXX0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });


  const result = await response.json()
  console.log(result)

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



        function isString(value){
            return'string' === typeof value
        }
        
        function isNotBoolean(value){
            return 'boolean' !== typeof value;
        } 



        function MULTIPLY(...args) {
            if(!args.some(isNaN)){
                return args.reduce(function (acc, cur) {
                    return acc * cur
                })
            } else return '#ERROR: type does not match'
        }
        function SUM(...args) {
            if(!args.some(isNaN)){
                return args.reduce(function (acc, cur) {
                    return acc + cur
                })
            } else return '#ERROR: type does not match'
            
        }
        function DIVIDE(...args) {
            if(!args.some(isNaN)){
                return args.reduce(function (acc, cur) {
                    return acc / cur
                })
            } else return '#ERROR: type does not match'
        }
        function GT(a,b) {
            if(isNaN(a) || isNaN(b)){
                return '#ERROR: type does not match'
            } else return (a > b ? true : false)
           
        }
        function EQ(a,b) {
            if(typeof a === typeof b){
                return (a == b ? true : false)
            } else '#ERROR: type does not match'
        }
        function NOT(a) {
            if(typeof a == "boolean"){
                return !a
            } else return '#ERROR: type does not match'
        }
        function AND(...args) {
            return (args.some(isNotBoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
                return acc && cur
            }))
        }
        function OR(...args) {
            return (args.some(isNotBoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
                return acc || cur
            }))
        }
        function IF(condition, arg1, arg2) {
            if(condition) {
                return arg1
            } else if(!condition) return arg2
            else return '#ERROR: type does not match'
        }
        function CONCAT(...args) {
            return (args.some(isString) ? args.reduce(function (acc, cur) {
                return acc.concat(cur)
            }) : '#ERROR: type does not match')
        }
}

spreadsheetProcessor()
