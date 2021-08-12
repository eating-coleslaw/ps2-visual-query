import { v4 as uuid } from "uuid";
import QueryCondition from "../../planetside/QueryCondition";
import QueryConfig from "../../planetside/QueryConfig";
import QueryJoin from "../../planetside/QueryJoin";
import QueryOperator from "../../planetside/QueryOperator";
import parseQueryUrl from "../../planetside/queryUrlParsing/queryUrlParser";

jest.mock("uuid");

const mockId = "1094";
uuid.mockImplementation(() => mockId);

test("Inner join example", () => {
  const input =
    "https://census.daybreakgames.com/get/ps2/map?world_id=1&zone_ids=2&c:join=map_region^inject_at:map_region^on:Regions.Row.RowData.RegionId^to:map_region_id";

  const mockId = "1094";
  uuid.mockImplementation(() => mockId);

  const expected = QueryConfig("map");

  const worldIdCondition = QueryCondition("equals");
  worldIdCondition.field = "world_id";
  worldIdCondition.value = "1";

  const zoneIdsCondition = QueryCondition("equals");
  zoneIdsCondition.field = "zone_ids";
  zoneIdsCondition.value = "2";

  expected.conditions = [worldIdCondition, zoneIdsCondition];

  const rootJoin = QueryJoin();
  rootJoin.collection = "map_region";
  rootJoin.injectAt = "map_region";
  rootJoin.onField = "Regions.Row.RowData.RegionId";
  rootJoin.toField = "map_region_id";

  expected.joins = [rootJoin];

  expect(parseQueryUrl(input)).toEqual(expected);
});

test("Online Outfit Members example", () => {
  const input =
    "http://census.daybreakgames.com/get/ps2/outfit?alias_lower=mums&c:show=name,outfit_id&c:join=outfit_member^inject_at:members^show:character_id%27rank^outer:0^list:1(character^show:name.first^inject_at:character^outer:0^on:character_id(characters_online_status^inject_at:online_status^show:online_status^outer:0(world^on:online_status^to:world_id^outer:0^show:world_id^inject_at:ignore_this)))";

  const mockId = "1094";
  uuid.mockImplementation(() => mockId);

  const expected = QueryConfig("outfit");

  expected.conditions = [
    {
      id: mockId,
      field: "alias_lower",
      value: "mums",
      operator: QueryOperator("equals"),
    },
  ];

  expected.filterType = "show";
  expected.filterFields = ["name", "outfit_id"];

  /*
    join=outfit_member^inject_at:members^show:character_id'rank^outer:0^list:1
      (character^show:name.first^inject_at:character^outer:0^on:character_id
          (characters_online_status^inject_at:online_status^show:online_status^outer:0
              (world^on:online_status^to:world_id^outer:0^show:world_id^inject_at:ignore_this)
          )
      )
  */
  const rootJoin = QueryJoin();
  rootJoin.collection = "outfit_member";
  rootJoin.injectAt = "members";
  rootJoin.filterType = "show";
  rootJoin.filterFields = ["character_id", "rank"];
  rootJoin.isOuterJoin = false;
  rootJoin.isList = true;

  const firstChildJoin = QueryJoin(mockId);
  firstChildJoin.collection = "character";
  firstChildJoin.filterType = "show";
  firstChildJoin.filterFields = ["name.first"];
  firstChildJoin.injectAt = "character";
  firstChildJoin.isOuterJoin = false;
  firstChildJoin.onField = "character_id";

  const secondChildJoin = QueryJoin(mockId);
  secondChildJoin.collection = "characters_online_status";
  secondChildJoin.injectAt = "online_status";
  secondChildJoin.filterType = "show";
  secondChildJoin.filterFields = ["online_status"];
  secondChildJoin.isOuterJoin = false;

  const lastChildJoin = QueryJoin(mockId);
  lastChildJoin.collection = "world";
  lastChildJoin.onField = "online_status";
  lastChildJoin.toField = "world_id";
  lastChildJoin.isOuterJoin = false;
  lastChildJoin.filterType = "show";
  lastChildJoin.filterFields = ["world_id"];
  lastChildJoin.injectAt = "ignore_this";

  secondChildJoin.joins = [lastChildJoin];

  firstChildJoin.joins = [secondChildJoin];

  rootJoin.joins = [firstChildJoin];

  expected.joins = [rootJoin];

  expect(parseQueryUrl(input)).toEqual(expected);
});

