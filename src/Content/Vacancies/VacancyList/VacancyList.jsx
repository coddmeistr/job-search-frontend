/* eslint-disable react-hooks/exhaustive-deps */
import VacancyShortItem from "../../../VacancyShortItem/VacancyShortItem";
import s from "./VacancyList.module.css"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ITEMS_ON_PAGE, SHOWING_PAGES, fetchVacancies, setFavList, setFetchingVacs } from "../../../redux/vacanciesReducer";
import Pagination from 'react-bootstrap/Pagination';
import Preloader from "../../../Preloader/Preloader";


function VacancyList(props) {
    const dispatch = useDispatch()

    // selectors
    const vacancies = useSelector(state => state.vacancies.vacancies)
    const favlist = useSelector(state => state.vacancies.favlist)
    const isFetching = useSelector(state => state.vacancies.isFetching)

    // pagination
    const pages = useSelector(state => state.vacancies.totalPages)
    const page = useSelector(state => state.vacancies.page)
    let paginagionJsx = []
    const offset = Math.floor(SHOWING_PAGES / 2)
    let left = page - offset
    let right = page + offset
    if (page - offset <= 0) {
        left = 1
        right = left + Math.min(SHOWING_PAGES, pages)
    } else if (page + offset > pages) {
        right = pages + 1
        left = right - Math.min(SHOWING_PAGES, pages)
    }
    else {
        right += 1
    }

    for (let i = left; i < right; i++) {
        paginagionJsx.push(
            <Pagination.Item onClick={() => props.onPageClick(i)} active={page === i ? true : false} >{i}</Pagination.Item>
        )
    }

    // functions
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

    // on render
    useEffect(() => {
        const favlistStr = localStorage.getItem("favlist")
        let favlist
        if (favlistStr === undefined || favlistStr === null || favlistStr === "") {
            favlist = []
        } else {
            favlist = JSON.parse(favlistStr)
        }

        dispatch(setFavList(favlist))
        dispatch(fetchVacancies({ keyword: props.usedKeyword, from: props.from, to: props.to, cat: props.cat, page: page, itemsOnPage: ITEMS_ON_PAGE }))
        dispatch(setFetchingVacs(true))
    }, [])

    return (
        <div className={s.flexContainer}>
            <div style={{ filter: isFetching ? "blur(3px)" : "blur(0px)" }} className={s.vacanciesBlock}>
                {vacancies.map((item) => <div className={s.el}><VacancyShortItem favlist={favlist} onFavClick={() => handleFavClick(item.id)} id={item.id} name={item.profession} salary_from={item.payment_from} salary_to={item.payment_to} currency={item.currency} town={item.town.title} worktype={item.type_of_work.title} /></div>)}
                {vacancies.length === 0 && !isFetching ? <div className={s.emptyState}>
                    <div className={s.image}><img alt="emptystateimg" src={process.env.REACT_APP_API_URL + "balloon_empty_state_1.png"}></img></div>
                    <div><p>По вашему запросу ничего не найдено.</p></div>
                </div> : <></>}
                <div className={s.pagination}>
                    {pages > 1 ? <Pagination>
                        <Pagination.First onClick={() => props.onPageClick(1)} />
                        <Pagination.Prev onClick={() => props.onPageClick(page - 1)} />
                        {paginagionJsx}
                        <Pagination.Next onClick={() => props.onPageClick(page + 1)} />
                        <Pagination.Last onClick={() => props.onPageClick(pages)} />
                    </Pagination> : <></>}
                </div>
            </div>
            <div className={s.preloader} style={{ display: isFetching ? `block` : `none` }}><Preloader /></div>
        </div>
    );
}

export default VacancyList;
