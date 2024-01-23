window.Split(["#split-0", "#split-1"], {
  sizes: [75, 25],
});

const snapThreshold = 10;
const contentEl = document.querySelector(".content");
function onStart(el, x, y) {
  el.style.top = el.offsetTop + "px";
  el.style.bottom = "auto";
}
function onEnd(el, x, y) {
  if (
    el.parentNode.scrollHeight - (el.offsetTop + el.offsetHeight) <
    snapThreshold
  ) {
    el.style.top = "auto";
    el.style.bottom = "0px";
  }
  if (
    el.parentNode.scrollWidth - (el.offsetLeft + el.offsetWidth) <
    snapThreshold
  ) {
    el.style.left = "auto";
    el.style.right = "0px";
    el.remove();
  }
  if (el.offsetTop < snapThreshold) {
    el.style.top = "0px";
  }
  if (el.offsetLeft < snapThreshold) {
    el.style.left = "0px";
  }
}

const tools = document.querySelectorAll(".tools .tool");

tools.forEach((tool) => {
  tool.addEventListener("dragstart", () => {
    tool.classList.add("dragging");
  });

  tool.addEventListener("dragend", (e) => {
    const inElement = getDragInElement(contentEl, e.clientX, e.clientY);
    if (inElement != null) {
      const dupNode = document.createElement("p");
      dupNode.classList.add("panel");
      dupNode.style.backgroundColor = e.target.attributes["bg-color"].value;
      dupNode.style.left = e.clientX - inElement.style.left + "px";
      dupNode.style.top = e.clientY - inElement.style.top + "px";
      inElement.appendChild(dupNode);
      resizedrag(dupNode, dupNode, onStart, onEnd);
    } else {
    }
    tool.classList.remove("dragging");
  });
});

function getDragInElement(contentEl, x, y) {
  const draggableElements = [
    contentEl,
    ...contentEl.querySelectorAll(".panel"),
  ];
  const draggableEl = draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetX = x - box.left;
      const offsetY = y - box.top;
      if (
        offsetX > 0 &&
        x < box.right &&
        offsetY > 0 &&
        y < box.bottom
      ) {
        return { offsetX: offsetX, offsetY: offsetY, element: child };
      } else {
        return closest;
      }
    },
    { offsetX: Number.NEGATIVE_INFINITY, offsetY: Number.NEGATIVE_INFINITY }
  )
  return draggableEl.element;
}
