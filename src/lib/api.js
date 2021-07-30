// eslint-disable-next-line 
export default { 
  async getAnswer(question, context) {
    const response = await fetch('https://ihp701pvb4.execute-api.us-west-2.amazonaws.com/dev/qa', {
      method: 'POST',
      body: JSON.stringify({
        "question": question,
        "context": context
      })
    })

    const jsonBody = await response.json()

    if (!response.ok) throw new Error('Ocurrió un error:')

    return jsonBody.answer
  },
}
