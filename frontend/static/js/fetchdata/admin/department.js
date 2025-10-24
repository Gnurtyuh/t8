
const addressApi = 'http://localhost:8080/admin/department';
const addreddApiGetAll = 'http://localhost:8080/admin/department/AllDepartment';
const addreddApiCreateUser = 'http://localhost:8080/admin/create';

document.getElementById("buttonConfirm").addEventListener("click",async (event) =>  {
    event.preventDefault();
    document.getElementById("dept-name").value
    //Lay du lieu tu input trong form
    const newDepartment = {
        departmentName: document.getElementById("dept-name").value,
        division: document.getElementById("dept-division").value,
        description: document.getElementById("dept-description").value
    };
try{
    const response = await fetch(addressApi, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(newDepartment)
    });
    if(!response.ok) {
        throw new Error("Thêm thất bại")
    }
    const data = await response.json();
    console.log(data);
    alert("Thêm phòng ban thành công!");
    document.getElementById("dept-name").value = "";
    document.getElementById("dept-division").value = "";
    document.getElementById("dept-description").value = "";
} catch(error) {
    console.error("Error",error.message);
}
});
//
const assignForm = document.getElementById('departmentuser');
fetch(addreddApiGetAll)
.then(response => {
    if(!response.ok) throw new Error("Error");
    return response.json();
})
.then(data => {
    const departSelect = document.getElementById("department");
    data.forEach(depart => {
        const option = document.createElement("option");
        // option.textContent = depart.departmentName;
        option.textContent = `${depart.departmentName} - ${depart.division}`;
        option.dataset.departmentName = depart.departmentName;
        option.dataset.division = depart.division;
        departSelect.appendChild(option);
    });
    console.log(data);
})
.catch(error => 
    console.error(error));