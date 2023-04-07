const root = document.getElementById('root')

async function ApiCall() {

    const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')

    const processedData = await apiCall.json()

    // console.log(data)

    const StringifyObject = () => {
        return (
            JSON.stringify(data, null, 2)
        )
    }

    const information = processedData.sheets
     
    // console.log(information)
    // console.log(StringifyObject())

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    const dummy = information[7]
    

    
            for(let data = 0; data < dummy.data.length; data++){
                console.log('ARRAY ' + data)
    
                for(let element = 0; element < dummy.data[data].length; element++) {
    
                    console.log('element ' + element)

                    eval('var ' + alphabet[element] + (data + 1) + '= ' + 'dummy.data[data][element]' + ";")

                    dummy.data[data][element] = eval(alphabet[element] + (data + 1))

                    // queue.push(eval(alphabet[element] + (data + 1)))
                }
            }

            console.log(dummy)

        

            let queue = [A1, B1, C1, D1]

            console.log(queue)

            D1 = 'lololol'

            console.log(queue)

            
        //    queue = queue.map(element => {
        //         return handleResults(element)
        //     })




        console.log(A1, B1, C1, D1)
        console.log(A2, B2, C2, D2)

        function handleResults(argument) {

            let processedArgument

            if(typeof(argument) == 'string') {


                if(argument.includes('=')){

                   processedArgument = argument.replace('=', '')

                    
                    
                   

                }

                return processedArgument
                
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