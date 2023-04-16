var gitlab = require('node-gitlab');
require('dotenv').config()

var gitlab_client = gitlab.createPromise({
    api: 'https://gitlab.com/api/v4',
    privateToken: process.env.GITLAB_KEY
});

exports.getAll = async (projectId) => {
    try {
        const response = await gitlab_client.issues.list({id: projectId})
        const issues = response.map(issue => ({
            title: issue.title,
            description: issue.description,
            state: issue.state,
            author: issue.author.username,
            assignee: issue.assignees.map(i => i.username),
            issue_link: issue._links.self
        }))
        
        const embed = {
            color: 0x0099ff,
            title: 'List of Issues',
            description: 'Here are the issues:',
            fields: []
          };
          
          issues.forEach(issue => {
            embed.fields.push({
              name: `Issue #${issue.issue_link.split('/').pop()}`,
              value: `**Title:** ${issue.title}\n` +
                `**Description:** ${issue.description}\n` +
                `**State:** ${issue.state}\n` +
                `**Author:** ${issue.author}\n` +
                `**Assignee(s):** ${issue.assignee.join(', ')}\n` +
                `**Link:** ${issue.issue_link}\n\n`
            });
          });
        return embed;
    } catch (err) {
        throw Error(err)
    }
}

exports.getSingle = async (projectId, issueId) => {
    try {
        const response = await gitlab_client.issues.get({
            id: projectId,
            issue_id: issueId
        })
    
        const embed = {
            color: 0x0099ff,
            title: response.title,
            description: response.description,
            fields: []
          };
    
        return { embeds: [embed] };
    } catch(err) {
        throw err;
    }
}

exports.getProjectList = async () => {
    const response = await gitlab_client.projects.list({
        membership: true});

    const embed = {
            color: 0x0099ff,
            title: 'List of Issues',
            description: 'Here are the issues:',
            fields: []
          };

    response.forEach(project => {
       embed.description += `${project.name}: ${project.id}\n` 
        embed.fields.push({
            name: project.name,
            value: project.id
        })
    })
    return { embeds: [embed] };
}