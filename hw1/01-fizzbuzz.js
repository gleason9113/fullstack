/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions: 
- For numbers divisible by 3, print “fizz” 
- For numbers divisible by 5 (but not 3), print “buzz” 
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

Checked out a new branch to correct the error, but no changes were made other than adding this comment.

**/


const fizzbuzz = () => {
  for (let i = 1; i < 101; i++) {
    if (i % 3 === 0 && i % 5 !== 0) console.log("fizz");
    else if (i % 5 === 0 && i % 3 !== 0) console.log("buzz");
    else if (i % 3 === 0 && i % 5 === 0) console.log("fizzbuzz");
    else console.log(i);
  }
};

fizzbuzz();
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// ...
