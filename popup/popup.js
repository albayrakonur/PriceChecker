document.addEventListener("DOMContentLoaded", function () {
  const displayButton = document.getElementById("displayButton");

  displayButton.addEventListener("click", function () {
    const elementId = document.getElementById("elementId").value;
    const incrementRate = document.getElementById("incrementRate").value;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: displayElementValue,
        args: [elementId, incrementRate],
      });
    });
  });

  function displayElementValue(elementId, incrementRate) {
    const element = document.getElementById(elementId);
    if (element) {
      incrementRate = (100 + Number(incrementRate)) / 100
      var elementVal = element.textContent
      elementVal = Number(elementVal.substring(0, elementVal.indexOf(",")).replaceAll(".", ""))
      elementVal *= incrementRate
      //console.log("elementVal: " + elementVal)
      alert("New Value of element with ID" + elementId + ": " + elementVal);
    } else {
      alert(`Element with ID "${elementId}" not found on this page.`);
    }
  }
});
