const joinStringDelimiterData = (depth, joinString) => {
    return {
        depth,
        joinString,
        siblingSplitIndices: [0],
        siblingsData: [],
    };
};

export default joinStringDelimiterData;