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

var currentHour = moment().format("H");

//Loop through

for (var i = 0; i <= workingHours; i++) {
  var timeHour = moment().startOf("day").add(8, "hours"); // Initialize back to start of Work Day Time
  var timeText = timeHour.add(i, "hours").format("h:mm A");
  var timeID = timeHour.format("H");

  var timeRowDiv = $("<div>");
  timeRowDiv.addClass("row justify-content-md-center");

  var timeHourDiv = $("<div>");
  timeHourDiv.addClass("hour col-md-2");
  timeHourDiv.text(timeText);

  var taskDiv = $("<textarea>");
  taskDiv.addClass("col-md-8");
  taskDiv.attr("id", "task-" + timeID);
  if (Number(timeID) < Number(currentHour)) {
    taskDiv.addClass("past");
  } else if (Number(timeID) == Number(currentHour)) {
    taskDiv.addClass("present");
  } else {
    taskDiv.addClass("future");
  }

  var taskBtn = $("<button>");
  taskBtn.addClass("saveBtn col-md-1");
  taskBtn.attr("btn-Id", "btn-" + timeID);

  var iElement = $("<i>");
  iElement.addClass("fas fa-save");

  taskBtn.append(iElement);
  timeRowDiv.append(timeHourDiv, taskDiv, taskBtn);

  $("#tasks-view").append(timeRowDiv);
}
