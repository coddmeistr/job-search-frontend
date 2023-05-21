/* eslint-disable react-hooks/exhaustive-deps */
import s from "./Filter.module.css"
import { Select, TextInput, Button } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCatalogues } from "../../../redux/vacanciesReducer";
import { useSelector } from "react-redux";
import { useState } from "react";


function Filter(props) {
    const dispatch = useDispatch()
    
    // local state
    let [textFrom, setFrom] = useState("")
    let [textTo, setTo] = useState("")
    let [textCat, setCat] = useState("")

    // selectors
    const keyPairs = useSelector(state => state.vacancies.nameKeyPairs)
    const cats = useSelector(state => state.vacancies.catalogues)
    let catsTitlesData = cats.map(item => {
        return item.title
    })

    // functions
    function handleChangeFrom(event){
        setFrom(event.target.value)
    }
    function handleChangeTo(event){
        setTo(event.target.value)
    }
    function handleChangeCat(text){
        setCat(text)
    }
    
    // on render
    useEffect(() => {
        dispatch(fetchCatalogues())
    }, [])

    return (
        <div className={s.container}>
            <div className={s.title}>
                <span className={s.titleText}>Фильтры</span>
            </div>
            <div className={s.catalogueBlock}>
                <div className={s.cataloguetItle}>Отрасль</div>
                <Select
                    data-elem="industry-select"
                    value={textCat}
                    onChange={handleChangeCat}
                    styles={{item: {whiteSpace: "initial"}}}
                    id="catSelect"
                    mt="md"
                    withinPortal
                    data={catsTitlesData}
                    placeholder="Выберите отрасль"
                    className={s.catalogueInput}
                />
            </div>
            <div className={s.salaryBlock}>
                <div className={s.salaryTitle}>Оклад</div>
                <TextInput data-elem="salary-from-input" onChange={handleChangeFrom} value={textFrom} placeholder="От" className={s.salaryInput} />
                <TextInput data-elem="salary-to-input" onChange={handleChangeTo} value={textTo} placeholder="До" className={s.salaryInput} />
            </div>
            <div className={s.resetFilters} onClick={() => {
                setFrom("")
                setTo("")
                setCat("")
                props.handleResetFilters()
            }}>
                Сбросить фильтры ×
            </div>
            <Button
                data-elem="search-button"
                className={s.btn}
                onClick={() => props.onFilterClick(textFrom, textTo, keyPairs[document.getElementById("catSelect").value])}
            >
                Применить
            </Button>
        </div>
    );
}

export default Filter;
