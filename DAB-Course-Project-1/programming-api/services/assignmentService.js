import { sql } from "../database/database.js";

const getAssignments = async () => {
  return await sql`SELECT id, title, handout, assignment_order FROM programming_assignments`
}

const getAssignmentId = async (id) => {
  return await sql`SELECT title, handout, assignment_order FROM programming_assignments WHERE id=${id}`;
};

const getAssignment = async (n) => {
  return await sql`SELECT id, title, handout FROM programming_assignments WHERE assignment_order=${n}`;
};

const getTestCode = async (id) => {
  return await sql`SELECT test_code FROM programming_assignments WHERE id=${id}`
}

const storeSubmission = async (programming_assignment_id, code, user_uuid, submission_status, grader_feedback, correct) => {
  return await sql`INSERT INTO programming_assignment_submissions (programming_assignment_id, code, user_uuid, SUBMISSION_STATUS, grader_feedback, correct) VALUES (${programming_assignment_id, code, user_uuid, submission_status, grader_feedback, correct})`
}



export { getAssignments,getAssignmentId, getAssignment, getTestCode };
