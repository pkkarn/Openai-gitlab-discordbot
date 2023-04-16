const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const axios = require('axios');
const registerCommand = require('./command');
const { getSingle, getProjectList } = require('./gitlab_service')
const { issuePayload } = require('./getPayload')
require('dotenv').config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


registerCommand().then(() => {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
      });
      
      client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;
      
        if (interaction.commandName === 'eddie') {
          const input = interaction.options.getString('q');
          if (!input) {
            return interaction.reply('Please provide an input to format.');
          }
          await interaction.deferReply();
          try {
            // const response1 = await getProjectList()
            // console.log(response);
            
            const payload = await issuePayload(input)
            const response = await getSingle(Number(payload.project_id), Number(payload.issue))
            console.log(response);
              interaction.editReply(response);
              
          } catch(err) {
                interaction.editReply(err.message)
          }
        }
      });
      
      client.login(process.env.BOT_TOKEN);
    })
     