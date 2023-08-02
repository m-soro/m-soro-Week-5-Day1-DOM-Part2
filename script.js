// Menu data structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.querySelector("#top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

menuLinks.forEach((element) => {
  const linkTag = document.createElement("a");
  linkTag.innerText = element.text;
  linkTag.setAttribute("href", element.href);
  topMenuEl.appendChild(linkTag);
});

const subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

const topMenuLinks = document.querySelectorAll("a");
let showingSubMenu = false;

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  let clicked = event.target.textContent;
  if (clicked === "about") mainEl.innerHTML = `<h1>about</h1>`; // I'm adding this here. It makes sense to add here since about doesnt have a subheading link
  if (event.target.tagName === "A") {
    //prettier-ignore
    console.log(`An element from topMenuEl w/ tag name of A was clicked => ${clicked}`);
  }

  /**
   * -----
   * NOTE
   * -----
   * I didnt really follow the instructions thoroughly. It was confusing but I think I got it work
   * the way it suppose to work.
   */

  topMenuLinks.forEach((link) => {
    if (link.textContent !== clicked) {
      link.classList.remove("active");
      showingSubMenu = false;
      subMenuEl.style.top = "0";
    } else {
      //in task 5.6, before 5.7, TO ACHIEVE "Clicking an "active" link should clear that link."
      link.classList.toggle("active"); // I used TOGGLE instead of ADD
    }
  });

  menuLinks.forEach((element) => {
    //prettier-ignore
    if (element.text !== "about" && event.target.getAttribute("class") === "active") {
      showingSubMenu = true;
    } else {
      showingSubMenu = false;
    }
  });
  // since about doensnt have a sub menu, avoid building it on the first place
  if (showingSubMenu === true && event.target.textContent !== "about") {
    buildSubmenu(); // I couldn't figure out how to feed the selected subheading array so.. in my buildSubMenu() function...
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = "0";
  }

  // I directly iterated the menuLinks object to extract the subheading links.
  function buildSubmenu() {
    subMenuEl.textContent = "";
    menuLinks.forEach((element) => {
      //prettier-ignore
      if (element.text.includes(clicked)) { // check which object inside the array matches the .text of element clicked
        element.subLinks.forEach((item) => {
          const link = document.createElement("a");
          link.innerText = item.text;
          link.setAttribute("href", item.href);
          subMenuEl.appendChild(link);
        });
      }
    });
  }
  subMenuEl.addEventListener("click", (event) => {
    event.preventDefault();
    //prettier-ignore
    console.log(`An element from subHeading w/ nodeName name of ${event.target.nodeName} was clicked => ${event.target.textContent}`);
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    topMenuLinks.forEach((element) => element.classList.remove("active"));
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
  });
});
