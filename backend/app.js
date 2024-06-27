// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// app.use(express.json());
// const cors = require("cors");
// app.use(cors());
// const bcrypt = require("bcryptjs");
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// const fs = require("fs");

// const jwt = require("jsonwebtoken");
// var nodemailer = require("nodemailer");

// const JWT_SECRET =
//   "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// const mongoUrl =
// "mongodb+srv://himanshisingh0827:h@cluster0.w9k30d4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((e) => console.log(e));

// require("./userDetails");
// require("./imageDetails");

// const User = mongoose.model("UserInfo");
// const Images = mongoose.model("ImageDetails");

// const getDateTime = () => {
//   let date_time = new Date();
//   let date = ("0" + date_time.getDate()).slice(-2);
//   let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
//   let year = date_time.getFullYear();
//   let hours = date_time.getHours();
//   let minutes = date_time.getMinutes();
//   let seconds = date_time.getSeconds();
//   const date_now =
//     year +
//     "-" +
//     month +
//     "-" +
//     date +
//     " " +
//     hours +
//     ":" +
//     minutes +
//     ":" +
//     seconds;

//   return date_now;
// };

// app.post("/register", async (req, res) => {
//   const date_now = getDateTime();
//   const Registerlogs = "Logs\\Register_logs.txt";

//   const { fname, lname, email, password, userType } = req.body;

//   const encryptedPassword = await bcrypt.hash(password, 10);
//   try {
//     const oldUser = await User.findOne({ email });
//     if (oldUser) {
//       fs.appendFile(
//         Registerlogs,
//         `[${date_now}] : Registration failed: User Already exists - ${email} (${oldUser.fname} ${oldUser.lname}) (${oldUser.userType})\n`,
//         function (err) {
//           if (err) throw err;
//         }
//       );
//       return res.json({ error: "User Exists" });
//     }
//     await User.create({
//       fname,
//       lname,
//       email,
//       password: encryptedPassword,
//       userType,
//     });
//     fs.appendFile(
//       Registerlogs,
//       `[${date_now}] : Registration Successful: New User added - ${email} (${fname} ${lname}) (${userType})\n`,
//       function (err) {
//         if (err) throw err;
//       }
//     );

//     res.send({ status: "ok" });

//   } catch (error) {
//     res.send({ status: "error" });
//   }
// });

// app.post("/login-user", async (req, res) => {
//   const date_now = getDateTime();
//   const LoginLogs = "Logs\\Login_logs.txt";

//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     fs.appendFile(
//       LoginLogs,
//       `[${date_now}] : Login attempt failed: User Not Found - ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
//       function (err) {
//         if (err) throw err;
//       }
//     );
//     return res.json({ error: "User Not found" });
//   }
//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ email: user.email }, JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     if (res.status(201)) {
//       fs.appendFile(
//         LoginLogs,
//         `[${date_now}] : Login attempt successful: ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
//         function (err) {
//           if (err) throw err;
//         }
//       );
//       return res.json({ status: "ok", data: token });
//     } else {
//       fs.appendFile(
//         LoginLogs,
//         `[${date_now}] : Login attempt failed: ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
//         function (err) {
//           if (err) throw err;
//         }
//       );
//       return res.json({ error: "error" });
//     }
//   } else {
//     fs.appendFile(
//       LoginLogs,
//       `[${date_now}] : Login attempt failed: Incorrect Password - ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
//       function (err) {
//         if (err) throw err;
//       }
//     );

//     res.json({ status: "error", error: "Invalid Password" });
//   }
// });

// app.post("/userData", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user == "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }

//     const useremail = user.email;
//     User.findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) {}
// });

// app.listen(5000, () => {
//   console.log("Server Started");
// });

// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const oldUser = await User.findOne({ email });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//       expiresIn: "5m",
//     });
//     const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "adarsh438tcsckandivali@gmail.com",
//         pass: "rmdklolcsmswvyfw",
//       },
//     });

//     var mailOptions = {
//       from: "youremail@gmail.com",
//       to: "thedebugarena@gmail.com",
//       subject: "Password Reset",
//       text: link,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//     console.log(link);
//   } catch (error) {}
// });

// app.get("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     res.render("index", { email: verify.email, status: "Not Verified" });
//   } catch (error) {
//     console.log(error);
//     res.send("Not Verified");
//   }
// });

