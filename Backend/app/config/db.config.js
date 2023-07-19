require('dotenv').config();



module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE
};


// module.exports = {
//   HOST: "localhost",
//   USER: "sagaohje_mstackusr",
//   PASSWORD: "lqWGwX0n+S{;cOZvwam^6ua(",
//   DB: "sagaohje_mstack"
// };


