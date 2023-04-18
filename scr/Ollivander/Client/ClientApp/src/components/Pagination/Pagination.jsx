import '../../../src/styles/pagination.css'


const Pagination = ({ itemsCount, currentPage, limitCount, click }) => {

    const pagesCount = Array.from({ length: Math.ceil(itemsCount / limitCount) }, (_, i) => i + 1) 

    const next = (e) => {

        click(e.currentTarget.textContent)
    }

    return (

        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 list-pages">
                <ul className="pages">
                    {
                        pagesCount.map(page =>

                            (page === currentPage)
                                ? <li key={page} className="page-number page-active">{page}</li>
                                : <li key={page} onClick={next} className="page-number">{page}</li> 
                        )
                    }
                </ul>
            </div>
        </div>   
    )
}

export default Pagination