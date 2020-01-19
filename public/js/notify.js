function hideNotification(){
  let notificationContainer = this.parentElement;
  notificationContainer.style.opacity = "0";
  setTimeout(function(){ 
    notificationContainer.style.display = "none"; }, 600);
}
try {
  const errorText = document.querySelector('.notify-error-text');
  errorText.addEventListener('click', hideNotification);
} catch (error) {
    console.log(error)
}

try {
  const notificationInfoText = document.querySelector('.notify-info-text');
  notificationInfoText.addEventListener('click', hideNotification);
} catch (error) {
    console.log(error)
}