// This is a temporary solution to creating the join parameter string query URL,
// as the dbcensus package does not do this properly for nested sibling joins
// (e.g. it returns join_a(join_bjoin_c) instead of join_a(join_b,join_c)).
// defaultSettings, getSetArgs, toJoinString are slightly are slightly modified
// copies from dbgcensus/census-join

var defaultSettings = {
  list: false,
  outer: true,
  show: [],
  hide: [],
  terms: [],
  on: null,
  to: null,
  inject_at: null,
};

const convertTermToString = (term) => {
  const field = term.field;
  const operator = term.operator;
  const value = term.value;

  if (!!field && !!operator && !!value) {
    return field + operator.value + value;
  }

  return "";
};

const convertToCensusJoin = (appJoin) => {
  let joins = [];
  if (appJoin.joins.length > 0) {
    joins = appJoin.joins.map((join) => convertToCensusJoin(join));
  }

  const joinTerms = appJoin.terms;
  let terms = [];
  for (let i = 0; i < joinTerms.length; i++) {
    const term = joinTerms[i];
    const termString = convertTermToString(term);
    if (!!termString) {
      terms.push(termString);
    }
  }

  return {
    service: appJoin.collection,
    settings: {
      list: appJoin.isList,
      outer: appJoin.isOuterJoin,
      show: appJoin.filterType === "show" ? [...appJoin.filterFields] : [],
      hide: appJoin.filterType === "hide" ? [...appJoin.filterFields] : [],
      terms: terms,
      on: !!appJoin.onField ? appJoin.onField : null,
      to: !!appJoin.toField ? appJoin.toField : null,
      inject_at: !!appJoin.injectAt ? appJoin.injectAt : null,
    },
    join: joins,
  };
};

const getSetArgs = function (censusJoin) {
  var keys = Object.keys(defaultSettings);

  var setSettings = {};
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];

    var defaultSetting = defaultSettings[key];
    var customSetting = censusJoin.settings[key];

    if (defaultSetting instanceof Array && customSetting instanceof Array) {
      if (defaultSetting.length !== customSetting.length) {
        setSettings[key] = customSetting;
      }
    } else if (defaultSetting !== customSetting) {
      setSettings[key] = customSetting;
    }
  }

  return setSettings;
};

const toJoinString = (censusJoin) => {
  var stringArgs = [];
  var args = getSetArgs(censusJoin);
  var keys = Object.keys(args);

  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    var prefix = "^" + key + ":";

    if (args[key] instanceof Array) {
      var argArr = args[key];
      var arrStr = "";
      for (let i = 0; i < argArr.length; i++) {
        if (i !== 0) {
          arrStr += "'";
        }
        arrStr += argArr[i];
      }
      stringArgs.push(prefix + arrStr);
    } else {
      stringArgs.push(prefix + args[key].toString());
    }
  }

  var argStr = "";
  for (let i = 0; i < stringArgs.length; i++) {
    argStr += stringArgs[i];
  }

  if (censusJoin.join.length > 0) {
    argStr += "(";
    const stringJoins = [];
    for (let j = 0; j < censusJoin.join.length; j++) {
      stringJoins.push(toJoinString(censusJoin.join[j]));
    }
    argStr += stringJoins.toString();
    argStr += ")";
  }

  return censusJoin.service + argStr;
};

export default function toString(censusJoins) {
  const stringJoins = censusJoins.map((join) => {
    return toJoinString(convertToCensusJoin(join));
  });

  if (stringJoins.length > 0) {
    return `&c:join=${stringJoins.toString()}`;
  }

  return "";
}
