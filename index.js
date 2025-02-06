import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const funfact = async (num) => {
   console.log("funfact",typeof(num), num)
   const response = await axios.get(`http://numbersapi.com/${num}/math`);
   if (!response.data) {
      return res.status(404).json({ error: "Fun fact not found." });
   }
   const funfact = response.data;
   console.log(funfact, "funny");
   return funfact;
};

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.get("/api/classify-number", async (req, res) => {
   const { number } = req.query;
   console.log(req.query);

   // Check if Number is a Prime
   const isPrime = () => {
      console.log("prime", number)
      if (number <= 1) return false;
      if (number === 2) return true;
      for (let i = 2; i <= Math.sqrt(number); i++) {
         if (number % i === 0) return false;
      }
      return true;
   };
   const is_prime = isPrime();

   // Check id Number is Perfect
   const isPerfect = () => {
      console.log("perfect", number)
      if (number <= 1) return false;
      let sum = 1;
      for (let i = 2; i <= Math.sqrt(number); i++) {
         if (number % i === 0) {
            if (number / i === i) {
               sum += i;
            } else {
               sum += i + number / i;
            }
         }
      }
      return sum === number;
   };
   const is_perfect = isPerfect();

   // Check if Number is Armstrong
   const isArmStrong = () => {
      console.log("number", number);
      const numOfDigits = number.length;
      let sum = null;
      if (number >= 0) {
         sum = number.split("").reduce((acc, digit) => {
            return acc + Math.pow(Number(digit), numOfDigits);
         }, 0);
      }

      const armstrong = sum == number;
      const numType = number % 2 === 0 ? "even" : "odd";

      return armstrong ? ["Armstrong", numType] : [numType];
   };
   const properties = isArmStrong();

   // Calculate Sum of Digits
   const getDigitSum = () => {
      let sum = 0;
      const numArr = Array.from(String(number), Number);
      numArr.forEach((number) => {
         sum += number;
      });
      return sum;
   };
   const digit_sum = getDigitSum();

   // Fetch the Fun Fact
   const fun_fact = await funfact(number);

   res.status(200).json({
      number,
      is_prime,
      is_perfect,
      properties,
      digit_sum,
      fun_fact,
   });
});

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
