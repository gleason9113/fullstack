/**
 * Code from Ch 7.
 * Written and added to repo for study purposes.
 * Feedback welcome.
 */

//Points:  a, b, c, d, e, f, g, m, p, s, t
//I changed the locations from the example code because I'm too lazy to type all that. 
//Consider "p" to refer to the Post Office, however.

const roads = [  //Array of edges
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
  "m s"
]

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
  for (let [from, to] of roads.map(r => r.split(" "))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);  //Now we have a graph built from the edges.

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
  random(parcelCount = 5) { //Method for generating a random starting VillageState
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph)); 
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address); //Loop while origin matches destination
      parcels.push(place, address);
    }
    return new VillageState("p", parcels);
  }
  move(dest) { //Calculate a new VillageState based on a given move
    if(!roadGraph[this.place].includes(dest)) { //The destination point is not directly reachable from the current location
      return this;
    } else {
      let parcels = this.parcels.map(p => {  //Gather each package that isn't addressed to the current location
        if(p.place != this.place) return p; 
        return {place: dest, address: p.address};
      }).filter(p => p.place != p.address);  //Filter out packages that are addressed to the new location as well.
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
  for (let turn = 0;; turn++) {
    if(state.parcels.length == 0) { //All packages delivered
      console.log(`Done in ${turn} turns.`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}



