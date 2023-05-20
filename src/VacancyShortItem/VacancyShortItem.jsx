import s from "./VacancyShortItem.module.css"
import { LinkContainer } from "react-router-bootstrap";


function VacancyShortItem(props) {

    const contains = (arr, elem) => {
        if (arr===null || arr===undefined) return -1
        return arr.indexOf(elem) !== -1;
     }

    let salaryString = ""
    if (props.salary_from > 0 && props.salary_to > 0) salaryString = `з/п ${props.salary_from} - ${props.salary_to} ${props.currency}`
    else if (props.salary_from > 0 && props.salary_to <= 0) salaryString = `з/п от ${props.salary_from} ${props.currency}`
    else if (props.salary_from <= 0 && props.salary_to > 0) salaryString = `з/п ${props.salary_to} ${props.currency}`
    else salaryString = `з/п не указана`

    return (
        <div className={s.container}>
            <LinkContainer to={`../vacancy/${props.id}/`}>
                <div className={s.title} onClick={props.linkClickHandler}>
                    {props.name}
                </div>
            </LinkContainer>
            <div className={s.secRow}>
                <span className={s.salary}>
                    {salaryString}
                </span>
                <span>{" ● "}</span>
                <span className={s.worktype}>
                    {props.worktype}
                </span>
            </div>
            <div className={s.town}>
                <span><img src="metroloc.png" alt="metrologo"></img></span>
                <span>{props.town}</span>
            </div>
            <div className={s.favStar} onClick={props.onFavClick}>
                {contains(props.favlist, props.id) ? "★" : "☆"}
            </div>
        </div>
    );
}

export default VacancyShortItem;
