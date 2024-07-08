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
    console.log(`Connected to database at ${port}`);
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
      expiresIn: "60m",
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


//deleteuser
app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    await User.deleteOne({ email: userid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", data: "Could not delete user" });
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
//add roles
app.post("/addRole", async (req, res) => {
  const { userRole } = req.body;
  try {
    const newRole = new UserRoles({ userRole });
    await newRole.save();
    res.send({ status: "Ok", message: "Role added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Could not add role" });
  }
});
// createRoles();
app.get("/roles", async (req, res) => {
  try {
    const roles = await UserRoles.find({});
    res.json({ status: "ok", roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).send("Server Error");
  }
});
// Project and Requirements

const Project = require("./Schema/project");
const Requirement = require("./Schema/requirements");
app.post('/create-project', async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
});

const seedDatabase = async () => {
  try {
    //     // Clear existing data

    //     await Project.deleteMany({});
    await Requirement.deleteMany({});
    //     // Sample Projects
    //     const projects = [
    //       {
    //         projectNumber: 1,
    //         projectManagerName: "Alice Johnson",
    //         clientName: "Client A",
    //         projectTitle: "Project Alpha",
    //         projectDesc: "Description for Project Alpha",
    //         projectStatus: "Ongoing",
    //         email: "hp24@gmail.com",
    //         dateOfCreation: new Date("2023-01-01"),
    //         numberOfmembers: 5,
    //         priority: "High",
    //         CP: 1001,
    //       },
    //       {
    //         projectNumber: 2,
    //         projectManagerName: "Bob Smith",
    //         clientName: "Client B",
    //         projectTitle: "Project Beta",
    //         projectDesc: "Description for Project Beta",
    //         projectStatus: "Completed",
    //         email: "smit@gmail.com",
    //         dateOfCreation: new Date("2023-02-01"),
    //         numberOfmembers: 8,
    //         priority: "Medium",
    //         CP: 1002,
    //       },
    //       {
    //         projectNumber: 3,
    //         projectManagerName: "Alice Johnson",
    //         clientName: "Client C",
    //         projectTitle: "Project Gamma",
    //         projectDesc: "Description for Project Gamma",
    //         projectStatus: "Ongoing",
    //         email: "hp24@gmail.com",
    //         dateOfCreation: new Date("2023-03-01"),
    //         numberOfmembers: 10,
    //         priority: "Low",
    //         CP: 1003,
    //       },
    //     ];

    //     // Insert Projects
    //     await Project.insertMany(projects);
    //     console.log("Projects inserted");

    // Sample Requirements
    const requirements = [
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.01",
        requirementDate: "2023-09-01T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Gross GST Paid during claim period and Net GST Paid during claim period",
        priority: "High",
        requirementGatheredBy: "Krunal Patel , Jai Prakash & Rashmi Patel",
        modeOfReceipt: "VC",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Development",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2023-11-02T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "Applicant Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.02",
        requirementDate: "2023-09-06T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add Income Tax of Central Govt. share in Applicant Module",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "VC",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Development",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2023-10-09T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "Applicant Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.03",
        requirementDate: "2023-09-25T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add GST reimbursement of Central Govt. share in District Module Approval",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Call",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Approval for Application",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2023-12-06T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "District Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.04",
        requirementDate: "2023-10-02T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add Income Tax of Central Govt. share in District Module Approval",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Call",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Approval for Application",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2023-11-06T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "District Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.05",
        requirementDate: "2023-10-11T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add GST reimbursement of Central Govt. share in GST Commissioner Module Approval",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "VC",
        providedBy: "Usha",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Approval for Application",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2024-01-04T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "GST Commissioner Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.06",
        requirementDate: "2023-10-16T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add GST reimbursement of Central Govt. share in State Module Approval",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Meeting",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Approval for Application",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2024-01-10T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "State Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.07",
        requirementDate: "2023-10-23T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add Income Tax of Central Govt. share in State Module Approval",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Meeting",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Approval for Application",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2023-12-12T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "State Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.08",
        requirementDate: "2023-11-01T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add GST reimbursement of Central Govt. share of CGST & IGST for 5 years in Applicant Module",
        priority: "High",
        requirementGatheredBy: "Krunal Patel , Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Call",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Development",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2024-01-02T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "Applicant Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.09",
        requirementDate: null,
        requirementChangeNumber: "C.01.00.00.08",
        changeDate: "2024-01-02T00:00:00.000Z",
        description: "Add Turnover Amount in Rs.",
        priority: "Low",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "VC",
        providedBy: "Usha",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Change Input",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2024-02-01T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "Applicant Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.10",
        requirementDate: null,
        requirementChangeNumber: "C.01.00.00.09",
        requirementDate: "2024-04-01T00:00:00.000Z",
        requirementChangeNumber: null,
        changeDate: null,
        description:
          "Add Period of claim Drop Down and Monthly quarter Radio Button",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "VC",
        providedBy: "Usha",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Change Input",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2024-02-01T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "Applicant Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.11",
        requirementDate: "2023-11-13T00:00:00.000Z",
        requirementChangeNumber: "C.01.00.00.07",
        changeDate: "2024-01-02T00:00:00.000Z",
        description:
          "Add Income Tax Reimbursement of centre’s share for 5 years in Applicant Module",
        priority: "Medium",
        requirementGatheredBy: "Krunal Patel, Jai Prakash & Rashmi Patel",
        modeOfReceipt: "VC",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Development",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2023-12-30T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "Applicant Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.12",
        requirementDate: "2023-11-16T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description:
          "Add GST reimbursement of Central Govt. share of CGST & IGST for 5 years view Report Particular District",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Call",
        providedBy: "Usha",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Add Report filter by district",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2023-11-20T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "District Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.13",
        requirementDate: "2023-11-21T00:00:00.000Z",
        requirementChangeNumber: "C.01.11.00.11",
        changeDate: "2024-02-05T00:00:00.000Z",
        description:
          "Add GST reimbursement of Central Govt. share of CGST & IGST for 5 years in District Module Approval",
        priority: "High",
        requirementGatheredBy: "Krunal Patel, Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Meeting",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Approval for Application",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2024-01-08T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "District Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
      },
      {
        projectNumber: 1,
        requirementNumber: "R.01.00.00.14",
        requirementDate: "2024-02-05T00:00:00.000Z",
        requirementChangeNumber: "",
        changeDate: null,
        description: "Add Incentive Amount (INR), Document Agenda and Remark",
        priority: "Medium",
        requirementGatheredBy: "Jai Prakash & Rashmi Patel",
        modeOfReceipt: "Meeting",
        providedBy: "Rashmi",
        requirementAcceptance: "Yes",
        actionsToBeTaken: "Add Document",
        responsibility: "Rashmi",
        expectedDateOfDelivery: "2024-02-08T00:00:00.000Z",
        status: "Completed",
        requirementOutputName: "District Module",
        dependency: "",
        impactOfNewRequirementsOrChanges: "",
        remarks: "",
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
      const mainPart = ` R.${String(projectNumber).padStart(2, "0")}.00.`;
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
  projectNumber: {
    type: Number,
    ref: "Project",
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

const updateProjectCP = async (projectNumber) => {
  try {
    // Calculate the sum of CP values for the given project number
    const cpSum = await CPmodel.aggregate([
      { $match: { projectNumber: projectNumber } },
      { $group: { _id: null, totalCP: { $sum: { $toDouble: "$CP" } } } }, // Convert CP to a number
    ]);

    const totalCP = cpSum.length ? cpSum[0].totalCP : 0;

    // Update the Project schema with the calculated CP value
    await Project.updateOne(
      { projectNumber: projectNumber },
      { $set: { CP: totalCP } }
    );

    console.log(`Project ${projectNumber} CP updated to ${totalCP}`);
  } catch (error) {
    console.error("Error updating project CP:", error);
  }
};

app.post("/api/calculate-cp", async (req, res) => {
  try {
    const {
      requirementNumber,
      task,
      projectNumber,
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
      projectNumber,
      numberOfInputElements,
      numberOfTablesViews,
      interfaceClass,
      functionsLogic,
      rndComponent,
      CP,
    });

    // Save the new document to the database
    await newCP.save();

    // Update the total CP for the related project
    await updateProjectCP(projectNumber);

    res.status(200).json({ message: "Form data saved successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Express route for handling POST request
// app.post("/api/calculate-cp", async (req, res) => {
//   try {
//     const {
//       requirementNumber,
//       task,
//       projectNumber,
//       numberOfInputElements,
//       numberOfTablesViews,
//       interfaceClass,
//       functionsLogic,
//       rndComponent,
//       CP,
//     } = req.body;

//     // Create a new CP document
//     const newCP = new CPmodel({
//       requirementNumber,
//       task,
//       projectNumber,
//       numberOfInputElements,
//       numberOfTablesViews,
//       interfaceClass,
//       functionsLogic,
//       rndComponent,
//       CP,
//     });

//     // Save the new document to the database
//     await newCP.save();

//     res.status(200).json({ message: "Form data saved successfully." });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

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

app.post("/api/saveForm", async (req, res) => {
  try {
    const {
      title,
      description,
      data,
      version,
      versionName,
      projectNumber,
      fileNumber,
      projectTitle,
      templateName,
      createdBy,
      createdAt,
    } = req.body;

    const newVersion = {
      version: version,
      title: title,
      description: description,
      data: data,
      versionNum: versionName,
      createdAt: new Date(),
    };

    // Check if a file with the same templateName already exists
    let file = await File.findOne({ templateName, projectNumber });
    //let project = await File.findOne({projectNumber});

    if (file) {
      // Check if the version already exists
      const existingVersion = file.versions.find(
        (v) => v.versionNum === versionName
      );

      if (existingVersion) {
        // Update the existing version
        existingVersion.title = title;
        existingVersion.description = description;
        existingVersion.data = data;
        existingVersion.versionNum = versionName;
        existingVersion.updatedAt = new Date();
      } else {
        // Add the new version

        file.versions.push(newVersion);
      }

      await file.save();
    } else {
      // Create a new file document
      file = new File({
        fileNumber,
        projectNumber,
        projectTitle,
        templateName,
        createdBy,
        createdAt,
        versions: [newVersion],
      });

      await file.save();
    }

    res.status(200).json({ id: file._id });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).send("Error saving form data");
  }
});

app.use(bodyParser.json());
app.get("/api/getForm/:version", async (req, res) => {
  const { version } = req.params;

  try {
    console.log("Searching for form with version:", version);

    const form = await File.findOne({
      "versions.version": parseInt(version), // Convert version to number for comparison
    });

    if (form && form.versions) {
      const versionData = form.versions.find(
        (v) => v.version === parseInt(version)
      ); // Corrected comparison
      if (versionData) {
        const response = {
          title: versionData.title,
          description: versionData.description,
          data: versionData.data,
          projectNumber: form.projectNumber,
          fileNumber: form.fileNumber,
          projectTitle: form.projectTitle,
          templateName: form.templateName,
          createdBy: form.createdBy,
          createdAt: versionData.createdAt,
          versionNum: versionData.versionNum,
        };
        res.json(response);
      } else {
        console.log("Version not found for version:", version);
        res.status(404).send("Version not found");
      }
    } else {
      console.log("Form not found for version:", version);
      res.status(404).send("Form not found");
    }
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).send("Error fetching form data");
  }
});

app.get("/api/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).send(err);
  }
});

//upload file

//const express = require('express');
const multer = require("multer");
const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");
const stream = require("stream");
//const cors = require('cors'); // Import the cors package
const mammoth = require("mammoth");
const Docxtemplater = require("docxtemplater");
const path = require("path");
// const app = express();
const PizZip = require("pizzip");
//const fs = require('fs');
const htmlDocx = require("html-docx-js");
const requirements = require("./Schema/requirements");
//const bodyParser = require('body-parser');

// Use CORS middleware
app.use(cors());

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Replace with your MongoDB connection URI
// const uri =  "mongodb://0.0.0.0:27017";
const dbName = "test";
const collectionName = "uploads"; // GridFS collection name

async function connectToDatabase() {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

// async function closeDatabaseConnection(client) {
//   try {
//     await client.close();
//     console.log("MongoDB connection closed");
//   } catch (error) {
//     console.error("Failed to close MongoDB connection", error);
//   }
// }
// //change
async function uploadToGridFS(file, metadata, fileId) {
  const client = await connectToDatabase();
  try {
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: collectionName });

    const uploadStream = bucket.openUploadStreamWithId(
      new ObjectId(fileId),
      file.originalname,
      {
        metadata,
        contentType: file.mimetype, // Ensure contentType is set here
      }
    );
    const bufferStream = stream.Readable.from(file.buffer);

    const uploadPromise = new Promise((resolve, reject) => {
      bufferStream
        .pipe(uploadStream)
        .on("error", (err) => {
          reject(err);
          // closeDatabaseConnection(client);
        })
        .on("finish", () => {
          resolve(uploadStream);
          // closeDatabaseConnection(client);
        });
    });

    return uploadPromise;
  } catch (error) {
    // closeDatabaseConnection(client);
    throw error;
  }
}

// Upload route
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       throw new Error('No file uploaded'); // Handle missing file
//     }
//     const metadata = { contentType: req.file.mimetype };
//     const uploadStream = await uploadToGridFS(req.file, req.body); // Access additional data from req.body

//     // Add GridFS-specific details to req.file.grid
//     req.file.grid = {
//       _id: uploadStream.id,
//       filename: uploadStream.filename,
//       metadata: uploadStream.options.metadata,
//       bucketName: collectionName,

//     };

//     res.json({
//       message: 'File uploaded successfully!',
//       file: req.file,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error uploading file' });
//   }
// });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded"); // Handle missing file
    }

    const rNumber = req.body.rNumber; // Access rNumber from req.body

    // Example metadata, including rNumber
    const metadata = {
      contentType: req.file.mimetype,
      rNumber: rNumber, // Add rNumber to metadata
    };

    const uploadStream = await uploadToGridFS(req.file, metadata); // Pass metadata to GridFS upload function

    // Add GridFS-specific details to req.file.grid
    req.file.grid = {
      _id: uploadStream.id,
      filename: uploadStream.filename,
      metadata: uploadStream.options.metadata,
      bucketName: collectionName,
    };

    res.json({
      message: "File uploaded successfully!",
      file: req.file,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
});

// Edit route
app.post("/files/edit", upload.single("file"), async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing file ID" });
  }

  try {
    const uploadStream = await uploadToGridFS(req.file, req.body, id);
    res.json({
      message: "File updated successfully!",
      file: req.file,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating file" });
  }
});

// Get all files
// app.get('/files', async (req, res) => {
//   const client = await connectToDatabase();
//   try {
//     const db = client.db(dbName);
//     const filesCollection = db.collection(`${collectionName}.files`);
//     const files = await filesCollection.find().toArray();
//     res.json(files);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching files' });
//   } finally {
//     client.close();
//   }
// });

app.get("/files", async (req, res) => {
  const client = await connectToDatabase();
  try {
    const db = client.db(dbName);
    const filesCollection = db.collection(`${collectionName}.files`);
    const { requirementNumber } = req.query; // Get the requirementNumber from query parameters

    // Find files that match the requirementNumber
    const query = requirementNumber
      ? { "metadata.rNumber": requirementNumber }
      : {};
    const files = await filesCollection.find(query).toArray();

    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching files" });
  } finally {
    client.close();
  }
});

app.get("/files/:id", async (req, res) => {
  const client = await connectToDatabase();
  try {
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: collectionName });
    const id = new ObjectId(req.params.id);

    const downloadStream = bucket.openDownloadStream(id);

    downloadStream.on("error", (err) => {
      console.error(err);
      res.status(404).json({ message: "File not found" });
      client.close();
    });

    downloadStream.on("file", (file) => {
      const contentType = file.contentType || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${file.filename}"`
      );
    });

    downloadStream.on("end", () => {
      client.close();
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching file" });
    client.close();
  }
});

app.post("/files/save", upload.none(), async (req, res) => {
  const { id, content } = req.body;
  console.log("Received id:", id);
  console.log("Received content:", content);

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: collectionName });

    // Fetch the existing file from GridFS
    const downloadStream = bucket.openDownloadStream(new ObjectId(id));
    const bufferChunks = [];

    downloadStream.on("data", (chunk) => bufferChunks.push(chunk));
    downloadStream.on("error", (error) => {
      console.error("Error fetching file:", error);
      res.status(500).send("Error fetching file");
      client.close();
    });

    downloadStream.on("end", async () => {
      const buffer = Buffer.concat(bufferChunks);

      // Convert the HTML content to .docx format using html-docx-js
      const docxContent = htmlDocx.asBlob(content);

      // Load the .docx file into docxtemplater
      const zip = new PizZip(buffer);

      // Replace a placeholder in the .docx file with the new content
      const doc = new Docxtemplater(zip);
      doc.setData({ content });

      try {
        doc.render();
      } catch (error) {
        console.error("Error rendering docxtemplater:", error);
        res.status(500).send("Error rendering document");
        client.close();
        return;
      }

      // Get the updated .docx file content as a buffer
      const updatedBuffer = doc.getZip().generate({ type: "nodebuffer" });

      // Delete the old file from GridFS
      await bucket.delete(new ObjectId(id));

      // Save the updated file back to GridFS with the same ID
      const uploadStream = bucket.openUploadStreamWithId(
        new ObjectId(id),
        `${id}.docx`
      );
      const bufferStream = new stream.PassThrough();
      bufferStream.end(updatedBuffer);

      bufferStream
        .pipe(uploadStream)
        .on("error", (error) => {
          console.error("Error saving file:", error);
          res.status(500).send("Error saving file");
          client.close();
        })
        .on("finish", () => {
          res.status(200).send("File saved successfully!");
          client.close();
        });
    });
  } catch (error) {
    console.error("Error saving file:", error);
    res.status(500).send("Error saving file");
  }
});

app.get('/api/project-managers', async (req, res) => {
  try {
    const managers = await User.find({ userType: 'Project Manager' }, 'fname lname'); // Retrieve only the fname field
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});