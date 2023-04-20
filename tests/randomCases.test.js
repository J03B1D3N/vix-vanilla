

//this is a modified version of the app that resides in script.js, that instead of calling an api, takes a sheetBundle as an
//argument, processes it and returns it.
function spreadsheetProcessor(sheetBundle) {

     // const sheetBundle = await fetchSheets()
    
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
    // returnProcessedInfoToTheApi()
    // end of app logic



    ///////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////



    //below are the functions used in the app logic:



    // //the API call that gets us the sheets
    // async function fetchSheets() {
        
    //     const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')
        
    //     let processedData = await apiCall.json()
        
    //     let information  = processedData.sheets
        
    //     return information
    // }

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

        catch(error) {
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

        catch {

            return "ERROR"

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

    //checks for null in queue[n]
    function checkForNull(queue) {

        for( let data = 0; data < queue.length; data++ ) {

            if(queue[data].includes(null)) {

                return true
            } else return false
        }
    }

    //the POST request that sends the processed data to the API and logs the response
    // async function returnProcessedInfoToTheApi() {

    //     let submission  = {
    //         "email": "justas.lapinas.98@gmail.com",
    //         "results": sheetBundle
    //     }

    //     const response = await fetch("https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/verify/eyJ0YWdzIjpbXX0", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(submission),
    //         });

    //     const result = await response.json()
    //     console.log(result)
    // }
              
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
    return sheetBundle
}



describe('handles every kind of case we can think of', () => {

it('returns correctly solved spreadsheets in the A1 notation', () => {

const blueprint = [
        {
          "id": "sheet-0",
          "data": []
        },
        {
          "id": "sheet-1",
          "data": [
            [
              2,
              4,
              8,
              16
            ]
          ]
        }
]

 expect(spreadsheetProcessor(blueprint)).toEqual(blueprint)

 const request1 = [
    {
      "id": "sheet-0",
      "data": [
        [
            1,
            2,
            3,
            "=C1"
        ],
        [
            "=GT(A1, D1)",
            "=A2",
            "=A1",
            "=C2"
        ],
        [
            "=B3",
            "=C3",
            "=D3",
            "=E3",
            "=F3",
            "=G3",
            "=H3",
            "Last"
          ],
          [
            "=CONCAT(F3, ' and ', D3, ' and ', A3)"
          ]
      ]
    }
]

const answer1 = [
    {
      "id": "sheet-0",
      "data": [
        [
            1,
            2,
            3,
            3
        ],
        [
            false,
            false,
            1,
            1
        ],
        [
            "Last",
            "Last",
            "Last",
            "Last",
            "Last",
            "Last",
            "Last",
            "Last"
          ],
          [
            "Last and Last and Last"
          ]
      ]
    }
]

 expect(spreadsheetProcessor(request1)).toEqual(answer1)

 const request2 = [
    {
      "id": "sheet-0",
      "data": [
        [
            1,
            2,
            3,
            "=C1"
        ],
        [
            "=GT(A1, D1)",
            "=GREATER('lol', 5)",
            "=A1",
            "=C2"
        ],
      ]
    }
]

const answer2 = [
    {
      "id": "sheet-0",
      "data": [
        [
          1,
          2,
          3,
          3
        ],
        [
          false,
          "ERROR",
          1,
          1
        ]
      ]
    }
  ]

 expect(spreadsheetProcessor(request2)).toEqual(answer2)

 const request3 = [
    {
      "id": "sheet-0",
      "data": [
        [
          "=A0",
          2,
          3,
          3
        ],
        [
          false,
          "=CONCAT(A1, A2)",
          1,
          1
        ]
      ]
    }
  ]

  const answer3 = [
    {
      "id": "sheet-0",
      "data": [
        [
          "ERROR",
          2,
          3,
          3
        ],
        [
          false,
          "#ERROR: type does not match",
          1,
          1
        ]
      ]
    }
  ]

 expect(spreadsheetProcessor(request3)).toEqual(answer3)

 const request4 = [
    {
      "id": "sheet-0",
      "data": [
        [
          
        ],
        [
          
        ],
        [

        ],
        [

        ],
        [

        ]
      ]
    }
  ]
  const answer4 = [
    {
      "id": "sheet-0",
      "data": [
        [
          
        ],
        [
          
        ],
        [

        ],
        [

        ],
        [

        ]
      ]
    }
  ]

 expect(spreadsheetProcessor(request4)).toEqual(answer4)

 const request5 = [
    {
      "id": "sheet-0",
      "data": [
        [
          "=A2"
        ],
        [
          "=A3"
        ],
        [
          "=A4"
        ],
        [
          "=A5"
        ],
        [
          "=A6"
        ],
        [
          "=A7"
        ],
        [
          "Last"
        ]
      ]
    }
  ]
  const answer5 = [
    {
      "id": "sheet-0",
      "data": [
        [
          "Last"
        ],
        [
          "Last"
        ],
        [
          "Last"
        ],
        [
          "Last"
        ],
        [
          "Last"
        ],
        [
          "Last"
        ],
        [
          "Last"
        ]
      ]
    }
  ]

 expect(spreadsheetProcessor(request5)).toEqual(answer5)

 


 


})

})