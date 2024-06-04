const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const QueData = require('./model');
require('./dbConnect'); // Assuming this file connects to the database

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  try {
    let data = await QueData.find({});
    res.status(200).send({ message: "Successfully got data.", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/quesfreq', async (req, res) => {
    try {
      // Retrieve data from MongoDB
      const data = await QueData.find({});
      
      // Calculate frequency of questions
      const questionFreq = {};
      data.forEach(({ question }) => {
        questionFreq[question] = (questionFreq[question] || 0) + 1;
      });
      
      // Sort questions by frequency
      const sortedQuestions = Object.entries(questionFreq)
        .sort(([, freqA], [, freqB]) => freqB - freqA)
        .map(([question, freq]) => ({ question, freq }));
  
      // Send response with sorted questions
      res.status(200).json({ message: "Successfully fetched data.", data: sortedQuestions });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// API Endpoint to fetch monthly graph data
app.get('/monthlyGraphData', async (req, res) => {
  try {
    const data = await QueData.aggregate([
      {
        $project: {
          monthNum: { $month: { $toDate: { $multiply: ["$timestamp", 1000] } } },
          month: { $dateToString: { format: "%b", date: { $toDate: { $multiply: ["$timestamp", 1000] } } } },
          no_of_responses: 1,
        }
      },
      {
        $group: {
          _id: "$monthNum",
          monthName: { $first: "$month" },
          no_of_responses: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Initialize an array with counts set to zero for all months
    const allMonthsData = Array.from({ length: 12 }, (_, i) => ({
      _id: i + 1,
      monthName: new Date(0, i).toLocaleString('default', { month: 'short' }),
      count: 0
    }));

    // Merge fetched data with the initialized array
    const mergedData = allMonthsData.map((monthData) => {
      const foundData = data.find((d) => d._id === monthData._id);
      return foundData || monthData;
    });

    res.json(mergedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
  
  // Helper function to get short day names
  const getShortDayName = (day) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  };
  
  
  // API Endpoint to fetch weekly graph data
  app.get('/weeklyGraphData', async (req, res) => {
    try {
      const data = await QueData.aggregate([
        {
          $project: {
            day: { $dayOfWeek: { $toDate: { $multiply: ["$timestamp", 1000] } } },
            no_of_responses: 1,
          }
        },
        {
          $group: {
            _id: "$day",
            no_of_responses: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      // Initialize an array with counts set to zero for all days of the week
      const allDaysData = Array.from({ length: 7 }, (_, i) => ({
        _id: i + 1,
        dayName: getShortDayName(i),
        no_of_responses: 0
      }));
  
      // Merge fetched data with the initialized array
      const mergedData = allDaysData.map((dayData) => {
        const foundData = data.find((d) => d._id === dayData._id);
        return foundData ? { ...foundData, dayName: dayData.dayName } : dayData;
      });
  
      res.json(mergedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // API Endpoint to fetch count of questions for each language
app.get('/languageCount', async (req, res) => {
  try {
    const data = await QueData.aggregate([
      {
        $match: {
          language: { $ne: null }
        }
      },
      {
        $group: {
          _id: "$language",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
          name: "$_id", // Rename _id field to name
          value: "$count" // Rename count field to value
        }
      }
    ]);
    
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
  
  //start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
