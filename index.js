const color = require('./colors')
const prompt = require('prompt-sync')({ sigint: true })
const interaction = require('./openai').interaction

async function run() {
    console.log(color.yellow, `Starting ChatGPT at ${new Date()}.`)
    console.log(
        color.green,
        `Ask ChatGPT anything... (type 'quit' to exit the program).`,
    )
    let userInput = prompt()
    while (userInput !== 'quit') {
        console.log(color.cyan, await interaction(userInput))
        userInput = prompt()
    }
}

run()