// app.post("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     await User.updateOne(
//       {
//         _id: id,
//       },
//       {
//         $set: {
//           password: encryptedPassword,
//         },
//       }
//     );

//     res.render("index", { email: verify.email, status: "verified" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Something Went Wrong" });
//   }
// });

// app.get("/getAllUser", async (req, res) => {
//   let query = {};
//   const searchData = req.query.search;
//   if (searchData) {
//     query = {
//       $or: [
//         { fname: { $regex: searchData, $options: "i" } },
//         { email: { $regex: searchData, $options: "i" } },
//       ],
//     };
//   }

//   try {
//     const allUser = await User.find(query);
//     res.send({ status: "ok", data: allUser });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/deleteUser", async (req, res) => {
//   const { userid } = req.body;
//   try {
//     User.deleteOne({ _id: userid }, function (err, res) {
//       console.log(err);
//     });
//     res.send({ status: "Ok", data: "Deleted" });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/paginatedUsers", async (req, res) => {
//   const allUser = await User.find({});
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);

//   const startIndex = (page - 1) * limit;
//   const lastIndex = page * limit;

//   const results = {};
//   results.totalUser = allUser.length;
//   results.pageCount = Math.ceil(allUser.length / limit);

//   if (lastIndex < allUser.length) {
//     results.next = {
//       page: page + 1,
//     };
//   }
//   if (startIndex > 0) {
//     results.prev = {
//       page: page - 1,
//     };
//   }
//   results.result = allUser.slice(startIndex, lastIndex);
//   res.json(results);
// });

// // Temp Data fetching

// // Define the Project schema and model
// const projectSchema = new mongoose.Schema({
//   id: String,
//   clientname: String,
//   title: String,
//   description: String,
//   manager: String,
//   status: String,
//   cp: Number,
//   date: Date,
//   nom:Number,
// });

// // const Project = mongoose.model('Project', projectSchema);

// // // Define a route to fetch analyst projects
// app.get('/analyst-projects', async (req, res) => {
//   try {
//     const projects = await Project.find({});
//     res.json(projects);
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     res.status(500).send('Server Error');
//   }
// });

// // Temp Project Director

// // const projectSchema = new mongoose.Schema({
// //   manager: String,
// //   title: String,
// //   numMembers: Number,
// //   selectedMembers: [String],
// //   cp: { type: Number, default: 0 }
// // });

// const managerSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });
// const roleSchema = new mongoose.Schema({
//   role: String,
//   // email: String
// });
// const memberSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

// const querySchema = new mongoose.Schema({
//   text: String,
//   resolved: { type: Boolean, default: false }
// });

// const Project = mongoose.model('Project', projectSchema);
// const Manager = mongoose.model('Manager', managerSchema);
// const Role = mongoose.model('Role', roleSchema);
// const Member = mongoose.model('Member', memberSchema);
// const Query = mongoose.model('Query', querySchema);

// // Sample data
// const sampleManagers = [
//   { name: 'John Doe', email: 'john@example.com' },
//   { name: 'Jane Smith', email: 'jane@example.com' }
// ];
// const sampleRole = [
//   { role: 'Analyst' },
//   { role: 'Project Manager' },
//   { role: 'Project Director' },
//   { role: 'Admin' },
//   { role: 'Auditor'}
// ];
// const sampleMembers = [
//   { name: 'Alice Brown', email: 'alice@example.com' },
//   { name: 'Bob White', email: 'bob@example.com' }
// ];

// const sampleQueries = [
//   { text: 'What is the deadline for project A?' },
//   { text: 'How to access project B details?' }
// ];
// const sampleProject = [
//   { id: '24SC2',clientname:'himanshi',title:'LMS',manager:'abc',description:'learning managenment system',status:'ongoing',nom:7},
//   { id: '24SC3',clientname:'himanshi singh',title:'project ',manager:'ab',description:'project managenment system',status:'ongoing',nom:3}
// ];
// // Populate sample data
// const populateSampleData = async () => {
//   await Manager.deleteMany({});
//   await Manager.insertMany(sampleManagers);
//   await Role.deleteMany({});
//   await Role.insertMany(sampleRole);
//   await Member.deleteMany({});
//   await Member.insertMany(sampleMembers);

//   await Query.deleteMany({});
//   await Query.insertMany(sampleQueries);
//   await Project.deleteMany({});
//   await Project.insertMany(sampleProject);
// };

