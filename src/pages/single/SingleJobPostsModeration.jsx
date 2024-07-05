import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const SingleJobPostsModeration = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"> ARM</h1>
                <div className="detailItem">
                  <span className="itemKey">Title : </span>
                  <span className="itemValue">
                    Kỹ Sư Cơ, Cấp Thoát Nước - HVAC (Điều Hòa Thông Gió)
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mức lương : </span>
                  <span className="itemValue">10 - 20 triệu</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Địa điểm : </span>
                  <span className="itemValue">Hà Nội & 4 nơi khác</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Kinh nghiệm : </span>
                  <span className="itemValue">1 năm </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ngày tạo : </span>
                  <span className="itemValue">20/10/2023</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Hạn nộp hồ sơ: </span>
                  <span className="itemValue">28/06/2024</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Chi tiết tin tuyển dụng : </span>
                  <br></br>
                  <span className="itemValue">
                    - Giám sát tiến độ, tính toán khối lượng, kiểm soát chất
                    lượng của các hạng mục cơ, cấp thoát nước, điều hòa thông
                    gió đảm bảo đúng thiết kế<br></br>- Kiểm tra theo dõi đánh
                    giá thi công điện nước tại hiện trường.<br></br>- Giải quyết
                    các vấn đề phát sinh về khối lượng, kỹ thuật trong thực tế
                    thi công.<br></br>- Phát hiện sai sót, và phản hồi ý kiến
                    với tư vấn thiết kế, cảnh báo các nguy cơ tiềm ẩn.<br></br>-
                    Đưa ra phương án sửa đổi, bổ sung, cải tiến (nếu có thể).
                    <br></br>- Nghiệm thu khối lượng thi công và kiểm tra hồ sơ
                    thanh quyết toán. - Trao đổi kỹ hơn{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="approveButton">Duyệt</button>
              <button className="rejectButton">Không duyệt</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobPostsModeration;
