import axios from "axios";

const getDigitSum = (num) => {
   let sum = 0;
   const numArr = Array.from(String(num), Number);
   numArr.forEach((num) => {
      sum += num;
   });
   return sum;
};

const isArmStrong = (num) => {
   const numOfDigits = num.length;
   const sum = num.split("").reduce((acc, digit) => {
      return acc + Math.pow(Number(digit), numOfDigits);
   }, 0);

   const armstrong = sum == num;
   const numType = num % 2 === 0 ? "even" : "odd";

   return armstrong ? ["Armstrong", numType] : [numType];
};

const isPerfect = (num) => {
   if (num <= 1) return false;
   let sum = 1;
   for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
         if (num / i === i) {
            sum += i;
         } else {
            sum += i + num / i;
         }
      }
   }
   return sum === num;
};

const isPrime = (num) => {
   if (num <= 1) return false;
   if (num === 2) return true;
   for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
   }
   return true;
};

const number = async (req, res, next) => {
   const { number: num } = req.query;
   if (!Number(num)) {
      res.status(400).json({
         number: "alphabet",
         error: true,
      });
   }
   //    Check if Number is a Prime
   const is_prime = await isPrime(Number(num));
   //    Check if Number is Perfect
   const is_perfect = await isPerfect(Number(num));
   //    Check if Number is Armstrong
   const properties = await isArmStrong(num);
   //    GEt sum of Digits
   const digit_sum = await getDigitSum(num);
   //  Fetch the funfact
   const response = await axios.get(`http://numbersapi.com/${num}/math`);
   if (!response.data) {
      return res.status(404).json({ error: "Fun fact not found." });
   }
   const fun_fact = response.data;

   res.status(200).json({
      data: {
         number: num,
         is_prime,
         is_perfect,
         properties,
         digit_sum,
         fun_fact,
      },
   });
};

export default number;
