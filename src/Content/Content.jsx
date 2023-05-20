import s from "./Content.module.css"
import { Routes, Route } from "react-router-dom"
import Vacancies from "./Vacancies/Vacancies";
import Favorites from "./Favorites/Favorites";
import VacancyFull from "../VacancyFull/VacancyFull";

function Content() {
    return (
        <div className={s.content}>
            <Routes>
               <Route path="/" element={<Vacancies/>} />
               <Route path="/vacancy" element={<VacancyFull/>} >
                   <Route path=":vacID" element={<VacancyFull/>} />
               </Route>
               <Route path="/fav" element={<Favorites/>} />
           </Routes>
        </div>
    );
}

export default Content;
