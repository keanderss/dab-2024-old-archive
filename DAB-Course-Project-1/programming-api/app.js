import * as assignmentService from "./services/assignmentService.js";
import { serve } from "./deps.js";
import { sql } from "./database/database.js";

const handleGetAssignments = async (request) => {
  return Response.json(await assignmentService.getAssignments()); 
}

const handleGetAssignmentId = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;

  const assignment = await assignmentService.getAssignmentId(id);
  if (assignment) {
    return Response.json(assignment);
  }
  return new Response("Not found", { status: 404 });
};

const handleGetAssignment = async (request, urlPatternResult) => {
  const n = urlPatternResult.pathname.groups.n;

  const assignment = await assignmentService.getAssignment(n);
  if (assignment) {
    return Response.json(assignment);
  }
  return new Response("Not found", { status: 404 });
};

const handleGradeAssignment = async (request, urlPatternResult) => {
  const requestData = await request.json();
  const id = urlPatternResult.pathname.groups.id;
  console.log(id)
  const testCode = await assignmentService.getTestCode(id);
  console.log(testCode)
  if (testCode) {
    const data = {
      testCode: testCode[0].test_code,
      code: requestData.code,
    };
    // Check if the submission code and result is already stored
    
    // If the submission exists skip the next step and return the stored results

    // If the submissoin doesn't exist send it to the grader
    const response = await fetch("http://grader-api:7000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response)
    // Once the submission is graded process the results and then store it
    
    return response;
  }
  return new Response("Not found", { status: 404 });
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignments" }),
    fn: handleGetAssignments,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignments/id/:id" }),
    fn: handleGetAssignmentId,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignments/:n" }),
    fn: handleGetAssignment,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/grade/:id" }),
    fn: handleGradeAssignment,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 });
  }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
