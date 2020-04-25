$(document).ready(function () {
  // Determine today's date and format it for display in the planner header
  var today = moment().format("dddd - MMMM Do, YYYY");

  // Display using jQuery the date
  $("#currentDay").text(today);

  // Define start of the work day to be 8am
  var startOfWorkDay = moment().startOf("day").add(8, "hours");

  // initialize end of work day to be 5pm
  var endOfWorkDay = moment().startOf("day").add(17, "hours");

  // Display the work day calendar is the difference between endOfWorkDay and startOfWorkDay = 9 hours
  workingHours = endOfWorkDay.diff(startOfWorkDay, "hours");

  //Obtain the current hour, which will be used to for setting the past, present and future time slots
  var currentHour = moment().format("H");

  //Loop through the timeslots and add them to the display
  for (var i = 0; i <= workingHours; i++) {
    // Initialize to start of Work Day Time
    var timeHour = moment().startOf("day").add(8, "hours");
    //format for display for the row time
    var timeText = timeHour.add(i, "hours").format("h:mm A");
    // set for use in the tag IDs
    var timeID = timeHour.format("H");

    //Retrieve from local storage the text for the task for that particular time slot
    var taskText = localStorage.getItem("task-" + timeID);

    //Start constructing the dynamic html starting with the row
    var timeRowDiv = $("<div>");
    timeRowDiv.addClass("row justify-content-md-center");

    //Construct the first part of the row with the time. Using Bootstrap with column width of 2
    var timeHourDiv = $("<div>");
    timeHourDiv.addClass("hour col-md-2");
    timeHourDiv.text(timeText);

    //Construct the Text Area of the task aligned with the time. Using Bootstrap with column width of 8
    var taskDiv = $("<textarea>");
    taskDiv.addClass("col-md-8");
    //Setting the ID to be based upon the row time
    taskDiv.attr("id", "task-" + timeID);

    //Set the row color to based upon the current Hour and if it is past, present or future
    if (Number(timeID) < Number(currentHour)) {
      taskDiv.addClass("past");
    } else if (Number(timeID) == Number(currentHour)) {
      taskDiv.addClass("present");
    } else {
      taskDiv.addClass("future");
    }
    //Set the task text to be what was retrieved from local storage
    taskDiv.text(taskText);

    //Construct the Save button, which will be at the end of the row. Using Bootstrap with column width of 1
    var taskBtn = $("<button>");
    taskBtn.addClass("saveBtn col-md-1");
    //Setting the ID to be based upon the row time
    taskBtn.attr("id", "btn-" + timeID);

    //Adding in the element for the hover event
    var iElement = $("<i>");
    iElement.addClass("fas fa-save");

    //Add the iElement to the <button>t tag
    taskBtn.append(iElement);

    // Add the timeHourDiv, taskDiv and taskBtn to the row
    timeRowDiv.append(timeHourDiv, taskDiv, taskBtn);

    //And now with JQuery, push the row out to the HTML file in the events-view section
    $("#events-view").append(timeRowDiv);

    //Set the event listener for when a user clicks on the save button
    $("#btn-" + timeID).on("click", function () {
      //The following retrieves the correct text for the task based upon the button click.
      //This is done by swapping the id prefix to reference the text area instead of the button
      taskID = $(this).attr("id").replace("btn", "task");
      //Retrieve the text that is either displayed or typed into the Text Field
      taskText = $("#" + taskID).val();
      //Store the value of whatever is in the text field into local storage
      localStorage.setItem(taskID, taskText);
    });
  }
});
