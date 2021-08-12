import treeToString from "./parameters/tree";
import joinsToString from "./parameters/joins";
import convertToCensusQuery from "./convertToCensusQuery";

export default function createQueryUrl(query) {
  try {
    const censusQuery = convertToCensusQuery(query);
    let url = censusQuery.toUrl();
    url = url.replace("http://", "https://");

    const joinsString = joinsToString(query.joins);

    const treeViewString = treeToString(query.tree);

    return url + treeViewString + joinsString;
  } catch (error) {
    console.log("Error getting query URL: ", error);
    return `Error getting query URL: ${error}`;
  }
}