// populateSampleData();

// // Routes
// app.get('/projects', async (req, res) => {
//   const projects = await Project.find();
//   res.json(projects);
// });

// app.get('/managers', async (req, res) => {
//   const managers = await Manager.find();
//   res.json(managers);
// });
// app.get('/role', async (req, res) => {
//   const roles = await Role.find();
//   res.json(roles);
// });
// app.get('/members', async (req, res) => {
//   const members = await Member.find();
//   res.json(members);
// });

// app.get('/queries', async (req, res) => {
//   const queries = await Query.find();
//   res.json(queries);
// });

// app.post('/create-project', async (req, res) => {
//   const newProject = new Project(req.body);
//   await newProject.save();
//   res.json(newProject);
// });

// app.post('/resolve-query', async (req, res) => {
//   const { queryId } = req.body;
//   const query = await Query.findById(queryId);
//   if (query) {
//     query.resolved = true;
//     await query.save();
//     res.json({ message: 'Query resolved successfully' });
//   } else {
//     res.status(404).json({ message: 'Query not found' });
//   }
// });
// // Endpoint to handle POST request for requirements
// app.post('/requirements', async (req, res) => {
//   const { requirementsId } = req.body;
//   const requirements = await requirements.findById(requirementsId);
//   if (requirements) {

//     await requirements.save();
//     res.json({ message: 'requirements resolved successfully' });
//   } else {
//     res.status(404).json({ message: 'requirements not found' });
//   }
// });
// // app.post("/requirements", (req, res) => {
// //   //const requirementData = req.body;
// //   const newRequirement = new Requirement(req.body);
// //   // Here you can insert the data into your database using a database query
// //   // Example:
// //   newRequirement.insert(requirementData).then(() => {
// //     res.status(201).json({ message: "Requirement data inserted successfully" });
// //   }).catch((error) => {
// //     res.status(500).json({ error: "Error inserting data into database" });
// //   });

//   // For demonstration purposes, just sending back the received data
// //   res.status(201).json({ message: "Requirement data received", data: requirementData });
// // });

// //temp requirement data

// const Requirement = require('./requirementModel');
// // Create a new requirement
// app.post('/create-requirement', async (req, res) => {
//   try {
//     const newRequirement = new Requirement(req.body);
//     await newRequirement.save();
//     res.json(newRequirement);
//   } catch (error) {
//     console.error('Error creating requirement:', error);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/requirements', async (req, res) => {
//   try {
//     const requirements = await Requirement.find();
//     res.json(requirements);
//   } catch (error) {
//     console.error('Error fetching requirements:', error);
//     res.status(500).send('Server Error');
//   }
// });

// app.put('/update-requirement/:id', async (req, res) => {
//   try {
//     const updatedRequirement = await Requirement.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedRequirement);
//   } catch (error) {
//     console.error('Error updating requirement:', error);
//     res.status(500).send('Server Error');
//   }
// });

// app.delete('/delete-requirement/:id', async (req, res) => {
//   try {
//     await Requirement.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Requirement deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting requirement:', error);
//     res.status(500).send('Server Error');
//   }
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const fs = require("fs");
const port = 5000;

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://himanshisingh0827:h@cluster0.w9k30d4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const mongoUrl =
//   "mongodb+srv://smitprog24:smit123@cluster1.oyf8t6x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./Schema/userDetails");

const User = mongoose.model("UserInfo");

const getDateTime = () => {
  let date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  let hours = date_time.getHours();
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();
  const date_now =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return date_now;
};

