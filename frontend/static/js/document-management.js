const logs = [
    { actionUser: "Nguyen Van A", target: "User1", document: "document.pdf", status: "Hoàn thành", description: "Tài liệu đã được phê duyệt", createTime: "14/10/2025 09:00", completeTime: "15/10/2025 14:30", department: "Phòng CNTT" },
    { actionUser: "Tran Thi B", target: "User2", document: "report.docx", status: "Đang xử lý", description: "Chờ phê duyệt", createTime: "13/10/2025 10:00", completeTime: "14/10/2025 16:00", department: "Phòng Nhân Sự" }
];

const documentList = document.getElementById('document-list');

logs.forEach(log => {
    const item = document.createElement('div');
    item.className = 'document-item';
    item.innerHTML = `
        <span class="file-name">Tên Tài Liệu: ${log.document}</span>
        <span class="file-date">Ngày Gửi: ${log.createTime.split(' ')[0]}</span>
        <span class="file-author">Trạng Thái: ${log.status}</span>
        <span class="file-dept">Tên phòng ban: ${log.department}</span>
        <span class="file-desc">Description: ${log.description}</span>
        <span class="file-created">Thời gian tạo file: ${log.createTime}</span>
        <span class="file-completed">Thời gian hoàn thành: ${log.completeTime}</span>
        <a href="#" class="view-btn">Xem</a>
    `;
    documentList.appendChild(item);
});