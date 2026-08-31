import phoneFrame from "../assets/img/phone_frame.png";

// Renders a project screenshot inside a device mockup.
//  - type "phone": iPhone frame PNG (transparent screen cutout), tilted.
//  - type "web":   CSS laptop/browser mockup (same footprint).
// The screenshot fills the screen area via object-fit:cover (no letterboxing).
export const PhoneFrame = ({ src, alt = "", type = "phone" }) => {
    if (type === "web") {
        return (
            <div className="web-mock">
                <div className="web-mock__screen">
                    <div className="web-mock__bar">
                        <span></span><span></span><span></span>
                    </div>
                    {src ? <img className="web-mock__shot" src={src} alt={alt} /> : <div className="web-mock__shot" />}
                </div>
                <div className="web-mock__base"></div>
            </div>
        );
    }

    return (
        <div className="phone-mock">
            <div className="phone-mock__inner">
                {src ? <img className="phone-mock__shot" src={src} alt={alt} /> : <div className="phone-mock__shot" />}
                <img className="phone-mock__frame" src={phoneFrame} alt="" aria-hidden="true" />
            </div>
        </div>
    );
};
