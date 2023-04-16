const { getIssuePrompt, getProjectIdPrompt }= require('./prompt')
const { gpt } = require('./gpt')

exports.issuePayload = async (input) => {
    try {
        const prompt = getIssuePrompt(input);
        // console.log({prompt});
        const issue_payload_object = await gpt(prompt);
        // console.log({issue_payload_object});
        const parsedResponse = JSON.parse(issue_payload_object);
        // console.log({parsedResponse});
        const projectPrompt = getProjectIdPrompt(parsedResponse.project);
        // console.log({projectPrompt});
        const projectIdResponse = await gpt(projectPrompt)
        // console.log({projectIdResponse});
        const project_id = Number(projectIdResponse)
        // console.log({project_id});
         parsedResponse.project_id = project_id
        return parsedResponse;
    } catch(err) {
        throw err;
    }
}