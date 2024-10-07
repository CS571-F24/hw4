const Student = (props) => {
    return (
    <div className = "student-card">
        <h2>{props.name.first} {props.name.last}</h2>
            <p><strong>Major(s):</strong> {props.major}</p>
            <p><strong>{props.name.first} is taking {props.numCredits} credits.</strong></p>
            <p><strong>From Wisconsin:</strong> {props.fromWisconsin ? "Yes" : "No"}</p>
            <p><strong>They have {props.interests.length} interest(s) including:</strong></p>
            <ul>
                {props.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                ))}
            </ul>
        </div>
    );
}

export default Student;
