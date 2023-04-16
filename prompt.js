exports.formatData = (input) => {
    const prompt = `
    (Valid JSON Format): {"title": "TITLE 1", "description": "description 1", "assignee_id", "milestone_id", "labels" },\n\n
    Transform the following input into the desired format, if field is not available and fill as per your understanding, 
    Input: ${input} \n\n (Valid JSON Format):`;
    return prompt;
}


exports.getIssuePrompt = (input) => {
    return `
    Get me issue 23 from project go-mad:
    { "issue": "23", "project": "go-mad" }

    Give me issue 42 from project pearson:
    { "issue": "42", "project": "go-pearson" }

    ${input}:`
}

exports.getProjectIdPrompt = (project) => {
    return `Project Name: Project Id\n\n

    tj-operations: 35699833\n
    tj-waitlist: 34319864\n
    tj-dictionary: 29862705\n
    BoostED Vue: 27830607\n
    zelda: 26241115\n
    tj-client: 26239185\n
    tj-server: 26239159\n
    goMad: 24746557\n\n

        Give me id of TJ Operation: 35699833\n
        What is id of go mad: 24746557\n
        Give me id of ${project}:
    `
}