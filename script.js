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
    return (quizText + examText) / 2;
}

function canGetCertificate(progressText, average) {
    return progressText >= 80 || average >= 5;
}

function buildScoreMessage(rawName, average) {
    return "Học viên " + rawName + ": " + average + " điểm";
}