let isShowPanel = false;
let isHaveBeenClose = false;
const panel = $("#newsletter");
const notification = $("#notification");

function hideNotification() {
  notification.addClass("hide--notification");
}

function closePanel() {
  hidePanel();
  const date = new Date();
  date.setMinutes(date.getMinutes() + 10);
  localStorage.setItem("time_expired", JSON.stringify(date));
}

function showPanel() {
  panel.removeClass("hide--newsletter");
  panel.addClass("show--newsletter");
}

function hidePanel() {
  panel.removeClass("show--newsletter");
  panel.addClass("hide--newsletter");
}

$(document).ready(function () {
  checkExpiration();
  $(window).scroll(function () {
    const currentPosition = $(window).scrollTop();
    const documentHeight = $(document).height() / 10;
    if (currentPosition >= documentHeight) {
      if (!isShowPanel && !isHaveBeenClose) {
        isShowPanel = true;
        showPanel();
      }
    }
  });
});

function checkExpiration() {
  const expired = JSON.parse(localStorage.getItem("time_expired"));
  const current_time = JSON.parse(JSON.stringify(new Date()));
  if (expired) {
    isHaveBeenClose = true;
    if (expired < current_time) {
      localStorage.removeItem("time_expired");
      isHaveBeenClose = false;
    }
  } else {
    isHaveBeenClose = false;
  }
}
