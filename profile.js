document.addEventListener("DOMContentLoaded", () => {
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    const profileImg = document.getElementById("profile-img");

    const editForm = document.getElementById("edit-form");
    const editName = document.getElementById("edit-name");
    const editEmail = document.getElementById("edit-email");
    const editImg = document.getElementById("edit-img");

    const editProfileBtn = document.getElementById("edit-profile");
    const saveProfileBtn = document.getElementById("save-profile");
    const cancelEditBtn = document.getElementById("cancel-edit");
    const logoutBtn = document.getElementById("logout");

    // Жаңа қолданушы деректері (жергілікті сақтау үшін)
    let userData = {
        name: "Аты-жөні",
        email: "email@example.com",
        imgSrc: "default-avatar.png"
    };

    // Локалдық сақтаудан деректерді алу
    if (localStorage.getItem("userData")) {
        userData = JSON.parse(localStorage.getItem("userData"));
        updateProfileUI();
    }

    function updateProfileUI() {
        userName.textContent = userData.name;
        userEmail.textContent = userData.email;
        profileImg.src = userData.imgSrc;
    }

    editProfileBtn.addEventListener("click", () => {
        editName.value = userData.name;
        editEmail.value = userData.email;
        editForm.style.display = "block";
    });

    saveProfileBtn.addEventListener("click", () => {
        userData.name = editName.value;
        userData.email = editEmail.value;

        // Егер жаңа сурет жүктелсе
        if (editImg.files.length > 0) {
            const file = editImg.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                userData.imgSrc = e.target.result;
                localStorage.setItem("userData", JSON.stringify(userData));
                updateProfileUI();
            };
            reader.readAsDataURL(file);
        } else {
            localStorage.setItem("userData", JSON.stringify(userData));
            updateProfileUI();
        }

        editForm.style.display = "none";
    });

    cancelEditBtn.addEventListener("click", () => {
        editForm.style.display = "none";
    });

    logoutBtn.addEventListener("click", () => {
        alert("Сіз жүйеден шықтыңыз!");
        window.location.href = "index.html"; // Басты бетке қайтарады
    });

    updateProfileUI();
});
