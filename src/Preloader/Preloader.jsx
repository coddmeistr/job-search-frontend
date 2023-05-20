import s from "./Preloader.module.css"


function Preloader() {

    return (
        <div className={s.preloader}>
            <div className={s.preloader__image_animate}></div>
        </div>
    );
}

export default Preloader;
