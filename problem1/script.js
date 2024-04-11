//  Implementation 1: Using a loop
const sum_to_n_a = function (n) {
  let sum = 0;
  for (i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
};
sum_to_n_a(5);


// Implementation 3: Using arithmetic progression formula
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2;
}
sum_to_n_b(5);


// Implementation 2: Using recursion 
function sum_to_n_c(n) {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_c(n - 1);
  }
}
sum_to_n_c(5);