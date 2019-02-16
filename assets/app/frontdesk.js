var generateTeeTimeDisplayBody = () => {
	var startTime = moment("5:30 AM", "HH:mm").format("x");
	var endTime = moment("16:00 PM", "HH:mm").format("x");
	var tBody = $("<tbody></tbody>");
	var counter = 0;

	do {
		var xTime = moment(startTime, "x").format("HH:mm A");
		var row = $(
			"<tr id='teetime_" +
				startTime +
				"' onclick='setTableRowActive($(this));'></tr>"
		);
		row.append(
			"<td class='flight-time'>" +
				moment(startTime, "x").format("HH:mm A") +
				"</td>"
		);
		row.append(
			"<td class='flight-player-td flight-player-1-teetime_" +
				startTime +
				"'></td>"
		);
		row.append(
			"<td class='flight-player-td flight-player-2-teetime_" +
				startTime +
				"'></td>"
		);
		row.append(
			"<td class='flight-player-td flight-player-3-teetime_" +
				startTime +
				"'></td>"
		);
		row.append(
			"<td class='flight-player-td flight-player-4-teetime_" +
				startTime +
				"'></td>"
		);

		$(".fd-teetime-display")
			.find("tbody")
			.append(row);

		startTime = moment(startTime, "x").add(10, "m");
		counter++;
	} while (moment(endTime, "x") >= moment(startTime, "x"));
};

var setTableRowActive = e => {
	var table = $(".fd-teetime-display");
	table.find("tbody tr.active").removeClass("active");

	e.addClass("active");
};
