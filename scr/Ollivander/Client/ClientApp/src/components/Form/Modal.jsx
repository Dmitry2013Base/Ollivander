import '../../styles/modal.css'


const Modal = ({children, visible, setVisible }) => {

    const classes = ["modal-form"]

    if (visible) {

        classes.push("active");
    }

    return (
        <form className={classes.join(' ')} onClick={() => setVisible(false)}>
            <div className="modal-form-content" onClick={e => { e.stopPropagation() }}>{children}</div>
        </form>
    );
}

export default Modal;