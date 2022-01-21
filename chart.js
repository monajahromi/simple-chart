const manipulateDom = () => {
  function fetchData(setData) {
    return fetch("data.json")
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
        setData(res);
        return res;
      });
  }

  function setData(data) {
    data = data;
    document.querySelector(".label-x").innerText = data.labels.x;
    document.querySelector(".label-y").innerText = data.labels.y;

    let items = data.items
      .sort((a, b) => b.value - a.value)
      .map((data, index) => {
        return { ...data, id: index + 1 };
      });
    console.log("itms", items);
    let count = items.length;
    let width = (100 / count).toPrecision(4);
    let maxValue = items[0].value;
    let backupOriginalColorOfHoverdItem;
    let backupIdOfHoverdItem;
    console.log("width", width);
    console.log("maxValue", maxValue);

    let rate = (90 / maxValue).toPrecision(5);

    const setInfoValue = ({ title, description, value }) => {
      document.querySelector(".info h2").innerText = title;
      document.querySelector(".info p").innerText = description;
      document.querySelector(".info pre").innerText = [
        ...[...("" + value)]
          .reverse()
          .join("")
          .replaceAll(/(\d{3})\d/g, (a, b) => b + ","),
      ]
        .reverse()
        .join("");
    };

    document.onkeydown = function (e) {
      let extractedIdNUM = +backupIdOfHoverdItem
        .toString()
        .replace("tower-", "");

      switch (e.key) {
        case "ArrowRight":
          hoverItem(`tower-${extractedIdNUM + 1}`);
          break;

        case "ArrowLeft":
          hoverItem(`tower-${extractedIdNUM - 1}`);
          break;
        default:
          break;
      }
    };
    function hoverItem(id) {
      if (backupIdOfHoverdItem) {
        let towerPre = document.getElementById(backupIdOfHoverdItem);
        towerPre.style.backgroundColor = backupOriginalColorOfHoverdItem;
      }
      let tower = document.getElementById(id);

      backupOriginalColorOfHoverdItem = tower.style.backgroundColor;
      backupIdOfHoverdItem = tower.id;

      tower.style.backgroundColor = "red";
    }

    items.forEach((element) => {
      let height = element.value * rate;
      function onmouseover(v) {
        console.log(v);
      }
      var node = document.createElement("div");

      node.setAttribute("id", `tower-${element.id}`);

      node.style.height = `${height}%`;
      node.style.width = `${width}%`;
      node.style.backgroundColor = element.color;

      node.addEventListener("mouseover", () => {
        hoverItem(node.id);
        setInfoValue(element);
      });

      node.addEventListener("mouseout", () => {
        node.style.backgroundColor = element.color;
      });

      document.querySelector(".chart").appendChild(node);
    });
  }

  fetchData(setData);
};
function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState != "loading") fn();
    });
  }
}

ready(manipulateDom);
