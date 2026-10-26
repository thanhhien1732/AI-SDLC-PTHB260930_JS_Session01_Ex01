function normalizeName(rawName) {
  return rawName.trim().toUpperCase(); // Thêm .trim() để xóa khoảng trắng thừa ở hai đầu (trước đây chỉ có .toUpperCase() nên vẫn giữ nguyên khoảng trắng)
}

function isValidScore(scoreText) {
  const trimmedScore = scoreText.trim(); // Bỏ khoảng trắng hai đầu của chuỗi điểm trước khi kiểm tra (trước đây chưa xử lý khoảng trắng)
  if (trimmedScore === "") { // Dùng === kiểm tra chuỗi rỗng vì Number("") sẽ ép kiểu thành 0 (trước đây không chặn chuỗi rỗng)
    return false; // Trả về false ngay nếu người dùng để trống hoặc chỉ nhập dấu cách
  }
  const score = Number(trimmedScore); // Dùng Number() thay cho parseInt() vì parseInt() cắt bỏ phần thập phân ("10.5" -> 10) và bỏ qua chữ phía sau ("9 điểm" -> 9)
  return score >= 0 && score <= 10; // Giữ nguyên kiểm tra khoảng điểm từ 0 đến 10 (nếu score là NaN như "8,5" hay "9 điểm" thì phép so sánh tự trả về false)
}

function calcAverage(quizText, examText) {
  const quizScore = Number(quizText); // Đổi tường minh chuỗi quizText sang kiểu số (trước đây để nguyên kiểu chuỗi)
  const examScore = Number(examText); // Đổi tường minh chuỗi examText sang kiểu số (trước đây để nguyên kiểu chuỗi)
  return (quizScore + examScore) / 2; // Cộng hai giá trị số rồi chia 2 (trước đây cộng hai chuỗi làm nối chuỗi "8.5" + "9" thành "8.59" rồi mới chia 2)
}

function canGetCertificate(progressText, average) {
  const progress = Number(progressText); // Đổi tường minh chuỗi progressText sang kiểu số trước khi so sánh (trước đây so sánh trực tiếp chuỗi với số)
  return progress >= 80 && average >= 5; // Đổi toán tử || thành && vì cần thỏa mãn đồng thời cả hai điều kiện (trước đây dùng || nên chỉ cần đạt 1 trong 2 điều kiện vẫn trả về true)
}

function buildScoreMessage(rawName, average) {
  const normalizedName = normalizeName(rawName); // Gọi lại hàm normalizeName để chuẩn hóa tên trước khi ghép chuỗi (trước đây dùng trực tiếp rawName chưa bỏ khoảng trắng và chưa viết hoa)
  return `Học viên ${normalizedName}: ${average} điểm`; // Dùng template literal thay cho phép nối chuỗi bằng dấu + trước đây
}