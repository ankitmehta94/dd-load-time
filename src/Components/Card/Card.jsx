import style from "./Card.css";

export default function CardHOC(Component) {
    return function ({...props}) {
        return (
            <div className={style['card']}>
                <Component {...props}/>
            </div>
        )
    } 
}