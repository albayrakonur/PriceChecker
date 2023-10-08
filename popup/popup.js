document.addEventListener("DOMContentLoaded", function () {
    const getValueBtn = document.getElementById("getValueBtn");
  
    getValueBtn.addEventListener("click", function () {
      alert("sa")
      const inputId = document.getElementById("inputId").value;
      const output = document.getElementById("output");
  
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            function: getValue,
            args: [inputId],
          },
          function (result) {
            const value = result[0].result;
            output.innerHTML = `Value of input element with ID "${inputId}": <strong>${value}</strong>`;
          }
        );
      });
    });
  });
  
  function getValue(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      return inputElement.value;
    }
    return null;
  }  