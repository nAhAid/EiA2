/**
 * MingiDB Test-Client
 * An example client to help get acquainted with MingiDB.
 *
 * @author Jirka Dell'Oro-Friedl, HFU, 2022
 * @see www.github.com/JirkaDellOro/MingiDB
 * @license MIT License
 */
var testMingiDB;
(function (testMingiDB) {
    window.addEventListener("load", start);
    let database = new URL(location.href).search.slice(1);
    // check if a MingiDB installation is referred to as the parameter for the client
    async function start(_event) {
        try {
            await send("?", null);
        }
        catch (_e) {
            let output = `Add the correct address of your database as get-parameter in the url.\n`;
            output += `Example .../Client.html?https://mywebspace/Database/\n\n`;
            output += _e;
            output += `\n\nSee more information in the console.`;
            alert(output);
        }
        document.forms[0].addEventListener("click", hndButton);
    }
    // send a query together with the data if applicable
    async function send(_query, _data) {
        let query = _query + (_data ? "&data=" + JSON.stringify(_data) : "");
        document.querySelector("input#query").value = query;
        let response = await fetch(database + query);
        output(await response.json());
        return true;
    }
    // show MingiDB's response in the textarea
    function output(_response) {
        document.querySelector("textarea").value = JSON.stringify(_response, null, 2);
    }
    // react to the buttons, build the query and the data accordingly and call send
    function hndButton(_event) {
        if (_event.target instanceof HTMLAnchorElement)
            return hndAnchor(_event);
        if (!(_event.target instanceof HTMLButtonElement))
            return;
        let command = _event.target.textContent;
        let formdata = new FormData(document.forms[0]);
        let collection = formdata.get("collection");
        let id = formdata.get("id");
        let query = `?command=${command}&collection=${collection}`;
        let data = {};
        ["name", "firstname", "age", "passed"].forEach((_name) => { if (formdata.get(_name))
            data[_name] = formdata.get(_name); });
        switch (command) {
            case "delete":
                if (!id)
                    return alert("To delete a document, pass the id");
                data = {};
                query += `&id=${id}`;
                break;
            case "find":
                if (!id)
                    break;
                data = null;
                query += `&id=${id}`;
                break;
            case "update":
                if (!id)
                    return alert("To update a document, pass the id");
                query += `&id=${id}`;
                break;
        }
        send(query, data);
    }
    // for convenience, clear or randomly fill the fields of the document-fieldset when clicking on the anchors
    function hndAnchor(_event) {
        let command = _event.target.textContent;
        let fields = ["name", "firstname", "age", "passed", "id"];
        console.log(command);
        switch (command) {
            case "Clear":
                fields.forEach((_name) => document.querySelector(`[name=${_name}]`).value = "");
                break;
            case "Fill":
                fields.forEach((_name) => {
                    let element = document.querySelector(`[name=${_name}]`);
                    switch (_name) {
                        case "name":
                            element.value = Math.random() < 0.5 ? "Smith" : "Jones";
                            break;
                        case "firstname":
                            element.value = Math.random() < 0.5 ? "Paul" : "Mary";
                            break;
                        case "age":
                            element.value = (18 + Math.random() * 5).toFixed(0);
                            break;
                        case "passed":
                            element.value = Math.random() < 0.5 ? "true" : "false";
                            break;
                    }
                });
                break;
        }
    }
})(testMingiDB || (testMingiDB = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFDSCxJQUFVLFdBQVcsQ0F1R3BCO0FBdkdELFdBQVUsV0FBVztJQUNuQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLElBQUksUUFBUSxHQUFXLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlELGlGQUFpRjtJQUNqRixLQUFLLFVBQVUsS0FBSyxDQUFDLE1BQWE7UUFDaEMsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QjtRQUFDLE9BQU8sRUFBVyxFQUFFO1lBQ3BCLElBQUksTUFBTSxHQUFXLHlFQUF5RSxDQUFDO1lBQy9GLE1BQU0sSUFBSSwwREFBMEQsQ0FBQztZQUNyRSxNQUFNLElBQUksRUFBRSxDQUFDO1lBQ2IsTUFBTSxJQUFJLDBDQUEwQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNmO1FBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG9EQUFvRDtJQUNwRCxLQUFLLFVBQVUsSUFBSSxDQUFDLE1BQWMsRUFBRSxLQUFhO1FBQy9DLElBQUksS0FBSyxHQUFXLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FB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