const draggables = document.querySelectorAll(".draggable");
const dropZones = document.querySelectorAll(".drop-zone");
const nameList = document.querySelector(".name-list");

// Xử lý khi bắt đầu kéo
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.id);
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });

  // Xử lý khi nhấp vào từ đã thả, nó bay về vị trí cuối danh sách
  draggable.addEventListener("click", (e) => {
    const word = e.target;

    if (word.parentElement.classList.contains("drop-zone")) {
      // Lấy vị trí hiện tại của từ
      const rect = word.getBoundingClientRect();

      // Lấy vị trí cuối của danh sách
      const lastItem = nameList.lastElementChild;
      const lastItemRect = lastItem
        ? lastItem.getBoundingClientRect()
        : nameList.getBoundingClientRect();

      // Tính khoảng cách cần di chuyển
      const offsetX = lastItemRect.left - rect.left;
      const offsetY = lastItemRect.bottom - rect.top + 10; // Cách một chút để đẹp hơn

      // Áp dụng animation
      word.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      word.style.transition = "transform 0.5s ease-in-out";

      setTimeout(() => {
        word.style.transition = "";
        word.style.transform = "";
        nameList.appendChild(word); // Đưa về cuối danh sách
      }, 500);
    }
  });
});

// Xử lý sự kiện kéo thả
dropZones.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("dragover");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("dragover");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("dragover");

    const draggedId = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(draggedId);

    if (!zone.hasChildNodes()) {
      zone.textContent = "";
      zone.appendChild(draggedElement);
    }
  });
});

document.querySelectorAll(".draggable").forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});
