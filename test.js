async function ApiCall() {

    const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')

    const processedData = await apiCall.json()


    const StringifyObject = (arg) => {
        return (
            JSON.stringify(arg, null, 2)
        )
    }

    //store the sheets in variable
    let information  = processedData.sheets[23]

    //initialise the alphabet array
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    //innitialise queue
    let queue = []


   

        //loops through the rows (123456789...)
        for(let data = 0; data < information.data.length; data++){

        //clean the rows with each iteration
        queue[data] = []

            //loops through collumns (ABCDEFG...)
            for(let element = 0; element < information.data[data].length; element++) {
                const variable = 'var ' + alphabet[element] + (data + 1)

                eval(variable + '= ' + 'handleScraping(information.data[data][element])' + ";")
                
                queue[data].push(eval(alphabet[element] + (data + 1)))
            }

            for(let data = 0; data < information.data.length; data++){

                //clean the rows with each iteration
                queue[data] = []
        
                    //loops through collumns (ABCDEFG...)
                    for(let element = information.data[data].length; element > 0; element--) {
                        const variable = 'var ' + alphabet[element] + (data + 1)
        
                        eval(variable + '= ' + 'handleTest(information.data[data][element])' + ";")
                        
                        queue[data].push(eval(alphabet[element] + (data + 1)))
                    }

                    console.log(queue)
                }


    }
    console.log(queue)
    console.log(H1)
    


    console.log(StringifyObject(information))   



    function handleTest(argument) {

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
    
     function handleScraping(argument) {

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

 



    

















