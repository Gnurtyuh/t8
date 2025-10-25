const addreddApiGetAllUser = 'http://localhost:8080/admin/users';
function getAllUser() {
return fetch(addreddApiGetAllUser)
.then(response => {
    if(!response.ok) throw new Error("Lỗi khi tải nhân viên");
    return response.json();
})
.then(data => {
    users = data.map(user => {
        const departmentName = user.departmentDto?.departmentName;
        const division = user.departmentDto?.division;
        const departmentDisplay = departmentName ? `${departmentName} - ${division}` : division;

        let roleName = "";
        if(user.roleLevel === 1) roleName = "Giám đốc";
        else if (user.roleLevel === 2) roleName = "Trưởng phòng";
        else if (user.roleLevel === 3) roleName = "Nhân viên";
        else roleName = "Không xác định";
        return {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        department: departmentDisplay,
        role: roleName
        };
    });
    console.log("Danh sách nhân viên",users);
    return users;
})
.catch(error => {
    console.error("Lỗi", error);
    return [];
});
}
// Tim kiem nguoi dung
