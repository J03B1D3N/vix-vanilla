async function ApiCall() {

    const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')

    let processedData = await apiCall.json()

    //prepare the sheets for scraping
    let information  = processedData.sheets

    //initialise alphabet 
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    

    // loop through sheets
    for(let sheet = 0;sheet < information.length; sheet++) {

        //initialise the queue
        queue = []

        //loop through numbers (123456...)
        for(let data = 0; data < information[sheet].data.length; data++){
        queue[data] = []

            //loop through letters (ABCDFG...)
            for(let element = 0; element < information[sheet].data[data].length; element++) {

                //create a variable with corresponding A1 notation and solve it immediatelly if possible.
                eval('var ' + alphabet[element] + (data + 1) + '= ' + 'handleScraping(information[sheet].data[data][element])' + ";")

                //push the value of solved/unsolved variable into a queue
                queue[data].push(eval(alphabet[element] + (data + 1)))
            }

        }
       

        // process the queue
        for(let queueCount = 0; queueCount < queue.length; queueCount++) {

            queue[queueCount] = queue[queueCount].map(element => {
                return process(element)
            })
           
        }

        //check queue for null value, which means we had backwards rendering issues
        for( let data = 0; data < queue.length; data++ ) {

            if(queue[data].includes(null)) {

                    //set the global variables to null to avoid errors.
                    for(let sheet = 0;sheet < information.length; sheet++) {
                
                        for(let data = 0; data < information[sheet].data.length; data++){
                
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

            for( let element = 0; element < queue[data].length; element++) {
                information[sheet].data[data][element] = queue[data][element]
            }

        }

        //set the global variables to null to avoid errors.
        for(let sheet = 0;sheet < information.length; sheet++) {
    
            for(let data = 0; data < information[sheet].data.length; data++){
    
                for(let element = 0; element < information[sheet].data[data].length; element++) {
    
                    eval('var ' + alphabet[element] + (data + 1) + '= ' + 'null' +";")
    
                }
    
            }

     }
    }
    
    // //not sure if this is nescesarry for the submition. Going to leave it here just in case.
    // let submission  = {
    //     "email": "justas.lapinas.98@gmail.com",
    //     "results": null
    // }

    // submission["results"] = processedData["sheets"]

    // const response = await fetch("https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/verify/eyJ0YWdzIjpbXX0", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(submission),
    //   });


    // const result = await response.json()
    // console.log(result)



    //function which scrapes the info and solves the variable if it can.
     function handleScraping(argument) {

        try{
    
            let processedArgument = argument
    
       
            if(typeof argument == 'string') {
    
                if(argument.includes('=')){

                    //skips the functions because often cant solve them correctly without all variables being present.
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

    //practically same function like handleScraping(), but doesn't skip the functions because all of the variables have been
    //initialised and we can finally solve them.
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


        //function for multiplying any amount of arguments
        function MULTIPLY(...args) {
            return args.reduce(function (acc, cur) {
                return acc * cur
            })
        }

        //function for adding any amount of arguments
        function SUM(...args) {
            return args.reduce(function (acc, cur) {
                return acc + cur
            })
        }

        //function for dividing any amount of arguments
        function DIVIDE(...args) {
            return args.reduce(function (acc, cur) {
                return acc / cur
            })
        }

        //takes two arguments, evaluates them and returns true if first one is bigger, false if not.
        function GT(a,b) {
            return (a > b ? true : false)
        }

        //takes two arguments, evaluates them, returns true if they're eual, false if not.
        function EQ(a,b) {
            return (a == b ? true : false)
        }

        //reverses argument
        function NOT(a) {
            return !a
        }

        //checks if all of arguments are true.
        function AND(...args) {
            
        const includesNotABoolean = (element) => typeof element === 'string' || typeof element === 'number'
            
            return (args.some(includesNotABoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
                return acc && cur
            }))
           
        }

        //checks if at least one of the arguments is true
        function OR(...args) {
            const includesNotABoolean = (element) => typeof element === 'string' || typeof element === 'number'
            return (args.some(includesNotABoolean) ? '#ERROR: type does not match' : args.reduce(function (acc, cur) {
                return acc || cur
            }))
        }

        //if condition is true returns first argument, if not returns second
        function IF(condition, arg1, arg2) {
            if(condition) {
                return arg1
            } else return arg2
        }

        //concats any amount of strings
        function CONCAT(...args) {
            return args.reduce(function (acc, cur) {
                return acc.concat(cur)
            })
        }

    
}
ApiCall();