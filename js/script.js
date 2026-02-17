document.addEventListener("DOMContentLoaded", function () {

    const slots = document.querySelectorAll(".time-slot");
    let selectedTime = "";

    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            slots.forEach(s => s.classList.remove("selected"));
            slot.classList.add("selected");
            selectedTime = slot.textContent;
        });
    });

    const form = document.getElementById("bookingForm");
    const summary = document.getElementById("summary");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const date = document.getElementById("date").value;
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();

            if (!date || !selectedTime || !name || !email || !phone) {
                alert("Please fill all fields and select a time slot.");
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
            if (!email.match(emailPattern)) {
                alert("Enter a valid email address.");
                return;
            }

            summary.innerHTML = `
                <h3>Booking Confirmed!</h3>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${selectedTime}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
            `;

            localStorage.setItem("bookingData", JSON.stringify({
                date,
                selectedTime,
                name,
                email,
                phone
            }));

            form.reset();
            selectedTime = "";
            slots.forEach(s => s.classList.remove("selected"));
        });
    }

});