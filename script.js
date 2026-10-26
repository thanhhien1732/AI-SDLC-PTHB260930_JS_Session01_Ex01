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

// --- TEST CÁC HÀM ---
console.log("=== 1. Test normalizeName ===");
console.log(normalizeName("  trần thu hà  "));                  // Kỳ vọng: "TRẦN THU HÀ"
console.log(normalizeName("nguyen van a"));                     // Kỳ vọng: "NGUYEN VAN A"

console.log("\n=== 2. Test isValidScore ===");
console.log("Điểm 8.5 (hợp lệ):", isValidScore(" 8.5 "));       // Kỳ vọng: true
console.log("Điểm 10 (hợp lệ):", isValidScore("10"));           // Kỳ vọng: true
console.log("Điểm 0 (hợp lệ):", isValidScore("0"));             // Kỳ vọng: true
console.log("Điểm 10.5 (quá 10):", isValidScore("10.5"));       // Kỳ vọng: false
console.log("Điểm -1 (âm):", isValidScore("-1"));               // Kỳ vọng: false
console.log("Điểm lẫn chữ '9 điểm':", isValidScore("9 điểm"));  // Kỳ vọng: false
console.log("Dấu phẩy '8,5':", isValidScore("8,5"));            // Kỳ vọng: false
console.log("Chuỗi rỗng '':", isValidScore(""));                // Kỳ vọng: false
console.log("Chỉ có dấu cách '  ':", isValidScore("   "));      // Kỳ vọng: false

console.log("\n=== 3. Test calcAverage ===");
console.log("Điểm 8.5 và 9:", calcAverage("8.5", "9"));         // Kỳ vọng: 8.75 (nếu ra 4.295 là còn lỗi nối chuỗi)
console.log("Điểm 7 và 8:", calcAverage("7", "8"));             // Kỳ vọng: 7.5

console.log("\n=== 4. Test canGetCertificate ===");
console.log("Tiến độ 60%, điểm 9 (thiếu tiến độ):", canGetCertificate("60", 9));     // Kỳ vọng: false
console.log("Tiến độ 85%, điểm 4 (thiếu điểm):", canGetCertificate("85", 4));        // Kỳ vọng: false
console.log("Tiến độ 80%, điểm 5 (vừa đủ đạt):", canGetCertificate("80", 5));        // Kỳ vọng: true
console.log("Tiến độ 90%, điểm 8.5 (đạt tốt):", canGetCertificate("90", 8.5));       // Kỳ vọng: true

console.log("\n=== 5. Test buildScoreMessage ===");
console.log(buildScoreMessage("  trần thu hà  ", 8.75));        // Kỳ vọng: "Học viên TRẦN THU HÀ: 8.75 điểm"