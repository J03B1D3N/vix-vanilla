async function spreadsheetProcessor() {

    const sheetBundle = await fetchSheets()
    
    //initialise alphabet
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    //initialise queue
    let queue = []

    //iterate through the sheets
    for(let sheet = 0;sheet < sheetBundle.length; sheet++) {

        //clean the queue with each iteration 
        queue = []
        
        //loop through numbers backwards(54321...)
        for(let data = sheetBundle[sheet].data.length - 1; data > -1; data--){
            queue[data] = []
    
            //loop through the letters backwards (ZYXWV...)
            for(let element = sheetBundle[sheet].data[data].length - 1; element > -1; element--){

                const variable = alphabet[element] + (data + 1)

                 //create a variable with corresponding A1 notation and solve it immediatelly if possible.
                eval(variable + '= ' + 'scrapeTheArguments(sheetBundle[sheet].data[data][element])' + ";")
            }
        }
  

        //loop through numbers (123456...)
        for(let data = 0; data < sheetBundle[sheet].data.length; data++){

            //loop through letters (ABCDFG...)
            for(let element = 0; element < sheetBundle[sheet].data[data].length; element++) {
  
                //create a variable with corresponding A1 notation and solve it immediatelly if possible.
                eval('var ' + alphabet[element] + (data + 1) + '= ' + 'scrapeTheArguments(sheetBundle[sheet].data[data][element])' + ";")
  
                // //push the value of solved/unsolved variable unto a queue
                queue[data].push(eval(alphabet[element] + (data + 1)))
            }
        }


        //process(solve) the variables
        queue = handleProcessing(queue)


        //return solved arguments into their place
        returnArguments(sheetBundle[sheet], queue)

        //reset the variables to null in order to avoid errors
        for(let sheet = 0;sheet < sheetBundle.length; sheet++) {
    
            for(let data = 0; data < sheetBundle[sheet].data.length; data++){
    
                for(let element = 0; element < sheetBundle[sheet].data[data].length; element++) {
    
                    eval('var ' + alphabet[element] + (data + 1) + '= ' + 'null' +";")
    
                }
            }
        }
    }


    //modify the submission and sumbit it to the API
    returnProcessedInfoToTheApi()


    // end of app logic



    ///////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////



    //below are the functions used in the app logic:



    //the API call that gets us the sheets
    async function fetchSheets() {
        
        const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')
        
        let processedData = await apiCall.json()
        
        let information  = processedData.sheets
        
        return information
    }

    //scrapes the arguments, solves them if it can, skips solving functions, places all arguments into the queue
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

        catch {
            return argument 
        }
    }
    

    //itterates the processing function over the queue elements
    function handleProcessing(queue) {

        for(let queueCount = 0; queueCount < queue.length; queueCount++) {

            queue[queueCount] = queue[queueCount].map(element => {
                    return processTheArguments(element)
            })
        }

        return queue

    }   

    //processes all the arguments if it can
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

        catch (error) {

            return `${error}`

        }
    }
    
    //returns all the results to their corresponding places.
    function returnArguments(sheetBundle, queue) {

       
        for( let data = 0; data < queue.length; data++ ) {

            for( let element = 0; element < queue[data].length; element++) {
                sheetBundle.data[data][element] = queue[data][element]
            }
        }
    }

    //the POST request that sends the processed data to the API and logs the response
    async function returnProcessedInfoToTheApi() {

        let submission  = {
            "email": "justas.lapinas.98@gmail.com",
            "results": sheetBundle
        }

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
              
    //checks if argument is not number
    function isNotNumber(value) {
        return 'number' !== typeof value || isNaN(value)
    }
    
    //checks if arguments is not string
    function isNotString(value){
        return'string' !== typeof value
    }
    
    //checks if argument is not boolean
    function isNotBoolean(value){
        return 'boolean' !== typeof value;
    } 
    
    //checks if all arguments are numbers, then multiplies them
    function MULTIPLY(...args) {
        if(!args.some(isNotNumber)){
            return args.reduce(function (acc, cur) {
                return acc * cur
            })
        } else return '#ERROR: type does not match'
    }
    
    //checks if all arguments are numbers, then adds them together
    function SUM(...args) {
        if(!args.some(isNotNumber)){
            return args.reduce(function (acc, cur) {
                return acc + cur
            })
        } else return '#ERROR: type does not match'
    }
    
    //checks if all arguments are numbers, then divides them
    function DIVIDE(...args) {
        if(!args.some(isNotNumber)){
            return args.reduce(function (acc, cur) {
                return acc / cur
            })
        } else return '#ERROR: type does not match'
    }
    
    //checks if all arguments are numbers, then checks if first argument is greater than the other them
    function GT(a,b) {
        if(isNotNumber(a) || isNotNumber(b)){
            return '#ERROR: type does not match'
        } else return (a > b ? true : false)
    }
    
    //checks if all arguments are of the same type, then equates their value them
    function EQ(a,b) {
        if(isNotNumber(a) || isNotNumber(b)){
            return '#ERROR: type does not match'
        } else return (a == b ? true : false)
    }
    
    //checks if argument is a boolean, then reverses it
    function NOT(a) {
        if(typeof a == "boolean"){
            return !a
        } else return '#ERROR: type does not match'
    }
    
    //checks if all arguments are booleans, then runs the AND operator on them
    function AND(...args) {
        return (args.some(isNotBoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
            return acc && cur
        }))
    }
    
    //checks if all arguments are booleans, then runs the OR operator on them
    function OR(...args) {
        return (args.some(isNotBoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
            return acc || cur
        }))
    }
    
    //IF statement. Returns error if condition is not a truthy or a falsy
    function IF(condition, arg1, arg2) {
    
        if(isNotBoolean(condition)){
            return '#ERROR: type does not match'
        } else return (condition ? arg1 : arg2)
        
    }
    
    //checks if all arguments are strings, then concacts them
    function CONCAT(...args) {
        return (args.some(isNotString) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
            return acc.concat(cur)
        }))
    }
}

spreadsheetProcessor();