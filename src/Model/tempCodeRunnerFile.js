// Tạo số ngẫu nhiên từ 0 đến 9999
let randomNumber = Math.floor(Math.random() * 10000);
// Định dạng số ngẫu nhiên thành chuỗi có 4 chữ số (ví dụ: 0005, 0012, 9999)
let randomNumberStr = randomNumber.toString().padStart(4, '0');
// Ghép chuỗi "NV" với số ngẫu nhiên
let random_Personnel_Id = "NV" + randomNumberStr;

console.log(random_Personnel_Id);