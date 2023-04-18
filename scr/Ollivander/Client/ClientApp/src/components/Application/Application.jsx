

const Application = ({ application, getApplicatin }) => {

    return (
        <tr onClick={() => getApplicatin(Number(application.id))} style={{ cursor: "pointer" }}>
            <th scope="row">{application.id}</th>
            <td className="colomn-not-visible">{new Date(application.created).toLocaleDateString()}</td>
            <td>{application.userName}</td>
            <td>{application.productName}</td>
            <td className="colomn-not-visible">{application.statusName}</td>
        </tr>
    );
}
export default Application;