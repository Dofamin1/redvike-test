const parseCSVResponse = {
    type: 'array',
    additionalProperties: true
}

const responsesSchemas = {
    parseCSV: {
      200: parseCSVResponse
    }
};

export default responsesSchemas;
