async function ApiCall() {

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

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    let queue = []

    let submission  = {
        "email": "justas.lapinas.98@gmail.com",
        "results": null
    }

   



    // loop through sheets
    for(let sheet = 0;sheet < information.length; sheet++) {

        queue = []

        //loop through numbers (123456...)
        for(let data = 0; data < information[sheet].data.length; data++){
        queue[data] = []

            //loop through letters (ABCDFG...)
            for(let element = 0; element < information[sheet].data[data].length; element++) {

                //create a variable with corresponding A1 notation and solve it immediatelly if possible.
                eval('var ' + alphabet[element] + (data + 1) + '= ' + 'handleScraping(information[sheet].data[data][element])' + ";")

                //push the value of solved/unsolved variable unto a queue
                queue[data].push(eval(alphabet[element] + (data + 1)))
            }

        }
       

        // process the queue, now that all variables are available
        for(let queueCount = 0; queueCount < queue.length; queueCount++) {

            // console.log('processing')

            queue[queueCount] = queue[queueCount].map(element => {
                return process(element)
            })
           
            
            // console.log('processed')
            // console.log(queue)
        }

        //check queue for null value, which means we had backwards rendering issues
        for( let data = 0; data < queue.length; data++ ) {

            if(queue[data].includes(null)) {

                    //set the global variables to null to avoid errors.
                    for(let sheet = 0;sheet < information.length; sheet++) {

                        queue = []
                
                        for(let data = 0; data < information[sheet].data.length; data++){
                        queue[data] = []
                
                            for(let element = 0; element < information[sheet].data[data].length; element++) {
                
                                eval('var ' + alphabet[element] + (data + 1) + '= ' + 'null' +";")
                
                            }
                
                        }

                    }

                let newQueue = []
                
                //rerender the variables back to front

                //loop through numbers (12345...)
                for(let data = 0; data < information[sheet].data.length; data++){
                    newQueue[data] = []

                    //loop through the letters back to front (ZYXWV...)
                    for(let element = information[sheet].data[data].length - 1; element > -1; element--){

                        const variable = 'var ' + alphabet[element] + (data + 1)
        
                        eval(variable + '= ' + 'handleScraping(information[sheet].data[data][element])' + ";")

                        
                        newQueue[data].push(eval(alphabet[element] + (data + 1)))
                        
                    }
                }

                //we reverse the results to be in correct order
                newQueue.reverse()

                queue = newQueue

            }

        }



        //return all the results to their corresponding places.
        for( let data = 0; data < queue.length; data++ ) {

            // console.log('returning results')
           

            for( let element = 0; element < queue[data].length; element++) {
                information[sheet].data[data][element] = queue[data][element]
            }

            // console.log('results returned')

        }

        //set the global variables to null to avoid errors.
        for(let sheet = 0;sheet < information.length; sheet++) {

            queue = []
    
            for(let data = 0; data < information[sheet].data.length; data++){
            queue[data] = []
    
                for(let element = 0; element < information[sheet].data[data].length; element++) {
    
                    eval('var ' + alphabet[element] + (data + 1) + '= ' + 'null' +";")
    
                }
    
            }

     }

    }

    // submission["results"] = processedData["sheets"]
    console.log(StringifyObject(processedData))   

    // const response = await fetch("https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/verify/eyJ0YWdzIjpbXX0", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(submission),
    //   });


    // const result = await response.json()
    // console.log(result)



    //function which solves the variable if it can.
     function handleScraping(argument) {

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

    function process(argument) {

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

            return argument 

        }

    }



        function MULTIPLY(...args) {
            return args.reduce(function (acc, cur) {
                return acc * cur
            })
        }
        function SUM(...args) {
            return args.reduce(function (acc, cur) {
                return acc + cur
            })
        }
        function DIVIDE(...args) {
            return args.reduce(function (acc, cur) {
                return acc / cur
            })
        }
        function GT(a,b) {
            return (a > b ? true : false)
        }
        function EQ(a,b) {
            return (a == b ? true : false)
        }
        function NOT(a) {
            return !a
        }
        function AND(...args) {
            
        const includesNotABoolean = (element) => typeof element === 'string' || typeof element === 'number'
            
            return (args.some(includesNotABoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
                return acc && cur
            }))
           
        }
        function OR(...args) {
            const includesNotABoolean = (element) => typeof element === 'string' || typeof element === 'number'
            return (args.some(includesNotABoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
                return acc || cur
            }))
        }
        function IF(condition, arg1, arg2) {
            if(condition) {
                return arg1
            } else return arg2
        }
        function CONCAT(...args) {
            return args.reduce(function (acc, cur) {
                return acc.concat(cur)
            })
        }

    
}
ApiCall();