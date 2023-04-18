import '../../styles/button.css'



const ButtonLink = ({ array, children, position, onClick }) => {

    var pos = ""
    var pos2 = ""

    if (position === "left") {

        pos = "fl"
        pos2 = "l-0"
    } else if (position === "right") {

        pos = "fr"
        pos2 = "r-0"
    } else if (position === "center") {

        pos = "fl"
        pos2 = "c-0"
    }


    return (
        <li className={["dropdown", pos].join(' ')}>
            {
                (array.length === 0)
                    ? <button onClick={() => onClick()} className="button-link">{children}</button>
                    : <button className="button-link">{children}</button>
            }
            {
                array.length !== 0 &&
                <div className={["list", pos2].join(' ')}>
                    {
                            array.map((item, index) =>
                                <div key={index} className="list-item" onClick={item.delegate}>
                                <p className="list-item-header">{item.name}</p>

                                {
                                    item.count !== 0 &&
                                    <div className="list-item-value">{item.count}</div>
                                }
                            </div>
                        )
                    }
                </div>
            }
        </li>
    );
}

export default ButtonLink;