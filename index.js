window.onload = onLoad;
function onLoad() {
  const barAmounts = document.querySelectorAll(".bar-amount");
  const bars = document.querySelectorAll(".bar-middle");
  const barNames = document.querySelectorAll(".bar-name");
  const amountArr = [];
  const date = new Date();
  const day = date.getDay();
  const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayName = weekDays[day];

  (async function getData() {
    let dataFile = await fetch("./data.json");
    let data = await dataFile.json();
    let dataArr = [...data];

    for (let i in dataArr) {
      // add day names and corresponding amounts to the bars
      let name = dataArr[i]["day"];
      let amount = dataArr[i]["amount"].toString();
      amountArr.push(dataArr[i]["amount"]);
      let nameTextNode = document.createTextNode(name);
      let amountTextNode = document.createTextNode("$" + amount);
      barNames[i].appendChild(nameTextNode);
      barAmounts[i].appendChild(amountTextNode);

      // sets the height of the bars
      if (parseInt(i) + 1 === dataArr.length) {
        let highest = Math.max(...amountArr);
        for (let j in dataArr) {
          let height = Math.round((174 / highest) * dataArr[j]["amount"]);
          height = height.toString() + "px";
          bars[j].style.height = height;

          // highlight the current day's bar
          let dayNames = barNames[j].innerText;
          if (dayNames === dayName) {
            let highlightedBar = barNames[j].nextElementSibling;
            highlightedBar.classList.add("highlighted");
            let showAmount = highlightedBar.nextElementSibling;
            showAmount.classList.add("visible");
          }
        }
      }

    }
  })();
}