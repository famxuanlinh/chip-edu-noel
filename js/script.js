// Lấy danh sách tất cả các phần tử có thể kéo
const draggables = document.querySelectorAll(".draggable");
const dropZones = document.querySelectorAll(".drop-zone");

// Xử lý sự kiện khi bắt đầu kéo
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.id);
  });
});

document.getElementById("checkResults").addEventListener("click", () => {
  let results = [];

  // Lặp qua tất cả các ô drop-zone
  dropZones.forEach((zone) => {
    // Kiểm tra xem trong ô có phần tử không
    if (zone.hasChildNodes()) {
      results.push(zone.firstChild.textContent);
    } else {
      results.push("EMPTY"); // Nếu ô trống
    }
  });

  // Hiển thị kết quả trong console
  console.log("Danh sách các giá trị đã nhập:", results);
});

// Xử lý sự kiện khi phần tử được kéo vào vùng thả
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

    // Lấy ID của phần tử đang được kéo
    const draggedId = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(draggedId);

    // Kiểm tra nếu ô đã có dữ liệu thì không cho thả nữa
    if (!zone.hasChildNodes()) {
      zone.textContent = "";
      zone.appendChild(draggedElement);
    }
  });
});
