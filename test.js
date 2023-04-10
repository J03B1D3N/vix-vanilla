const dummy =  {
    "id": "sheet-20",
    "data": [
      [
        "Codes",
        "AD",
        "AE",
        "AF",
        "AG",
        "AI",
        "AL",
        "AM",
        "AN",
        "AO",
        "AQ",
        "AR",
        "AS",
        "AT",
        "AU",
        "AW",
        "AZ",
        "=CONCAT(I1, \" is \", I2)"
      ],
      [
        "Names",
        "Andorra",
        "United Arab Emirates",
        "Afghanistan",
        "Antigua and Barbuda",
        "Anguilla",
        "Albania",
        "Armenia",
        "Netherlands Antilles",
        "Angola",
        "Antarctica",
        "Argentina",
        "American Samoa",
        "Austria",
        "Australia",
        "Aruba",
        "Azerbaijan",
        "-"
      ]
    ]
  }


  var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  const StringifyObject = (arg) => {
    return (
        JSON.stringify(arg, null, 2)
    )
}


// this solves third and second to last problems.
  queue = []

  for(let data = 0; data < dummy.data.length; data++){
  // console.log('ARRAY ' + data)
  queue[data] = []

      for(let element = 0; element < dummy.data[data].length; element++) {

          // console.log('element ' + element)

          eval('var ' + alphabet[element] + (data + 1) + '= ' + 'handleScraping(dummy.data[data][element])' + ";")

          console.log(eval(alphabet[element] + (data + 1)))

          // dummy.data[data][element] = eval('var ' + alphabet[element] + (data + 1))

          queue[data].push(eval(alphabet[element] + (data + 1)))
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
console.log(queue)
 



    














