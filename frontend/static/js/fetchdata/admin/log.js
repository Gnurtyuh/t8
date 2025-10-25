const addreddApiGetAllLog = 'http://localhost:8080/admin/log/all';
function getAllLog() {
return fetch(addreddApiGetAllLog)
.then(response => {
    if(!response.ok) throw new Error("Lỗi khi lấy thông tin");
    return response.json();
})
.then(data => {
    logs = data.map(log => {
        let roleName = "";
        if(log.userDto.roleLevel === 1) roleName = "Giám đốc";
        else if(log.userDto.roleLevel === 2) roleName = "Trưởng phòng";
        else if(log.userDto.roleLevel === 3) roleName = "Nhân viên";
        else roleName = "Không xác định";
        //
        const formatDate = (dateStr) => {
            if (!dateStr) return "Không xác định";
            const date = new Date(dateStr);
            return date.toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        return {
            status: log.status,
            action: log.action,
            target: log.target,
            role: roleName,
            email: log.userDto.email,
            fullName: log.userDto.fullName,
            documentName: log.documentDto.title,
            description: log.documentDto.description,
            timeCreate: formatDate(log.documentDto.uploadDate),
            timeCreateLog: formatDate(log.createdAt),
            timeCompleted: formatDate(log.completedAt),
            departmentName: log.departmentDto.departmentName
        };
    });
    return logs;
})
.catch(error => {
    console.error(error);
    return [];
});
}