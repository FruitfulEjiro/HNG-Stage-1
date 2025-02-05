# HNG-Stage-1

## Description
This project is part of the HNG internship program. It provides an API that allows users to check various properties of numbers, such as whether they are prime, perfect, or Armstrong. Additionally, it calculates the sum of the digits and fetches fun facts about the number.

## Installation Instructions
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/FruitfulEjiro/HNG-Stage-1.git
   ```
2. Navigate to the project directory:
   ```bash
   cd HNG-Stage-1
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage
To start the application, run the following command:
```bash
npm start
```
The Live API will be available at `hng-stage-1-gilt.vercel.app/classify-number`.

### Endpoints
- **GET /classify-number**: Check properties of a number.
  - Query parameter: `number` (the number to check)
    - **Description**: The number to check.
    - **Expected Input**: A valid integer.
    - **Response**: A JSON object containing the properties of the number, including whether it is prime, perfect, Armstrong, the sum of its digits, and a fun fact.

## Dependencies
- axios
- cors
- express
- nodemon

## Author
Fruitful Ejiro

## License
MIT License

## Contributing
Feel free to submit issues or pull requests.

## Issues
For any issues, please visit the [issues page](https://github.com/FruitfulEjiro/HNG-Stage-1/issues).
