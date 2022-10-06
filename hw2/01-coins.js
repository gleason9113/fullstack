/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  let total = input * 100; //Convert dollar amount to cents.
  if (total > 1_000) {
    return "Max value allowed is $10.00!";
  }
  let dollars, quarters, dimes, nickels, pennies;
  let drawer = [1, 5, 10, 25, 100];
  while (total > 0) {
    let coin = drawer.pop(); //Get the next denomination of coin.
    let amt = Math.floor(total / coin); //Get the # of coins of this denomination needed.
    total -= amt * coin; //Subtract value of coins from total.
    switch (
      coin //For formatting the results into a string literal.
    ) {
      case 100:
        dollars = amt;
        break;
      case 25:
        quarters = amt;
        break;
      case 10:
        dimes = amt;
        break;
      case 5:
        nickels = amt;
        break;
      default:
        pennies = amt;
        break;
    }
  }
  return `$${input} ==> ${dollars} dollars, ${quarters} quarters, ${dimes} dimes, ${nickels} nickels, ${pennies} pennies.`;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
