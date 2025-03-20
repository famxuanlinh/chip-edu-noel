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

document.querySelectorAll(".toggle-trans").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    document
      .querySelectorAll(".toggle-trans-container")
      .forEach((container) => {
        container.classList.toggle("hidden");
      });
  });
});

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");

let isPlaying = false;

// Toggle play/pause when clicking the icon
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

// When audio plays
audio.addEventListener("play", () => {
  isPlaying = true;
  playPauseBtn.src = "public/exam1/icons/pause-green.svg"; // Change icon
  progressBar.style.background = "blue"; // Change background color
});

// When audio pauses
audio.addEventListener("pause", () => {
  isPlaying = false;
  playPauseBtn.src = "public/exam1/icons/play-orange.svg"; // Change icon
  progressBar.style.background = "orange"; // Change background color
});

// Update progress bar and time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;

  // Update time display
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
});

// Allow seeking using the progress bar
progressBar.addEventListener("input", (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
