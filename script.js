const root = document.getElementById('root')

async function ApiCall() {

    const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')

    const processedData = await apiCall.json()

    // console.log(data)

    const StringifyObject = () => {
        return (
            JSON.stringify(processedData, null, 2)
        )
    }

    const information = processedData.sheets
     
    // console.log(information)
    // console.log(StringifyObject())

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    const dummy = information[7]
    
    let queue = []
    
            for(let data = 0; data < dummy.data.length; data++){
                console.log('ARRAY ' + data)
                queue[data] = []
    
                for(let element = 0; element < dummy.data[data].length; element++) {
    
                    console.log('element ' + element)

                    eval('var ' + alphabet[element] + (data + 1) + '= ' + 'dummy.data[data][element]' + ";")

                    dummy.data[data][element] = eval(alphabet[element] + (data + 1))

                    queue[data].push(eval(alphabet[element] + (data + 1)))
                }
            }

            console.log(queue)

            for(let queueCount = 0; queueCount < queue.length; queueCount++) {

                queue[queueCount] = queue[queueCount].map(element => {
                        return handleResults(element)
                    })

            }

            console.log(queue)

            // eval('var' + alphabet[3] + (1) + '=' + queue[data][element])

            for( let data = 0; data < queue.length; data++ ) {

                

                for( let element = 0; element < queue[data].length; element++) {

                    dummy.data[data][element] = queue[data][element]


                    

                }

            }

            console.log(dummy)
            



        // console.log(A1, B1, C1, D1)
        // console.log(A2, B2, C2, D2)

        function handleResults(argument) {

            let processedArgument

            if(typeof(argument) == 'string') {


                if(argument.includes('=')){

                   processedArgument = argument.replace('=', '')

                    
                    
                   

                }

                

                return eval(processedArgument)
                
            } else return argument
        }

        function MULTIPLY(...args) {
            return args.reduce(function (acc, cur) {
                return acc * cur
            })
        }
    
    
    
    
    
    
    // for(sheet = 0;sheet < information.length; sheet++) {
    //     console.log('SHEET ' + sheet)

    //     for(let data = 0; data < information[sheet].data.length; data++){
    //         console.log('ARRAY ' + data)

    //         for(let element = 0; element < information[sheet].data[data].length; element++) {

    //             console.log('element ' + element)
    //             // eval('var ' + alphabet[i] + (c + 1) + '= ' + data2[c][i] + ";")
    
    //         }

    //     }
    // }
  
    

       
    // }

    
    
    // console.log(A1, B1, C1, D1)

    
}
ApiCall();