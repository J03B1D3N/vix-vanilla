const root = document.getElementById('root')

async function ApiCall() {

    const apiCall = await fetch('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets')

    const data = await apiCall.json()

    // console.log(data)

    const StringifyObject = () => {
        return (
            JSON.stringify(data, null, 2)
        )
    }

    const data2 = data.sheets[1].data[0]
     
    console.log(data2)
    // console.log(StringifyObject())

    for(i = 0; i < data2.length; i++) {
        eval('var ' + `A${i + 1}` + '= ' + data2[i] + ";")
        console.log('done', i +1)
    }
    
    console.log(A1)

    
}
ApiCall();