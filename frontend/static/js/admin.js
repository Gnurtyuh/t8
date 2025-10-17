
        function updateTime() {
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('vi-VN');
            document.getElementById('current-time').textContent = `${time}, ${date}`;
        }
        setInterval(updateTime, 1000);
        updateTime();

        // Chuyển tab
        document.querySelectorAll('.sidebar a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const tabId = this.getAttribute('href').substring(1);
                if (tabId === 'logout-link') return;
                document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
                document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
                this.parentElement.classList.add('active');
            });
        });

        // Quản Lý Người Dùng
        let users = [
            { fullName: "Nguyen Van A", username: "user1", email: "a@example.com", role: "user", note: "Nhân viên IT" },
            { fullName: "Tran Thi B", username: "user2", email: "b@example.com", role: "admin", note: "Quản lý nhân sự" },
            { fullName: "Le Van C", username: "user3", email: "c@example.com", role: "user", note: "" },
            { fullName: "Pham Thi D", username: "user4", email: "d@example.com", role: "user", note: "Nhân viên CNTT" }
        ];

        function loadUserTable() {
            const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            users.forEach((user, index) => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${user.fullName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${user.note || ''}</td>
                    <td><button class="action-btn" onclick="deleteUser(${index})">Xóa</button></td>
                `;
            });
        }

        function loadRecentUsers() {
            const tbody = document.getElementById('recent-users').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            users.slice(0, 4).forEach(user => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${user.fullName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                `;
            });
        }

        function addUser() {
            const fullName = document.getElementById('full-name').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const note = document.getElementById('note').value;
            const role = document.getElementById('role').value;

            if (fullName && username && email && password && role) {
                users.push({ fullName, username, email, role, note });
                alert(`Đã thêm người dùng: ${username}`);
                document.getElementById('full-name').value = '';
                document.getElementById('username').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('note').value = '';
                document.getElementById('role').value = '';
                loadUserTable();
                loadRecentUsers();
            }
        }

        function deleteUser(index) {
            if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
                users.splice(index, 1);
                loadUserTable();
                loadRecentUsers();
            }
        }

        function updatePermission() {
            const username = document.getElementById('permission-user').value;
            const fullName = document.getElementById('permission-fullname').value;
            const email = document.getElementById('permission-email').value;
            const role = document.getElementById('permission-role').value;

            const userIndex = users.findIndex(user => user.username === username);
            if (userIndex !== -1 && role) {
                if (fullName) users[userIndex].fullName = fullName;
                if (email) users[userIndex].email = email;
                users[userIndex].role = role;
                alert(`Đã cập nhật quyền cho ${username}`);
                loadUserTable();
                loadRecentUsers();
                document.getElementById('permission-user').value = '';
                document.getElementById('permission-fullname').value = '';
                document.getElementById('permission-email').value = '';
                document.getElementById('permission-role').value = '';
            }
        }

        function filterUsers() {
            const searchTerm = document.getElementById('search-user').value.toLowerCase();
            const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
            const rows = tbody.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const fullName = rows[i].cells[0].textContent.toLowerCase();
                const username = rows[i].cells[1].textContent.toLowerCase();
                const email = rows[i].cells[2].textContent.toLowerCase();
                if (searchTerm === '' || fullName.includes(searchTerm) || username.includes(searchTerm) || email.includes(searchTerm)) {
                    rows[i].style.display = '';
                } else {
                    rows[i].style.display = 'none';
                }
            }
        }

        // Hàm tải dữ liệu tài liệu động (giả lập API)
        function loadDocuments() {
            const documents = [
                { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
                { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
                { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
            ];

            const documentList = document.getElementById('document-list');
            documentList.innerHTML = '';

            documents.forEach(doc => {
                const card = document.createElement('div');
                card.className = 'doc-card';
                card.innerHTML = `
                    <p class="title">Tên Tài Liệu: ${doc.name}</p>
                    <p>Ngày Gửi: ${doc.date}</p>
                    <p>Trạng Thái: ${doc.status}</p>
                    <div class="actions">
                        <button onclick="viewDocument('${doc.name}')">Xem</button>
                    </div>
                `;
                documentList.appendChild(card);
            });
        }

        function loadRecentDocuments() {
            const documents = [
                { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
                { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
                { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
            ];

            const documentList = document.getElementById('recent-documents');
            documentList.innerHTML = '';

            documents.slice(0, 3).forEach(doc => {
                const card = document.createElement('div');
                card.className = 'doc-card';
                card.innerHTML = `
                    <p class="title">Tên Tài Liệu: ${doc.name}</p>
                    <p>Ngày Gửi: ${doc.date}</p>
                    <p>Trạng Thái: ${doc.status}</p>
                `;
                documentList.appendChild(card);
            });
        }

        function filterDocuments() {
            const filterDate = document.getElementById('search-date').value;
            const searchTerm = document.getElementById('search-document').value.toLowerCase();
            const documents = [
                { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
                { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
                { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
            ];

            const documentList = document.getElementById('document-list');
            documentList.innerHTML = '';

            const filteredDocs = documents.filter(doc => 
                (!filterDate || doc.date === filterDate) && 
                (!searchTerm || doc.name.toLowerCase().includes(searchTerm))
            );
            filteredDocs.forEach(doc => {
                const card = document.createElement('div');
                card.className = 'doc-card';
                card.innerHTML = `
                    <p class="title">Tên Tài Liệu: ${doc.name}</p>
                    <p>Ngày Gửi: ${doc.date}</p>
                    <p>Trạng Thái: ${doc.status}</p>
                    <div class="actions">
                        <button onclick="viewDocument('${doc.name}')">Xem</button>
                    </div>
                `;
                documentList.appendChild(card);
            });
        }

        function viewDocument(docName) {
            alert(`Đang xem tài liệu: ${docName}`);
        }

        function toggleView() {
            const documentList = document.getElementById('document-list');
            const chartContainer = document.getElementById('chart-container');
            if (documentList.style.display !== 'none') {
                documentList.style.display = 'none';
                chartContainer.style.display = 'block';
                generateChart();
            } else {
                documentList.style.display = 'flex';
                chartContainer.style.display = 'none';
                loadDocuments();
            }
        }

        function generateChart() {
            const documents = [
                { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
                { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
                { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
            ];

            const statusCount = {};
            documents.forEach(doc => {
                statusCount[doc.status] = (statusCount[doc.status] || 0) + 1;
            });

            const chartContainer = document.getElementById('chart-container');
            chartContainer.innerHTML = '';

            const chartCode = `
            <chartjs>
            {
                "type": "bar",
                "data": {
                    "labels": ["${Object.keys(statusCount).join('", "')}"],
                    "datasets": [{
                        "label": "Số lượng tài liệu",
                        "data": [${Object.values(statusCount).join(', ')}],
                        "backgroundColor": ["#4a90e2", "#e67e22"],
                        "borderColor": ["#357ab7", "#d35400"],
                        "borderWidth": 1
                    }]
                },
                "options": {
                    "scales": {
                        "y": {
                            "beginAtZero": true
                        }
                    }
                }
            }
            </chartjs>
            `;
            chartContainer.innerHTML = chartCode;
        }

        // Hàm tải dữ liệu log động (giả lập API)
        function loadLogs() {
            const logs = [
                { actionUser: "Nguyen Van A", target: "User1", document: "document.pdf", status: "Hoàn thành", description: "Tài liệu đã được phê duyệt", createTime: "14/10/2025 09:00", completeTime: "15/10/2025 14:30", department: "Phòng CNTT" },
                { actionUser: "Tran Thi B", target: "User2", document: "report.docx", status: "Đang xử lý", description: "Chờ phê duyệt", createTime: "13/10/2025 10:00", completeTime: "14/10/2025 16:00", department: "Phòng Nhân Sự" },
                { actionUser: "Le Van C", target: "User3", document: "presentation.pptx", status: "Hoàn thành", description: "Tài liệu đã hoàn tất", createTime: "12/10/2025 08:30", completeTime: "13/10/2025 15:00", department: "Phòng CNTT" }
            ];

            const logContainer = document.getElementById('log-container');
            logContainer.innerHTML = '';

            logs.forEach(log => {
                const card = document.createElement('div');
                card.className = 'log-card';
                card.innerHTML = `
                    <p class="title">Tên người đăng hành động: ${log.actionUser}</p>
                    <p>Target: ${log.target}</p>
                    <p>Tên tài liệu: ${log.document}</p>
                    <p>Trạng thái: ${log.status}</p>
                    <p>Description: ${log.description}</p>
                    <p>Thời gian tạo file: ${log.createTime}</p>
                    <p>Thời gian hoàn thành: ${log.completeTime}</p>
                    <p>Tên phòng ban: ${log.department}</p>
                `;
                logContainer.appendChild(card);
            });
        }

        function loadRecentLogs() {
            const logs = [
                { actionUser: "Nguyen Van A", target: "User1", document: "document.pdf", status: "Hoàn thành", description: "Tài liệu đã được phê duyệt", createTime: "14/10/2025 09:00", completeTime: "15/10/2025 14:30", department: "Phòng CNTT" },
                { actionUser: "Tran Thi B", target: "User2", document: "report.docx", status: "Đang xử lý", description: "Chờ phê duyệt", createTime: "13/10/2025 10:00", completeTime: "14/10/2025 16:00", department: "Phòng Nhân Sự" }
            ];

            const logContainer = document.getElementById('recent-logs');
            logContainer.innerHTML = '';

            logs.forEach(log => {
                const card = document.createElement('div');
                card.className = 'log-card';
                card.innerHTML = `
                    <p class="title">Tên người đăng hành động: ${log.actionUser}</p>
                    <p>Target: ${log.target}</p>
                    <p>Tên tài liệu: ${log.document}</p>
                    <p>Trạng thái: ${log.status}</p>
                    <p>Description: ${log.description}</p>
                    <p>Thời gian tạo file: ${log.createTime}</p>
                    <p>Thời gian hoàn thành: ${log.completeTime}</p>
                    <p>Tên phòng ban: ${log.department}</p>
                `;
                logContainer.appendChild(card);
            });
        }

        function filterHistory() {
            const filterDate = document.getElementById('history-date-filter').value;
            const searchTerm = document.getElementById('search-log').value.toLowerCase();
            const logs = [
                { actionUser: "Nguyen Van A", target: "User1", document: "document.pdf", status: "Hoàn thành", description: "Tài liệu đã được phê duyệt", createTime: "14/10/2025 09:00", completeTime: "15/10/2025 14:30", department: "Phòng CNTT" },
                { actionUser: "Tran Thi B", target: "User2", document: "report.docx", status: "Đang xử lý", description: "Chờ phê duyệt", createTime: "13/10/2025 10:00", completeTime: "14/10/2025 16:00", department: "Phòng Nhân Sự" },
                { actionUser: "Le Van C", target: "User3", document: "presentation.pptx", status: "Hoàn thành", description: "Tài liệu đã hoàn tất", createTime: "12/10/2025 08:30", completeTime: "13/10/2025 15:00", department: "Phòng CNTT" }
            ];

            const logContainer = document.getElementById('log-container');
            logContainer.innerHTML = '';

            const filteredLogs = logs.filter(log => 
                (!filterDate || log.completeTime.split(' ')[0] === filterDate) && 
                (!searchTerm || log.actionUser.toLowerCase().includes(searchTerm) || log.document.toLowerCase().includes(searchTerm) || log.department.toLowerCase().includes(searchTerm))
            );
            filteredLogs.forEach(log => {
                const card = document.createElement('div');
                card.className = 'log-card';
                card.innerHTML = `
                    <p class="title">Tên người đăng hành động: ${log.actionUser}</p>
                    <p>Target: ${log.target}</p>
                    <p>Tên tài liệu: ${log.document}</p>
                    <p>Trạng thái: ${log.status}</p>
                    <p>Description: ${log.description}</p>
                    <p>Thời gian tạo file: ${log.createTime}</p>
                    <p>Thời gian hoàn thành: ${log.completeTime}</p>
                    <p>Tên phòng ban: ${log.department}</p>
                `;
                logContainer.appendChild(card);
            });
        }

        // Quản Lý Phòng Ban
        function loadDepartments() {
            const departments = [
                { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
                { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
            ];
            const departmentList = document.getElementById('department-list');
            departmentList.innerHTML = '';
            departments.forEach(dept => {
                const card = document.createElement('div');
                card.className = 'dept-card';
                card.innerHTML = `
                    <p class="title">Tên Phòng Ban: ${dept.name}</p>
                    <p>Mô Tả: ${dept.description}</p>
                    <p>Tên Bộ Phận: ${dept.division}</p>
                `;
                departmentList.appendChild(card);
            });
        }

        function loadDepartmentInfo() {
            const departments = [
                { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
                { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
            ];
            const departmentList = document.getElementById('department-info');
            departmentList.innerHTML = '';
            departments.forEach(dept => {
                const card = document.createElement('div');
                card.className = 'dept-card';
                card.innerHTML = `
                    <p class="title">Tên Phòng Ban: ${dept.name}</p>
                    <p>Mô Tả: ${dept.description}</p>
                    <p>Tên Bộ Phận: ${dept.division}</p>
                `;
                departmentList.appendChild(card);
            });
        }

        function createDepartment() {
            const name = document.getElementById('dept-name').value;
            const description = document.getElementById('dept-description').value;
            const division = document.getElementById('dept-division').value;
            if (name && description && division) {
                alert(`Đã tạo phòng ban: ${name} - ${description} - ${division}`);
                document.getElementById('dept-name').value = '';
                document.getElementById('dept-description').value = '';
                document.getElementById('dept-division').value = '';
                loadDepartments();
                loadDepartmentInfo();
            }
        }

        function toggleAssignForm() {
            const assignForm = document.getElementById('assign-form');
            assignForm.classList.toggle('active');
        }

        function assignUserToDepartment() {
            const dept = document.getElementById('assign-dept').value;
            const user = document.getElementById('assign-user').value;
            if (dept && user) {
                alert(`Đã gán ${user} vào ${dept}`);
                document.getElementById('assign-dept').value = '';
                document.getElementById('assign-user').value = '';
                toggleAssignForm();
            }
        }

        function filterDepartments() {
            const searchTerm = document.getElementById('search-department').value.toLowerCase();
            const departments = [
                { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
                { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
            ];
            const departmentList = document.getElementById('department-list');
            departmentList.innerHTML = '';
            const filteredDepartments = departments.filter(dept => 
                !searchTerm || dept.name.toLowerCase().includes(searchTerm)
            );
            filteredDepartments.forEach(dept => {
                const card = document.createElement('div');
                card.className = 'dept-card';
                card.innerHTML = `
                    <p class="title">Tên Phòng Ban: ${dept.name}</p>
                    <p>Mô Tả: ${dept.description}</p>
                    <p>Tên Bộ Phận: ${dept.division}</p>
                `;
                departmentList.appendChild(card);
            });
        }

        // Tải dữ liệu khi trang được tải
        window.onload = function() {
            loadDocuments();
            loadUserTable();
            loadRecentUsers();
            loadDepartments();
            loadDepartmentInfo();
            loadLogs();
            loadRecentLogs();
            filterHistory();
            document.getElementById('search-document').addEventListener('input', filterDocuments);
            document.getElementById('search-user').addEventListener('input', filterUsers);
            document.getElementById('search-department').addEventListener('input', filterDepartments);
            document.getElementById('search-log').addEventListener('input', filterHistory);
            document.getElementById('search-date').addEventListener('input', filterDocuments);
            document.getElementById('history-date-filter').addEventListener('input', filterHistory);
        };
   