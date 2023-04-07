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
    console.log(dummy)

    const example = eval("=52")
    console.log(example)
    
        //     for(let data = 0; data < dummy.data.length; data++){
        //         console.log('ARRAY ' + data)
    
        //         for(let element = 0; element < dummy.data[data].length; element++) {
    
        //             console.log('element ' + element)

        //             eval('var ' + alphabet[element] + (data + 1) + '= ' + 'dummy.data[data][element]' + ";")
        //         }
        //     }


        // console.log(A1, B1, C1, D1)
        // console.log(A2, B2, C2, D2)
    
    
    
    
    
    
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