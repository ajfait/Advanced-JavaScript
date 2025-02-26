const init = () => {
    //instance of XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    //ajax request to a server url
    let url = 'helloworld.txt';
    xhr.open('GET', url);

    //callback to output the server response
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            console.log(xhr.responseText);
        }
    }

    xhr.send(null);
}

window.onload = init;