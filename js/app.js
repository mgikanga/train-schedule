// Initialize Firebase
var config = {
    apiKey: "AIzaSyC3pRWWw9g88Mc8ENaN7yghNbNrEYQB3sk",
    authDomain: "my-train-project-74920.firebaseapp.com",
    databaseURL: "https://my-train-project-74920.firebaseio.com",
    projectId: "my-train-project-74920",
    storageBucket: "my-train-project-74920.appspot.com",
    messagingSenderId: "819650091792"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val();
    var trainStart = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.trainDestination);
    console.log(newTrain.trainStart);
    console.log(newTrain.trainFrequency);
  
    
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);
  
    // Prettify the train start
    //var trainStartPretty = moment.unix(trainStart).format("HH:MM");
    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // To calculate the arrival time
    //var trainArrival = moment().diff(moment.unix(trainStart, "X"), "minutes");
    //console.log(trainArrival);
  
    // Time apart (remainder)
    var trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);

    // Minute Until Train
    var trainMinutesTillTrain = trainFrequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(trainMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + moment(nextTrain).format("HH:MM") +"</td><td>" + trainMinutesTillTrain + "</td></tr>");
  });