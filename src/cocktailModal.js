const modal = document.querySelector("#new-cocktail-modal")
document.querySelector("#make-cocktail-button").addEventListener("click", () => {
    if (!localStorage.getItem('user_id')) {
        alert('Must be logged in to create cocktail');
        return;
    }
    modal.style.display = "block"
})
// Hide the form
modal.addEventListener("click", e => {
    if (e.target.dataset.action === "close") {
        modal.style.display = "none"
    }
})