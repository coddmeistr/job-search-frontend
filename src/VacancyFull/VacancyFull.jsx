import { useParams } from "react-router-dom";
import s from "./VacancyFull.module.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchVacancy, setFetchingVac, setVacancy } from "../redux/vacancyReducer";
import { useSelector } from "react-redux";
import VacancyShortItem2 from "../VacancyShortItem2/VacancyShortItem2";
import { setFavList } from "../redux/vacanciesReducer";
import Preloader from './../Preloader/Preloader';


function VacancyFull(props) {
    const dispatch = useDispatch()
    const params = useParams()


    const vac = useSelector(state => state.vacancy.vacancy)
    const vacancies = useSelector(state => state.vacancies.vacancies)
    const vacanciesFav = useSelector(state => state.favorites.vacancies)
    const favlist = useSelector(state => state.vacancies.favlist)
    const isFetching = useSelector(state => state.vacancy.isFetching)

    function handleFavClick(id) {
        let favlistStr = localStorage.getItem("favlist")
        let favlist
        if (favlistStr === undefined || favlistStr === null || favlistStr === "") {
            favlist = []
        } else {
            favlist = JSON.parse(favlistStr)
        }
        const contains = (arr, elem) => {
            return arr.indexOf(elem) !== -1;
        }
        if (contains(favlist, id)) {
            favlist.splice(favlist.indexOf(id), 1)
        } else {
            favlist.push(id)
        }
        dispatch(setFavList(favlist))
        localStorage.setItem("favlist", JSON.stringify(favlist))
    }

    useEffect(() => {
        const favlistStr = localStorage.getItem("favlist")
        let favlist
        if (favlistStr === undefined || favlistStr === null || favlistStr === "") {
            favlist = []
        } else {
            favlist = JSON.parse(favlistStr)
        }
        dispatch(setFavList(favlist))

        let matchVac = vacancies.find((item) => item.id === Number(params.vacID))
        if (matchVac !== undefined) {
            dispatch(setVacancy(matchVac))
            return
        } else {
            matchVac = vacanciesFav.find((item) => item.id === Number(params.vacID))
            if (matchVac !== undefined) {
                dispatch(setVacancy(matchVac))
                return
            }
        }
        dispatch(fetchVacancy({ id: params.vacID }))
        dispatch(setFetchingVac(true))
    }, [])

    if (vac === null) return <div></div>

    return (
        <div className={s.container} >
            <div style={{ filter: isFetching ? "blur(3px)" : "blur(0px)" }}>
                <div className={s.containerHeader}>
                    <VacancyShortItem2 favlist={favlist} onFavClick={() => handleFavClick(vac.id)} id={vac.id} name={vac.profession} salary_from={vac.payment_from} salary_to={vac.payment_to} currency={vac.currency} town={vac.town.title} worktype={vac.type_of_work.title} />
                </div>
                <div className={s.containerBody} dangerouslySetInnerHTML={{ __html: vac.vacancyRichText === undefined ? "Нет описания" : vac.vacancyRichText }}>
                </div>
            </div>
            <div className={s.preloader} style={{ display: isFetching ? `block` : `none` }}><Preloader /></div>
        </div>
    );
}

export default VacancyFull;