app.post("/register", async (req, res) => {
  const date_now = getDateTime();
  const Registerlogs = "Logs\\Register_logs.txt";

  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      fs.appendFile(
        Registerlogs,
        `[${date_now}] : Registration failed: User Already exists - ${email} (${oldUser.fname} ${oldUser.lname}) (${oldUser.userType})\n`,
        function (err) {
          if (err) throw err;
        }
      );
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    fs.appendFile(
      Registerlogs,
      `[${date_now}] : Registration Successful: New User added - ${email} (${fname} ${lname}) (${userType})\n`,
      function (err) {
        if (err) throw err;
      }
    );

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const date_now = getDateTime();
  const LoginLogs = "Logs\\Login_logs.txt";

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    fs.appendFile(
      LoginLogs,
      `[${date_now}] : Login attempt failed: User Not Found - ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
      function (err) {
        if (err) throw err;
      }
    );
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      fs.appendFile(
        LoginLogs,
        `[${date_now}] : Login attempt successful: ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
        function (err) {
          if (err) throw err;
        }
      );
      return res.json({ status: "ok", data: token });
    } else {
      fs.appendFile(
        LoginLogs,
        `[${date_now}] : Login attempt failed: ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
        function (err) {
          if (err) throw err;
        }
      );
      return res.json({ error: "error" });
    }
  } else {
    fs.appendFile(
      LoginLogs,
      `[${date_now}] : Login attempt failed: Incorrect Password - ${email} (${user.fname} ${user.lname}) (${user.userType})\n`,
      function (err) {
        if (err) throw err;
      }
    );

    res.json({ status: "error", error: "Invalid Password" });
  }
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(port, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adarsh438tcsckandivali@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.get("/getAllUser", async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { fname: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  try {
    const allUser = await User.find(query);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/paginatedUsers", async (req, res) => {
  const allUser = await User.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalUser = allUser.length;
  results.pageCount = Math.ceil(allUser.length / limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }
  results.result = allUser.slice(startIndex, lastIndex);
  res.json(results);
});

// Temp Data fetching

// Define the Project schema and model
// const projectSchema = new mongoose.Schema({
//   id: String,
//   clientName: String,
//   title: String,
//   description: String,
//   manager: String,
//   status: String,
//   cp: Number,
//   date: Date,
//   nom:Number,
//   email: { type: String, unique: true },
// });

// // const Project = mongoose.model('Project', projectSchema);

// // // Define a route to fetch analyst projects
// app.get('/analyst-projects', async (req, res) => {
//   try {
//     const projects = await Project.find({});
//     res.json(projects);
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     res.status(500).send('Server Error');
//   }
// });

// const managerSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

// const memberSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

// const querySchema = new mongoose.Schema({
//   text: String,
//   resolved: { type: Boolean, default: false }
// });

// const Project = mongoose.model('Project', projectSchema);
// const Manager = mongoose.model('Manager', managerSchema);
// const Member = mongoose.model('Member', memberSchema);
// const Query = mongoose.model('Query', querySchema);

// // Sample data
// const sampleManagers = [
//   { name: 'John Doe', email: 'john@example.com' },
//   { name: 'Jane Smith', email: 'jane@example.com' }
// ];

// const sampleMembers = [
//   { name: 'Alice Brown', email: 'alice@example.com' },
//   { name: 'Bob White', email: 'bob@example.com' }
// ];

// const sampleQueries = [
//   { text: 'What is the deadline for project A?' },
//   { text: 'How to access project B details?' }
// ];
// const sampleProject = [
//   { id: '24SC2',clientName:'himanshi',title:'LMS',manager:'abc',description:'learning managenment system',status:'ongoing',nom:7},
//   { id: '24SC3',clientName:'himanshi singh',title:'project ',manager:'ab',description:'project managenment system',status:'ongoing',nom:3}
// ];
// // Populate sample data
// const populateSampleData = async () => {
//   await Manager.deleteMany({});
//   await Manager.insertMany(sampleManagers);

//   await Member.deleteMany({});
//   await Member.insertMany(sampleMembers);

//   await Query.deleteMany({});
//   await Query.insertMany(sampleQueries);
//   await Project.deleteMany({});
//   await Project.insertMany(sampleProject);
// };

// populateSampleData();

// // Routes
// app.get('/projects', async (req, res) => {
//   const projects = await Project.find();
//   res.json(projects);
// });

// app.get('/managers', async (req, res) => {
//   const managers = await Manager.find();
//   res.json(managers);
// });

// app.get('/members', async (req, res) => {
//   const members = await Member.find();
//   res.json(members);
// });

// app.get('/queries', async (req, res) => {
//   const queries = await Query.find();
//   res.json(queries);
// });

// app.post('/create-project', async (req, res) => {
//   const newProject = new Project(req.body);
//   await newProject.save();
//   res.json(newProject);
// });

// app.post('/resolve-query', async (req, res) => {
//   const { queryId } = req.body;
//   const query = await Query.findById(queryId);
//   if (query) {
//     query.resolved = true;
//     await query.save();
//     res.json({ message: 'Query resolved successfully' });
//   } else {
//     res.status(404).json({ message: 'Query not found' });
//   }
// });

// //temp requirement data

// // Create a new requirement
// app.post('/create-requirement', async (req, res) => {
//   try {
//     const newRequirement = new Requirement(req.body);
//     await newRequirement.save();
//     res.json(newRequirement);
//   } catch (error) {
//     console.error('Error creating requirement:', error);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/requirements', async (req, res) => {
//   try {
//     const requirements = await Requirement.find();
//     res.json(requirements);
//   } catch (error) {
//     console.error('Error fetching requirements:', error);
//     res.status(500).send('Server Error');
//   }
// });

// app.put('/update-requirement/:id', async (req, res) => {
//   try {
//     const updatedRequirement = await Requirement.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedRequirement);
//   } catch (error) {
//     console.error('Error updating requirement:', error);
//     res.status(500).send('Server Error');
//   }
// });

// app.delete('/delete-requirement/:id', async (req, res) => {
//   try {
//     await Requirement.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Requirement deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting requirement:', error);
//     res.status(500).send('Server Error');
//   }
// });

//User Role
require("./Schema/userRoles");

const UserRoles = mongoose.model("UserRoles");

async function createRoles() {
  const roles = [
    { userRole: "Project Director" },
    { userRole: "Project Manager" },
    { userRole: "Analyst" },
    { userRole: "Auditor" },
    { userRole: "Admin" },
  ];

  try {
    await UserRoles.insertMany(roles);
    console.log("Roles inserted successfully");
  } catch (err) {
    console.error("Error inserting roles:", err);
  } finally {
    mongoose.connection.close();
  }
}

app.get("/roles", async (req, res) => {
  try {
    const roles = await UserRoles.find({});
    res.json({ status: "ok", roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).send("Server Error");
  }
});
// createRoles();
// Project and Requirements

const Project = require("./Schema/project");
const Requirement = require("./Schema/requirements");

const seedDatabase = async () => {
  try {
    // Clear existing data

    await Project.deleteMany({});
    await Requirement.deleteMany({});
    // Sample Projects
    const projects = [
      {
        projectNumber: 1,
        projectManagerName: "Alice Johnson",
        clientName: "Client A",
        projectTitle: "Project Alpha",
        projectDesc: "Description for Project Alpha",
        projectStatus: "Ongoing",
        email: "hp24@gmail.com",
        dateOfCreation: new Date("2023-01-01"),
        numberOfmembers: 5,
        priority: "High",
        CP: 1001,
      },
      {
        projectNumber: 2,
        projectManagerName: "Bob Smith",
        clientName: "Client B",
        projectTitle: "Project Beta",
        projectDesc: "Description for Project Beta",
        projectStatus: "Completed",
        email: "smit@gmail.com",
        dateOfCreation: new Date("2023-02-01"),
        numberOfmembers: 8,
        priority: "Medium",
        CP: 1002,
      },
      {
        projectNumber: 3,
        projectManagerName: "Alice Johnson",
        clientName: "Client C",
        projectTitle: "Project Gamma",
        projectDesc: "Description for Project Gamma",
        projectStatus: "Ongoing",
        email: "hp24@gmail.com",
        dateOfCreation: new Date("2023-03-01"),
        numberOfmembers: 10,
        priority: "Low",
        CP: 1003,
      },
    ];

    // Insert Projects
    await Project.insertMany(projects);
    console.log("Projects inserted");

    // Sample Requirements
    const requirements = [
      {
        projectNumber: 1,
        requirementNumber: "R01.00.01",
        requirementDate: new Date("2023-04-01"),
        requirementChangeNumber: "RC01.00.01",
        changeDate: new Date("2023-04-02"),
        description: "Requirement 1 for Project Alpha",
        priority: "High",
        requirementGatheredBy: "John Doe",
        modeOfReceipt: "Email",
        providedBy: "Client A",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Action 1",
        responsibility: "Team A",
        expectedDateOfDelivery: new Date("2023-05-01"),
        status: "Pending",
        requirementOutputName: "Output 1",
        dependency: "None",
        impactOfNewRequirementsOrChanges: "Low",
        remarks: "Remark 1",
      },
      {
        projectNumber: 1,
        requirementNumber: "R01.00.02",
        requirementDate: new Date("2023-04-03"),
        requirementChangeNumber: "RC01.00.02",
        changeDate: new Date("2023-04-04"),
        description: "Requirement 2 for Project Alpha",
        priority: "Medium",
        requirementGatheredBy: "Jane Doe",
        modeOfReceipt: "Meeting",
        providedBy: "Client A",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Action 2",
        responsibility: "Team A",
        expectedDateOfDelivery: new Date("2023-05-15"),
        status: "In Progress",
        requirementOutputName: "Output 2",
        dependency: "Task 1",
        impactOfNewRequirementsOrChanges: "Medium",
        remarks: "Remark 2",
      },
      {
        projectNumber: 1,
        requirementNumber: "R01.00.03",
        requirementDate: new Date("2023-04-05"),
        requirementChangeNumber: "RC01.00.03",
        changeDate: new Date("2023-04-06"),
        description: "Requirement 3 for Project Alpha",
        priority: "Low",
        requirementGatheredBy: "John Doe",
        modeOfReceipt: "Phone Call",
        providedBy: "Client A",
        requirementAcceptance: "No",
        actionsToBeTaken: "Action 3",
        responsibility: "Team B",
        expectedDateOfDelivery: new Date("2023-06-01"),
        status: "Completed",
        requirementOutputName: "Output 3",
        dependency: "Task 2",
        impactOfNewRequirementsOrChanges: "High",
        remarks: "Remark 3",
      },
      {
        projectNumber: 2,
        requirementNumber: "R02.00.01",
        requirementDate: new Date("2023-05-01"),
        requirementChangeNumber: "RC02.00.01",
        changeDate: new Date("2023-05-02"),
        description: "Requirement 1 for Project Beta",
        priority: "High",
        requirementGatheredBy: "Emily Smith",
        modeOfReceipt: "Email",
        providedBy: "Client B",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Action 1",
        responsibility: "Team C",
        expectedDateOfDelivery: new Date("2023-06-01"),
        status: "Pending",
        requirementOutputName: "Output 1",
        dependency: "None",
        impactOfNewRequirementsOrChanges: "Low",
        remarks: "Remark 1",
      },
      {
        projectNumber: 2,
        requirementNumber: "R02.00.02",
        requirementDate: new Date("2023-05-03"),
        requirementChangeNumber: "RC02.00.02",
        changeDate: new Date("2023-05-04"),
        description: "Requirement 2 for Project Beta",
        priority: "Medium",
        requirementGatheredBy: "Michael Brown",
        modeOfReceipt: "Meeting",
        providedBy: "Client B",
        requirementAcceptance: "No",
        actionsToBeTaken: "Action 2",
        responsibility: "Team D",
        expectedDateOfDelivery: new Date("2023-07-01"),
        status: "In Progress",
        requirementOutputName: "Output 2",
        dependency: "Task 1",
        impactOfNewRequirementsOrChanges: "Medium",
        remarks: "Remark 2",
      },
      {
        projectNumber: 3,
        requirementNumber: "R03.00.01",
        requirementDate: new Date("2023-06-01"),
        requirementChangeNumber: "RC03.00.01",
        changeDate: new Date("2023-06-02"),
        description: "Requirement 1 for Project Gamma",
        priority: "Low",
        requirementGatheredBy: "Alice Johnson",
        modeOfReceipt: "Phone Call",
        providedBy: "Client C",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Action 1",
        responsibility: "Team E",
        expectedDateOfDelivery: new Date("2023-08-01"),
        status: "Pending",
        requirementOutputName: "Output 1",
        dependency: "None",
        impactOfNewRequirementsOrChanges: "Low",
        remarks: "Remark 1",
      },
      {
        projectNumber: 3,
        requirementNumber: "R03.00.02",
        requirementDate: new Date("2023-06-03"),
        requirementChangeNumber: "RC03.00.02",
        changeDate: new Date("2023-06-04"),
        description: "Requirement 2 for Project Gamma",
        priority: "Medium",
        requirementGatheredBy: "Alice Johnson",
        modeOfReceipt: "Email",
        providedBy: "Client C",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Action 2",
        responsibility: "Team F",
        expectedDateOfDelivery: new Date("2023-09-01"),
        status: "In Progress",
        requirementOutputName: "Output 2",
        dependency: "Task 2",
        impactOfNewRequirementsOrChanges: "Medium",
        remarks: "Remark 2",
      },
      {
        projectNumber: 3,
        requirementNumber: "R03.00.03",
        requirementDate: new Date("2023-06-05"),
        requirementChangeNumber: "RC03.00.03",
        changeDate: new Date("2023-06-06"),
        description: "Requirement 3 for Project Gamma",
        priority: "High",
        requirementGatheredBy: "Alice Johnson",
        modeOfReceipt: "Meeting",
        providedBy: "Client C",
        requirementAcceptance: "No",
        actionsToBeTaken: "Action 3",
        responsibility: "Team G",
        expectedDateOfDelivery: new Date("2023-10-01"),
        status: "Completed",
        requirementOutputName: "Output 3",
        dependency: "Task 3",
        impactOfNewRequirementsOrChanges: "High",
        remarks: "Remark 3",
      },
    ];

    // Insert Requirements
    await Requirement.insertMany(requirements);
    console.log("Requirements inserted");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// seedDatabase();

app.get("/api/requirements/:projectNumber", async (req, res) => {
  const { projectNumber } = req.params;
  try {
    const requirements = await Requirement.find({ projectNumber });
    res.json({ status: "ok", requirements });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).send("Server Error");
  }
});

// Fetch all projects managed by a particular project manager using email
app.get("/api/projects/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const projects = await Project.find({ email });
    res.json({ status: "ok", projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Server Error");
  }
});
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ status: "ok", projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ status: "error", error: "Server Error" });
  }
});
// app.post('/api/requirements', async (req, res) => {
//   try {
//     const newRequirement = new Requirement(req.body);
//     await newRequirement.save();
//     res.status(201).send('Requirement saved successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.post("/api/requirements", async (req, res) => {
  try {
    if (req.body.requirementNumber) {
      // Update existing requirement if requirementNumber is provided
      const result = await Requirement.updateOne(
        { requirementNumber: req.body.requirementNumber },
        req.body,
        { upsert: true }
      );

      console.log("Requirement Updated");
      alert("Requirement Updated!");
      if (result.nModified > 0) {
        res.status(200).send("Requirement updated successfully");
      } else if (result.upserted) {
        res.status(201).send("Requirement added successfully");
      } else {
        res.status(200).send("No changes made to the requirement");
      }
    } else {
      // Add new requirement if requirementNumber is not provided
      const projectNumber = req.body.projectNumber;
      // const projectNumber = 1;
      const count = await Requirement.countDocuments({ projectNumber });

      const requirementCount = count + 1;
      const mainPart = ` R${String(projectNumber).padStart(2, "0")}.00.`;
      const lastPart = String(requirementCount % 100).padStart(2, "0");
      const middlePart = String(Math.floor(requirementCount / 100)).padStart(
        2,
        "0"
      );

      req.body.requirementNumber = `${mainPart}${middlePart}.${lastPart}`;

      await Requirement.insertMany(req.body);
      res.status(201).send("Requirement added successfully");
    }
  } catch (error) {
    console.error("Error processing requirement:", error.message);
    res
      .status(500)
      .send("Internal Server Error: Unable to process requirement");
  }
});

//const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const AutoIncrement = require("mongoose-auto-increment");

app.use(bodyParser.json());

const connection = mongoose.connection;

AutoIncrement.initialize(connection);

const cpSchema = new mongoose.Schema({
  taskNumber: {
    type: Number,
    unique: true,
  },
  requirementNumber: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  numberOfInputElements: {
    type: String,
    required: true,
  },
  numberOfTablesViews: {
    type: String,
    required: true,
  },
  interfaceClass: {
    type: String,
    required: true,
  },
  functionsLogic: {
    type: String,
    required: true,
  },
  rndComponent: {
    type: String,
    required: true,
  },
  CP: {
    type: String,
    required: true,
  },
});

cpSchema.plugin(AutoIncrement.plugin, { model: "CP", field: "taskNumber" });
const CPmodel = mongoose.model("CP", cpSchema);

// Express route for handling POST request
app.post("/api/calculate-cp", async (req, res) => {
  try {
    const {
      requirementNumber,
      task,
      numberOfInputElements,
      numberOfTablesViews,
      interfaceClass,
      functionsLogic,
      rndComponent,
      CP,
    } = req.body;

    // Create a new CP document
    const newCP = new CPmodel({
      requirementNumber,
      task,
      numberOfInputElements,
      numberOfTablesViews,
      interfaceClass,
      functionsLogic,
      rndComponent,
      CP,
    });

    // Save the new document to the database
    await newCP.save();

    res.status(200).json({ message: "Form data saved successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const TemplateModel = require("./Schema/template");

app.get("/api/templates", async (req, res) => {
  try {
    const templates = await TemplateModel.find();
    res.json(templates);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/templates", async (req, res) => {
  const { templateName } = req.body;
  try {
    const newTemplate = new TemplateModel({ templateName });
    await newTemplate.save();
    res.status(201).send(newTemplate);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// const insertSampleTemplates = async () => {
//   const sampleTemplates = [
//     { templateName: "SRS" },
//     { templateName: "Project Plan" },
//     { templateName: "Test Plan" },
//     { templateName: "Design Document" }
//   ];

//   try {
//     await TemplateModel.insertMany(sampleTemplates);
//     console.log("Sample templates inserted");
//   } catch (err) {
//     console.error("Failed to insert sample templates", err);
//   }
// };

// insertSampleTemplates();

/// form temp

const FormSchema = new mongoose.Schema({
  title: String,
  description: String,
  data: Array,
});

const Form = mongoose.model("Form", FormSchema);

// app.post("/api/saveForm", async (req, res) => {
//   try {
//     const form = new Form(req.body);
//     await form.save();
//     res.status(200).send({ id: form._id });
//   } catch (error) {
//     res.status(500).send({ error: "Error saving form data" });
//   }
// });

// app.get("/api/getForm/:id", async (req, res) => {
//   try {
//     const form = await Form.findById(req.params.id);
//     res.status(200).send(form);
//   } catch (error) {
//     res.status(500).send({ error: "Error fetching form data" });
//   }
// });

AutoIncrement.initialize(connection);

const FileSchema = new mongoose.Schema({
  fileNumber: {
    type: Number,
  },
  projectNumber: {
    type: Number,
    ref: "Project",
    required: true,
  },
  // projectNumber: String,//reference se aayega
  projectTitle: {
    type: String,
    ref: "Project",
    required: true,
  },
  // projectName: String,
  templateName: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  versions: [
    {
      title: String,
      description: String,
      data: Array,
      version: { type: Number, unique: true },
      versionNum: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
    },
  ],
});

cpSchema.plugin(AutoIncrement.plugin, { model: "File", field: "version" });

const File = mongoose.model("File", FileSchema);
app.post('/api/saveForm', async (req, res) => {
  try {
    const { title, description, data, version, versionName } = req.body;

    const newVersion = {
      title,
      description,
      data,
      versionNum: versionName,
    };

    const file = new File({
      projectNumber: 123, // Example project number, adjust as needed
      projectTitle: "Example Project", // Example project title, adjust as needed
      templateName: "Example Template", // Example template name, adjust as needed
      createdBy: "user@example.com", // Example user, adjust as needed
      versions: [newVersion],
    });

    const savedFile = await file.save();
    res.status(200).json({ id: savedFile._id });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).send("Error saving form data");
  }
});
// app.get("/api/getForm/:version", async (req, res) => {
//   try {
//     const { version } = req.params;

//     const form = await File.aggregate([
//       { $unwind: "$versions" },
//       { $match: { "versions.version": version } },
//       {
//         $project: {
//           _id: 1,
//           "versions.title": 1,
//           "versions.description": 1,
//           "versions.data": 1,
//         },
//       },
//     ]);

//     if (form.length === 0) {
//       return res.status(404).send({ error: "Form version not found" });
//     }

//     const result = form.map((f) => ({
//       _id: f._id,
//       title: f.versions.title,
//       description: f.versions.description,
//       data: f.versions.data,
//     }))[0];

//     res.status(200).send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Error fetching form data" });
//   }
// });

app.get("/api/getForm/:version", async (req, res) => {
  try {
    const version = Number(req.params.version); // Convert version to a number

    const form = await File.aggregate([
      { $unwind: "$versions" },
      { $match: { "versions.version": version } }, // Ensure the match is done with a number
      {
        $project: {
          _id: 1,
          "versions.title": 1,
          "versions.description": 1,
          "versions.data": 1,
        },
      },
    ]);

    if (form.length === 0) {
      return res.status(404).send({ error: "Form version not found" });
    }

    const result = form.map((f) => ({
      _id: f._id,
      title: f.versions.title,
      description: f.versions.description,
      data: f.versions.data,
    }))[0];

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Error fetching form data" });
  }
});

//const File = mongoose.model("Form", FileSchema);
app.get("/api/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).send(err);
  }
});
