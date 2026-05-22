function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];

    const flatten = (arr) => (Array.isArray(arr) ? arr.join("; ") : "");

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.age || "",
      data.department || "",
      data.level || "",
      data.email || "",
      data.phone || "",
      data.areasOfInterest || "",
      flatten(data.pastParticipation),
      flatten(data.currentSkills),
      data.whyJoin || "",
      data.whatResearchMeans || "",
      data.problemOfInterest || "",
      data.weeklyHours || "",
      flatten(data.consistentWillingness),
      data.challenges || "",
      data.conceptExplanation || "",
      data.finalCommitment || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    const rows = sheet.getDataRange().getValues();

    if (rows.length < 2) {
      return ContentService
        .createTextOutput(JSON.stringify({ data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = rows[0].map(h => h.toString().trim());
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        const val = row[i];
        if (["pastParticipation", "currentSkills", "consistentWillingness"].includes(h)) {
          obj[h] = val ? val.split("; ").filter(Boolean) : [];
        } else if (h === "timestamp") {
          obj[h] = val ? new Date(val).toISOString() : null;
        } else {
          obj[h] = val !== undefined ? String(val) : "";
        }
      });
      return obj;
    });

    data.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

    return ContentService
      .createTextOutput(JSON.stringify({ data }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
