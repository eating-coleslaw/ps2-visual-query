import joinStringDelimiterData from "./joinStringDelimiterData"

const joinSiblingDelimiterData = (siblingString = "") => {
    return {
        fullString: siblingString,
        parenPairs: [],
        openParenIndices: [],
        closeParenIndices: [],
        commaIndices: [],
        baseJoinString: "",
        subJoinString: "",
        baseJoinStart: 0,
        baseJoinEnd: null,
        subJoinStart: null,
        subJoinEnd: null,
        subJoinData: null, //joinStringDelimiterData(),
    };
};

export default joinSiblingDelimiterData;