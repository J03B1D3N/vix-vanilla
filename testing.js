const apiCall = {
    "submissionUrl": "https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/verify/eyJ0YWdzIjpbXX0",
    "sheets": [
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
      },
      {
        "id": "sheet-2",
        "data": [
          [
            5,
            "=A1",
            22,
            "=C1"
          ]
        ]
      },
      {
        "id": "sheet-3",
        "data": [
          [
            22,
            212212,
            "=SUM(A1, B1)"
          ]
        ]
      },
      {
        "id": "sheet-4",
        "data": [
          [
            221212,
            22,
            "=SUM(A1, B1, D1)",
            212
          ]
        ]
      },
      {
        "id": "sheet-5",
        "data": [
          [
            22,
            212212,
            "=SUM(A1, 6, B1)"
          ]
        ]
      },
      {
        "id": "sheet-6",
        "data": [
          [
            "=MULTIPLY(B1, C1)",
            22,
            212
          ]
        ]
      },
      {
        "id": "sheet-7",
        "data": [
          [
            5,
            22,
            33,
            "=MULTIPLY(A2, B1, C2)"
          ],
          [
            5,
            55,
            22,
            11
          ]
        ]
      },
      {
        "id": "sheet-8",
        "data": [
          [
            6,
            4,
            "=DIVIDE(A1, B1)"
          ]
        ]
      },
      {
        "id": "sheet-9",
        "data": [
          [
            1,
            3,
            "=DIVIDE(A1, B1)"
          ]
        ]
      },
      {
        "id": "sheet-10",
        "data": [
          [
            1,
            3,
            "=GT(A1, B1)"
          ]
        ]
      },
      {
        "id": "sheet-11",
        "data": [
          [
            10.75,
            10.75,
            "=EQ(A1, B1)"
          ]
        ]
      },
      {
        "id": "sheet-12",
        "data": [
          [
            10.75,
            10.75,
            "=EQ(A1, B2)"
          ],
          [
            10.74,
            10.74,
            "=EQ(A2, B2)"
          ]
        ]
      },
      {
        "id": "sheet-13",
        "data": [
          [
            false,
            true,
            true,
            false,
            true,
            "=NOT(D1)"
          ],
          [
            false,
            true,
            false,
            true,
            true,
            false
          ],
          [
            true,
            true,
            true,
            "=NOT(E2)",
            true,
            false
          ]
        ]
      },
      {
        "id": "sheet-14",
        "data": [
          [
            true,
            true,
            false,
            "=AND(A1, B1, C1)"
          ]
        ]
      },
      {
        "id": "sheet-15",
        "data": [
          [
            true,
            false,
            "=AND(A1, B1)"
          ],
          [
            true,
            true,
            "=AND(A2, B2)"
          ],
          [
            true,
            1,
            "=AND(A3, B3)"
          ]
        ]
      },
      {
        "id": "sheet-16",
        "data": [
          [
            true,
            false,
            "=OR(A1, B1)"
          ],
          [
            false,
            false,
            "=OR(A2, B2)"
          ],
          [
            true,
            1,
            "=OR(A3, B3)"
          ]
        ]
      },
      {
        "id": "sheet-17",
        "data": [
          [
            false,
            false,
            true,
            "=OR(A1, B1, C1)"
          ]
        ]
      },
      {
        "id": "sheet-18",
        "data": [
          [
            21221,
            21212,
            "=IF(GT(A1, B1), A1, B1)"
          ]
        ]
      },
      {
        "id": "sheet-19",
        "data": [
          [
            "=CONCAT(\"Hello\", \", \", \"World!\")"
          ]
        ]
      },
      {
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
      },
      {
        "id": "sheet-21",
        "data": [
          [
            "First",
            "=A1",
            "=B1",
            "=C1",
            "=D1",
            "=E1",
            "=F1",
            "=G1"
          ]
        ]
      },
      {
        "id": "sheet-22",
        "data": [
          [
            "First"
          ],
          [
            "=A1"
          ],
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
          ]
        ]
      },
      {
        "id": "sheet-23",
        "data": [
          [
            "=B1",
            "=C1",
            "=D1",
            "=E1",
            "=F1",
            "=G1",
            "=H1",
            "Last"
          ]
        ]
      }
    ]
  }
  const sheetBundle = apiCall.sheets.reverse()

console.log(sheetBundle)

  let reversed = []
  
  for(let sheet = 0;sheet < sheetBundle.length; sheet++) {

     //loop through numbers backwards(54321...)
     for(let data = sheetBundle[sheet].data.length - 1; data > -1; data--){
        sheetBundle[sheet].data[data].reverse()
    }
    
}

const StringifyObject = (arg) => {
    return (
        JSON.stringify(arg, null, 2)
    )
}

console.log(StringifyObject(sheetBundle))