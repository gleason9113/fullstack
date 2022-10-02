/**
 * Code from Ch 7.
 * Written and added to repo for study purposes.
 * Feedback welcome.
 */

//Points:  a, b, c, d, e, f, g, m, p, s, t
//I changed the locations from the example code because I'm too lazy to type all that.
//Consider "p" to refer to the Post Office, however.

const roads = [
  //Array of edges
  "a b",
  "a c",
  "a p",
  "b t",
  "d e",
  "d t",
  "e g",
  "g f",
  "g s",
  "m f",
  "m p",
  "m s",
];

const mailRoute = [
  "a",
  "c",
  "a",
  "b",
  "t",
  "d",
  "e",
  "g",
  "s",
  "g",
  "f",
  "m",
  "p",
];

//Utility function for picking random element from array.
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

//Utility function for finding a route from one point to another through the graph.
//Todo:  Find a better algorithm?
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

/**
 *
 * @param {*} state A VillageState object.
 * @returns A randomly chosen direction from the options available at the current node.
 * This robot solves the problem by selecting nodes at random to travel to.  While this
 * is guaranteed to work, it represents the worst possible option in terms of efficiency.
 */
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

/**
 *
 * @param {*} state A VillageState object
 * @param {*} memory An array representing a route that passes through each node in the graph.
 * @returns The next node in the mailRoute array.
 * This robot circles a specified route that visits each node in the graph.  This robot solves
 * the problem in a maximum of 26 turns. Compare with the randomRobot above.
 */
function routeRobot(state, memory) {
  if (memory == undefined || memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

/**
 *
 * @param {*} param0 The current location of the robot and the list of packages to be delivered.
 * @param {*} route The list of nodes to visit.
 * @returns The next node to visit and the updated route information
 * This robot uses the findRoute function to map its route based on the origin and destination nodes of the
 * next package to be delivered.
 * Efficiency is better on average than the routeRobot (Run to compare).
 * The improvement here would be to find a better algorithm for generating a route.
 * Going further, more improvements can be made by sorting the packages in an order such that the number
 * of repeat visits to any node is minimized.
 */
function searchRobot({ place, parcels }, route) {
  if (route == undefined || route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

/**
 *
 * @param {*} roads- Array of edges in format "a b"
 *
 * @returns graph built from specified edges
 */
function buildGraph(roads) {
  let graph = Object.create(null);

  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of roads.map((r) => r.split(" "))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads); //Now we have a graph built from the edges.
console.log(roadGraph);

/**
 * Key point from chapter:  It is not always necessary or desirable to turn everything into an object.
 * Instead, consider the minimum set of values necessary to define this problem: the robot's position, the set of parcels,
 * and the graph defining the relationships between the places.
 */
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  static random(parcelCount = 5) {
    //Method for generating a random starting VillageState
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address); //Loop while origin matches destination
      parcels.push({ place, address });
    }
    return new VillageState("p", parcels);
  }
  move(dest) {
    //Calculate a new VillageState based on a given move
    if (!roadGraph[this.place].includes(dest)) {
      //The destination point is not directly reachable from the current location
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          //Gather each package that isn't addressed to the current location
          if (p.place != this.place) return p;
          return { place: dest, address: p.address };
        })
        .filter((p) => p.place != p.address); //Filter out packages that are addressed to the new location as well.
      return new VillageState(dest, parcels);
    }
  }
}

/**
 * The point here is that the state of a given VillageState object is constant. Since there
 * are no "moving parts", so to speak, the complexity of our code is reduced making maintenance and
 * debugging easier.
 */

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      //All packages delivered
      console.log(`Done in ${turn} turns.`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

let rndVillage = VillageState.random();
runRobot(rndVillage, randomRobot);
runRobot(rndVillage, routeRobot);
runRobot(rndVillage, searchRobot);

/**
 * My key takeaway:  Persistent data structures can be used to reduce code complexity.
 */
