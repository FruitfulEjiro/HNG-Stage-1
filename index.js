import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fetch Funfact
const funfact = async (num) => {
   try {
      const response = await axios.get(`http://numbersapi.com/${num}/math`);
      return response.data;
   } catch (error) {
      return "No fun fact found for this number.";
   }
};

// Check if Number is a Prime
const isPrime = (num) => {
   if (num <= 1) return false;
   if (num === 2) return true;
   if (num % 2 === 0) return false; // Skip even numbers
   for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
   }
   return true;
};

// Check if Number is Perfect
const isPerfect = (num) => {
   if (num <= 1) return false;
   let sum = 1;
   for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
         sum += i + (num / i === i ? 0 : num / i);
      }
   }
   return sum === num;
};

// Check if Number is Armstrong
const isArmstrong = (num) => {
   const numStr = Math.abs(num).toString();
   const numOfDigits = numStr.length;
   const sum = numStr.split("").reduce((acc, digit) => acc + Math.pow(Number(digit), numOfDigits), 0);
   return sum === num;
};

// Calculate Sum of Digits
const getDigitSum = (num) => {
   return Math.abs(num)
      .toString()
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
};

// Endpoint
app.get("/api/classify-number", async (req, res) => {
   const { number } = req.query;

   if (!number) {
      return res.status(400).json({ error: "Missing number" });
   }

   const num = Number(number);
   if (isNaN(num)) {
      return res.status(400).json({
         number: "alphabet",
         error: true,
      });
   }

   const [is_prime, is_perfect, armstrong, digit_sum, fun_fact] = await Promise.all([
      isPrime(num),
      isPerfect(num),
      isArmstrong(num),
      getDigitSum(num),
      funfact(num),
   ]);

   res.status(200).json({
      number: num,
      is_prime,
      is_perfect,
      properties: armstrong ? ["armstrong", num % 2 === 0 ? "even" : "odd"] : [num % 2 === 0 ? "even" : "odd"],
      digit_sum,
      fun_fact,
   });
});

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
