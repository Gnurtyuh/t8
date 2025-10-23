let currentStatus = "Hoàn thành"; // Mặc định dựa trên dữ liệu User1
const documentInfo = document.querySelector(".document-info");

// Dữ liệu từ yêu cầu
const documentData = [
    { actionUser: "Nguyen Van A", target: "User1", document: "document.pdf", status: "Hoàn thành", description: "Tài liệu đã được phê duyệt", createTime: "14/10/2025 09:00", completeTime: "15/10/2025 14:30", department: "Phòng CNTT" },
    { actionUser: "Tran Thi B", target: "User2", document: "report.docx", status: "Đang xử lý", description: "Chờ phê duyệt", createTime: "13/10/2025 10:00", completeTime: "14/10/2025 16:00", department: "Phòng Nhân Sự" },
    { actionUser: "Le Van C", target: "User3", document: "presentation.pptx", status: "Hoàn thành", description: "Tài liệu đã hoàn tất", createTime: "12/10/2025 08:30", completeTime: "13/10/2025 15:00", department: "Phòng CNTT" }
];

// Lấy dữ liệu cho target "User1"
for (const item of documentData) {
    const targetUserData = documentData.find(d => d.target === item.target);

// Thêm dữ liệu vào giao diện khi trang tải
document.addEventListener("DOMContentLoaded", function() {
    if (targetUserData) {
        const infoRows = [
            { label: "Tên tài liệu:", value: targetUserData.document, id: "document-name" },
            { label: "Trạng thái:", value: targetUserData.status, id: "status" },
            { label: "Mô tả:", value: targetUserData.description, id: "description" },
            { label: "Thời gian tạo file:", value: targetUserData.createTime, id: "create-time" },
            { label: "Thời gian hoàn thành:", value: targetUserData.completeTime, id: "complete-time" },
            { label: "Tên phòng ban:", value: targetUserData.department, id: "department" },
            { label: "Người thực hiện:", value: targetUserData.actionUser, id: "action-user" }
        ];

        infoRows.forEach(data => {
            const infoRow = document.createElement("div");
            infoRow.className = "info-row";
            const labelSpan = document.createElement("span");
            labelSpan.className = "info-label";
            labelSpan.textContent = data.label;
            const valueSpan = document.createElement("span");
            valueSpan.className = "info-value";
            if (data.id) valueSpan.id = data.id;
            valueSpan.textContent = data.value;
            infoRow.appendChild(labelSpan);
            infoRow.appendChild(valueSpan);
            documentInfo.appendChild(infoRow);
        });
    } else {
        documentInfo.innerHTML = "<div class='info-row'><span class='info-label'>Lỗi:</span><span class='info-value'>Không tìm thấy dữ liệu cho User1</span></div>";
    }
});
}
function updateStatus(newStatus, completionTime = "") {
    currentStatus = newStatus;
    const statusElement = document.getElementById("status");
    const completeTimeElement = document.getElementById("complete-time");
    if (statusElement) statusElement.textContent = newStatus;
    if (completeTimeElement) completeTimeElement.textContent = completionTime || "Chưa hoàn thành";
    if (newStatus === "Tài liệu đã được phê duyệt" || newStatus === "Tài liệu bị từ chối") {
        document.querySelector(".approve-btn").disabled = true;
        document.querySelector(".reject-btn").disabled = true;
    }
}

document.querySelector(".approve-btn").addEventListener("click", function() {
    const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    updateStatus("Tài liệu đã được phê duyệt", now);
});

document.querySelector(".reject-btn").addEventListener("click", function() {
    const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    updateStatus("Tài liệu bị từ chối", now);
});

function toggleNotification() {
    const statusElement = document.getElementById("status");
    const completeTimeElement = document.getElementById("complete-time");
    alert(`Trạng thái hiện tại: ${statusElement ? statusElement.textContent : currentStatus}\nThời gian cập nhật: ${completeTimeElement ? completeTimeElement.textContent : "Chưa hoàn thành"}`);
}