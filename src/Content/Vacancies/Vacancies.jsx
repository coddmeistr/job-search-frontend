import Filter from "./Filter/Filter";
import Search from "./Search/Search";
import s from "./Vacancies.module.css"
import VacancyList from "./VacancyList/VacancyList";
import { useDispatch } from "react-redux";
import { fetchVacancies, setFetchingVacs, setFilters, setPage, setUsedKeyword } from "../../redux/vacanciesReducer";
import { useSelector } from "react-redux";

function Vacancies() {
    const dispatch = useDispatch()

    const from = useSelector(state => state.vacancies.filterSalaryFrom)
    const to = useSelector(state => state.vacancies.filterSalaryTo)
    const cat = useSelector(state => state.vacancies.filterCatalogue)
    const usedKeyword = useSelector(state => state.vacancies.usedKeyword)

    async function onPageClick(page) {
        dispatch(setFetchingVacs(true))
        await dispatch(fetchVacancies({ keyword: usedKeyword, from: from, to: to, cat: cat, page: page }))
        dispatch(setPage(page))
    }

    async function onSearchClick(keyword){
        dispatch(setPage(1))
        dispatch(setFetchingVacs(true))
        dispatch(fetchVacancies({ keyword: keyword, from: from, to: to, cat: cat, page: 1 }))
        dispatch(setUsedKeyword(keyword))
    }

    async function onFilterClick(from, to, cat){
        dispatch(setFilters({from, to, cat}))
        dispatch(setFetchingVacs(true))
        dispatch(fetchVacancies({ keyword: usedKeyword, from: from, to: to, cat: cat, page: 1 }))
    }

    async function onFilterReset(){
        dispatch(setFilters({from: 0, to: 0, cat: null}))
        dispatch(setFetchingVacs(true))
        dispatch(fetchVacancies({ keyword: usedKeyword, from: 0, to: 0, cat: null, page: 1}))
    }


    return (
        <div className={s.container}>
           <div className={s.gridContainer}>
              <div className={s.filter}>
                 <Filter onFilterClick={onFilterClick} handleResetFilters={onFilterReset} />
              </div>
              <div className={s.search}>
                 <Search onSearchClick={onSearchClick} />
              </div>
              <div className={s.vacancy}>
                 <VacancyList onPageClick={onPageClick} usedKeyword={usedKeyword} from={from} to={to} cat={cat} />
              </div>
           </div>
        </div>
    );
}

export default Vacancies;
