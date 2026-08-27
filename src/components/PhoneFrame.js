import phoneFrame from "../assets/img/phone_frame.png";

// Renders a screenshot inside the iPhone frame PNG (transparent screen cutout),
// tilted to match the original rotated project look. Screen insets were measured
// from phone_frame.png: left 16.99%, right 17.17%, top 8.5%, bottom 5.57%.
export const PhoneFrame = ({ src, alt = "" }) => (
    <div className="phone-mock">
        <div className="phone-mock__inner">
            {src ? <img className="phone-mock__shot" src={src} alt={alt} /> : <div className="phone-mock__shot" />}
            <img className="phone-mock__frame" src={phoneFrame} alt="" aria-hidden="true" />
        </div>
    </div>
);
