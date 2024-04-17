
import "./slider.scss";
import React, { useEffect } from 'react'; // Import React and useEffect hook


export default function Slider() {

  // useEffect(() => {
  //   const nextSlide = document.getElementById('next_slide');
  //   nextSlide.click();
  // }, [])
  return (
    <div className="wp_slider position-relative">
      <div className="header_slider" style={{ position: 'absolute', top: "80px" }}>
        <h4 className="text-center mb-4">Chào mừng đến với app <strong>zaloClone</strong></h4>
        <p className="text-center">Ứng dụng nhắn tin nhanh,an toàn và tiện lợi</p>
        <p className="text-center">Khám phá những tiện ích trò chuyện,làm việc,giải trí cùng người thân </p>
      </div>
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <img src="https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-primary mb-2 fw-bold">Nhắn tin nhiều hơn, soạn thảo ít hơn</h5>
              <p>Sử dụng <strong>tin nhắn nhanh</strong> để lưu sẵn các tin nhắn cần dùng,và soạn thảo nhanh hơn</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="https://chat.zalo.me/assets/inapp-welcome-screen-e2ee-06.58e0949293cc655af6dfbb74ede92bf3.svg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-primary mb-2 fw-bold ">Tin nhắn được mã hoá,an toàn</h5>
              <p>An toàn hơn,bảo mật hơn khi các tin nhắn được mã hóa an toàn</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://chat.zalo.me/assets/vanish_onboard.95edcd15d875cae4d6d504d739eaa977.png" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-primary  mb-2 fw-bold "> Tin nhắn  tự xóa</h5>
              <p>từ giờ tin nhắn có thể tự xóa theo thời gian nhất định.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          id="next_slide"
          className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
