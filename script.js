const root = document.getElementById('root')

async function ApiCall() {

    const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')

    const processedData = await apiCall.json()


    const StringifyObject = (arg) => {
        return (
            JSON.stringify(arg, null, 2)
        )
    }
    let information  = processedData.sheets

    // console.log(StringifyObject(processedData))

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    let queue = []


    
    for(let sheet = 0;sheet < information.length; sheet++) {

        queue = []

        for(let data = 0; data < information[sheet].data.length; data++){
        queue[data] = []

            for(let element = 0; element < information[sheet].data[data].length; element++) {

                eval('var ' + alphabet[element] + (data + 1) + '= ' + 'handleScraping(information[sheet].data[data][element])' + ";")

                queue[data].push(eval(alphabet[element] + (data + 1)))
            }

        }

        for(let queueCount = 0; queueCount < queue.length; queueCount++) {

            // console.log('processing')

            queue[queueCount] = queue[queueCount].map(element => {
                return handleScraping(element)
            })
           
            
            // console.log('processed')
            // console.log(queue)
        }

        for( let data = 0; data < queue.length; data++ ) {

            // console.log('returning results')

            for( let element = 0; element < queue[data].length; element++) {
                information[sheet].data[data][element] = queue[data][element]
            }

            // console.log('results returned')

        }

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
     console.log(StringifyObject(processedData))   


    
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