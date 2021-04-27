function openUpdateModal() {
    document.getElementById("update_info_modal").style.opacity = "0.95";
    document.getElementById("update_info_modal").style.zIndex = "100";
}
function closeUpdateModal() {
    document.getElementById("update_info_modal").style.opacity = "0";
    document.getElementById("update_info_modal").style.zIndex = "-100";
}