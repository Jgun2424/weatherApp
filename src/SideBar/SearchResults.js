import classes from './SideBar.module.css'

function SearchResults(props) {
    function saveLocation() {
        let value = document.getElementById("inp");
        value.value = ""
        let name = props.names
        localStorage.setItem('city', `${name}`)
        props.fetch()
        props.o()
    }
    return (
        <div className={classes.searchResults} key={props.name} onClick={() => saveLocation()}>
            <p>{props.names}, {props.region}</p>
        </div>
    );
}

export default SearchResults;