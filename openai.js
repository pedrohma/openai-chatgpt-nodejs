const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()
const color = require('./colors')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const model = {
    textdavinci003: 'text-davinci-003', // Up to Jun 2021
    textcurie001: 'text-curie-001', // Up to Oct 2019
    textbabbage001: 'text-babbage-001', // Up to Oct 2019
    textada001: 'text-ada-001', // Up to Oct 2019
}

const choosen_model = model.textada001

async function interaction(userInput) {
    console.log(
        color.green,
        `Processing OpenAI request for '${userInput}' with model ${choosen_model}.`,
    )
    const completion = await openai.createCompletion({
        model: choosen_model,
        prompt: userInput,
    })

    const choices = completion.data.choices
    console.log(color.yellow, `ChatGTP choices: ${JSON.stringify(choices)}`)

    if (choices == undefined || choices.length === 0) {
        return `Chat GPT couldn't find an answer for your input.`
    }

    const response = choices[0].text.replace('\n\n', '\n')
    console.log(color.yellow, `ChatGTP response: ${response}`)

    return response
}

module.exports = { interaction }
