const submission = "test"

async function submit() {


    const response = await fetch("https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/verify/eyJ0YWdzIjpbXX0", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "http://127.0.0.1:5500/"
        },
        body: JSON.stringify(submission),
      });
      const resutls = await response.json()
      console.log(resutls)


}
submit()

