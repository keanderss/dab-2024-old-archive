import { serve } from "./deps.js";
import { grade } from "./services/gradingService.js";

const handleRequest = async (request) => {
  // the starting point for the grading api grades code following the
  // gradingDemo function, but does not e.g. use code from the user
  let result;
  try {
    const requestData = await request.json();
    const code = requestData.code;
    const testCode = requestData.testCode;
    result = await grade(code, testCode);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 });
  }

  // in practice, you would either send the code to grade to the grader-api
  // or use e.g. a message queue that the grader api would read and process

  // Log grade result
  console.log(result);

  return new Response(JSON.stringify({ result: result }));
};

const portConfig = { port: 7000, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
