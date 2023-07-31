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
  if (clicked === "about") mainEl.innerHTML = `<h1>about</h1>`;
  console.log(`the element clicked is => ${clicked}`);

  topMenuLinks.forEach((link) => {
    if (link.textContent !== clicked) {
      link.classList.remove("active");
      showingSubMenu = false;
      subMenuEl.style.top = "0";
    } else {
      link.classList.add("active");
    }
  });

  menuLinks.forEach((element) => {
    if (element.text !== "about") {
      showingSubMenu = true;
    } else {
      showingSubMenu = false;
    }
  });

  if (showingSubMenu === true) {
    buildSubmenu();
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = "0";
  }

  function buildSubmenu() {
    subMenuEl.textContent = "";
    menuLinks.forEach((element) => {
      if (element.text.includes(clicked) && element.text !== "about") {
        element.subLinks.forEach((item) => {
          const link = document.createElement("a");
          link.innerText = item.text;
          subMenuEl.appendChild(link);
        });
      }
    });
  }
  subMenuEl.addEventListener("click", (event) => {
    event.preventDefault();
    //prettier-ignore
    console.log(`The element with tag name of => ${event.target.tagName} was clicked`);
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    topMenuLinks.forEach((element) => {
      element.classList.remove("active");
    });
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
  });
});
