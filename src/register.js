const casper = require("casper").create({ verbose: true, logLevel: "debug" });

const args = casper.cli.args;
if (args.length < 1) {
  casper.exit();
}

const url = "http://sg.gachon.ac.kr/";
const id = args[0].toString();
const password = args[1].toString();
const numbers = args.slice(2).map(function (n) {
  return zeroFill(n, 8);
});
console.log(numbers);
console.log(numbers[0]);
console.log(typeof numbers[0]);
console.log(numbers[1]);
console.log(typeof numbers[1]);

casper.start();
casper.open(url);

casper.then(function () {
  casper.withFrame(0, function () {
    casper.fill(
      "#form",
      {
        id: id,
        pwd: password,
      },
      false
    );
  });
});

casper.then(function () {
  casper.withFrame(0, function () {
    const selector = "#btn_login";
    if (casper.exists(selector)) {
      casper.mouseEvent("click", selector);
    } else {
      console.log("login failed!!!");
    }
  });
});

casper.then(function () {
  casper.switchToFrame(0);
  casper.switchToFrame(0);

  const selector =
    "div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button";
  if (casper.exists(selector)) {
    casper.mouseEvent("click", selector);
  } else {
    console.log("first confirm failed");
  }
});

casper.then(function () {
  const selector = "#menu_01_0301";
  if (casper.exists(selector)) {
    casper.mouseEvent("click", selector);
  } else {
    console.log("register page failed");
  }
});

casper.then(function () {
  numbers.forEach(function (n) {
    casper.waitForText("학수번호(Course No)", function () {
      const inputSelector =
        ".main-frame>.contents>div#tab>ul>li:nth-child(3)>span>input#gwamok";
      if (casper.exists(inputSelector)) {
        casper
          .then(function () {
            casper.sendKeys(inputSelector, n);
          })
          .then(function () {
            const btnSelector =
              "div#tab > ul > li:nth-child(3) > span > button";
            if (casper.exists(btnSelector)) {
              casper.mouseEvent("click", btnSelector);
            } else {
              console.log("register button failed!!!");
            }
          })
          .then(function () {
            casper.waitForText("저장되었습니다!", function () {
              const confirmSelector =
                "body > div:nth-child(5) > div:nth-child(3) > div > button";
              if (casper.exists(confirmSelector)) {
                casper.mouseEvent("click", confirmSelector);
                console.log(n, "successed");
              } else {
                console.log("save confirm failed");
              }
            });
          });
      } else {
        console.log("register failed");
      }
    });
  });
});

casper.run();

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + ""; // always return a string
}
