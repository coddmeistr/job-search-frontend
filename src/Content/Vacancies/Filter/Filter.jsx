import s from "./Filter.module.css"
import { Select, TextInput, Button } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCatalogues } from "../../../redux/vacanciesReducer";
import { useSelector } from "react-redux";
import { useState } from "react";




function Filter(props) {
    const dispatch = useDispatch()
    
    let [textFrom, setFrom] = useState("")
    let [textTo, setTo] = useState("")

    function handleChangeFrom(event){
        setFrom(event.target.value)
    }
    function handleChangeTo(event){
        setTo(event.target.value)
    }
    
    useEffect(() => {
        dispatch(fetchCatalogues())
    }, [])
 

    const keyPairs = useSelector(state => state.vacancies.nameKeyPairs)
    const cats = useSelector(state => state.vacancies.catalogues)
    let catsTitlesData = cats.map(item => {
        return item.title
    })
   

    return (
        <div className={s.container}>
            <div className={s.title}>
                Фильтры
            </div>
            <div className={s.catalogueBlock}>
                <div>Отрасль</div>
                <Select
                    id="catSelect"
                    mt="md"
                    withinPortal
                    data={catsTitlesData}
                    placeholder="Выберите отрасль"
                    className={s.catalogueInput}
                />
            </div>
            <div className={s.salaryBlock}>
                <div>Оклад</div>
                <TextInput onChange={handleChangeFrom} value={textFrom} placeholder="От" className={s.salaryInput} />
                <TextInput onChange={handleChangeTo} value={textTo} placeholder="До" className={s.salaryInput} />
            </div>
            <Button
                className={s.btn}
                onClick={() => props.onFilterClick(textFrom, textTo, keyPairs[document.getElementById("catSelect").value])}
            >
                Применить
            </Button>
            <div className={s.resetFilters} onClick={() => {
                setFrom("")
                setTo("")
                props.handleResetFilters()
            }}>
                Сбросить фильтры ×
            </div>
        </div>
    );
}

export default Filter;
