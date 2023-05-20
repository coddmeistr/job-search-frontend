import VacancyShortItem from "../../VacancyShortItem/VacancyShortItem";
import s from "./Favorites.module.css"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Pagination from 'react-bootstrap/Pagination';
import { fetchVacanciesById, setFetchingFavs } from "../../redux/favoritesReducer";
import { setFavList } from "../../redux/vacanciesReducer";
import Preloader from './../../Preloader/Preloader';
import { setPage } from "../../redux/favoritesReducer";



function Favorites(props) {
    const dispatch = useDispatch()

    const contains = (arr, elem) => {
        if (arr === null || arr === undefined) return -1
        return arr.indexOf(elem) !== -1;
    }

    // selectors
    const vacancies = useSelector(state => state.favorites.vacancies)
    const favlist = useSelector(state => state.vacancies.favlist)
    const vacFiltered = vacancies.filter(el => contains(favlist, el.id))
    const isFetching = useSelector(state => state.favorites.isFetching)
    const pages = useSelector(state => state.favorites.totalPages)
    const page = useSelector(state => state.favorites.page)

    if (vacFiltered.length === 0 && pages>1){
        refetchFavs()
    }

    async function onPageClick(page) {
        dispatch(setFetchingFavs(true))
        await dispatch(fetchVacanciesById({ ids: favlist, page: page }))
        dispatch(setPage(page))
    }

    async function refetchFavs(){
        dispatch(setPage(1))
        dispatch(setFetchingFavs(true))
        dispatch(fetchVacanciesById({ ids: favlist, page: 1 }))
    }

    // pagination
    const paginationPages = 5
    let paginagionJsx = []
    const offset = Math.floor(paginationPages / 2)
    let left = page - offset
    let right = page + offset
    if (page - offset <= 0) {
        left = 1
        right = left + Math.min(paginationPages, pages)
    } else if (page + offset > pages) {
        right = pages + 1
        left = right - Math.min(paginationPages, pages)
    }
    else {
        right += 1
    }

    for (let i = left; i < right; i++) {
        paginagionJsx.push(
            <Pagination.Item onClick={() => onPageClick(i)} active={page === i ? true : false} >{i}</Pagination.Item>
        )
    }


    async function handleFavClick(id) {
        // manage favlist storage
        let favlistStr = localStorage.getItem("favlist")
        let favlist
        if (favlistStr === undefined || favlistStr === null || favlistStr === "") {
            favlist = []
        } else {
            favlist = JSON.parse(favlistStr)
        }
        if (contains(favlist, id)) {
            favlist.splice(favlist.indexOf(id), 1)
        } else {
            favlist.push(id)
        }
        localStorage.setItem("favlist", JSON.stringify(favlist))
        dispatch(setFavList(favlist))
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
        refetchFavs()
    }, [])

    return (
        <div className={s.container}>
            <div style={{ filter: isFetching ? "blur(3px)" : "blur(0px)" }}>
                {vacFiltered.map((item) => <div className={s.el}><VacancyShortItem favlist={favlist} onFavClick={() => handleFavClick(item.id)} id={item.id} name={item.profession} salary_from={item.payment_from} salary_to={item.payment_to} currency={item.currency} town={item.town.title} worktype={item.type_of_work.title} /></div>)}
                {vacFiltered.length === 0 && !isFetching ? <div>У вас нет ничего в избранном.</div> : <></>}
                <div className={s.pagination}>
                    {pages > 1 ? <Pagination>
                        <Pagination.First onClick={() => onPageClick(1)} />
                        <Pagination.Prev onClick={() => onPageClick(page - 1)} />
                        {paginagionJsx}
                        <Pagination.Next onClick={() => onPageClick(page + 1)} />
                        <Pagination.Last onClick={() => onPageClick(pages)} />
                    </Pagination> : <></>}
                </div>
            </div>
            <div className={s.preloader} style={{ display: isFetching ? `block` : `none` }}><Preloader /></div>
        </div>
    );
}

export default Favorites;

