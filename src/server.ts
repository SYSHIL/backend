import makeApp from './app.js';
import database from './db/database.js';
const PORT = process.env.PORT || 3000; // Choose a port number

const app = makeApp(database);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
