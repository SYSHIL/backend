import makeApp from './app.js';

const PORT = process.env.PORT || 3000; // Choose a port number

const app = makeApp({dummyFunc:function(){
  console.log("dummy")
}});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
