import s from "./VacancyShortItem2.module.css"


function VacancyShortItem2(props) {

    const contains = (arr, elem) => {
        if (arr === null || arr === undefined) return -1
        return arr.indexOf(elem) !== -1;
    }

    let salaryString = ""
    if (props.salary_from > 0 && props.salary_to > 0) salaryString = `з/п ${props.salary_from} - ${props.salary_to} ${props.currency}`
    else if (props.salary_from > 0 && props.salary_to <= 0) salaryString = `з/п от ${props.salary_from} ${props.currency}`
    else if (props.salary_from <= 0 && props.salary_to > 0) salaryString = `з/п ${props.salary_to} ${props.currency}`
    else salaryString = `з/п не указана`

    return (
        <div className={s.container}>
            <div className={s.title} onClick={props.linkClickHandler}>
                {props.name}
            </div>
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
                <span><img src={require('../images/loclogo.png').default} alt="metrologo"></img></span>
                <span>{props.town}</span>
            </div>
            <div className={s.favStar} onClick={props.onFavClick}>
                {contains(props.favlist, props.id) ? "★" : "☆"}
            </div>
        </div>
    );
}

export default VacancyShortItem2;
