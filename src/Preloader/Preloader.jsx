import s from "./Preloader.module.css"

//background-image: url("https://www.freepnglogos.com/uploads/telegram-logo-png-0.png");
function Preloader() {

    return (
        <div className={s.preloader}>
            <div style={{ "background-image": `url("${process.env.REACT_APP_API_URL}logo.png")` }} className={s.preloader__image_animate}></div>
        </div>
    );
}

export default Preloader;
