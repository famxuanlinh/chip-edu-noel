// const draggables = document.querySelectorAll(".draggable");
// const dropZones = document.querySelectorAll(".drop-zone");
// const nameList = document.querySelector(".name-list");

// // Xử lý khi bắt đầu kéo
// draggables.forEach((draggable) => {
//   draggable.addEventListener("dragstart", (e) => {
//     e.dataTransfer.setData("text", e.target.id);
//     draggable.classList.add("dragging");
//   });

//   draggable.addEventListener("dragend", () => {
//     draggable.classList.remove("dragging");
//   });

//   // Xử lý khi nhấp vào từ đã thả, nó bay về vị trí cuối danh sách
//   draggable.addEventListener("click", (e) => {
//     const word = e.target;

//     if (word.parentElement.classList.contains("drop-zone")) {
//       // Lấy vị trí hiện tại của từ
//       const rect = word.getBoundingClientRect();

//       // Lấy vị trí cuối của danh sách
//       const lastItem = nameList.lastElementChild;
//       const lastItemRect = lastItem
//         ? lastItem.getBoundingClientRect()
//         : nameList.getBoundingClientRect();

//       // Tính khoảng cách cần di chuyển
//       const offsetX = lastItemRect.left - rect.left;
//       const offsetY = lastItemRect.bottom - rect.top + 10; // Cách một chút để đẹp hơn

//       // Áp dụng animation
//       word.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
//       word.style.transition = "transform 0.5s ease-in-out";

//       setTimeout(() => {
//         word.style.transition = "";
//         word.style.transform = "";
//         nameList.appendChild(word); // Đưa về cuối danh sách
//       }, 500);
//     }
//   });
// });

// // Xử lý sự kiện kéo thả
// dropZones.forEach((zone) => {
//   zone.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     zone.classList.add("dragover");
//   });

//   zone.addEventListener("dragleave", () => {
//     zone.classList.remove("dragover");
//   });

//   zone.addEventListener("drop", (e) => {
//     e.preventDefault();
//     zone.classList.remove("dragover");

//     const draggedId = e.dataTransfer.getData("text");
//     const draggedElement = document.getElementById(draggedId);

//     if (!zone.hasChildNodes()) {
//       zone.textContent = "";
//       zone.appendChild(draggedElement);
//     }
//   });
// });

// document.querySelectorAll(".draggable").forEach((item) => {
//   item.addEventListener("dragstart", () => {
//     item.classList.add("dragging");
//   });

//   item.addEventListener("dragend", () => {
//     item.classList.remove("dragging");
//   });
// });
const draggables = document.querySelectorAll(".draggable");
const dropZones = document.querySelectorAll(".drop-zone");
const nameList = document.querySelector(".name-list");

// Xử lý khi bắt đầu kéo
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    const target = e.target.closest(".draggable"); // Đảm bảo kéo cả wrapper
    if (target) {
      e.dataTransfer.setData("text", target.id);

      // Tránh opacity bị mờ khi kéo
      setTimeout(() => target.classList.add("dragging"), 0);
    }
  });

  draggable.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  // Xử lý khi click để quay về danh sách gốc với animation mượt mà
  draggable.addEventListener("click", (e) => {
    const wrapper = e.target.closest(".draggable");
    if (!wrapper) return;

    const parentZone = wrapper.parentElement;

    // Chỉ xử lý nếu phần tử đang nằm trong `.drop-zone`
    if (parentZone.classList.contains("drop-zone")) {
      // Lấy vị trí hiện tại của phần tử
      const rect = wrapper.getBoundingClientRect();

      // Lấy vị trí cuối danh sách
      const lastItem = nameList.lastElementChild;
      const lastItemRect = lastItem
        ? lastItem.getBoundingClientRect()
        : nameList.getBoundingClientRect();

      // Tạo phần tử placeholder để giữ chỗ (tránh nhảy danh sách)
      const placeholder = document.createElement("div");
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;
      placeholder.classList.add("placeholder");
      parentZone.appendChild(placeholder);

      // ✅ Fix: Thêm 20px sau item cuối
      const offsetX = lastItemRect.left - rect.left;
      const offsetY = lastItemRect.bottom - rect.top; // Thêm 20px khoảng cách

      // Áp dụng animation
      wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      wrapper.style.transition = "transform 0.5s ease-in-out";

      // Sau khi animation kết thúc, reset lại transform và đưa về danh sách gốc
      setTimeout(() => {
        wrapper.style.transition = "";
        wrapper.style.transform = "";
        nameList.appendChild(wrapper);

        // Xóa placeholder để tránh giật khung hình
        placeholder.remove();
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

    if (!draggedElement) return;

    // Đảm bảo chỉ có một phần tử trong mỗi drop-zone
    if (!zone.hasChildNodes()) {
      zone.appendChild(draggedElement);
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

    if (!draggedElement) return;

    // Đảm bảo chỉ có một phần tử trong mỗi drop-zone
    if (!zone.hasChildNodes()) {
      zone.appendChild(draggedElement);
    }
  });
});

// Translate
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

// Audio player
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");
const audioPlayer = document.querySelector(".audio-player");

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
  playPauseBtn.src = "public/exam1/icons/pause-green.svg";
  audioPlayer.classList.add("playing");
  audioPlayer.classList.remove("paused");
});

// When audio pauses
audio.addEventListener("pause", () => {
  isPlaying = false;
  playPauseBtn.src = "public/exam1/icons/play-orange.svg";
  audioPlayer.classList.add("paused");
  audioPlayer.classList.remove("playing");
});
// Update progress bar and time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.setProperty(
    "--progress",
    `${progress + (progress < 20 ? 2 : progress > 70 ? -2 : 1)}%`
  );
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

function startCountdown(durationInSeconds) {
  let timerElement = document.getElementById("timer-text");
  let timerImage = document.getElementById("timer-img");
  let remainingTime = durationInSeconds;

  function updateTimer() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    // Định dạng số giây thành 2 chữ số (ví dụ: 09 thay vì 9)
    let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timerElement.textContent = formattedTime;

    // Thay đổi hình ảnh nếu thời gian còn dưới 1 phút
    if (remainingTime < 60) {
      timerImage.src = "/public/exam/timer2.png";
      timerElement.style.color = "#A21600";
    }

    if (remainingTime > 0) {
      remainingTime--;
      setTimeout(updateTimer, 1000);
    }
  }

  updateTimer();
}

// Bắt đầu đếm ngược từ 29 phút 10 giây (tổng cộng 1750 giây)
window.onload = function () {
  startCountdown(1750);
};
