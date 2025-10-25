const addreddApiGetAllDocument = 'http://localhost:8080/admin/documents';
function getAllDocument() {
return fetch(addreddApiGetAllDocument)
.then(response => {
    if(!response.ok) throw new Error("Lỗi khi tải tài liệu");
    return response.json();
})
.then(data => {
    documents = data.map(document => {

        let roleName = "";
        if(document.userDto.roleLevel === 1) roleName = "Giám đốc";
        else if(document.userDto.roleLevel === 2) roleName = "Trưởng phòng";
        else if(document.userDto.roleLevel === 3) roleName = "Nhân viên"
        else roleName = "Không xác định";
        //
        let formattedDate = "";
        if (document.uploadDate) {
            const date = new Date(document.uploadDate);
            formattedDate = date.toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            formattedDate = "Không xác định";
        }
        return {
            path: document.filePath,
            name: document.title,
            fullName: document.userDto.fullName,
            email: document.userDto.email,
            date: formattedDate,
            status: document.description,
            roleName: document.roleName
        };
    });
    // console.log("Danh sách tài liệu",documents);
    return documents;
})
.catch(error => {
    console.log(error);
    return [];
});
}