test("Cooltrain's chonky character", () => {
  const input =
    "https://census.daybreakgames.com/s:example/get/ps2:v2/character/?name.first_lower=chirtle&c:hide=head_id,title_id,profile_id,times.creation,times.creation_date,times.last_save,times.last_save_date,times.last_login,times.login_count,daily_ribbon,certs.gifted_points,certs.spent_points,certs.available_points,certs.percent_to_next,battle_rank.percent_to_next&c:resolve=online_status&c:join=characters_stat_history^terms:stat_name=kills^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Kills&c:join=characters_stat_history^terms:stat_name=deaths^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Deaths&c:join=characters_stat_history^terms:stat_name=score^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Score&c:join=faction^inject_at:faction^show:name.en'faction_id&c:join=outfit_member_extended^inject_at:outfit^show:name'alias&c:join=characters_weapon_stat^list:1^inject_at:Stats.WeaponStat(item^inject_at:item^show:faction_id'name.en^terms:faction_id=3^outer:0),characters_weapon_stat_by_faction^list:1^inject_at:Stats.WeaponStatFaction(item^inject_at:item^show:faction_id'name.en^terms:faction_id=3^outer:0)";

  const mockId = "1094";
  uuid.mockImplementation(() => mockId);

  const expected = QueryConfig("character");

  /*
  character
  name.first_lower=chirtle
  &c:hide=head_id,title_id,profile_id,times.creation,times.creation_date,times.last_save,times.last_save_date,times.last_login,times.login_count,daily_ribbon,certs.gifted_points,certs.spent_points,certs.available_points,certs.percent_to_next,battle_rank.percent_to_next
  &c:resolve=online_status
  */

  const nameCondition = QueryCondition("equals");
  nameCondition.field = "name.first_lower";
  nameCondition.value = "chirtle";

  expected.conditions = [nameCondition];

  // expected.conditions = [
  //   {
  //     id: mockId,
  //     field: "name.first_lower",
  //     value: "chirtle",
  //     operator: QueryOperator("equals")
  //   },
  // ];

  expected.filterType = "hide";
  expected.filterFields = [
    "head_id",
    "title_id",
    "profile_id",
    "times.creation",
    "times.creation_date",
    "times.last_save",
    "times.last_save_date",
    "times.last_login",
    "times.login_count",
    "daily_ribbon",
    "certs.gifted_points",
    "certs.spent_points",
    "certs.available_points",
    "certs.percent_to_next",
    "battle_rank.percent_to_next",
  ];

  expected.resolves = ["online_status"];

  /*
    join=characters_stat_history^terms:stat_name=kills^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Kills
    join=characters_stat_history^terms:stat_name=deaths^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Deaths
    join=characters_stat_history^terms:stat_name=score^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Score
    join=faction^inject_at:faction^show:name.en'faction_id
    join=outfit_member_extended^inject_at:outfit^show:name'alias
    join=characters_weapon_stat^list:1^inject_at:Stats.WeaponStat
      (item^inject_at:item^show:faction_id'name.en^terms:faction_id=3^outer:0)
    ,characters_weapon_stat_by_faction^list:1^inject_at:Stats.WeaponStatFaction
      (item^inject_at:item^show:faction_id'name.en^terms:faction_id=3^outer:0)
  */

  // characters_stat_history^terms:stat_name=kills^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Kills
  const killsRootJoin = QueryJoin();
  killsRootJoin.collection = "characters_stat_history";
  killsRootJoin.terms = [
    {
      id: mockId,
      field: "stat_name",
      value: "kills",
      operator: QueryOperator("equals"),
    },
  ];
  killsRootJoin.filterType = "hide";
  killsRootJoin.filterFields = [
    "character_id",
    "day",
    "week",
    "month",
    "last_save",
    "last_save_date",
    "one_life_max",
  ];
  killsRootJoin.injectAt = "Stats.History.Kills";

  expected.joins.push(killsRootJoin);

  // characters_stat_history^terms:stat_name=deaths^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Deaths
  const deathsRootJoin = QueryJoin();
  deathsRootJoin.collection = "characters_stat_history";
  deathsRootJoin.terms = [
    {
      id: mockId,
      field: "stat_name",
      value: "deaths",
      operator: QueryOperator("equals"),
    },
  ];
  deathsRootJoin.filterType = "hide";
  deathsRootJoin.filterFields = [
    "character_id",
    "day",
    "week",
    "month",
    "last_save",
    "last_save_date",
    "one_life_max",
  ];
  deathsRootJoin.injectAt = "Stats.History.Deaths";

  expected.joins.push(deathsRootJoin);

  // characters_stat_history^terms:stat_name=score^hide:character_id'day'week'month'last_save'last_save_date'one_life_max^inject_at:Stats.History.Score
  const scoreRootJoin = QueryJoin();
  scoreRootJoin.collection = "characters_stat_history";
  scoreRootJoin.terms = [
    {
      id: mockId,
      field: "stat_name",
      value: "score",
      operator: QueryOperator("equals"),
    },
  ];
  scoreRootJoin.filterType = "hide";
  scoreRootJoin.filterFields = [
    "character_id",
    "day",
    "week",
    "month",
    "last_save",
    "last_save_date",
    "one_life_max",
  ];
  scoreRootJoin.injectAt = "Stats.History.Score";

  expected.joins.push(scoreRootJoin);

  // join=faction^inject_at:faction^show:name.en'faction_id
  const factionRootJoin = QueryJoin();
  factionRootJoin.collection = "faction";
  factionRootJoin.injectAt = "faction";
  factionRootJoin.filterType = "show";
  factionRootJoin.filterFields = ["name.en", "faction_id"];

  expected.joins.push(factionRootJoin);

  // outfit_member_extended^inject_at:outfit^show:name'alias
  const outfitRootJoin = QueryJoin();
  outfitRootJoin.collection = "outfit_member_extended";
  outfitRootJoin.injectAt = "outfit";
  outfitRootJoin.filterType = "show";
  outfitRootJoin.filterFields = ["name", "alias"];

  expected.joins.push(outfitRootJoin);

  // join=characters_weapon_stat^list:1^inject_at:Stats.WeaponStat
  //   (item^inject_at:item^show:faction_id'name.en^terms:faction_id=3^outer:0)
  const weaponsRootJoin = QueryJoin();
  weaponsRootJoin.collection = "characters_weapon_stat";
  weaponsRootJoin.isList = true;
  weaponsRootJoin.injectAt = "Stats.WeaponStat";

  const weaponChildJoin = QueryJoin(mockId);
  weaponChildJoin.collection = "item";
  weaponChildJoin.injectAt = "item";
  weaponChildJoin.filterType = "show";
  weaponChildJoin.filterFields = ["faction_id", "name.en"];
  weaponChildJoin.isOuterJoin = false;
  weaponChildJoin.terms = [
    {
      id: mockId,
      field: "faction_id",
      value: "3",
      operator: QueryOperator("equals"),
    },
  ];

  weaponsRootJoin.joins = [weaponChildJoin];

  expected.joins.push(weaponsRootJoin);

  // characters_weapon_stat_by_faction^list:1^inject_at:Stats.WeaponStatFaction
  //   (item^inject_at:item^show:faction_id'name.en^terms:faction_id=3^outer:0)
  const weaponFactionRootJoin = QueryJoin();
  weaponFactionRootJoin.collection = "characters_weapon_stat_by_faction";
  weaponFactionRootJoin.isList = true;
  weaponFactionRootJoin.injectAt = "Stats.WeaponStatFaction";

  const weaponFactionChildJoin = QueryJoin(mockId);
  weaponFactionChildJoin.collection = "item";
  weaponFactionChildJoin.injectAt = "item";
  weaponFactionChildJoin.filterType = "show";
  weaponFactionChildJoin.filterFields = ["faction_id", "name.en"];
  weaponFactionChildJoin.isOuterJoin = false;
  weaponFactionChildJoin.terms = [
    {
      id: mockId,
      field: "faction_id",
      value: "3",
      operator: QueryOperator("equals"),
    },
  ];

  weaponFactionRootJoin.joins = [weaponFactionChildJoin];

  expected.joins.push(weaponFactionRootJoin);

  expect(parseQueryUrl(input)).toEqual(expected);
});
