const docBody = document.querySelector("body");
const meta = document.querySelector("meta[name=description][content=popup]");
if (docBody && meta) {
  function createNewButton(callback, buttonText = "Function", callbackArgs = []) {
    const wishListButton = document.createElement("button")
    wishListButton.addEventListener("click", async function () {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: callback,
        args: callbackArgs,
      });
    });
    wishListButton.innerText = buttonText;
    docBody.appendChild(wishListButton);


  }
  function getWishListVals() {
    const listItems = [...document.querySelectorAll(".saveltlist .priceTxt")];
    console.dir(listItems);
    const listItemPrices = listItems.map((el) => el.innerText.startsWith("WeSell") ? Number.parseFloat(el.innerText.replace(/[^0-9\.]/g, "")) : 0).filter((n) => n > 0);
    const listItemSum = listItemPrices.reduce((a, b) => a + b, 0);
    window.alert(`Total: £${listItemSum.toFixed(2)}`);
  }

  createNewButton(getWishListVals, "Get Wish List Total");
}