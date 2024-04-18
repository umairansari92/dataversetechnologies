(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();


// <script>
// window.embeddedChatbotConfig = {
// chatbotId: "BDPxXVWhm6o5YO_GYdIMn",
// domain: "www.chatbase.co"
// }
// </script>
// <script
// src="https://www.chatbase.co/embed.min.js"
// chatbotId="BDPxXVWhm6o5YO_GYdIMn"
// domain="www.chatbase.co"
// defer>
// </script>
