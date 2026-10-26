# Báo cáo lỗi xử lý điểm nhập từ biểu mẫu

## 1. Bảng báo cáo lỗi

| STT | Dữ liệu đầu vào | Kết quả thực tế bị lỗi | Kết quả kỳ vọng đúng | Dòng code gây lỗi | Giải thích nguyên nhân |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `calcAverage("8.5", "9")` | `4.295` | `8.75` | `return (quizText + examText) / 2;` | Hai giá trị đều là chuỗi nên `+` nối thành `"8.59"` rồi mới chia cho 2 |
| 2 | `normalizeName(" trần thu hà ")` | `" TRẦN THU HÀ "` | `"TRẦN THU HÀ"` | `return rawName.toUpperCase();` | Thiếu phương thức `.trim()` để loại bỏ khoảng trắng thừa ở hai đầu chuỗi trước khi viết hoa |
| 3 | `isValidScore("9 điểm")` hoặc `isValidScore("10.5")` | `true` | `false` | `const score = parseInt(scoreText);` | `parseInt()` chỉ lấy phần số nguyên ở đầu chuỗi nên đổi `"9 điểm"` thành `9` và `"10.5"` thành `10`, làm dữ liệu sai vẫn lọt qua điều kiện `0 <= score <= 10` |
| 4 | `canGetCertificate("60", 9)` | `true` | `false` | `return progressText >= 80 \|\| average >= 5;` | Dùng sai toán tử logic `\|\|` (hoặc) thay vì `&&` (và), đồng thời chưa ép kiểu tường minh `progressText` từ chuỗi sang số bằng `Number()` |
| 5 | `buildScoreMessage(" trần thu hà ", 7.5)` | `"Học viên  trần thu hà : 7.5 điểm"` | `"Học viên TRẦN THU HÀ: 7.5 điểm"` | `return "Học viên " + rawName + ": " + average + " điểm";` | Ghép trực tiếp biến `rawName` chưa qua hàm chuẩn hóa `normalizeName()` và vẫn nối chuỗi thủ công thay vì dùng template literal |

## 2. Tóm tắt công việc đã thực hiện

Em đã rà soát toàn bộ mô-đun `script.js` và khắc phục 4 vấn đề từ phản hồi của giảng viên bằng cách chuẩn hóa dữ liệu chuỗi và ép kiểu tường minh trước khi tính toán. Cụ thể, em bổ sung `.trim()` vào `normalizeName` và `isValidScore`, kiểm tra chuỗi rỗng bằng toán tử `===` và thay `parseInt()` bằng `Number()` để chặn các chuỗi điểm lẫn chữ, dấu phẩy hoặc số thập phân vượt quá 10. Ở hàm `calcAverage` và `canGetCertificate`, em dùng `Number()` để đổi điểm và tiến độ từ chuỗi sang số trước khi cộng hoặc so sánh, đồng thời sửa toán tử `||` thành `&&` để đảm bảo học viên phải đạt đồng thời cả tiến độ từ 80% và điểm trung bình từ 5 trở lên. Cuối cùng, em cập nhật `buildScoreMessage` gọi lại hàm `normalizeName` và dùng template literal để hiển thị thông báo điểm đúng chuẩn.