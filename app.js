// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('./routes/notificationRoutes');

// const app = express();
// app.use(express.json());
// app.use('/api', routes);

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
//   console.log("Connected to MongoDB")
// );

// app.listen(3000, () => console.log("Server running on port 3000"));



// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('./routes/notificationRoutes');

// const app = express();
// app.use(express.json());
// app.use('/api', routes);

// const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI;

// async function startServer() {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ Connected to MongoDB");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB:", error);
//     process.exit(1); // exit if DB connection fails
//   }
// }

// startServer();


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => console.log('Server running on port 3000'));
