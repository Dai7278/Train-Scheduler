

  // Initialize Firebase
   var config = {
    apiKey: "AIzaSyA5a4u_5RQwHAbvaKysgFR1_0685qns51s",
    authDomain: "train-schedule-7ed1a.firebaseapp.com",
    databaseURL: "https://train-schedule-7ed1a.firebaseio.com",
    storageBucket: "train-schedule-7ed1a.appspot.com",
    messagingSenderId: "417982454961"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#Train-name-input").val().trim();
  var trnDes = $("#Destination-input").val().trim();
  var trnTime = moment($("#Time-input").val().trim(), "HH:mm").format();
  var trnFre = $("#Frequency-input").val().trim();

  var newTrn = {
  		name: trainName,
  		destination: trnDes,
  		time: trnTime,
  		frequency: trnFre,
  }

  // Uploads employee data to the database
  database.ref().push(newTrn);


  // Train Info
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.time);
  console.log(newTrn.frequency);

  // Alert
  alert("Train successfully added to Amtrak Database");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#Destination-input").val("");
  $("#Time-input").val("");
  $("#Frequency-input").val("");

  
  return false;

}); 

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	
  var trainName = childSnapshot.val().name;
  var trnDes = childSnapshot.val().destination;
  var trnTime = childSnapshot.val().time;
  var trnFre = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trnDes);
  console.log(trnTime);
  console.log(trnFre);

  // First Train Time (pushed back 1 year to make sure it comes before current time)
    var trnTimeConverted = moment(trnTime, "HH:mm").subtract(1, "years");
    console.log(trnTimeConverted);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trnTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trnRemainder = diffTime % trnFre;
    console.log(trnRemainder);

    // Minute Until Train
    var trnMinutesTill = trnFre - trnRemainder;
    console.log("MINUTES TILL TRAIN: " + trnMinutesTill);

    // Next Train
    var nextTrain = moment().add(trnMinutesTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  

  // Add train info into the amtrak table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trnDes + "</td><td>" +
  trnFre + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trnMinutesTill + "</td><td>" + "" + "</td></tr>");
  
});
