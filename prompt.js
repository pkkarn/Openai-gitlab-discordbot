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

    MegaBooster: 27830607\n
    AI_Alpine: 26241115\n
    Project768: 26239185\n
    CodeMiner: 26239159\n
    ShockWave: 24746557\n\n

        Give me id of mega boost: 27830607\n
        What is id of project miner: 26239159\n
        Give me id of ${project}:
    `
}
