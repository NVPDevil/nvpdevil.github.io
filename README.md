# NVP Devil Profile Card

Chào mừng đến với **NVP Devil Profile Card**, một trang web cá nhân hóa thể hiện danh tính trực tuyến, sự hiện diện trên mạng xã hội và thông tin liên hệ của tôi với thiết kế động độc đáo. Dự án này bao gồm giao diện hiện đại với hiệu ứng tuyết rơi, tích hợp âm thanh, hiệu ứng fade-in/out mượt mà và bố cục đáp ứng trên cả máy tính và thiết bị di động.

## Mục lục
- [Mô tả](#mô-tả)
- [Tính năng](#tính-năng)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [Tùy chỉnh](#tùy-chỉnh)
- [Đóng góp](#đóng-góp)
- [Giấy phép](#giấy-phép)
- [Liên hệ](#liên-hệ)

## Mô tả
Đây là một thẻ hồ sơ cá nhân được thiết kế để phản ánh danh tính số của tôi ("NVP Devil") với nền có chủ đề vũ trụ, hiệu ứng tuyết động rơi nhanh, và các yếu tố tương tác như tooltip động. Trang bao gồm biệt danh, thông tin liên hệ và các liên kết mạng xã hội, được thiết kế với thẻ hồ sơ gradient, hiệu ứng hover và đường phân cách ngang tùy chỉnh. Âm thanh chỉ phát khi người dùng nhấp vào lớp phủ, với hiệu ứng fade-in mượt mà khi nội dung chính xuất hiện.

## Tính năng
- **Thiết kế đáp ứng**: Tối ưu hóa cho máy tính, máy tính bảng và thiết bị di động.
- **Hiệu ứng tuyết rơi**: Hiệu ứng tuyết động rơi từ đỉnh trang với tốc độ tăng, tránh dồn tuyết.
- **Tích hợp âm thanh**: Âm thanh nền phát và lặp lại chỉ khi người dùng nhấp vào lớp phủ, tuân thủ chính sách autoplay của trình duyệt.
- **Hiệu ứng fade-in/out**: Lớp phủ mờ dần và nội dung chính hiện lên mượt mà khi nhấp.
- **Yếu tố tương tác**: Hiệu ứng hover trên chi tiết và biểu tượng mạng xã hội, tooltip thay đổi thành "Copied!" khi sao chép, khôi phục khi rời chuột.
- **Phong cách tùy chỉnh**: Nền gradient, hiệu ứng bóng đổ, và đường phân cách ngang tùy chỉnh.

## Cài đặt
Để chạy dự án này cục bộ, hãy làm theo các bước sau:

1. **Clone kho lưu trữ**:
   ```bash
   git clone https://github.com/NVPDevil/NVPDevil.git
   ```
   (Thay `NVPDevil` và `NVPDevil` bằng tên người dùng GitHub và tên kho lưu trữ thực tế nếu khác.)

2. **Di chuyển đến thư mục dự án**:
   ```bash
   cd NVPDevil
   ```

3. **Đảm bảo tài nguyên có sẵn**:
   - Đặt ảnh đại diện của bạn vào thư mục `assets/images/` với tên `nvpdevil.png`.
   - Thêm file âm thanh vào thư mục `assets/audio/` với tên `Hào.mp3`.

4. **Mở dự án**:
   - Mở file `index.html` trong trình duyệt web (ví dụ: Chrome, Firefox) để xem trang cục bộ.

## Sử dụng
- **Xem hồ sơ**: Mở trang đã lưu trữ (ví dụ: `https://nvpdevil.github.io` hoặc `https://nvpdevil.id.vn`) hoặc file `index.html` cục bộ.
- **Tương tác với trang**:
  - Nhấp vào lớp phủ "Click anywhere to start audio!" để phát âm thanh nền và hiển thị nội dung chính.
  - Di chuột qua chi tiết hoặc biểu tượng mạng xã hội để xem hiệu ứng và tooltip.
  - Nhấp vào biểu tượng mạng xã hội có liên kết để mở trong tab mới, hoặc sao chép văn bản từ những biểu tượng không có liên kết (tooltip sẽ hiển thị "Copied!" tạm thời).
- **Kiểm tra đáp ứng**: Thay đổi kích thước cửa sổ trình duyệt hoặc sử dụng thiết bị di động để kiểm tra tính đáp ứng.

## Tùy chỉnh
Để cá nhân hóa thẻ hồ sơ này:
- **Cập nhật nội dung**: Chỉnh sửa `index.html` để thay đổi tên, biệt danh, chi tiết hoặc liên kết mạng xã hội.
- **Thay đổi nền**: Thay URL trong `styles.css` dưới phần `body` bằng URL ảnh mong muốn.
- **Điều chỉnh âm thanh**: Thay `Hào.mp3` bằng file âm thanh khác trong `assets/audio/`.
- **Sửa phong cách**: Tùy chỉnh màu sắc, animation hoặc kích thước trong `styles.css` (ví dụ: thay đổi `gap` trong `.profile-card`, `animationDuration` trong `.snowflake`, hoặc `transition` cho fade-in/out).
- **Thêm tính năng**: Mở rộng `script.js` để bao gồm tương tác mới (ví dụ: hiệu ứng thời tiết, mini-game).

## Đóng góp
Rất hoan nghênh đóng góp! Để đóng góp:
1. Fork kho lưu trữ.
2. Tạo nhánh mới (`git checkout -b feature-branch`).
3. Thực hiện thay đổi và cam kết (`git commit -m "Thêm tính năng mới"`).
4. Đẩy lên nhánh (`git push origin feature-branch`).
5. Mở pull request.

Vui lòng đảm bảo mã nguồn của bạn tuân theo phong cách hiện tại và bao gồm bình luận để rõ ràng.

## Giấy phép
Dự án này được cấp phép theo [Giấy phép MIT](LICENSE). Bạn có thể sử dụng, sửa đổi và phân phối theo điều khoản của giấy phép.

## Liên hệ
- **Tên**: NVP Devil
- **Biệt danh**: Call me Pii
- **Địa điểm**: Việt Nam (GMT+7)
- **Mạng xã hội**:
  - [Facebook](https://www.facebook.com/nvpdevil)
  - [Instagram](https://www.instagram.com/nvpdevil/)
  - [GitHub](https://github.com/NVPDevil)
- **Email**: vanphimt123@gmail.com

Nếu có bất kỳ câu hỏi hoặc đề xuất nào, hãy mở issue hoặc liên hệ với tôi qua các nền tảng trên.